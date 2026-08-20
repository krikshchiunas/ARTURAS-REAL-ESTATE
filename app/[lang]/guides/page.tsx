import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getGuides, siteConfig } from "@/lib/i18n";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { Reveal, HeadlineReveal } from "@/components/Reveal";

// Индекс гидов: hero + карточки-плитки в HUD-стиле (прямые углы, mono-подписи,
// кадр статьи как фон, подсвечивающийся на hover).

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
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-center px-6 pt-32 md:min-h-[80vh] md:px-16">
        <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
          {t.indexEyebrow}
        </p>
        <HeadlineReveal
          text={t.indexTitle}
          className="mt-8 max-w-[14ch] text-48 font-bold uppercase leading-0.9 md:text-104 md:leading-0.8"
        />
        <Reveal delay={0.5}>
          <p className="mt-10 max-w-[36rem] text-16 font-light leading-1.6 text-offwhite/70">
            {t.indexSubtitle}
          </p>
        </Reveal>
      </section>

      {/* Плитки статей */}
      <section className="mt-10 border-t border-offwhite/10">
        <ul className="grid gap-px bg-offwhite/10 md:grid-cols-2">
          {guides.map((g, i) => (
            <li key={g.slug} className="bg-night">
              <Link
                href={`/${lang}/guides/${g.slug}`}
                className="group relative flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-70 transition-all duration-700 ease-smooth group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent"
                  />
                  <span className="absolute left-5 top-5 font-mono text-10 tracking-4 text-offwhite/70">
                    ■ {String(i + 1).padStart(3, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-10">
                  <span className="font-mono text-10 uppercase tracking-4 text-offwhite/50">
                    {g.category}
                  </span>
                  <h2 className="mt-5 text-24 font-bold uppercase leading-1.1 transition-transform duration-500 ease-smooth group-hover:translate-x-1 md:text-32">
                    {g.title}
                  </h2>
                  <p className="mt-5 text-14 font-light leading-1.6 text-offwhite/70">
                    {g.description}
                  </p>
                  <div className="mt-auto flex items-center gap-4 pt-8 font-mono text-10 uppercase tracking-4 text-offwhite/40">
                    <span>
                      {t.readingMinutes.replace("{n}", String(g.readingMinutes))}
                    </span>
                    <span className="h-3 w-px bg-offwhite/20" aria-hidden />
                    <span>
                      {t.updatedLabel} {g.updatedAt}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto text-14 text-offwhite/40 transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:text-offwhite"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
