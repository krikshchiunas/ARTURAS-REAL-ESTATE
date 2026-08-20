import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDictionary,
  getGuide,
  siteConfig,
  whatsappHref,
} from "@/lib/i18n";
import { guideMeta } from "@/lib/i18n/meta";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${g.title} — ${siteConfig.name}`,
      description: g.description,
      images: [{ url: g.image }],
      url,
      type: "article",
    },
  };
}

// Простой slugifier для якорей содержания (нужен только для навигации на
// самой странице, не для маршрутизации). Работает для лат/кирил/тайск/нем.
function anchorId(text: string, i: number): string {
  return `section-${i + 1}`;
}

export default async function GuidePage({ params }: Params) {
  const { lang: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const guide = getGuide(lang, slug);
  if (!guide) notFound();

  const t = getDictionary(lang).guides;
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
    <>
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
      <Navbar lang={lang} />
      <main id="main" className="relative pt-28 md:pt-40">
        <div className="shell">
          <Link
            href={`/${lang}/guides`}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors hover:text-bone"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="transition-transform duration-500 ease-glass group-hover:-translate-x-1"
            >
              <path
                d="M11 7H3M6.5 3.5L3 7l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t.backToGuides}
          </Link>

          <header className="mt-10 flex flex-col gap-6 md:mt-14">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{guide.category}</span>
              <span aria-hidden className="text-bone-faint">·</span>
              <span className="text-xs uppercase tracking-[0.18em] text-bone-muted">
                {t.readingMinutes.replace("{n}", String(guide.readingMinutes))}
              </span>
              <span aria-hidden className="text-bone-faint">·</span>
              <span className="text-xs uppercase tracking-[0.18em] text-bone-muted">
                {t.updatedLabel} {guide.updatedAt}
              </span>
            </div>
            <h1 className="max-w-[24ch] font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1] tracking-tight text-balance">
              {guide.title}
            </h1>
            <p className="max-w-prose text-lg text-bone-muted md:text-xl">
              {guide.description}
            </p>
          </header>
        </div>

        <div className="shell mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-core bg-ink-900">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <article className="shell mt-16 md:mt-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Оглавление — только на десктопе, sticky. */}
            <aside className="md:col-span-3">
              <div className="sticky top-32">
                <span className="eyebrow">{t.tableOfContents}</span>
                <ol className="mt-4 flex flex-col gap-3 text-sm text-bone-muted">
                  {guide.sections.map((s, i) => (
                    <li key={anchorId(s.heading, i)}>
                      <a
                        href={`#${anchorId(s.heading, i)}`}
                        className="transition-colors hover:text-bone"
                      >
                        {i + 1}. {s.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#faq"
                      className="transition-colors hover:text-bone"
                    >
                      {guide.sections.length + 1}. {t.faqTitle}
                    </a>
                  </li>
                </ol>
              </div>
            </aside>

            <div className="md:col-span-9 md:col-start-4">
              <p className="text-pretty text-xl font-light leading-relaxed text-bone md:text-2xl">
                {guide.intro}
              </p>

              {guide.sections.map((s, i) => (
                <section
                  key={anchorId(s.heading, i)}
                  id={anchorId(s.heading, i)}
                  className="mt-16 md:mt-20"
                >
                  <h2 className="font-display text-2xl font-light leading-tight tracking-tight text-balance md:text-3xl">
                    {s.heading}
                  </h2>
                  {s.paragraphs?.map((p, pi) => (
                    <p
                      key={pi}
                      className="mt-5 text-pretty text-base leading-relaxed text-bone-muted md:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                  {s.bullets && s.bullets.length > 0 ? (
                    <ul className="mt-6 grid gap-3">
                      {s.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex items-start gap-3 text-bone-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-platinum/60"
                          />
                          <span className="text-[15px] leading-relaxed md:text-base">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section id="faq" className="mt-20 md:mt-28">
                <span className="eyebrow">{t.faqEyebrow}</span>
                <h2 className="mt-4 font-display text-2xl font-light leading-tight tracking-tight text-balance md:text-3xl">
                  {t.faqTitle}
                </h2>
                <dl className="mt-10 flex flex-col">
                  {guide.faq.map((f, fi) => (
                    <div
                      key={fi}
                      className="border-t border-white/[0.07] py-6 first:border-t-0"
                    >
                      <dt className="font-display text-lg font-light leading-snug text-bone md:text-xl">
                        {f.q}
                      </dt>
                      <dd className="mt-3 text-pretty text-bone-muted">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </article>

        <section className="shell mt-20 md:mt-32">
          <div className="relative overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06]">
            <div className="flex flex-col items-stretch gap-8 rounded-core bg-ink-900 p-7 sm:items-start sm:p-10 md:flex-row md:items-center md:justify-between md:p-14">
              <div>
                <h2 className="max-w-[22ch] font-display text-3xl font-light leading-tight tracking-tight text-balance md:text-4xl">
                  {t.ctaTitle}
                </h2>
                <p className="mt-4 max-w-prose text-bone-muted">{t.ctaBody}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <MagneticButton
                  href={whatsappHref(
                    `${getDictionary(lang).common.whatsappPrefill} — ${guide.title}`,
                  )}
                  className="w-full justify-between sm:w-auto"
                >
                  {t.ctaWhatsapp}
                </MagneticButton>
                <MagneticButton
                  href={siteConfig.contacts.telegram}
                  variant="ghost"
                  className="w-full justify-between sm:w-auto"
                >
                  Telegram
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link
        href={`/${lang}/guides`}
        className="glass fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-3 text-xs uppercase tracking-[0.18em] text-bone shadow-bezel md:hidden"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M11 7H3M6.5 3.5L3 7l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t.backToGuides}
      </Link>

      <Footer lang={lang} />
    </>
  );
}
