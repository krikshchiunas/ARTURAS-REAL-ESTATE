import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { MapExperience } from "@/components/redesign/map/MapExperience";

// Интерактивная 3D-карта проектов Пхукета. Служебно закрыта от индексации.
export const metadata: Metadata = {
  title: "Map",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function MapPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  return <MapExperience lang={params.lang as Locale} />;
}
