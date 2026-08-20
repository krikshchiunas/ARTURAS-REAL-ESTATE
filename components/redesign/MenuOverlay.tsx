"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { locales, type Locale } from "@/lib/i18n/config";
import { getSocials, siteConfig } from "@/lib/i18n";
import { chromeDict } from "@/components/redesign/dict";
import { useSound } from "@/components/redesign/SoundManager";

// Меню-оверлей в стиле Hubtown: светлая (offwhite) панель, выезжающая справа
// на ~35% ширины и инвертирующая цвета (тёмный текст на светлом). Крупные
// ссылки навигации стопкой, нумерованные вторичные ссылки, языки + сайт внизу.
// Левая часть — затемнение страницы (клик закрывает). Esc закрывает.

type MenuOverlayProps = {
  lang: Locale;
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ lang, open, onClose }: MenuOverlayProps) {
  const t = chromeDict(lang);
  const socials = getSocials(lang);
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const { play } = useSound();

  const base = `/${lang}/redesign`;
  // Projects → карта, как в референсе.
  const items = [
    { label: t.nav.home, href: base },
    { label: t.nav.about, href: `${base}/about` },
    { label: t.nav.projects, href: `${base}/map` },
    { label: t.nav.contact, href: `${base}/contact` },
  ];

  const langHref = (l: string) => pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${l}`);

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!root || !panel || !backdrop) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = panel.querySelectorAll("[data-menu-link]");
    const sides = panel.querySelectorAll("[data-menu-side]");

    if (open) {
      window.dispatchEvent(new Event("lenis:stop"));
      document.body.style.overflow = "hidden";
      gsap.set(root, { autoAlpha: 1 });
      gsap.fromTo(
        backdrop,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: reduce ? 0 : 0.4, overwrite: "auto" },
      );
      gsap.fromTo(
        panel,
        { xPercent: 100 },
        { xPercent: 0, duration: reduce ? 0 : 0.7, ease: "power4.inOut", overwrite: "auto" },
      );
      gsap.fromTo(
        links,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: reduce ? 0 : 0.6,
          stagger: reduce ? 0 : 0.07,
          delay: reduce ? 0 : 0.28,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
      gsap.fromTo(
        sides,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduce ? 0 : 0.5,
          stagger: reduce ? 0 : 0.04,
          delay: reduce ? 0 : 0.4,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    } else {
      window.dispatchEvent(new Event("lenis:start"));
      document.body.style.overflow = "";
      if (firstRun.current) {
        gsap.set(root, { autoAlpha: 0 });
        gsap.set(panel, { xPercent: 100 });
      } else {
        gsap.to(backdrop, { autoAlpha: 0, duration: reduce ? 0 : 0.4, overwrite: "auto" });
        gsap.to(panel, {
          xPercent: 100,
          duration: reduce ? 0 : 0.5,
          ease: "power4.inOut",
          overwrite: "auto",
          onComplete: () => gsap.set(root, { autoAlpha: 0 }),
        });
      }
    }
    firstRun.current = false;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const siteUrl = siteConfig.url.replace(/^https?:\/\//, "").toUpperCase();

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-[130]"
    >
      {/* Затемнение слева — клик закрывает */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-night/70 backdrop-blur-[2px]"
      />

      {/* Светлая панель справа */}
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-offwhite px-8 pb-8 pt-6 text-night md:px-10"
      >
        {/* Верх: метка + закрыть */}
        <div className="flex items-center justify-between">
          <span data-menu-side className="flex items-center gap-2 font-mono text-11 uppercase tracking-4 text-night/70">
            <span className="inline-block h-1.5 w-1.5 bg-night" /> Explore
          </span>
          <button
            type="button"
            onClick={() => {
              play("click");
              onClose();
            }}
            onMouseEnter={() => play("hover")}
            aria-label={t.close}
            className="flex h-9 w-9 items-center justify-center border border-night/25 text-night transition-colors duration-300 hover:bg-night hover:text-offwhite"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        {/* Большие ссылки навигации */}
        <nav className="mt-12">
          <ul>
            {items.map((item) => {
              const active =
                item.href === base
                  ? pathname === base || pathname === `${base}/`
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={() => {
                      play("click");
                      onClose();
                    }}
                    onMouseEnter={() => play("hover")}
                    data-menu-link
                    className={`group block py-0.5 text-40 font-bold uppercase leading-[1.08] tracking-tight transition-colors duration-300 md:text-48 ${
                      active ? "text-night" : "text-night/85 hover:text-night"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Нумерованные вторичные ссылки (соцканалы) */}
        <div data-menu-side className="mt-auto">
          <span className="flex items-center gap-2 font-mono text-11 uppercase tracking-4 text-night/60">
            <span className="inline-block h-1.5 w-1.5 bg-night" /> {t.links}
          </span>
          <ul className="mt-5 space-y-2.5">
            {socials.map((s, i) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => play("hover")}
                  className="group flex items-baseline justify-between border-b border-night/10 pb-2"
                >
                  <span className="text-14 font-medium text-night/80 transition-colors duration-300 group-hover:text-night">
                    {s.label}
                  </span>
                  <span className="font-mono text-10 tracking-4 text-night/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Низ: языки + сайт */}
        <div data-menu-side className="mt-8 flex items-center justify-between border-t border-night/10 pt-5">
          <div className="flex gap-3">
            {locales.map((l) => (
              <Link
                key={l}
                href={langHref(l)}
                onClick={() => {
                  play("click");
                  onClose();
                }}
                className={`font-mono text-11 uppercase tracking-4 transition-colors duration-300 ${
                  l === lang ? "text-night underline underline-offset-4" : "text-night/40 hover:text-night"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <span className="font-mono text-10 uppercase tracking-4 text-night/50">{siteUrl}</span>
        </div>
      </div>
    </div>
  );
}
