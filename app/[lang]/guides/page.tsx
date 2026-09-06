import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getGuides, siteConfig } from "@/lib/i18n";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { Reveal } from "@/components/Reveal";
import { HeroReveal, HeroHeadline } from "@/components/HeroReveal";

// Индекс гидов: hero + карточки статей в редакционной сетке.

type Params = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const t = getDictionary(lang).guides;
  const url = `${siteConfig.url}/${lang}/guides`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/guides`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru/guides`;
  return {
    title: t.indexTitle,
    description: t.indexSubtitle,
    alternates: { canonical: url, languages },
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

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.indexTitle,
    numberOfItems: guides.length,
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${siteConfig.url}/${lang}/guides/${g.slug}`,
    })),
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="shell pb-14 pt-36">
        <HeroReveal>
          <span className="marker text-gold">{t.indexEyebrow}</span>
        </HeroReveal>
        <HeroHeadline
          text={t.indexTitle}
          delay={100}
          className="mt-5 max-w-[16ch] font-display tracking-monument text-display"
        />
        <HeroReveal delay={400}>
          <p className="mt-7 max-w-[48ch] text-lead text-bone-dim">
            {t.indexSubtitle}
          </p>
        </HeroReveal>
      </section>

      <section className="shell pb-section">
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {guides.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={(i % 2) * 90}>
              <Link href={`/${lang}/guides/${g.slug}`} className="group flex h-full flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-raised">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-slow ease-smooth group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col pt-5">
                  <span className="marker text-gold">{g.category}</span>
                  <h2 className="mt-4 font-display text-title transition-colors duration-micro group-hover:text-gold">
                    {g.title}
                  </h2>
                  <p className="mt-4 text-micro text-bone-dim">{g.description}</p>

                  <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-6 text-eyebrow uppercase tracking-eyebrow text-bone-dim">
                    <span>
                      {t.readingMinutes.replace("{n}", String(g.readingMinutes))}
                    </span>
                    <span aria-hidden="true" className="h-3 w-px bg-bone/20" />
                    {/* Дата в <time> — машиночитаемая, в отличие от голой строки. */}
                    <time dateTime={g.updatedAt}>
                      {t.updatedLabel} {g.updatedAt}
                    </time>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
