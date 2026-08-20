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
      className="pointer-events-auto fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 z-[95] flex max-w-sm flex-col gap-4 border border-offwhite/20 bg-night/90 p-5 text-offwhite backdrop-blur-sm"
    >
      <p className="font-mono text-11 uppercase leading-1.6 tracking-4 text-offwhite/70">
        {t.text}
      </p>
      <div className="flex gap-6">
        <button
          type="button"
          onClick={() => decide(true)}
          className="border border-offwhite/40 px-4 py-2 font-mono text-11 uppercase tracking-4 transition-colors duration-300 hover:bg-offwhite hover:text-night"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="font-mono text-11 uppercase tracking-4 text-offwhite/50 transition-colors duration-300 hover:text-offwhite"
        >
          {t.decline}
        </button>
      </div>
    </div>
  );
}
