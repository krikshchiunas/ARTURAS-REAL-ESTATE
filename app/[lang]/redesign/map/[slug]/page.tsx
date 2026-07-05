import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getProjects } from "@/lib/i18n";
import { MapExperience } from "@/components/redesign/map/MapExperience";

// Deep-link на карту с сразу открытым оверлеем проекта: /redesign/map/{slug}.
// Пререндерится статически для всех проектов × локалей.
export const metadata: Metadata = {
  title: "Map",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  // Слаги одинаковы во всех локалях — берём из en.
  const slugs = getProjects("en").map((p) => p.slug);
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export default function MapDeepLinkPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const exists = getProjects("en").some((p) => p.slug === params.slug);
  if (!exists) notFound();
  return <MapExperience lang={params.lang as Locale} deepSlug={params.slug} />;
}
