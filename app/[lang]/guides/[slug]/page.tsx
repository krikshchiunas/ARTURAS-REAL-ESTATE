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
import { Reveal, HeadlineReveal } from "@/components/Reveal";
import { BracketButton } from "@/components/BracketButton";

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
    <main id="main" className="relative">
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
      <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-16 md:pb-24">
        <Image
          src={guide.image}
          alt={guide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/30"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-night/80 to-transparent"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-11 uppercase tracking-4 text-offwhite/60">
            <span>{guide.category}</span>
            <span className="h-3 w-px bg-offwhite/25" aria-hidden />
            <span>{t.readingMinutes.replace("{n}", String(guide.readingMinutes))}</span>
            <span className="h-3 w-px bg-offwhite/25" aria-hidden />
            <span>
              {t.updatedLabel} {guide.updatedAt}
            </span>
          </div>
          <HeadlineReveal
            text={guide.title}
            className="mt-7 max-w-[20ch] text-40 font-bold uppercase leading-0.9 md:text-104 md:leading-0.8"
          />
        </div>
      </section>

      {/* Вступление + содержание */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-20 font-light leading-1.2 text-offwhite/90 md:text-32">
                {guide.intro}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
              {t.tableOfContents}
            </p>
            <Reveal className="mt-8" delay={0.1}>
              <ol className="space-y-px">
                {guide.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${anchorId(i)}`}
                      className="group flex items-baseline gap-4 border-b border-offwhite/10 py-3"
                    >
                      <span className="font-mono text-10 tracking-4 text-offwhite/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-14 font-light leading-1.6 text-offwhite/75 transition-colors duration-300 group-hover:text-offwhite">
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
          className="scroll-mt-28 border-t border-offwhite/10 px-6 py-20 md:px-16 md:py-28"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <span className="font-mono text-10 tracking-4 text-offwhite/40">
                ■ {String(i + 1).padStart(3, "0")}
              </span>
              <h2 className="mt-5 max-w-[20ch] text-24 font-bold uppercase leading-1.1 md:text-40">
                {s.heading}
              </h2>
            </div>
            <div className="lg:col-span-7">
              {s.paragraphs?.length ? (
                <Reveal>
                  <div className="space-y-6">
                    {s.paragraphs.map((p) => (
                      <p
                        key={p}
                        className="max-w-[46rem] text-16 font-light leading-1.6 text-offwhite/75 md:text-18"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {s.bullets?.length ? (
                <Reveal className="mt-10" delay={0.08}>
                  <ul>
                    {s.bullets.map((b, bi) => (
                      <li
                        key={b}
                        className="flex items-baseline gap-4 border-t border-offwhite/10 py-4"
                      >
                        <span className="font-mono text-10 tracking-4 text-offwhite/40">
                          {String(bi + 1).padStart(2, "0")}
                        </span>
                        <span className="text-14 font-light leading-1.6 text-offwhite/75">
                          {b}
                        </span>
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
        <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
                {t.faqEyebrow}
              </p>
              <HeadlineReveal
                as="h2"
                text={t.faqTitle}
                className="mt-5 max-w-[16ch] text-32 font-bold uppercase leading-0.9 md:text-56"
              />
            </div>
            <span className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
              {String(guide.faq.length).padStart(2, "0")} —
            </span>
          </div>

          <div className="mt-14">
            {guide.faq.map((f, i) => (
              <details
                key={f.q}
                className="group border-t border-offwhite/10 last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-10 tracking-4 text-offwhite/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-16 font-light leading-1.6 text-offwhite/85 transition-colors duration-300 group-hover:text-offwhite md:text-20">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto shrink-0 font-mono text-16 text-offwhite/40 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[52rem] pb-8 pl-9 text-14 font-light leading-1.6 text-offwhite/70 md:text-16">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <HeadlineReveal
          as="h2"
          text={t.ctaTitle}
          className="max-w-[14ch] text-40 font-bold uppercase leading-0.9 md:text-104 md:leading-0.8"
        />
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[32rem] text-16 font-light leading-1.6 text-offwhite/70">
            {t.ctaBody}
          </p>
          <BracketButton href={whatsappHref(dict.common.whatsappPrefill)}>
            {t.ctaWhatsapp}
          </BracketButton>
        </div>
      </section>

      {/* Навигация по гидам */}
      <nav className="flex flex-wrap items-center justify-between gap-6 border-t border-offwhite/10 px-6 py-8 md:px-16">
        <Link
          href={`/${lang}/guides`}
          className="group font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
        >
          <span
            aria-hidden
            className="mr-3 inline-block transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          {t.backToGuides}
        </Link>
        {next && next.slug !== guide.slug ? (
          <Link
            href={`/${lang}/guides/${next.slug}`}
            className="group max-w-[60%] text-right font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
          >
            {c.next} — {next.title}
            <span
              aria-hidden
              className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
