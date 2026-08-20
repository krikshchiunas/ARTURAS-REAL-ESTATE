import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getProject, getProjects, siteConfig } from "@/lib/i18n";
import { MapExperience } from "@/components/map/MapExperience";

// Deep-link на карту с сразу открытым оверлеем проекта: /{lang}/map/{slug}.
// Пререндерится статически для всех проектов × локалей. Для поиска это тот же
// объект, что и карточка, поэтому canonical ведёт на карточку.

export function generateStaticParams() {
  // Слаги одинаковы во всех локалях — берём из en.
  const slugs = getProjects("en").map((p) => p.slug);
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const p = getProject(lang, slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    robots: { index: false, follow: true },
    alternates: { canonical: `${siteConfig.url}/${lang}/projects/${slug}` },
  };
}

export default async function MapDeepLinkPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const exists = getProjects("en").some((p) => p.slug === slug);
  if (!exists) notFound();
  return <MapExperience lang={lang as Locale} deepSlug={slug} />;
}
