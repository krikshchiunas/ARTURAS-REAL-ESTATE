"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { useSound } from "@/components/SoundManager";

// Переключатель языка прямо в шапке — доступен на любой странице, не только со
// дна меню. Компактная кнопка с текущим кодом (RU/EN/…), по тапу раскрывает
// список из пяти языков; каждый пункт — полноценная цель ≥44px под палец.
//
// Href строится заменой префикса локали в текущем пути, так что язык
// переключается на той же странице, а не сбрасывает на главную.
export function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  const hrefFor = (l: string) => pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${l}`);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onMouseEnter={() => play("hover")}
        onClick={() => {
          play(open ? "click" : "modal");
          setOpen((v) => !v);
        }}
        className="flex min-h-[44px] items-center gap-1.5 px-1 font-mono text-11 uppercase tracking-4 text-offwhite/70 transition-colors duration-300 hover:text-offwhite"
      >
        {lang}
        <span
          aria-hidden
          className={`inline-block text-[8px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+0.25rem)] min-w-[7rem] border border-offwhite/15 bg-night/95 backdrop-blur-md"
        >
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={hrefFor(l)}
                role="option"
                aria-selected={l === lang}
                onClick={() => play("click")}
                className={`flex min-h-[44px] items-center justify-between gap-6 border-b border-offwhite/10 px-4 font-mono text-11 uppercase tracking-4 transition-colors duration-300 last:border-b-0 ${
                  l === lang
                    ? "bg-offwhite/10 text-offwhite"
                    : "text-offwhite/55 hover:bg-offwhite/5 hover:text-offwhite"
                }`}
              >
                {l}
                {l === lang && (
                  <span aria-hidden className="inline-block h-1.5 w-1.5 bg-offwhite" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
