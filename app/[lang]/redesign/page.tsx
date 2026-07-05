import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { HomeExperience } from "@/components/redesign/webgl/HomeExperience";

// Главная редизайна: WebGL-нарратив «куб над водой» с 6 главами по скроллу.
// Фаза WebGL. Служебно закрыта от индексации, пока редизайн не заменит
// текущий сайт.

export const metadata: Metadata = {
  title: "Arturas — Phuket real estate",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function RedesignHomePage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  return <HomeExperience lang={lang} />;
}
