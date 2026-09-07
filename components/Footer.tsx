"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, getSocials, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { getEmerald } from "@/lib/emerald/content";
import { linkPrefetch } from "@/lib/prefetch";
import { Btn } from "@/components/emerald/ui";

/** Подвал: гигантский логотип во всю ширину — главный приём изумрудной системы. */
export function Footer({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const d = getDictionary(lang);
  const c = getEmerald(lang);
  const socials = getSocials(lang);
  const pathname = usePathname();

  // Карта — полноэкранный интерактив со своим управлением; подвал под ней лишний.
  if (pathname.startsWith(`/${lang}/map`)) return null;

  const base = `/${lang}`;
  const nav = [
    { label: t.nav.about, href: `${base}/about` },
    { label: t.nav.projects, href: `${base}/map` },
    { label: d.guides.indexEyebrow, href: `${base}/guides` },
    { label: t.nav.contact, href: `${base}/contact` },
  ];

  return (
    <footer className="foot" data-tone="deep">
      <div className="shell">
        <div className="foot__brand" data-reveal="rise">
          <Link className="foot__mark" href={base} aria-label={`${c.brand.full} — ${c.ui.backToTop}`}>
            {c.brand.name}
          </Link>
          <p className="foot__tagline">{d.meta.tagline}</p>
        </div>

        <div className="foot__top">
          <p className="foot__about">
            {c.brand.full} — {c.brand.place}.
          </p>

          <nav className="foot__nav" aria-label={c.ui.footerNav}>
            {nav.map((l) => (
              <Link key={l.href} href={l.href} prefetch={linkPrefetch(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <nav className="foot__nav" aria-label={d.contact.eyebrow}>
            {socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </nav>

          <div className="foot__cta">
            <Btn
              label={c.ui.consultCta}
              href={whatsappHref(d.common.whatsappPrefill)}
              magnetic={false}
            />
          </div>
        </div>

        <div className="foot__bottom">
          <p>{c.footer.colophon}</p>
          <p>
            &copy; {new Date().getFullYear()} {c.brand.full}
          </p>
        </div>
      </div>
    </footer>
  );
}
