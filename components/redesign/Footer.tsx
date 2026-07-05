"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { whatsappHref, getDictionary, getSocials } from "@/lib/i18n";
import { chromeDict, pageOrder } from "@/components/redesign/dict";
import { BracketButton } from "@/components/redesign/BracketButton";
import { SoundToggle, useSound } from "@/components/redesign/SoundManager";

// Футер редизайна (паттерн референса): гигантский CTA «Work with us»,
// нумерованный список ссылок 01–06 (наши соцканалы), нижняя HUD-полоса:
// копирайт · Sound On/Off · Prev./Next — листание страниц по порядку сайта.
export function Footer({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const common = getDictionary(lang).common;
  const socials = getSocials(lang);
  const pathname = usePathname();
  const router = useRouter();
  const { play } = useSound();

  // Карта — полноэкранный интерактивный режим со своим HUD; футер под ней лишний.
  if (pathname.includes("/redesign/map")) return null;

  const base = `/${lang}/redesign`;
  const current = pageOrder.findIndex((p) => {
    const full = `${base}${p}`;
    return p === "" ? pathname === full || pathname === `${full}/` : pathname.startsWith(full);
  });
  const go = (dir: -1 | 1) => {
    const idx = current === -1 ? 0 : current;
    const next = (idx + dir + pageOrder.length) % pageOrder.length;
    play("click");
    router.push(`${base}${pageOrder[next]}`);
  };

  return (
    <footer className="relative border-t border-offwhite/10 bg-night text-offwhite">
      {/* CTA-блок */}
      <div className="px-6 py-24 md:px-16 md:py-36">
        <h2 className="max-w-[8ch] text-54 font-bold uppercase leading-0.9 md:text-140 md:leading-0.8">
          {t.workTitle}
        </h2>
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[30rem] text-16 font-light leading-1.6 text-offwhite/70">
            {t.workBody}
          </p>
          <BracketButton href={whatsappHref(common.whatsappPrefill)}>
            {t.workCta}
          </BracketButton>
        </div>
      </div>

      {/* Нумерованные ссылки */}
      <div className="border-t border-offwhite/10 px-6 py-14 md:px-16">
        <span className="font-mono text-11 uppercase tracking-4 text-offwhite/40">
          {t.links}
        </span>
        <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((s, i) => (
            <li key={s.key}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
                className="group flex items-baseline gap-4 border-b border-offwhite/10 pb-3"
              >
                <span className="font-mono text-10 tracking-4 text-offwhite/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-16 font-light text-offwhite/80 transition-colors duration-300 group-hover:text-offwhite">
                  {s.label}
                </span>
                <span
                  aria-hidden
                  className="ml-auto font-mono text-10 text-offwhite/30 transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Нижняя HUD-полоса */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-offwhite/10 px-6 py-5 md:px-16">
        <Link
          href={base}
          className="font-mono text-10 uppercase tracking-4 text-offwhite/40 transition-colors duration-300 hover:text-offwhite"
        >
          © {new Date().getFullYear()} Arturas · {t.rights}
        </Link>
        <div className="flex items-center gap-8">
          <SoundToggle labels={{ on: t.soundOn, off: t.soundOff }} />
          <div className="flex items-center gap-4 font-mono text-11 uppercase tracking-4">
            <button
              type="button"
              onClick={() => go(-1)}
              onMouseEnter={() => play("hover")}
              className="text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
            >
              {t.prev}
            </button>
            <span className="h-3 w-px bg-offwhite/20" aria-hidden />
            <button
              type="button"
              onClick={() => go(1)}
              onMouseEnter={() => play("hover")}
              className="text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
            >
              {t.next}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
