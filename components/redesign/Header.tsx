"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/redesign/dict";
import { MenuOverlay } from "@/components/redesign/MenuOverlay";
import { useSound } from "@/components/redesign/SoundManager";

// Шапка редизайна: вордмарк слева, кнопка Menu справа, между ними — ничего.
// Вся навигация живёт в полноэкранном меню (паттерн референса).
export function Header({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { play } = useSound();

  // Смена маршрута всегда закрывает меню (клик по ссылке или Back браузера).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[120] flex items-start justify-between px-6 pt-6 md:px-16 md:pt-8">
        <Link
          href={`/${lang}/redesign`}
          onMouseEnter={() => play("hover")}
          onClick={() => play("click")}
          className="leading-none"
        >
          <span className="block text-18 font-bold uppercase tracking-tight text-offwhite">
            Arturas
          </span>
          <span className="mt-1 block font-mono text-9 uppercase tracking-4 text-offwhite/50">
            Real Estate — Phuket
          </span>
        </Link>

        <button
          type="button"
          aria-expanded={open}
          onMouseEnter={() => play("hover")}
          onClick={() => {
            play(open ? "click" : "modal");
            setOpen(!open);
          }}
          className="group relative font-mono text-12 uppercase tracking-4 text-offwhite"
        >
          <span className="relative block overflow-hidden px-4 py-2">
            <span className="block transition-transform duration-500 ease-smooth group-hover:-translate-y-full">
              {open ? t.close : t.menu}
            </span>
            <span
              aria-hidden
              className="absolute inset-0 block translate-y-full px-4 py-2 transition-transform duration-500 ease-smooth group-hover:translate-y-0"
            >
              {open ? t.close : t.menu}
            </span>
          </span>
          {/* Уголки-маркеры по краям кнопки */}
          <span aria-hidden className="absolute left-0 top-0 h-[3px] w-[3px] bg-current" />
          <span aria-hidden className="absolute right-0 top-0 h-[3px] w-[3px] bg-current opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-[3px] bg-current opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span aria-hidden className="absolute bottom-0 right-0 h-[3px] w-[3px] bg-current" />
        </button>
      </header>

      <MenuOverlay lang={lang} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
