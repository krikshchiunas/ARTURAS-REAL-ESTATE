"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { MenuOverlay } from "@/components/MenuOverlay";
import { useSound } from "@/components/SoundManager";

// Шапка редизайна (паттерн Hubtown): вордмарк слева, inline-навигация +
// кнопка MENU справа. Полное меню-оверлей открывается кнопкой MENU.
export function Header({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { play } = useSound();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const base = `/${lang}`;
  // Projects открывает карту — список всех объектов достаётся оттуда панелью
  // «Список проектов», поэтому пункт подсвечен и на карте, и на страницах
  // списка/карточки.
  const navLinks = [
    { label: t.nav.about, href: `${base}/about`, match: [`${base}/about`] },
    {
      label: t.nav.projects,
      href: `${base}/map`,
      match: [`${base}/map`, `${base}/projects`],
    },
    {
      label: getDictionary(lang).guides.indexEyebrow,
      href: `${base}/guides`,
      match: [`${base}/guides`],
    },
    { label: t.nav.contact, href: `${base}/contact`, match: [`${base}/contact`] },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-6 pt-6 md:px-16 md:pt-7">
        <Link
          href={`${base}/about`}
          onMouseEnter={() => play("hover")}
          onClick={() => play("click")}
          className="flex min-h-[44px] flex-col justify-center leading-none"
        >
          <span className="block text-18 font-bold uppercase tracking-[0.2em] text-offwhite">
            Arturas
          </span>
          <span className="mt-1 block font-mono text-9 uppercase tracking-4 text-offwhite/50">
            Real Estate — Phuket
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Inline-навигация (desktop) */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => {
              const active = l.match.some((m) => pathname.startsWith(m));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => play("hover")}
                  onClick={() => play("click")}
                  className={`flex min-h-[44px] items-center font-mono text-11 uppercase tracking-4 transition-colors duration-300 hover:text-offwhite ${
                    active ? "text-offwhite" : "text-offwhite/55"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <button
          type="button"
          aria-expanded={open}
          onMouseEnter={() => play("hover")}
          onClick={() => {
            play(open ? "click" : "modal");
            setOpen(!open);
          }}
          className="group relative flex min-h-[44px] items-center font-mono text-12 uppercase tracking-4 text-offwhite"
        >
          <span className="relative block overflow-hidden px-4 py-3">
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
        </div>
      </header>

      <MenuOverlay lang={lang} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
