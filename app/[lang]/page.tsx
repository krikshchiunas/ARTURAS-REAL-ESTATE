import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, siteConfig } from "@/lib/i18n";
import { getEmerald } from "@/lib/emerald/content";
import { Hero, Invest, Numbers, Portfolio, Statement } from "@/components/emerald/Sections";
import { Areas, Founder, Place, Services } from "@/components/emerald/Sections2";

// Главная в изумрудной системе. Композиция перенесена с лендинга целиком:
// кадр-фильм на весь первый экран, заявление поверх снимка, полоса цифр,
// карусель объектов, график доходности, место, сервис, районы, портрет.
//
// Порядок секций и тональные среды (data-tone) значимы: страница идёт
// волной deep → lift → panel и обратно, поэтому соседние блоки никогда не
// сливаются в одно пятно.

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const t = getDictionary(lang).meta;
  const url = `${siteConfig.url}/${lang}`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru`;
  return {
    title: t.homeTitle,
    description: t.description,
    alternates: { canonical: url, languages },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const c = getEmerald(lang);

  return (
    <main id="main">
      <Hero c={c} />
      <Statement c={c} />
      <Numbers c={c} />
      <Portfolio c={c} />
      <Invest c={c} />
      <Place c={c} />
      <Services c={c} />
      <Areas c={c} />
      <Founder c={c} />
    </main>
  );
}
