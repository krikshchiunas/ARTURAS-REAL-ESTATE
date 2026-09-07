"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { localeShort, locales } from "@/lib/i18n/config";
import { getDictionary, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { getEmerald } from "@/lib/emerald/content";
import { linkPrefetch } from "@/lib/prefetch";
import { Icon } from "@/components/emerald/ui";

/**
 * Шапка изумрудной системы.
 *
 * Состояния (подложка при прокрутке, уход вверх при спуске, подсветка
 * активного якоря, мобильное меню с ловушкой фокуса) ведёт lib/emerald/nav.js
 * по id `nav` / `burger` / `menu`. React здесь только рисует разметку и не
 * держит своего состояния: два владельца одного DOM-узла — верный способ
 * получить рассинхрон.
 */
export function Header({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const d = getDictionary(lang);
  const c = getEmerald(lang);
  const pathname = usePathname();
  const base = `/${lang}`;

  // «Главная» стоит первой: до неё добирались только через логотип, а это
  // догадка, а не навигация. Пункт карты назван картой — раньше он звался
  // «Проекты» и вёл на 3D-карту, из-за чего список объектов на /projects
  // выглядел как то же самое под другим именем.
  const links = [
    { label: t.nav.home, href: base, match: [] as string[], exact: true },
    { label: t.nav.about, href: `${base}/about`, match: [`${base}/about`] },
    { label: t.nav.map, href: `${base}/map`, match: [`${base}/map`, `${base}/projects`] },
    { label: d.guides.indexEyebrow, href: `${base}/guides`, match: [`${base}/guides`] },
    { label: t.nav.contact, href: `${base}/contact`, match: [`${base}/contact`] },
  ];

  const swapLocale = (l: Locale) =>
    pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${l}`) || `/${l}`;

  const wordmark = (
    <span className="wordmark">
      {Icon.diamond}
      <b>
        {c.brand.name}
        <small>{c.brand.place}</small>
      </b>
    </span>
  );

  return (
    <>
      <header className="nav" id="nav" data-stuck="false">
        <div className="nav__bg" aria-hidden="true" />
        <div className="nav__inner">
          <Link href={base} aria-label={`${c.brand.full} — ${c.ui.toTop}`}>
            {wordmark}
          </Link>

          <nav className="nav__links" aria-label={c.ui.navMain}>
            {links.map((l) => {
              const active = l.exact
                ? pathname === l.href
                : l.match.some((m) => pathname.startsWith(m));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch={linkPrefetch(l.href)}
                  className="nav__link"
                  aria-current={active ? "true" : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="lang" role="group" aria-label={c.brand.full}>
            {locales.map((l) => (
              <Link
                key={l}
                className="lang__item"
                href={swapLocale(l)}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? "true" : undefined}
              >
                {localeShort[l]}
              </Link>
            ))}
          </div>

          <a className="pill" href={whatsappHref(d.common.whatsappPrefill)}>
            {t.nav.contact}
          </a>

          <button
            className="burger"
            type="button"
            id="burger"
            aria-expanded="false"
            aria-controls="menu"
            aria-label={c.ui.menuOpen}
          >
            <span className="burger__bar" />
            <span className="burger__bar" />
          </button>
        </div>
      </header>

      <div className="menu" id="menu" data-open="false" aria-hidden="true">
        <nav aria-label={c.ui.navMobile}>
          <ul className="menu__list">
            {links.map((l, n) => (
              <li className="menu__item" key={l.href}>
                <Link href={l.href} prefetch={linkPrefetch(l.href)} style={{ "--delay": `${120 + n * 65}ms` } as React.CSSProperties}>
                  <span>0{n + 1}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <div className="lang">
            {locales.map((l) => (
              <Link key={l} className="lang__item" href={swapLocale(l)} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined}>
                {localeShort[l]}
              </Link>
            ))}
          </div>
          <a className="btn btn--solid" href={whatsappHref(d.common.whatsappPrefill)}>
            <span>{c.ui.navCta}</span>
          </a>
        </div>
      </div>
    </>
  );
}
