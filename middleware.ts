import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

// Определяем предпочтительный язык по заголовку Accept-Language, иначе базовый.
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;
  const ordered = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ordered) {
    const base = tag.split("-")[0];
    const match = locales.find((l) => l === base);
    if (match) return match;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Уже есть префикс локали — пропускаем.
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  // Иначе редиректим на префиксованный путь. Голый корень ведём сразу на
  // «Обо мне» — знакомство с человеком важнее заставки; WebGL-главная
  // остаётся по /{lang} и доступна из меню.
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}/about` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Исключаем API, внутренние пути Next и файлы с расширением (картинки,
  // robots.txt, sitemap.xml, hero.mp4 и т.д.).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
