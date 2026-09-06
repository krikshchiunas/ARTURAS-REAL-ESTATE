"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeName, locales, type Locale } from "@/lib/i18n/config";

/**
 * Переключатель языка. Href строится заменой префикса локали в текущем пути,
 * поэтому язык меняется на той же странице, а не сбрасывает на главную.
 * Каждый пункт — цель ≥44px, список закрывается по Escape и клику снаружи.
 */
export function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        aria-label={localeName[lang]}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] cursor-pointer items-center gap-1.5 px-2 text-eyebrow font-medium uppercase tracking-eyebrow text-bone transition-colors duration-micro hover:text-gold"
      >
        {lang}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 fill-none stroke-current stroke-[1.5] transition-transform duration-micro ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+0.5rem)] min-w-[9rem] overflow-hidden rounded-control border border-bone/15 bg-ink-soft/95 shadow-xl backdrop-blur-md"
        >
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={hrefFor(l)}
                role="option"
                aria-selected={l === lang}
                hrefLang={l}
                className={`flex min-h-[44px] items-center justify-between gap-4 border-b border-bone/10 px-4 text-micro transition-colors duration-micro last:border-b-0 ${
                  l === lang
                    ? "bg-bone/10 text-bone"
                    : "text-bone-dim hover:bg-bone/5 hover:text-bone"
                }`}
              >
                {localeName[l]}
                {/* Текущий язык помечен не только цветом — точка нужна тем,
                    кто не различает оттенки. */}
                {l === lang && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
