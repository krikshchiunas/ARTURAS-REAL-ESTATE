import { defaultLocale, isLocale, type Locale } from "./config";
import {
  guideMeta,
  projectMeta,
  serviceMeta,
  siteConfig,
  socialChannels,
  whatsappHref,
} from "./meta";
import type {
  Dictionary,
  GuideText,
  LocaleData,
  ProjectFact,
  ProjectText,
  ProjectUnit,
  ServiceText,
  Stat,
} from "./types";

import { ru } from "./locales/ru";
import { uk } from "./locales/uk";
import { en } from "./locales/en";
import { de } from "./locales/de";
import { th } from "./locales/th";

export type { Locale } from "./config";
export type { Dictionary, ProjectFact, ProjectUnit, Stat } from "./types";

const data: Record<Locale, LocaleData> = { ru, uk, en, de, th };

// Объект для UI: нейтральная мета + текст выбранной локали.
export type Project = {
  slug: string;
  image: string;
  gallery: string[];
} & ProjectText;

export type Service = {
  key: string;
  span: string;
  image?: string;
} & ServiceText;

export type Social = { key: string; href: string; label: string };

function resolve(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export function getDictionary(locale: string): Dictionary {
  return data[resolve(locale)].dictionary;
}

export function getStats(locale: string): Stat[] {
  return data[resolve(locale)].stats;
}

export function getServices(locale: string): Service[] {
  const text = data[resolve(locale)].services;
  return serviceMeta.map((m) => ({ ...m, ...text[m.key] }));
}

export function getProjects(locale: string): Project[] {
  const text = data[resolve(locale)].projects;
  return projectMeta
    .filter((m) => text[m.slug])
    .map((m) => ({ ...m, ...text[m.slug] }));
}

export function getProject(locale: string, slug: string): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

// Гайды: нейтральная мета (обложка, дата обновления) + текст выбранной локали.
export type Guide = {
  slug: string;
  image: string;
  updatedAt: string;
} & GuideText;

export function getGuides(locale: string): Guide[] {
  const text = data[resolve(locale)].guides;
  return guideMeta
    .filter((m) => text[m.slug])
    .map((m) => ({ ...m, ...text[m.slug] }));
}

export function getGuide(locale: string, slug: string): Guide | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

// Соцканалы с переведённой меткой (бренды одинаковы, переводится только
// «Telegram канал»).
const socialLabels: Record<string, string> = {
  WhatsApp: "WhatsApp",
  Telegram: "Telegram",
  Instagram: "Instagram",
  YouTube: "YouTube",
  TikTok: "TikTok",
};

export function getSocials(locale: string): Social[] {
  const channelLabel = getDictionary(locale).common.socialChannelLabel;
  return socialChannels.map((c) => ({
    key: c.key,
    href: c.href,
    label: c.key === "TelegramChannel" ? channelLabel : socialLabels[c.key],
  }));
}

export { siteConfig, whatsappHref };
