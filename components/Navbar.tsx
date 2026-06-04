"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

// Плавающая glass-пилюля, оторванная от верха. Сжимается при скролле.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Якорные ссылки (#projects и т.д.) работают только на главной. На любой
  // другой странице (например, /projects/[slug]) ведём на главную с якорем —
  // браузер откроет «/» и доскроллит до нужной секции.
  const isHome = pathname === "/";
  const resolve = (hash: string) => (isHome ? hash : `/${hash}`);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 40;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6"
    >
      <nav
        aria-label="Основная навигация"
        className={`glass flex items-center gap-2 rounded-full transition-all duration-500 ease-glass ${
          scrolled ? "py-2 pl-5 pr-2 shadow-bezel" : "py-2.5 pl-6 pr-2.5"
        }`}
      >
        <a
          href={resolve("#main")}
          className="mr-2 font-display text-lg font-medium tracking-tight md:mr-4"
        >
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={resolve(item.href)}
                className="rounded-full px-4 py-2 text-sm text-bone-muted transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={site.contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 hidden rounded-full bg-bone px-5 py-2 text-sm font-medium text-ink transition-colors duration-500 ease-smooth hover:bg-platinum-soft md:inline-block"
        >
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Меню"
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
            className="glass absolute top-[72px] left-4 right-4 rounded-bezel p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolve(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-bone-muted transition-colors hover:bg-white/5 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={site.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl bg-bone px-4 py-3 text-center font-medium text-ink"
                >
                  Написать в WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
