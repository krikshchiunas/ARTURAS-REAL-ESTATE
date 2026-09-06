import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDictionary,
  getGuide,
  getGuides,
  siteConfig,
  whatsappHref,
} from "@/lib/i18n";
import { guideMeta } from "@/lib/i18n/meta";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/dict";
import { Reveal } from "@/components/Reveal";
import { HeroReveal, HeroHeadline } from "@/components/HeroReveal";
import { Button } from "@/components/Button";

// Статья-гид: полноэкранный кадр-герой, содержание с mono-нумерацией,
// пронумерованные разделы и FAQ на нативных <details> (работает без JS).

type Params = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    guideMeta.map((g) => ({ lang, slug: g.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const g = getGuide(lang, slug);
  if (!g) return {};
  const url = `${siteConfig.url}/${lang}/guides/${g.slug}`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/guides/${g.slug}`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${g.title} — ${siteConfig.name}`,
      description: g.description,
      images: [{ url: g.image }],
      url,
      type: "article",
    },
  };
}

// Якоря содержания нужны только для навигации внутри страницы, не для
// маршрутизации — поэтому порядковый номер, а не транслитерация заголовка.
function anchorId(i: number): string {
  return `section-${i + 1}`;
}

export default async function GuidePage({ params }: Params) {
  const { lang: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const guide = getGuide(lang, slug);
  if (!guide) notFound();

  const dict = getDictionary(lang);
  const t = dict.guides;
  const c = chromeDict(lang);
  const guides = getGuides(lang);
  const index = guides.findIndex((g) => g.slug === guide.slug);
  const next = guides[(index + 1) % guides.length];

  const canonicalUrl = `${siteConfig.url}/${lang}/guides/${guide.slug}`;
  const absoluteImage = guide.image.startsWith("http")
    ? guide.image
    : `${siteConfig.url}${guide.image}`;

  // Основная сборка текста статьи в один HTML-подобный body для articleBody:
  // LLM охотнее цитируют статьи, где articleBody содержит полный текст.
  const articleBody = [
    guide.intro,
    ...guide.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
    ]),
  ].join("\n\n");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: guide.title,
    description: guide.description,
    inLanguage: lang,
    url: canonicalUrl,
    image: [absoluteImage],
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Person",
      name: siteConfig.founder,
      url: `${siteConfig.url}/${lang}`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/hero-poster.jpg`,
      },
    },
    mainEntityOfPage: canonicalUrl,
    articleSection: guide.category,
    keywords: [
      "Phuket real estate",
      "buying property in Thailand",
      "foreign buyer Thailand",
      "freehold leasehold Thailand",
      "off-plan Phuket",
      "rental yield Phuket",
    ],
    wordCount: articleBody.split(/\s+/).length,
    articleBody,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: `${siteConfig.url}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.indexEyebrow,
        item: `${siteConfig.url}/${lang}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Герой */}
      <section className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/90 to-transparent"
        />

        <div className="shell relative z-10 pb-16 pt-32">
          <span className="marker text-gold">{guide.category}</span>
          <HeroHeadline
            text={guide.title}
            delay={100}
            className="mt-5 max-w-[20ch] font-display tracking-monument text-display"
          />
          <HeroReveal delay={420}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-micro text-bone-dim">
              <span>{t.readingMinutes.replace("{n}", String(guide.readingMinutes))}</span>
              <span aria-hidden="true" className="h-3 w-px bg-bone/25" />
              <time dateTime={guide.updatedAt}>
                {t.updatedLabel} {guide.updatedAt}
              </time>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Вступление + содержание */}
      <section className="border-t border-bone/10">
        <div className="shell grid gap-14 py-section lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-title text-bone">{guide.intro}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="marker text-gold">{t.tableOfContents}</span>
            <Reveal className="mt-6" delay={100}>
              <ol>
                {guide.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${anchorId(i)}`}
                      className="group flex min-h-[44px] items-center gap-4 border-b border-bone/10 py-2"
                    >
                      <span className="tabular text-eyebrow text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-micro text-bone-dim transition-colors duration-micro group-hover:text-bone">
                        {s.heading}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Разделы статьи */}
      {guide.sections.map((s, i) => (
        <section
          key={s.heading}
          id={anchorId(i)}
          className="scroll-mt-24 border-t border-bone/10"
        >
          <div className="shell grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
            <div className="lg:col-span-5">
              <span className="tabular text-eyebrow tracking-eyebrow text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 max-w-[20ch] font-display tracking-monument text-section text-balance">
                {s.heading}
              </h2>
            </div>
            <div className="lg:col-span-7">
              {s.paragraphs?.length ? (
                <Reveal>
                  <div className="space-y-5">
                    {s.paragraphs.map((p) => (
                      <p key={p} className="measure text-body text-bone-dim">
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {s.bullets?.length ? (
                <Reveal className="mt-9" delay={80}>
                  <ul>
                    {s.bullets.map((b, bi) => (
                      <li
                        key={b}
                        className="flex items-baseline gap-4 border-t border-bone/10 py-4"
                      >
                        <span className="tabular text-eyebrow text-gold">
                          {String(bi + 1).padStart(2, "0")}
                        </span>
                        <span className="text-micro text-bone-dim">{b}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ — нативные details, раскрываются без JS */}
      {guide.faq.length ? (
        <section className="border-t border-bone/10 bg-ink-soft">
          <div className="shell py-section">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="marker text-gold">{t.faqEyebrow}</span>
                <h2 className="mt-4 max-w-[16ch] font-display tracking-monument text-section text-balance">
                  {t.faqTitle}
                </h2>
              </div>
              <span className="eyebrow text-bone-dim">
                {String(guide.faq.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-12">
              {guide.faq.map((f, i) => (
                <details key={f.q} className="group border-t border-bone/10 last:border-b">
                  <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="tabular text-eyebrow text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-bone transition-colors duration-micro group-hover:text-gold">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-lead text-bone-dim transition-transform duration-base ease-smooth group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="measure pb-7 pl-9 text-body text-bone-dim">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="border-t border-bone/10">
        <div className="shell py-section">
          <h2 className="max-w-[16ch] font-display tracking-monument text-section text-balance">{t.ctaTitle}</h2>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="measure text-body text-bone-dim">{t.ctaBody}</p>
            <Button href={whatsappHref(dict.common.whatsappPrefill)} size="lg" arrow>
              {t.ctaWhatsapp}
            </Button>
          </div>
        </div>
      </section>

      {/* Навигация по гидам */}
      <nav className="shell flex flex-wrap items-center justify-between gap-6 border-t border-bone/10 py-7">
        <Link
          href={`/${lang}/guides`}
          className="group inline-flex min-h-[44px] items-center gap-3 text-micro text-bone-dim transition-colors duration-micro hover:text-bone"
        >
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-micro group-hover:-translate-x-1"
          >
            ←
          </span>
          {t.backToGuides}
        </Link>
        {next && next.slug !== guide.slug ? (
          <Link
            href={`/${lang}/guides/${next.slug}`}
            className="group inline-flex min-h-[44px] max-w-[60%] items-center gap-3 text-right text-micro text-bone-dim transition-colors duration-micro hover:text-bone"
          >
            {c.next} — {next.title}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-micro group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
