import { NextResponse } from "next/server";

// Лиды с контактной формы уходят в Telegram-бот через Bot API.
// Токен и chat_id берутся из переменных окружения Vercel и НИКОГДА не
// попадают в клиент.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  budget?: unknown;
  message?: unknown;
  telegram?: unknown;
  whatsapp?: unknown;
  attribution?: unknown;
  // Скрытое honeypot-поле: настоящий человек его не видит и не заполняет,
  // бот — заполняет. Если пришло непустым — тихо отклоняем заявку.
  company?: unknown;
};

// ─── Простое ограничение частоты (rate limit) ───────────────────────────────
// Best-effort защита от спама: не больше N заявок с одного IP за окно времени.
// Хранится в памяти инстанса — на serverless сбрасывается при холодном старте,
// но отсекает быстрые залповые отправки. Для жёсткой защиты нужен внешний
// стор (см. заметку в конце). Достаточно как обязательный минимум.
const RATE_LIMIT = { max: 5, windowMs: 60_000 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  // Периодическая чистка карты, чтобы память не росла бесконечно.
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Мягкая проверка email: не пускаем очевидный мусор, но не блокируем реальные.
function isValidEmail(value: string): boolean {
  if (!value) return true; // email необязателен
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 200;
}

// Источник трафика (UTM/реферер) — какая кампания/объявление привели заявку.
const ATTR_FIELDS = [
  ["utm_source", "Источник"],
  ["utm_medium", "Канал"],
  ["utm_campaign", "Кампания"],
  ["utm_term", "Ключ"],
  ["utm_content", "Объявление"],
  ["gclid", "Google click id"],
  ["fbclid", "Meta click id"],
  ["referrer", "Реферер"],
  ["landing", "Страница входа"],
] as const;

function formatAttribution(attribution: unknown): string[] {
  if (!attribution || typeof attribution !== "object") return [];
  const a = attribution as Record<string, unknown>;
  const lines: string[] = [];
  for (const [key, label] of ATTR_FIELDS) {
    const raw = a[key];
    if (typeof raw === "string" && raw.trim()) {
      lines.push(`${label}: ${raw.trim().slice(0, 300)}`);
    }
  }
  if (lines.length === 0) return [];
  return ["", "📊 Источник:", ...lines];
}

const LIMIT = {
  name: 200,
  email: 200,
  budget: 160,
  message: 4000,
  contact: 200,
} as const;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function makeFail(request: Request) {
  return (error: string, status: number) =>
    NextResponse.json(
      { ok: false, error },
      { status, headers: corsHeaders(request) },
    );
}

// CORS: разрешаем вызов только со своего домена, чтобы сторонние сайты не
// могли отправлять заявки от имени пользователей (защита от CSRF-like abuse).
function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin") ?? "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const allowed =
    origin === siteUrl ||
    // В dev разрешаем localhost.
    /^https?:\/\/localhost(:\d+)?$/.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const fail = makeFail(request);

  // Ограничение частоты — до разбора тела, чтобы дёшево отсекать залпы.
  if (isRateLimited(getClientIp(request))) {
    return fail("Слишком много заявок. Подождите минуту и попробуйте снова.", 429);
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return fail("Некорректный запрос.", 400);
  }

  // Honeypot: скрытое поле заполнено → это бот. Отвечаем «ок», чтобы не
  // подсказывать спамеру о защите, но ничего не отправляем.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMIT.name);
  const email = clean(body.email, LIMIT.email);
  const budget = clean(body.budget, LIMIT.budget);
  const message = clean(body.message, LIMIT.message);
  const telegram = clean(body.telegram, LIMIT.contact);
  const whatsapp = clean(body.whatsapp, LIMIT.contact);

  // Серверная валидация — дублирует клиентскую, нельзя доверять браузеру.
  if (!name) return fail("Укажите имя.", 400);
  if (!message) return fail("Опишите цель и запрос.", 400);
  if (!telegram && !whatsapp)
    return fail("Укажите Telegram или WhatsApp для связи.", 400);
  if (!isValidEmail(email)) return fail("Проверьте адрес email.", 400);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram env vars are missing");
    return fail(
      "Сервис временно недоступен. Напишите, пожалуйста, напрямую в WhatsApp или Telegram.",
      500,
    );
  }

  const dash = "—";
  const date = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Bangkok", // время Пхукета
  }).format(new Date());

  const text = [
    "🏠 Новая заявка с сайта Arturas Real Estate",
    "",
    "👤 Имя:",
    name,
    "",
    "📧 Email:",
    email || dash,
    "",
    "💰 Бюджет:",
    budget || dash,
    "",
    "🎯 Цель и запрос:",
    message,
    "",
    "📱 Telegram:",
    telegram || dash,
    "",
    "📞 WhatsApp:",
    whatsapp || dash,
    ...formatAttribution(body.attribution),
    "",
    "🕒 Дата:",
    date,
  ].join("\n");

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
        // Не кэшировать на стороне Next/Vercel.
        cache: "no-store",
      },
    );

    if (!tgResponse.ok) {
      let detail = "";
      try {
        const data = (await tgResponse.json()) as { description?: string };
        detail = data?.description ?? "";
      } catch {
        /* ignore parse error */
      }
      console.error("Telegram API error", tgResponse.status, detail);
      return fail("Не удалось отправить заявку. Попробуйте ещё раз.", 502);
    }
  } catch (error) {
    console.error("Telegram request failed", error);
    return fail(
      "Не удалось отправить заявку. Проверьте соединение и попробуйте снова.",
      502,
    );
  }

  return NextResponse.json({ ok: true }, { headers: corsHeaders(request) });
}
