"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import { Button } from "@/components/Button";

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
      // Нижние плавающие панели старого дизайна убраны, поэтому баннер снова
      // стоит у самого низа; env(safe-area-inset-bottom) держит его выше
      // индикатора жестов на iPhone.
      className="pointer-events-auto fixed inset-x-4 bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.75rem))] z-[95] flex flex-col gap-4 rounded-control border border-bone/15 bg-ink-soft/95 p-5 text-bone shadow-2xl backdrop-blur-md sm:inset-x-auto sm:left-6 sm:max-w-sm"
    >
      <p className="text-micro leading-relaxed text-bone-dim">{t.text}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" size="md" onClick={() => decide(true)}>
          {t.accept}
        </Button>
        <Button variant="ghost" size="md" onClick={() => decide(false)}>
          {t.decline}
        </Button>
      </div>
    </div>
  );
}
