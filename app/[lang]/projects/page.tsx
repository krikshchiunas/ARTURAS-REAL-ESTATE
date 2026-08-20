import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getProjects, siteConfig } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Reveal, HeadlineReveal } from "@/components/Reveal";
import { BracketButton } from "@/components/BracketButton";

// Индекс объектов: реестр строк во всю ширину. Кадр проекта проявляется под
// строкой на hover — приём референса, целиком на CSS, без клиентского JS.

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const c = chromeDict(lang);
  const url = `${siteConfig.url}/${lang}/projects`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/projects`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru/projects`;
  return {
    title: c.projectsPage.title,
    description: c.projectsPage.sub,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${c.projectsPage.title} — ${siteConfig.name}`,
      description: c.projectsPage.sub,
      url,
    },
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const c = chromeDict(lang);
  const projects = getProjects(lang);

  // Список объектов для поисковиков и LLM — тот же порядок, что на странице.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.projectsPage.title,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${siteConfig.url}/${lang}/projects/${p.slug}`,
    })),
  };

  return (
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-center px-6 pt-32 md:min-h-[80vh] md:px-16">
        <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {c.projectsPage.chapter}
        </p>
        <HeadlineReveal
          text={c.projectsPage.title}
          className="mt-8 max-w-[12ch] text-54 font-bold uppercase leading-0.9 md:text-120 md:leading-0.8"
        />
        <Reveal delay={0.5}>
          <p className="mt-10 max-w-[36rem] text-16 font-light leading-1.6 text-offwhite/70">
            {c.projectsPage.sub}
          </p>
          <div className="mt-10">
            <BracketButton href={`/${lang}/map`}>
              {c.mapPage.enterMap}
            </BracketButton>
          </div>
        </Reveal>
      </section>

      {/* Шапка реестра (desktop) */}
      <div className="mt-10 hidden grid-cols-12 gap-6 border-t border-offwhite/10 px-6 py-4 font-mono text-10 uppercase tracking-4 text-offwhite/40 md:grid md:px-16">
        <span className="col-span-1">№</span>
        <span className="col-span-5">{c.projectsPage.headers.project}</span>
        <span className="col-span-3">{c.projectsPage.headers.location}</span>
        <span className="col-span-3">{c.projectsPage.headers.type}</span>
      </div>

      {/* Реестр объектов */}
      <div className="border-t border-offwhite/10">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/${lang}/projects/${p.slug}`}
            className="group relative block overflow-hidden border-b border-offwhite/10"
          >
            {/* Кадр объекта проявляется под строкой */}
            <Image
              src={p.image}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover opacity-0 transition-opacity duration-700 ease-smooth group-hover:opacity-25"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-night/0 transition-colors duration-700 group-hover:bg-night/30"
            />

            <div className="relative grid grid-cols-12 items-center gap-x-6 gap-y-2 px-6 py-8 md:px-16 md:py-10">
              <span className="col-span-2 font-mono text-10 tracking-4 text-offwhite/40 md:col-span-1">
                {String(i + 1).padStart(3, "0")}
              </span>
              <h2 className="col-span-10 text-24 font-bold uppercase leading-1.1 transition-transform duration-500 ease-smooth group-hover:translate-x-2 md:col-span-5 md:text-40">
                {p.name}
              </h2>
              <span className="col-span-6 col-start-3 font-mono text-11 uppercase tracking-4 text-offwhite/55 md:col-span-3 md:col-start-auto">
                {p.location}
              </span>
              <span className="col-span-4 font-mono text-11 uppercase tracking-4 text-offwhite/55 md:col-span-2">
                {p.type}
              </span>
              <span
                aria-hidden
                className="col-span-12 hidden justify-self-end font-mono text-14 text-offwhite/40 transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:text-offwhite md:col-span-1 md:block"
              >
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
