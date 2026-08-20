import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/config";

// Главной страницы как отдельного экрана больше нет: сайт начинается с «Обо
// мне». `/{lang}` остаётся рабочим адресом (на него ведут старые ссылки и
// выдача) и уводит туда же.
//
// Редирект живёт здесь, а не только в middleware, чтобы самый важный URL сайта
// не зависел от одного слоя. Сам WebGL-нарратив («куб над водой») никуда не
// делся из репозитория — components/webgl/HomeExperience|HomeNarrative|HomeScene
// лежат нетронутыми и не попадают в бандл, пока их никто не импортирует;
// вернуть страницу = отрендерить <HomeExperience lang={lang} /> вместо редиректа.

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleRoot({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  redirect(`/${lang}/about`);
}
