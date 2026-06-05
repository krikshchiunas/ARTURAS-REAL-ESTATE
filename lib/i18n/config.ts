// Конфигурация мультиязычности. Базовый язык — русский (источник смысла),
// остальные переводятся ПО СМЫСЛУ, а не дословно.
export const locales = ["ru", "uk", "en", "de", "th"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

// Короткая метка для переключателя языков.
export const localeShort: Record<Locale, string> = {
  ru: "RU",
  uk: "UA",
  en: "EN",
  de: "DE",
  th: "TH",
};

// Полное название языка на самом языке (для меню переключателя).
export const localeName: Record<Locale, string> = {
  ru: "Русский",
  uk: "Українська",
  en: "English",
  de: "Deutsch",
  th: "ไทย",
};

// Значение для атрибута <html lang>.
export const htmlLang: Record<Locale, string> = {
  ru: "ru",
  uk: "uk",
  en: "en",
  de: "de",
  th: "th",
};

// Значение для og:locale.
export const ogLocale: Record<Locale, string> = {
  ru: "ru_RU",
  uk: "uk_UA",
  en: "en_US",
  de: "de_DE",
  th: "th_TH",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
