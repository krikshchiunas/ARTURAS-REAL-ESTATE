"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { linkPrefetch } from "@/lib/prefetch";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { MenuOverlay } from "@/components/MenuOverlay";
import { LangSwitch } from "@/components/LangSwitch";
import { Button } from "@/components/Button";

/**
 * Шапка: прозрачная поверх видео-героя, при прокрутке набирает подложку.
 *
 * Подложка появляется не сразу, а после 24px — иначе она мигала бы от каждого
 * микродвижения трекпада. Слушатель пассивный и просто читает scrollY, без
 * записи в layout.
 */
export function Header({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const d = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = `/${lang}`;
  // «Проекты» ведут на карту: полный список объектов достаётся оттуда панелью,
  // поэтому пункт подсвечен и на /map, и на /projects.
  const links = [
    { label: t.nav.about, href: `${base}/about`, match: [`${base}/about`] },
    {
      label: t.nav.projects,
      href: `${base}/map`,
      match: [`${base}/map`, `${base}/projects`],
    },
    { label: d.guides.indexEyebrow, href: `${base}/guides`, match: [`${base}/guides`] },
    { label: t.nav.contact, href: `${base}/contact`, match: [`${base}/contact`] },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-base ease-smooth ${
          solid || open
            ? "border-b border-bone/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between gap-4 py-3.5">
          <Link
            href={base}
            className="flex min-h-[44px] flex-col justify-center leading-none"
          >
            <span className="font-display text-[1.35rem] tracking-tight text-bone">
              Arturas
            </span>
            {/* Пока шапка прозрачна, она лежит на кадре заката — приглушённый
                тон там даёт ~2:1 и просто теряется. Гасим его только когда
                под шапкой появляется сплошная подложка. */}
            <span
              className={`mt-1 text-[0.6rem] uppercase tracking-eyebrow transition-colors duration-base ${
                solid ? "text-bone-dim" : "text-bone"
              }`}
            >
              Real Estate · Phuket
            </span>
          </Link>

          <nav
            aria-label={d.a11y.mainNav}
            className="hidden items-center gap-9 lg:flex"
          >
            {links.map((l) => {
              const active = l.match.some((m) => pathname.startsWith(m));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch={linkPrefetch(l.href)}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-[44px] items-center text-eyebrow font-medium uppercase tracking-eyebrow transition-colors duration-micro hover:text-bone ${
                    active || !solid ? "text-bone" : "text-bone-dim"
                  }`}
                >
                  {l.label}
                  {/* Активный пункт помечен подчёркиванием, а не только цветом. */}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-2 h-px bg-gold"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <LangSwitch lang={lang} />

            <Button
              href={whatsappHref(d.common.whatsappPrefill)}
              variant="primary"
              size="md"
              className="hidden md:inline-flex"
            >
              {d.common.whatsapp}
            </Button>

            {/* Бургер — только там, где нет inline-навигации. */}
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? t.close : t.menu}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-bone transition-all duration-base ease-smooth ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-bone transition-all duration-base ease-smooth ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay lang={lang} open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
