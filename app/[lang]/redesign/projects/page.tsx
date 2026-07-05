import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getProjects } from "@/lib/i18n";
import { chromeDict } from "@/components/redesign/dict";
import { regionOf } from "@/components/redesign/map/phuketGeo";
import { Reveal, HeadlineReveal } from "@/components/redesign/Reveal";
import { BracketButton } from "@/components/redesign/BracketButton";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Список проектов редизайна: hero + CTA на карту + сетка карточек-строк с
// нумерацией и наведением. Каждая карточка ведёт на карту с открытым оверлеем.
export default function ProjectsPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  const c = chromeDict(lang);
  const projects = getProjects(lang);

  return (
    <main className="min-h-screen">
      <section className="flex min-h-[70vh] flex-col justify-center px-6 pt-28 md:px-16">
        <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {c.projectsPage.chapter}
        </p>
        <HeadlineReveal
          text={c.projectsPage.title}
          className="mt-8 max-w-[14ch] text-54 font-bold uppercase leading-0.9 md:text-120 md:leading-0.8"
        />
        <Reveal delay={0.5}>
          <p className="mt-10 max-w-[38rem] text-16 font-light leading-1.6 text-offwhite/70">
            {c.projectsPage.sub}
          </p>
        </Reveal>
        <Reveal delay={0.6} className="mt-10">
          <BracketButton href={`/${lang}/redesign/map`}>{c.projectsPage.openOnMap}</BracketButton>
        </Reveal>
      </section>

      <section className="border-t border-offwhite/10 px-6 py-20 md:px-16">
        {/* Заголовки таблицы (desktop) */}
        <div className="hidden grid-cols-12 gap-6 border-b border-offwhite/10 pb-4 md:grid">
          <span className="col-span-1 font-mono text-10 uppercase tracking-4 text-offwhite/40">№</span>
          <span className="col-span-5 font-mono text-10 uppercase tracking-4 text-offwhite/40">
            {c.projectsPage.headers.project}
          </span>
          <span className="col-span-4 font-mono text-10 uppercase tracking-4 text-offwhite/40">
            {c.projectsPage.headers.location}
          </span>
          <span className="col-span-2 font-mono text-10 uppercase tracking-4 text-offwhite/40">
            {c.projectsPage.headers.type}
          </span>
        </div>

        <ul>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/${lang}/redesign/map/${p.slug}`}
                data-cursor
                className="group grid grid-cols-2 items-center gap-4 border-b border-offwhite/10 py-5 md:grid-cols-12 md:gap-6 md:py-6"
              >
                <span className="order-1 col-span-1 font-mono text-10 tracking-4 text-offwhite/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="order-3 col-span-2 md:order-2 md:col-span-5">
                  <span className="flex items-center gap-4">
                    <span className="relative hidden h-12 w-16 shrink-0 overflow-hidden md:block">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="64px"
                        className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    </span>
                    <span className="text-24 font-bold uppercase leading-1.1 text-offwhite transition-colors duration-300 md:text-32">
                      {p.name}
                    </span>
                  </span>
                </span>
                <span className="order-2 col-span-1 font-mono text-11 uppercase tracking-4 text-offwhite/50 md:order-3 md:col-span-4">
                  {p.location}
                </span>
                <span className="order-4 col-span-1 flex items-center justify-between font-mono text-11 uppercase tracking-4 text-offwhite/50 md:col-span-2">
                  {p.type}
                  <span
                    aria-hidden
                    className="hidden text-offwhite/30 transition-transform duration-300 group-hover:translate-x-1 md:inline"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
