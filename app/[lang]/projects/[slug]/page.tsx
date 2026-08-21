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
import { Reveal, HeadlineReveal } from "@/components/Reveal";
import { BracketButton } from "@/components/BracketButton";

// Карточка объекта в языке сайта: полноэкранный кадр-герой с наложенным
// названием, ряды данных gap-px и лента галереи. Все цифры и тексты приходят
// из локалей — страница только раскладывает их по HUD-сетке.

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

// Заголовок раздела: mono-подпись слева, гигантский uppercase под ней.
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
        <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {eyebrow}
        </p>
        <HeadlineReveal
          as="h2"
          text={title}
          className="mt-5 max-w-[18ch] text-32 font-bold uppercase leading-0.9 md:text-56"
        />
      </div>
      {aside ? (
        <span className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {aside}
        </span>
      ) : null}
    </div>
  );
}

// Ряд «подпись — значение» с mono-нумерацией, общий приём страниц сайта.
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
    <div className="flex items-baseline justify-between gap-6 border-t border-offwhite/10 py-5">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-10 tracking-4 text-offwhite/40">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-16 font-light text-offwhite/80">{label}</span>
      </div>
      <span className="text-right font-mono text-13 uppercase tracking-2 text-offwhite">
        {value}
      </span>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { lang: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const project = getProject(lang, slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const t = dict.project;
  const c = chromeDict(lang);
  const projects = getProjects(lang);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];

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
    description: project.summary,
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
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Герой: кадр объекта на весь экран, название поверх затемнения */}
      <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-16 md:pb-24">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Двойное затемнение: снизу под текст, сверху под шапку */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/25"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-night/80 to-transparent"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-11 uppercase tracking-4 text-offwhite/60">
            <span>{number}</span>
            <span className="h-3 w-px bg-offwhite/25" aria-hidden />
            <span>{project.type}</span>
            <span className="h-3 w-px bg-offwhite/25" aria-hidden />
            <span>{project.location}</span>
          </div>

          <HeadlineReveal
            text={project.name}
            className="mt-7 max-w-[14ch] text-54 font-bold uppercase leading-0.9 md:text-120 md:leading-0.8"
          />

          <Reveal delay={0.45}>
            <p className="mt-8 max-w-[38rem] text-16 font-light leading-1.6 text-offwhite/75">
              {project.summary}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <BracketButton
                href={whatsappHref(`${dict.common.whatsappPrefill} (${project.name})`)}
              >
                {t.learnMore}
              </BracketButton>
              <Link
                href={`/${lang}/map/${project.slug}`}
                className="group inline-flex min-h-[44px] items-center font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
              >
                {c.projectsPage.openOnMap}
                <span
                  aria-hidden
                  className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ключевые цифры */}
      <section className="border-t border-offwhite/10">
        <dl className="grid grid-cols-2 gap-px bg-offwhite/10 md:grid-cols-4">
          {project.highlights.map((h) => (
            <div key={h.label} className="bg-night p-6 md:p-10">
              <dt className="font-mono text-10 uppercase tracking-4 text-offwhite/50">
                {h.label}
              </dt>
              <dd className="mt-4 text-24 font-bold uppercase leading-1.1 md:text-40">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Концепция */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t.conceptEyebrow} title={t.conceptTitle} />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-20 font-light leading-1.2 text-offwhite/90 md:text-32">
                {project.concept}
              </p>
            </Reveal>
            {project.keyPoints.length ? (
              <Reveal className="mt-12" delay={0.1}>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {project.keyPoints.map((point, i) => (
                    <li
                      key={point}
                      className="flex items-baseline gap-4 border-t border-offwhite/10 py-4"
                    >
                      <span className="font-mono text-10 tracking-4 text-offwhite/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-14 font-light leading-1.6 text-offwhite/75">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* Галерея: первый кадр во всю ширину, дальше — пары */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <SectionHead
          eyebrow={t.galleryEyebrow}
          title={t.galleryTitle}
          aside={`${String(project.gallery.length).padStart(2, "0")} —`}
        />
        <div className="mt-14 grid gap-px bg-offwhite/10 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <figure
              key={src}
              className={`relative bg-night ${i === 0 ? "md:col-span-2" : ""}`}
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
                  sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  className="object-cover"
                />
              </div>
              <figcaption className="pointer-events-none absolute left-4 top-4 font-mono text-10 tracking-4 text-offwhite/70 mix-blend-difference">
                ■ {String(i + 1).padStart(3, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Планировки + инфраструктура */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow={t.unitsEyebrow} title={t.unitsTitle} />
            <div className="mt-12">
              {project.units.map((u, i) => (
                <DataRow key={u.type} index={i + 1} label={u.type} value={u.area} />
              ))}
            </div>
          </div>
          <div>
            <SectionHead eyebrow={t.amenitiesEyebrow} title={t.amenitiesTitle} />
            <Reveal className="mt-12" delay={0.08}>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {project.amenities.map((a, i) => (
                  <li
                    key={a}
                    className="flex items-baseline gap-4 border-t border-offwhite/10 py-4"
                  >
                    <span className="font-mono text-10 tracking-4 text-offwhite/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-14 font-light leading-1.6 text-offwhite/75">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Расположение */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t.locationEyebrow} title={project.location} />
            <Reveal className="mt-10" delay={0.1}>
              <BracketButton href={`/${lang}/map/${project.slug}`}>
                {c.projectsPage.openOnMap}
              </BracketButton>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            {project.locationPoints.map((p, i) => (
              <DataRow key={p.label} index={i + 1} label={p.label} value={p.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Инвестиционная логика */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t.investmentEyebrow} title={t.investmentTitle} />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-16 font-light leading-1.6 text-offwhite/75 md:text-18">
                {project.investment}
              </p>
            </Reveal>
            {project.payment ? (
              <Reveal className="mt-10" delay={0.08}>
                <div className="border border-offwhite/12 bg-night-raised/40 p-6 backdrop-blur-sm md:p-8">
                  <p className="font-mono text-10 uppercase tracking-4 text-offwhite/50">
                    {t.paymentLabel}
                  </p>
                  <p className="mt-4 text-16 font-light leading-1.6 text-offwhite/85">
                    {project.payment}
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* Застройщик */}
      {project.developer && project.developerNote ? (
        <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHead
                eyebrow={t.developerEyebrow}
                title={project.developer}
              />
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-16 font-light leading-1.6 text-offwhite/75 md:text-18">
                  {project.developerNote}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* Паспорт объекта */}
      <section className="border-t border-offwhite/10 px-6 pt-24 md:px-16 md:pt-32">
        <SectionHead eyebrow={t.specEyebrow} title={t.specTitle} />
      </section>
      <section className="mt-14 border-t border-offwhite/10">
        {/* При нечётном числе параметров последняя ячейка на мобиле растягивается
            на всю строку — иначе в сетке остаётся пустая «дыра». */}
        <dl className="grid grid-cols-2 gap-px bg-offwhite/10 max-md:[&>div:last-child:nth-child(odd)]:col-span-2 md:grid-cols-3 lg:grid-cols-5">
          {project.spec.map((s) => (
            <div key={s.label} className="bg-night p-6 md:p-8">
              <dt className="font-mono text-10 uppercase tracking-4 text-offwhite/50">
                {s.label}
              </dt>
              <dd className="mt-4 text-16 font-light leading-1.6 text-offwhite/85">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Финальный CTA */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
        <HeadlineReveal
          as="h2"
          text={t.ctaTitle.replace("{name}", project.name)}
          className="max-w-[16ch] text-40 font-bold uppercase leading-0.9 md:text-104 md:leading-0.8"
        />
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[32rem] text-16 font-light leading-1.6 text-offwhite/70">
            {t.ctaBody}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <BracketButton
              href={whatsappHref(`${dict.common.whatsappPrefill} (${project.name})`)}
            >
              {dict.common.whatsapp}
            </BracketButton>
            <a
              href={siteConfig.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
            >
              Telegram
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Навигация по объектам: назад к списку и следующий проект */}
      <nav className="flex flex-wrap items-center justify-between gap-6 border-t border-offwhite/10 px-6 py-8 md:px-16">
        <Link
          href={`/${lang}/projects`}
          className="group inline-flex min-h-[44px] items-center font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
        >
          <span
            aria-hidden
            className="mr-3 inline-block transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          {t.backToProjects}
        </Link>
        {next && next.slug !== project.slug ? (
          <Link
            href={`/${lang}/projects/${next.slug}`}
            className="group inline-flex min-h-[44px] items-center justify-end text-right font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
          >
            {c.next} — {next.name}
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
