// Сбор источника трафика (UTM-метки, реферер, рекламный клик) на первой
// странице визита и сохранение на время сессии. Это позволяет понимать, какая
// кампания/объявление привели лид: данные прикрепляются к заявке и приходят
// агенту в Telegram вместе с контактом.

const KEY = "are_attribution";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Ads click id
  fbclid?: string; // Meta click id
  referrer?: string;
  landing?: string; // первая страница входа
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

// Запоминаем источник один раз за сессию (first-touch). Если метки уже сохранены
// — не перетираем их более поздними внутренними переходами.
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 200);
    }
    const ref = document.referrer;
    if (ref && !ref.includes(window.location.host)) {
      data.referrer = ref.slice(0, 300);
    }
    data.landing = window.location.pathname.slice(0, 200);
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* sessionStorage может быть недоступен — не критично */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
