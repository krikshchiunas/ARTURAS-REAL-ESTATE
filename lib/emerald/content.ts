// Контент изумрудной системы. Файлы локалей сгенерированы (см. лендинг
// «Real Estate», tools/gen-locales) из словарей основного сайта, поэтому
// фактура здесь та же самая — правки вносятся в генератор.
import type { Locale } from "@/lib/i18n/config";
import { ru } from "./locales/ru.mjs";
import { uk } from "./locales/uk.mjs";
import { en } from "./locales/en.mjs";
import { de } from "./locales/de.mjs";
import { th } from "./locales/th.mjs";

export type EmeraldImage = { name: string; alt: string };
export type EmeraldContent = {
  brand: { name: string; full: string; place: string };
  meta: { title: string; description: string; lang: string; themeColor: string };
  nav: { id: string; label: string }[];
  hero: {
    eyebrow: string;
    headline: string[];
    standfirst: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    scrollCue: string;
    strip: { v: string; u: string }[];
  };
  ticker: string[];
  statement: { kicker: string; lines: string[]; body: string[]; image: EmeraldImage };
  place: { index: string; kicker: string; heading: string[]; body: string[]; images: EmeraldImage[] };
  numbers: {
    index: string; kicker: string; heading: string[];
    items: { n: number; suffix: string; label: string; note: string | null }[];
  };
  plan: {
    index: string; kicker: string; heading: string[]; body: string[];
    facts: { k: string; v: string }[]; image: EmeraldImage;
  };
  residences: {
    index: string; kicker: string; heading: string[]; intro: string;
    priceNote: string; onRequest: string;
    items: { slug: string; name: string; badge: string; location: string;
             developer: string | null; image: EmeraldImage }[];
  };
  invest: {
    index: string; kicker: string; heading: string[]; intro: string; columns: string[];
    rows: { type: string; roi: string; share: string }[];
    note: string;
    chart: {
      title: string; peakLabel: string; peakNote: string; x: string[];
      series: { key: string; values: number[] }[]; max: number;
    };
    highlights: { v: string; k: string }[];
  };
  amenities: {
    index: string; kicker: string; heading: string[]; intro: string;
    tiles: { name: string; alt: string; label: string; size: string }[];
  };
  developer: {
    index: string; kicker: string; heading: string[]; body: string[];
    awardYears: string[]; image: EmeraldImage;
  };
  contact: {
    index: string; kicker: string; heading: string[]; body: string;
    channels: { label: string; value: string; href: string }[];
    image: EmeraldImage;
  };
  footer: { colophon: string; note: string };
  ui: Record<string, string>;
};

const byLocale: Record<Locale, EmeraldContent> = { ru, uk, en, de, th };

export function getEmerald(lang: Locale): EmeraldContent {
  return byLocale[lang];
}
