import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { HomeExperience } from "@/components/webgl/HomeExperience";

// Главная: WebGL-нарратив «куб над водой» с 6 главами по скроллу.
// Заголовок и canonical приходят из layout — переопределять их здесь не нужно.

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  return <HomeExperience lang={lang} />;
}
