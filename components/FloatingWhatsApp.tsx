"use client";

import { getDictionary, whatsappHref } from "@/lib/i18n";
import { events } from "@/lib/analytics";

// Плавающая кнопка WhatsApp — постоянный CTA, всегда под рукой при скролле.
// Для трафика с рекламы это главный «горячий» канал: на мобильных WhatsApp
// конвертит в диалог заметно лучше формы. Клик трекается как конверсия.
export function FloatingWhatsApp({ lang }: { lang: string }) {
  const common = getDictionary(lang).common;
  const href = whatsappHref(common.whatsappPrefill);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={common.whatsapp}
      onClick={() => {
        events.whatsapp("floating");
      }}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-bezel transition-transform duration-300 ease-glass hover:scale-105 active:scale-95"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#fff"
          d="M12.04 2.5c-5.2 0-9.42 4.22-9.42 9.42 0 1.66.43 3.28 1.26 4.71L2.5 21.5l4.99-1.31a9.4 9.4 0 0 0 4.55 1.16h.004c5.2 0 9.42-4.22 9.42-9.42 0-2.52-.98-4.88-2.76-6.66a9.36 9.36 0 0 0-6.66-2.77Zm-2.54 5.82c.12 0 .24 0 .36.01.11.01.26-.04.41.32.16.37.52 1.3.57 1.39.05.1.08.21.02.33-.06.13-.09.21-.19.32-.09.12-.19.24-.28.33-.09.09-.19.19-.08.38.11.19.48.8 1.04 1.3.71.64 1.31.83 1.5.93.19.09.29.07.4-.05.11-.12.46-.54.58-.73.13-.18.25-.15.42-.09.17.06 1.08.51 1.27.61.19.09.31.13.35.21.05.08.05.45-.11.88-.15.43-.91.85-1.25.88-.34.03-.66.16-2.22-.51-1.88-.81-3.1-2.69-3.19-2.81-.09-.13-.76-1.01-.76-1.93 0-.91.48-1.37.65-1.55.17-.18.37-.23.49-.23Z"
        />
      </svg>
    </a>
  );
}
