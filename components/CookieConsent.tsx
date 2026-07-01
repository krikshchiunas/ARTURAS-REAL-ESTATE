"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";

// Баннер согласия на cookie (GDPR). Управляет Google Consent Mode:
// при «Принять» поднимает аналитические и рекламные согласия в granted,
// при «Отклонить» оставляет denied (по умолчанию из Analytics.tsx).
// Решение сохраняется в localStorage, чтобы не показывать баннер повторно.
const STORAGE_KEY = "are_cookie_consent";

function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;
  const value = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export function CookieConsent({ lang }: { lang: string }) {
  const t = getDictionary(lang).cookie;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "granted") {
        updateConsent(true);
      } else if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      /* localStorage недоступен — просто скрываем баннер */
    }
    updateConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="pointer-events-auto fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[90] mx-auto flex max-w-2xl flex-col gap-3 rounded-bezel bg-ink-800/95 p-4 shadow-bezel ring-1 ring-white/10 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
    >
      <p className="text-sm leading-relaxed text-bone-muted">{t.text}</p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => decide(false)}
          className="rounded-full px-4 py-2 text-sm text-bone-muted transition-colors duration-300 hover:text-bone"
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => decide(true)}
          className="rounded-full bg-bone px-5 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:bg-platinum-soft"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
