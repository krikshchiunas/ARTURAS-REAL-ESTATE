"use client";

import Link from "next/link";
import { linkPrefetch } from "@/lib/prefetch";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, getSocials, whatsappHref } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Button } from "@/components/Button";

export function Footer({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const d = getDictionary(lang);
  const socials = getSocials(lang);
  const pathname = usePathname();

  // Карта — полноэкранный интерактивный режим со своим управлением; футер под
  // ней лишний и мешает жестам.
  if (pathname.startsWith(`/${lang}/map`)) return null;

  const base = `/${lang}`;
  // Карточка объекта и статья-гид заканчиваются собственным призывом. Общий
  // CTA встал бы сразу под ним — два больших блока подряд.
  const ownCta = new RegExp(`^/${lang}/(projects|guides)/[^/]+`).test(pathname);

  const nav = [
    { label: t.nav.about, href: `${base}/about` },
    { label: t.nav.projects, href: `${base}/map` },
    { label: d.guides.indexEyebrow, href: `${base}/guides` },
    { label: t.nav.contact, href: `${base}/contact` },
  ];

  return (
    <footer className="relative z-20 border-t border-bone/10 bg-ink">
      {!ownCta && (
        <div className="shell py-section">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">{d.contact.eyebrow}</p>
              <h2 className="mt-5 font-display text-section tracking-monument text-balance">
                {t.workTitle}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="measure text-body text-bone-dim">{t.workBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={whatsappHref(d.common.whatsappPrefill)}
                  variant="primary"
                  size="lg"
                  arrow
                >
                  {t.workCta}
                </Button>
                <Button href={`${base}/contact`} variant="secondary" size="lg">
                  {t.nav.contact}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="shell grid gap-10 border-t border-bone/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-title text-bone">Arturas</span>
          <p className="mt-3 max-w-[22rem] text-micro text-bone-dim">
            {d.meta.tagline}
          </p>
        </div>

        <nav aria-label={d.a11y.footerNav}>
          <span className="eyebrow">{t.nav.about}</span>
          <ul className="mt-4 space-y-1">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  prefetch={linkPrefetch(l.href)}
                  className="flex min-h-[44px] items-center text-micro text-bone-dim transition-colors duration-micro hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-2">
          <span className="eyebrow">{t.links}</span>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[44px] items-center gap-2 text-micro text-bone-dim transition-colors duration-micro hover:text-bone"
                >
                  {s.label}
                  <span
                    aria-hidden="true"
                    className="text-bone-faint transition-transform duration-micro group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 py-6">
        <span className="text-micro text-bone-dim">
          © {new Date().getFullYear()} Arturas Real Estate · {t.rights}
        </span>
        <span className="text-micro text-bone-dim">Phuket, Thailand</span>
      </div>
    </footer>
  );
}
