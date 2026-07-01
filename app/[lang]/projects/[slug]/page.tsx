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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Params = { params: { lang: string; slug: string } };

// Статические страницы под каждый объект и язык (SSG).
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projectMeta.map((p) => ({ lang, slug: p.slug })),
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "ru";
  const p = getProject(lang, params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    openGraph: {
      title: `${p.name} — ${siteConfig.name}`,
      description: p.summary,
      images: [{ url: p.image }],
    },
  };
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="max-w-[20ch] font-display text-3xl font-light leading-[1.05] tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function ProjectPage({ params }: Params) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  const project = getProject(lang, params.slug);
  if (!project) notFound();

  const t = getDictionary(lang).project;
  const projects = getProjects(lang);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");

  return (
    <>
      <Navbar lang={lang} />
      <main id="main" className="relative pt-28 md:pt-40">
        {/* Шапка */}
        <div className="shell">
          <Link
            href={`/${lang}#projects`}
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
            {t.backToProjects}
          </Link>

          <header className="mt-10 flex flex-col gap-6 md:mt-14">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-platinum">{number}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-bone-muted">
                {project.type}
              </span>
            </div>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[0.98] tracking-tight text-balance">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="text-lg text-bone-muted">
                {project.location}
                {project.developer ? ` · ${project.developer}` : ""}
              </p>
              {project.priceFrom ? (
                <span className="font-display text-2xl font-light text-platinum-soft">
                  {project.priceFrom}
                </span>
              ) : null}
            </div>
          </header>
        </div>

        {/* Крупный кадр */}
        <div className="shell mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-core bg-ink-900 md:aspect-[16/10]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Ключевые цифры */}
        <div className="shell mt-12 md:mt-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-bezel bg-white/[0.06] ring-1 ring-white/[0.06] md:grid-cols-4">
            {project.highlights.map((h) => (
              <div key={h.label} className="bg-ink-900 p-6 md:p-8">
                <dt className="text-xs uppercase tracking-[0.14em] text-bone-faint">
                  {h.label}
                </dt>
                <dd className="mt-3 font-display text-2xl font-light text-bone md:text-3xl">
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Концепция + CTA */}
        <section className="shell mt-16 md:mt-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Heading eyebrow={t.conceptEyebrow} title={t.conceptTitle} />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="text-pretty text-xl font-light leading-relaxed text-bone md:text-2xl">
                {project.concept}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <MagneticButton
                  href={whatsappHref(
                    `${getDictionary(lang).common.whatsappPrefill} (${project.name})`,
                  )}
                  className="w-full justify-between sm:w-auto"
                >
                  {t.learnMore}
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

        {/* Галерея. На телефоне — горизонтальная лента со свайпом (как витрина
            проектов на главной): вертикальный скролл страницы не «съедается»
            десятком фото подряд. На десктопе — прежняя сетка. */}
        <section className="shell mt-16 md:mt-28">
          <Heading eyebrow={t.galleryEyebrow} title={t.galleryTitle} />
          <div className="-mx-[var(--shell-px)] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-pl-[var(--shell-px)] px-[var(--shell-px)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
            {project.gallery.map((src, i) => (
              <div
                key={src}
                className={`relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-core bg-ink-900 ring-1 ring-white/[0.06] md:w-auto md:shrink md:snap-none ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] w-full ${
                    i === 0 ? "md:aspect-[16/9]" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.name} — ${t.galleryAlt.replace(
                      "{n}",
                      String(i + 1),
                    )}`}
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 78vw, 100vw" : "(max-width: 768px) 78vw, 50vw"}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Планировки */}
        <section className="shell mt-16 md:mt-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Heading eyebrow={t.unitsEyebrow} title={t.unitsTitle} />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <dl className="flex flex-col">
                {project.units.map((u) => (
                  <div
                    key={u.type}
                    className="flex items-baseline justify-between gap-6 border-t border-white/[0.07] py-5 first:border-t-0"
                  >
                    <dt className="text-base text-bone">{u.type}</dt>
                    <dd className="text-right font-mono text-sm text-bone-muted">
                      {u.area}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Инфраструктура */}
        <section className="shell mt-16 md:mt-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Heading eyebrow={t.amenitiesEyebrow} title={t.amenitiesTitle} />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {project.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-bone-muted">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-platinum/60"
                    />
                    <span className="text-[15px] leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Расположение */}
        <section className="shell mt-16 md:mt-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Heading eyebrow={t.locationEyebrow} title={project.location} />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <dl className="flex flex-col">
                {project.locationPoints.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-baseline justify-between gap-6 border-t border-white/[0.07] py-5 first:border-t-0"
                  >
                    <dt className="text-base text-bone-muted">{p.label}</dt>
                    <dd className="text-right text-base text-bone">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Застройщик */}
        {project.developer && project.developerNote ? (
          <section className="shell mt-16 md:mt-28">
            <div className="grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4">
                <Heading eyebrow={t.developerEyebrow} title={project.developer} />
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="text-pretty text-lg leading-relaxed text-bone-muted">
                  {project.developerNote}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {/* Ключевые параметры */}
        <section className="shell mt-16 md:mt-28">
          <Heading eyebrow={t.specEyebrow} title={t.specTitle} />
          {/* При нечётном числе параметров последняя ячейка на мобиле растягивается
              на всю строку — иначе в сетке остаётся пустая «дыра». */}
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-bezel bg-white/[0.06] ring-1 ring-white/[0.06] max-md:[&>div:last-child:nth-child(odd)]:col-span-2 md:grid-cols-3 lg:grid-cols-5">
            {project.spec.map((s) => (
              <div key={s.label} className="bg-ink-900 p-6">
                <dt className="text-xs uppercase tracking-[0.14em] text-bone-faint">
                  {s.label}
                </dt>
                <dd className="mt-3 text-base text-bone">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Финальный CTA */}
        <section className="shell mt-20 md:mt-32">
          <div className="relative overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06]">
            <div className="flex flex-col items-stretch gap-8 rounded-core bg-ink-900 p-7 sm:items-start sm:p-10 md:flex-row md:items-center md:justify-between md:p-14">
              <div>
                <h2 className="max-w-[18ch] font-display text-3xl font-light leading-tight tracking-tight text-balance md:text-4xl">
                  {t.ctaTitle.replace("{name}", project.name)}
                </h2>
                <p className="mt-4 max-w-prose text-bone-muted">{t.ctaBody}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <MagneticButton
                  href={whatsappHref(
                    `${getDictionary(lang).common.whatsappPrefill} (${project.name})`,
                  )}
                  className="w-full justify-between sm:w-auto"
                >
                  {getDictionary(lang).common.whatsapp}
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

      {/* Плавающая кнопка возврата (только телефон): всегда на виду, чтобы
          из любого места страницы вернуться к проектам без скролла наверх. */}
      <Link
        href={`/${lang}#projects`}
        className="glass fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-3 text-xs uppercase tracking-[0.18em] text-bone shadow-bezel md:hidden"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
        >
          <path
            d="M11 7H3M6.5 3.5L3 7l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t.backToProjects}
      </Link>

      <Footer lang={lang} />
    </>
  );
}
