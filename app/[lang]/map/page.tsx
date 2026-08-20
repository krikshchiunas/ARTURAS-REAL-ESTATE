import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { MapExperience } from "@/components/map/MapExperience";

// Интерактивная 3D-карта проектов Пхукета.

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
  const c = chromeDict(lang);
  const url = `${siteConfig.url}/${lang}/map`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/map`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru/map`;
  return {
    title: c.mapPage.hudTitle,
    description: c.projectsPage.sub,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${c.mapPage.hudTitle} — ${siteConfig.name}`,
      description: c.projectsPage.sub,
      url,
    },
  };
}

export default async function MapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <MapExperience lang={lang as Locale} />;
}
