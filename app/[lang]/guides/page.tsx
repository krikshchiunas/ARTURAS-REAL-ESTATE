import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getGuides, siteConfig } from "@/lib/i18n";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";

type Params = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const t = getDictionary(lang).guides;
  const url = `${siteConfig.url}/${lang}/guides`;
  return {
    title: t.indexTitle,
    description: t.indexSubtitle,
    alternates: { canonical: url },
    openGraph: {
      title: `${t.indexTitle} — ${siteConfig.name}`,
      description: t.indexSubtitle,
      url,
    },
  };
}

export default async function GuidesIndex({ params }: Params) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const t = getDictionary(lang).guides;
  const guides = getGuides(lang);

  return (
    <>
      <Navbar lang={lang} />
      <main id="main" className="relative pt-28 md:pt-40">
        <section className="shell">
          <span className="eyebrow">{t.indexEyebrow}</span>
          <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.02] tracking-tight text-balance">
            {t.indexTitle}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-bone-muted md:text-xl">
            {t.indexSubtitle}
          </p>
        </section>

        <section className="shell mt-16 md:mt-24">
          <ul className="grid gap-6 md:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/${lang}/guides/${g.slug}`}
                  className="group block overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06] transition-colors hover:bg-white/[0.06]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-core bg-ink-900">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-glass group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="eyebrow">{g.category}</span>
                    <h2 className="mt-4 font-display text-2xl font-light leading-tight tracking-tight text-balance md:text-3xl">
                      {g.title}
                    </h2>
                    <p className="mt-4 text-bone-muted">{g.description}</p>
                    <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.14em] text-bone-faint">
                      <span>{t.readingMinutes.replace("{n}", String(g.readingMinutes))}</span>
                      <span aria-hidden>·</span>
                      <span>{t.updatedLabel} {g.updatedAt}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
