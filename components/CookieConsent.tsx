"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  // На страницах редизайна баннер носит HUD-стиль (night, mono, прямые углы),
  // чтобы не выбиваться из новой системы. Логика согласия общая.
  const redesign = pathname.includes("/redesign");
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

  if (redesign) {
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
