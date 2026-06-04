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
};

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

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return fail("Некорректный запрос.", 400);
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

  return NextResponse.json({ ok: true });
}
