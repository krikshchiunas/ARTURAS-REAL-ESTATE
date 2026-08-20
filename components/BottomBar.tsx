"use client";

import { usePathname } from "next/navigation";
import { getDictionary, whatsappHref } from "@/lib/i18n";
import { events } from "@/lib/analytics";
import { chromeDict } from "@/components/dict";
import { SoundToggle, useSound } from "@/components/SoundManager";
import type { Locale } from "@/lib/i18n/config";

// Постоянная нижняя HUD-полоса (паттерн Hubtown): слева тумблер звука,
// справа «Chat with us» с иконкой WhatsApp, между ними тонкая линия-рейка.
// На карте не показывается — там своя полоса с элементами карты.
export function BottomBar({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const t = chromeDict(lang);
  const common = getDictionary(lang).common;
  const { play } = useSound();

  if (pathname.startsWith(`/${lang}/map`)) return null;

  return (
    <div className="pointer-events-none fixed inset-x-[14px] bottom-[14px] z-[105] hidden items-stretch md:flex">
      <div className="pointer-events-auto flex items-center border-t border-offwhite/12 bg-night/60 px-5 py-3 backdrop-blur-[2px]">
        <SoundToggle labels={{ on: t.soundOn, off: t.soundOff }} />
      </div>
      <div className="flex-1 border-t border-offwhite/12 bg-night/60 backdrop-blur-[2px]" />
      <a
        href={whatsappHref(common.whatsappPrefill)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => play("hover")}
        onClick={() => {
          play("click");
          events.whatsapp("floating");
        }}
        className="pointer-events-auto flex items-center gap-2 border-t border-offwhite/12 bg-night/60 px-5 py-3 font-mono text-11 uppercase tracking-4 text-offwhite/70 backdrop-blur-[2px] transition-colors duration-300 hover:text-offwhite"
      >
        {t.chat}
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12.04 2.5c-5.2 0-9.42 4.22-9.42 9.42 0 1.66.43 3.28 1.26 4.71L2.5 21.5l4.99-1.31a9.4 9.4 0 0 0 4.55 1.16h.004c5.2 0 9.42-4.22 9.42-9.42 0-2.52-.98-4.88-2.76-6.66a9.36 9.36 0 0 0-6.66-2.77Z"
          />
        </svg>
      </a>
    </div>
  );
}
