"use client";

import { usePathname } from "next/navigation";
import { getDictionary, whatsappHref } from "@/lib/i18n";
import { events } from "@/lib/analytics";
import { useSound } from "@/components/SoundManager";

// «Chat with us» в HUD-стиле — постоянный CTA редизайна вместо зелёного
// кружка WhatsApp старого сайта. Конверсия трекается тем же событием.
export function ChatChip({ lang, label }: { lang: string; label: string }) {
  const { play } = useSound();
  const pathname = usePathname();
  const common = getDictionary(lang).common;
  const href = whatsappHref(common.whatsappPrefill);

  // На карте нижний правый угол занят зум-HUD — чип там мешал бы.
  if (pathname.startsWith(`/${lang}/map`)) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => play("hover")}
      onClick={() => {
        play("click");
        events.whatsapp("floating");
      }}
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[90] flex min-h-[48px] items-center gap-2 border border-offwhite/20 bg-night/80 px-4 py-3 font-mono text-11 uppercase tracking-4 text-offwhite backdrop-blur-sm transition-colors duration-300 hover:border-offwhite/50 hover:bg-night-raised md:hidden"
    >
      <span className="inline-block h-1 w-1 animate-pulse bg-offwhite" aria-hidden />
      {label}
    </a>
  );
}
