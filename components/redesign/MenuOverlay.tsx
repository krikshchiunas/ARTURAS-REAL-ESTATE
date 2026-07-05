"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { locales, type Locale } from "@/lib/i18n/config";
import { getSocials } from "@/lib/i18n";
import { chromeDict, menuRegions } from "@/components/redesign/dict";
import { useSound } from "@/components/redesign/SoundManager";

// Полноэкранное меню редизайна (паттерн референса): слева — районы Пхукета
// со счётчиками проектов и соцссылки, справа — гигантские ссылки навигации
// с roll-hover (дубликат строки въезжает снизу). Скролл на время меню
// останавливается событиями lenis:stop/start, Esc закрывает.

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
  const firstRun = useRef(true);
  const { play } = useSound();

  const base = `/${lang}/redesign`;
  const items = [
    { label: t.nav.home, href: base },
    { label: t.nav.about, href: `${base}/about` },
    { label: t.nav.projects, href: `${base}/projects` },
    { label: t.nav.contact, href: `${base}/contact` },
  ];

  // Переключатель локали сохраняет текущий путь внутри редизайна.
  const langHref = (l: string) => pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${l}`);

  // Императивные твины с абсолютными целями вместо play/reverse таймлайна:
  // компонент может ремаунтиться при навигации (state открытости живёт выше,
  // в Header), и «замороженный» reversed-таймлайн оставлял оверлей на экране.
  // Здесь каждый запуск эффекта приводит DOM к нужному состоянию с нуля.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = root.querySelectorAll("[data-menu-link]");
    const sides = root.querySelectorAll("[data-menu-side]");

    if (open) {
      window.dispatchEvent(new Event("lenis:stop"));
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        root,
        { yPercent: -100, autoAlpha: 1 },
        { yPercent: 0, duration: reduce ? 0 : 0.7, ease: "power4.inOut", overwrite: "auto" },
      );
      gsap.fromTo(
        links,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: reduce ? 0 : 0.6,
          stagger: reduce ? 0 : 0.06,
          delay: reduce ? 0 : 0.35,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
      gsap.fromTo(
        sides,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduce ? 0 : 0.5,
          stagger: reduce ? 0 : 0.05,
          delay: reduce ? 0 : 0.45,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    } else {
      window.dispatchEvent(new Event("lenis:start"));
      document.body.style.overflow = "";
      if (firstRun.current) {
        // Первый рендер (и ремаунт после навигации): без анимации, сразу спрятать.
        gsap.set(root, { yPercent: -100, autoAlpha: 0 });
      } else {
        // Закрытие быстрее открытия — меню не должно «мешать уходить».
        gsap.to(root, {
          yPercent: -100,
          duration: reduce ? 0 : 0.45,
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

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-[110] bg-night"
    >
      <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28 md:flex-row md:items-end md:px-16 md:pb-16">
        {/* Левая колонка: районы + соцсети + языки */}
        <div className="order-2 mt-10 flex flex-col gap-10 md:order-1 md:mt-0 md:max-w-[22rem]">
          <ul className="space-y-3">
            {menuRegions.map((r) => (
              <li
                key={r.name}
                data-menu-side
                className="flex items-baseline gap-4 border-b border-offwhite/10 pb-3"
              >
                <span className="font-mono text-11 tracking-4 text-offwhite/50">
                  {String(r.count).padStart(2, "0")}{" "}
                  <span className="uppercase">{t.projectsWord}</span>
                </span>
                <span className="ml-auto text-16 font-light text-offwhite/80">
                  {r.name}
                </span>
              </li>
            ))}
          </ul>

          <div data-menu-side className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => play("hover")}
                className="font-mono text-10 uppercase tracking-4 text-offwhite/40 transition-colors duration-300 hover:text-offwhite"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div data-menu-side className="flex gap-4">
            {locales.map((l) => (
              <Link
                key={l}
                href={langHref(l)}
                onClick={() => {
                  play("click");
                  onClose();
                }}
                className={`font-mono text-11 uppercase tracking-4 transition-colors duration-300 ${
                  l === lang
                    ? "text-offwhite underline underline-offset-4"
                    : "text-offwhite/40 hover:text-offwhite"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* Правая колонка: главные ссылки */}
        <nav className="order-1 md:order-2 md:text-right">
          <ul className="space-y-2">
            {items.map((item, i) => {
              const active =
                item.href === base
                  ? pathname === base || pathname === `${base}/`
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <div data-menu-link>
                    <Link
                      href={item.href}
                      onClick={() => {
                        play("click");
                        onClose();
                      }}
                      onMouseEnter={() => play("hover")}
                      className="group relative inline-flex items-start gap-3 md:gap-5"
                    >
                      <span className="mt-3 font-mono text-11 tracking-4 text-offwhite/40 md:mt-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative block overflow-hidden text-48 font-bold uppercase leading-0.9 md:text-104">
                        <span
                          className={`block transition-transform duration-500 ease-smooth group-hover:-translate-y-full ${
                            active ? "text-offwhite" : "text-offwhite/50"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          aria-hidden
                          className="absolute inset-0 block translate-y-full text-offwhite transition-transform duration-500 ease-smooth group-hover:translate-y-0"
                        >
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
