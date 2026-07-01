// Тонкая обёртка над dataLayer / gtag для отправки событий-конверсий.
// Работает и с чистым GA4 (gtag), и с Google Tag Manager (dataLayer).
// Если аналитика не подключена (нет env-переменных) — вызовы безопасно молчат.

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Главное событие-конверсия. Названия событий держим стабильными, чтобы их
// можно было один раз настроить как конверсии в GA4 и импортировать в Google Ads:
//   generate_lead     — отправлена форма заявки
//   contact_whatsapp  — клик по WhatsApp
//   contact_telegram  — клик по Telegram
export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  // GTM-канал.
  window.dataLayer?.push({ event, ...params });
  // Прямой GA4-канал (если подключён gtag без GTM).
  window.gtag?.("event", event, params);
}

export const events = {
  lead: (method: "form" | "whatsapp" | "telegram", extra: EventParams = {}) =>
    track("generate_lead", { method, ...extra }),
  whatsapp: (location: string) =>
    track("contact_whatsapp", { location }),
  telegram: (location: string) =>
    track("contact_telegram", { location }),
};
