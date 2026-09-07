import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDictionary,
  getProjects,
  getProject,
  siteConfig,
  whatsappHref,
} from "@/lib/i18n";
import { projectMeta } from "@/lib/i18n/meta";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/dict";
import { getEmerald } from "@/lib/emerald/content";
import { stripExactFigures } from "@/lib/no-exact-figures";
import { Reveal } from "@/components/Reveal";
import { HeroReveal, HeroHeadline } from "@/components/HeroReveal";
import { Button } from "@/components/Button";

// Карточка объекта: кадр-герой, ключевые цифры, концепция, галерея,
// планировки, расположение, инвестиционная логика и паспорт. Все тексты и
// цифры приходят из локалей — страница только раскладывает их.

type Params = { params: Promise<{ lang: string; slug: string }> };

// Статические страницы под каждый объект и язык (SSG).
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projectMeta.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const p = getProject(lang, slug);
  if (!p) return {};
  const url = `${siteConfig.url}/${lang}/projects/${slug}`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/projects/${slug}`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru/projects/${slug}`;
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${p.name} — ${siteConfig.name}`,
      description: p.summary,
      url,
      images: [{ url: p.image }],
    },
  };
}

// Заголовок раздела: рубрика золотом, под ней антиква.
function SectionHead({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      <div>
        <span className="marker text-gold">{eyebrow}</span>
        <h2 className="mt-4 max-w-[18ch] font-display tracking-monument text-section text-balance">{title}</h2>
      </div>
      {aside ? <span className="eyebrow text-bone-dim">{aside}</span> : null}
    </div>
  );
}

// Ряд «подпись — значение».
function DataRow({
  index,
  label,
  value,
}: {
  index: number;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-bone/10 py-4">
      <div className="flex items-baseline gap-4">
        <span className="tabular text-eyebrow text-gold">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-body text-bone-dim">{label}</span>
      </div>
      <span className="shrink-0 text-right text-micro text-bone">{value}</span>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { lang: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const e = getEmerald(lang);
  const project = getProject(lang, slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const t = dict.project;
  const c = chromeDict(lang);
  const projects = getProjects(lang);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];
  const base = `/${lang}`;

  // Structured data: помогает LLM (ChatGPT, Claude, Perplexity, Gemini) и
  // поисковикам понять, что это конкретный объект недвижимости — с ценой,
  // расположением, застройщиком, набором параметров и удобств.
  const canonicalUrl = `${siteConfig.url}/${lang}/projects/${project.slug}`;
  const absoluteImage = project.image.startsWith("http")
    ? project.image
    : `${siteConfig.url}${project.image}`;
  const absoluteGallery = project.gallery.map((src) =>
    src.startsWith("http") ? src : `${siteConfig.url}${src}`,
  );
  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Product", "Residence"],
    "@id": `${canonicalUrl}#listing`,
    name: project.name,
    description: stripExactFigures(project.summary),
    url: canonicalUrl,
    image: [absoluteImage, ...absoluteGallery],
    category: project.type,
    brand: project.developer
      ? { "@type": "Organization", name: project.developer }
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location,
      addressRegion: "Phuket",
      addressCountry: "TH",
    },
    additionalProperty: [
      ...project.highlights.map((h) => ({
        "@type": "PropertyValue",
        name: h.label,
        value: h.value,
      })),
      ...project.spec.map((s) => ({
        "@type": "PropertyValue",
        name: s.label,
        value: s.value,
      })),
      ...project.units.map((u) => ({
        "@type": "PropertyValue",
        name: u.type,
        value: u.area,
      })),
    ],
    amenityFeature: project.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
    })),
    offers: project.priceFrom
      ? {
          "@type": "Offer",
          priceCurrency: "THB",
          price: project.priceFrom,
          availability: "https://schema.org/InStock",
          url: canonicalUrl,
          seller: {
            "@type": "RealEstateAgent",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
          },
        }
      : undefined,
    isRelatedTo: {
      "@type": "RealEstateAgent",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
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
        name: c.projectsPage.title,
        item: `${siteConfig.url}/${lang}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Герой */}
      <section className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/90 to-transparent"
        />

        <div className="shell relative z-10 pb-16 pt-32">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-eyebrow uppercase tracking-eyebrow text-bone-dim">
              <li>
                {/* Цель под палец: по одной строке текста (15px) промахнуться
                    легче, чем попасть — поэтому min-h, а не голая ссылка. */}
                <Link
                  href={`${base}/projects`}
                  className="inline-flex min-h-[44px] items-center transition-colors duration-micro hover:text-bone"
                >
                  {c.projectsPage.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="tabular text-gold">{number}</li>
            </ol>
          </nav>

          <HeroHeadline
            text={project.name}
            className="mt-5 max-w-[14ch] font-display tracking-monument text-display"
          />

          <HeroReveal delay={380}>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-micro text-bone-dim">
              <span>{project.type}</span>
              <span aria-hidden="true" className="h-3 w-px bg-bone/25" />
              <span>{project.location}</span>
            </div>

            <p className="mt-7 max-w-[48ch] text-lead text-bone/85">
              {stripExactFigures(project.summary)}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                href={whatsappHref(`${dict.common.whatsappPrefill} (${project.name})`)}
                arrow
              >
                {t.learnMore}
              </Button>
              <Button href={`${base}/map/${project.slug}`} variant="secondary">
                {c.projectsPage.openOnMap}
              </Button>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Ключевые цифры */}
      <section className="border-t border-bone/10">
        <dl className="grid grid-cols-2 gap-px bg-bone/10 md:grid-cols-4">
          {project.highlights.map((h) => (
            <div key={h.label} className="bg-ink p-6 md:p-9">
              <dt className="text-eyebrow uppercase tracking-eyebrow text-bone-dim">
                {h.label}
              </dt>
              <dd className="mt-3 font-display text-title text-gold">{h.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Концепция */}
      <section className="border-t border-bone/10">
        <div className="shell grid gap-12 py-section lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t.conceptEyebrow} title={t.conceptTitle} />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-title text-bone">{stripExactFigures(project.concept)}</p>
            </Reveal>
            {project.keyPoints.length ? (
              <Reveal className="mt-10" delay={100}>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {project.keyPoints.map((point, i) => (
                    <li
                      key={point}
                      className="flex items-baseline gap-4 border-t border-bone/10 py-4"
                    >
                      <span className="tabular text-eyebrow text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-micro text-bone-dim">{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* Галерея: первый кадр во всю ширину, дальше — пары */}
      <section className="border-t border-bone/10">
        <div className="shell py-section">
          <SectionHead
            eyebrow={t.galleryEyebrow}
            title={t.galleryTitle}
            aside={String(project.gallery.length).padStart(2, "0")}
          />
        </div>
        <div className="grid gap-px bg-bone/10 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <figure
              key={src}
              className={`relative bg-ink ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div
                className={`relative w-full ${
                  i === 0 ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${project.name} — ${t.galleryAlt.replace("{n}", String(i + 1))}`}
                  fill
                  loading="lazy"
                  sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Планировки + инфраструктура */}
      <section className="border-t border-bone/10">
        <div className="shell grid gap-14 py-section lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow={t.unitsEyebrow} title={t.unitsTitle} />
            <div className="mt-10">
              {project.units.map((u, i) => (
                <DataRow key={u.type} index={i + 1} label={u.type} value={u.area} />
              ))}
            </div>
          </div>
          <div>
            <SectionHead eyebrow={t.amenitiesEyebrow} title={t.amenitiesTitle} />
            <Reveal className="mt-10" delay={80}>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {project.amenities.map((a, i) => (
                  <li
                    key={a}
                    className="flex items-baseline gap-4 border-t border-bone/10 py-4"
                  >
                    <span className="tabular text-eyebrow text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-micro text-bone-dim">{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Расположение */}
      <section className="border-t border-bone/10 bg-ink-soft">
        <div className="shell grid gap-12 py-section lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t.locationEyebrow} title={project.location} />
            <Reveal className="mt-9" delay={100}>
              <Button href={`${base}/map/${project.slug}`} variant="secondary" arrow>
                {c.projectsPage.openOnMap}
              </Button>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            {project.locationPoints.map((p, i) => (
              <DataRow key={p.label} index={i + 1} label={p.label} value={p.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Инвестиционная логика.
          Текст застройщика и график платежей больше не выводятся: там
          попадаются точная доходность по объекту и суммы за метр, а таких
          цифр на сайте быть не должно — они считаются под конкретного
          покупателя. Вместо них прямой призыв спросить их у агента. */}
      <section className="border-t border-bone/10">
        <div className="shell grid gap-12 py-section lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t.investmentEyebrow} title={t.investmentTitle} />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-body text-bone-dim">{e.ui.exactOnRequest}</p>
            </Reveal>
            <Reveal className="mt-9" delay={80}>
              <div className="trust__ask" style={{ marginTop: 0 }}>
                <Button href={`/${lang}/contact`} variant="primary" arrow>
                  {e.ui.askYield}
                </Button>
                <Button href={whatsappHref(`${project.name} — ${e.ui.askYield}`)} variant="secondary">
                  WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Застройщик */}
      {project.developer && project.developerNote ? (
        <section className="border-t border-bone/10">
          <div className="shell grid gap-12 py-section lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead eyebrow={t.developerEyebrow} title={project.developer} />
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-body text-bone-dim">{project.developerNote}</p>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* Паспорт объекта */}
      <section className="border-t border-bone/10">
        <div className="shell pb-12 pt-section">
          <SectionHead eyebrow={t.specEyebrow} title={t.specTitle} />
        </div>
        {/* При нечётном числе параметров последняя ячейка на мобиле растягивается
            на всю строку — иначе в сетке остаётся пустая «дыра». */}
        <dl className="grid grid-cols-2 gap-px border-t border-bone/10 bg-bone/10 max-md:[&>div:last-child:nth-child(odd)]:col-span-2 md:grid-cols-3 lg:grid-cols-5">
          {project.spec.map((s) => (
            <div key={s.label} className="bg-ink p-6 md:p-8">
              <dt className="text-eyebrow uppercase tracking-eyebrow text-bone-dim">
                {s.label}
              </dt>
              <dd className="mt-3 text-micro text-bone">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Финальный CTA */}
      <section className="border-t border-bone/10">
        <div className="shell py-section">
          <h2 className="max-w-[18ch] font-display tracking-monument text-section text-balance">
            {t.ctaTitle.replace("{name}", project.name)}
          </h2>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="measure text-body text-bone-dim">{t.ctaBody}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                href={whatsappHref(`${dict.common.whatsappPrefill} (${project.name})`)}
                size="lg"
                arrow
              >
                {dict.common.whatsapp}
              </Button>
              <Button href={siteConfig.contacts.telegram} variant="secondary" size="lg">
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Навигация по объектам */}
      <nav className="shell flex flex-wrap items-center justify-between gap-6 border-t border-bone/10 py-7">
        <Link
          href={`${base}/projects`}
          className="group inline-flex min-h-[44px] items-center gap-3 text-micro text-bone-dim transition-colors duration-micro hover:text-bone"
        >
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-micro group-hover:-translate-x-1"
          >
            ←
          </span>
          {t.backToProjects}
        </Link>
        {next && next.slug !== project.slug ? (
          <Link
            href={`${base}/projects/${next.slug}`}
            className="group inline-flex min-h-[44px] items-center gap-3 text-right text-micro text-bone-dim transition-colors duration-micro hover:text-bone"
          >
            {c.next} — {next.name}
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
