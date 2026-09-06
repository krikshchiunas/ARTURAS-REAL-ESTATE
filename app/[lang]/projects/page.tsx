import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getProjects, siteConfig } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Reveal } from "@/components/Reveal";
import { HeroReveal, HeroHeadline } from "@/components/HeroReveal";
import { Button } from "@/components/Button";

// Индекс объектов: сетка карточек. Прежний «реестр строк» с проявляющимся
// кадром на hover ушёл вместе со старым дизайном — на телефоне hover не
// существует, и половина объектов там оставалась просто строкой текста.

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
  const base = `/${lang}`;

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
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="shell pb-14 pt-36">
        <HeroReveal>
          <span className="marker text-gold">{c.projectsPage.chapter}</span>
        </HeroReveal>
        <HeroHeadline
          text={c.projectsPage.title}
          delay={100}
          className="mt-5 max-w-[16ch] font-display tracking-monument text-display"
        />
        <HeroReveal delay={400}>
          <p className="mt-7 max-w-[48ch] text-lead text-bone-dim">
            {c.projectsPage.sub}
          </p>
          <div className="mt-9">
            <Button href={`${base}/map`} variant="secondary" arrow>
              {c.mapPage.enterMap}
            </Button>
          </div>
        </HeroReveal>
      </section>

      <section className="shell pb-section">
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 90}>
              <Link href={`${base}/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-raised">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    // Три колонки на десктопе, две на планшете, одна на телефоне —
                    // sizes должен это повторять, иначе браузер тянет лишние пиксели.
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-slow ease-smooth group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                  />
                </div>

                {/* Номер стоял поверх кадра в text-bone-faint. Скрим у карточки
                    поднимается снизу, вверху он прозрачен — над светлым небом
                    (04, 06) цифра пропадала совсем, а на запасной подложке
                    ink-raised давала 4.13:1, ниже AA. Тот же приём, что на
                    главной: номер уходит в подпись под кадр, на сплошной фон,
                    золотом — 8.34:1, и фотография остаётся нетронутой. */}
                <div className="mt-5 flex items-baseline gap-4 border-t border-bone/15 pt-4">
                  <span className="marker tabular text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-title transition-colors duration-micro group-hover:text-gold">
                      {p.name}
                    </h2>
                    <dl className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-micro text-bone-dim">
                      <dt className="sr-only">{c.projectsPage.headers.location}</dt>
                      <dd>{p.location}</dd>
                      <span aria-hidden="true" className="text-bone-faint">
                        ·
                      </span>
                      <dt className="sr-only">{c.projectsPage.headers.type}</dt>
                      <dd>{p.type}</dd>
                    </dl>
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
