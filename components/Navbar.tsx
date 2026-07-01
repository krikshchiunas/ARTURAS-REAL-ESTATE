"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { siteConfig, getDictionary, whatsappHref } from "@/lib/i18n";
import { locales, localeShort, localeName } from "@/lib/i18n/config";
import { events } from "@/lib/analytics";
import { EASE } from "@/lib/motion";

// Якорные секции навигации. Сами якоря язык-независимы, подписи берутся из словаря.
const NAV_ITEMS = [
  { href: "#approach", key: "approach" },
  { href: "#projects", key: "projects" },
  { href: "#founder", key: "founder" },
  { href: "#services", key: "services" },
  { href: "#contact", key: "contact" },
] as const;

// Плавающая glass-пилюля, оторванная от верха. Сжимается при скролле.
export function Navbar({ lang }: { lang: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const t = getDictionary(lang);

  // Якорные ссылки (#projects и т.д.) работают только на главной страницы
  // локали. На любой другой странице (например, /<lang>/projects/[slug]) ведём
  // на главную с якорем — браузер откроет «/<lang>» и доскроллит до секции.
  const isHome = pathname === `/${lang}`;
  const resolve = (hash: string) => (isHome ? hash : `/${lang}${hash}`);

  // Смена языка с сохранением остального пути.
  const swapLocale = (target: string) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || "/";
  };

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 40;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Пока мобильное меню открыто, страница под ним не должна прокручиваться.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      className="pointer-events-none fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 flex justify-center px-4 md:top-6"
    >
      {/* Затемнение под мобильным меню: absolute от шапки, чтобы не зависеть
          от transform-контекста motion.header; тап по нему закрывает меню. */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label={t.a11y.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={() => setOpen(false)}
            className="pointer-events-auto absolute inset-x-0 -top-6 h-[100dvh] cursor-default bg-ink/70 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
      <nav
        aria-label={t.a11y.mainNav}
        className={`glass pointer-events-auto relative z-10 flex items-center gap-2 rounded-full transition-all duration-500 ease-glass ${
          scrolled ? "py-2 pl-5 pr-2 shadow-bezel" : "py-2.5 pl-6 pr-2.5"
        }`}
      >
        <a
          href={resolve("#main")}
          className="mr-2 font-display text-lg font-medium tracking-tight md:mr-4"
        >
          {siteConfig.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={resolve(item.href)}
                className="rounded-full px-4 py-2 text-sm text-bone-muted transition-colors duration-300 hover:text-bone"
              >
                {t.nav[item.key]}
              </a>
            </li>
          ))}
        </ul>

        {/* Переключатель языка */}
        <div className="relative ml-1 hidden md:block">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            aria-expanded={langOpen}
            aria-label="Language"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-bone-muted transition-colors duration-300 hover:text-bone"
          >
            {localeShort[lang as keyof typeof localeShort] ?? lang.toUpperCase()}
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M2.5 4.5 6 8l3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="glass absolute right-0 top-[calc(100%+0.5rem)] min-w-[9rem] rounded-2xl p-1.5"
              >
                {locales.map((l) => (
                  <li key={l}>
                    <a
                      href={swapLocale(l)}
                      onClick={() => setLangOpen(false)}
                      className={`block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 ${
                        l === lang ? "text-bone" : "text-bone-muted hover:text-bone"
                      }`}
                    >
                      {localeName[l]}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={t.a11y.menu}
          className="flex h-10 w-10 items-center justify-center rounded-full text-bone md:hidden"
        >
          <span className="relative flex h-3 w-5 flex-col justify-between">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="pointer-events-auto absolute top-[72px] left-4 right-4 z-10 max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-bezel bg-ink-800/95 p-3 shadow-bezel ring-1 ring-white/10 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolve(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-bone-muted transition-colors hover:bg-white/5 hover:text-bone"
                  >
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex flex-wrap gap-1.5 border-t border-white/10 px-1 pt-3">
                {locales.map((l) => (
                  <a
                    key={l}
                    href={swapLocale(l)}
                    onClick={() => setOpen(false)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      l === lang
                        ? "bg-white/10 text-bone"
                        : "text-bone-muted hover:text-bone"
                    }`}
                  >
                    {localeShort[l]}
                  </a>
                ))}
              </li>
              <li className="mt-2">
                <a
                  href={whatsappHref(t.common.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    events.whatsapp("navbar");
                    setOpen(false);
                  }}
                  className="block rounded-2xl bg-bone px-4 py-3 text-center font-medium text-ink"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
