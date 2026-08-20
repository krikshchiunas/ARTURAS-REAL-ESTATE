import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getServices, getStats, siteConfig } from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Reveal, HeadlineReveal } from "@/components/Reveal";
import { Odometer } from "@/components/Odometer";
import { BracketButton } from "@/components/BracketButton";
import { SceneBackdrop } from "@/components/webgl/SceneBackdrop";

// About в стиле careers-страницы Hubtown: фиксированный WebGL-фон «путь света»
// через ночной город на всю страницу (прокрутка ведёт камеру по улице), контент
// плывёт поверх — hero, манифест, паспорт, одометры и парящие полупрозрачные
// карточки 001–004 в шахматной раскладке.

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
  const url = `${siteConfig.url}/${lang}/about`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/about`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru/about`;
  return {
    title: c.stubs.about.title,
    description: c.stubs.about.sub,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${c.stubs.about.title} — ${siteConfig.name}`,
      description: c.stubs.about.sub,
      url,
    },
  };
}

const PROCESS_KEYS = ["selection", "analysis", "deal", "management"] as const;

// Шахматная раскладка парящих карточек (desktop), как в референсе.
const CARD_POSITIONS = [
  "md:left-[6%] md:top-[2%]",
  "md:right-[8%] md:top-[24%]",
  "md:left-[14%] md:top-[50%]",
  "md:right-[14%] md:top-[72%]",
] as const;

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const c = chromeDict(lang);
  const t = getDictionary(lang);
  const stats = getStats(lang);
  const services = getServices(lang);
  const process = PROCESS_KEYS.map((k) => services.find((s) => s.key === k)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  return (
    <main className="relative min-h-screen">
      {/* Фон-сцена на всю страницу (фиксированная, под контентом) */}
      <SceneBackdrop scene="about" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="flex min-h-screen flex-col justify-center px-6 md:px-16">
          <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
            {c.stubs.about.chapter}
          </p>
          <HeadlineReveal
            text={c.stubs.about.title}
            className="mt-8 max-w-[12ch] text-54 font-bold uppercase leading-0.9 md:text-120 md:leading-0.8"
          />
          <Reveal delay={0.5}>
            <p className="mt-10 max-w-[34rem] text-16 font-light leading-1.6 text-offwhite/70">
              {c.stubs.about.sub}
            </p>
          </Reveal>
        </section>

        {/* Манифест */}
        <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-36">
          <p className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
            {t.intro.eyebrow}
          </p>
          <Reveal className="mt-10">
            <p className="max-w-[52rem] text-24 font-light leading-1.2 text-offwhite/90 md:text-40">
              {t.intro.manifesto}
            </p>
          </Reveal>
        </section>

        {/* Паспорт данных — полупрозрачные ячейки поверх сцены */}
        <section className="border-t border-offwhite/10 px-6 py-24 md:px-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <HeadlineReveal
              as="h2"
              text={c.about.specTitle}
              className="text-32 font-bold uppercase leading-0.9 md:text-56"
            />
            <span className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
              {c.about.specSubtitle}
            </span>
          </div>
          <Reveal className="mt-12">
            <dl className="grid grid-cols-2 gap-px bg-offwhite/10 md:grid-cols-3">
              {c.about.specs.map(([label, value]) => (
                <div key={label} className="bg-night/70 p-6 backdrop-blur-sm md:p-8">
                  <dt className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
                    {label}
                  </dt>
                  <dd className="mt-4 text-20 font-bold md:text-30">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="text-16 font-light leading-1.6 text-offwhite/70">
                {t.founder.p1}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-16 font-light leading-1.6 text-offwhite/70">
                {t.founder.p2}
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-14" delay={0.1}>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[28rem] font-mono text-11 uppercase leading-1.6 tracking-4 text-offwhite/50">
                {t.founder.note}
              </p>
              <BracketButton href={`/${lang}/contact`}>{c.workCta}</BracketButton>
            </div>
          </Reveal>
        </section>

        {/* Одометры */}
        <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
          <div className="max-w-[36rem]">
            <HeadlineReveal
              as="h2"
              text={t.stats.title}
              className="text-32 font-bold uppercase leading-0.9 md:text-56"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 text-16 font-light leading-1.6 text-offwhite/70">
                {t.stats.body}
              </p>
            </Reveal>
          </div>
          <div className="mt-16">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="flex flex-col gap-4 border-t border-offwhite/10 py-10 md:flex-row md:items-baseline md:justify-between md:py-12">
                  <span className="max-w-[22rem] font-mono text-11 uppercase tracking-4 text-offwhite/50">
                    {String(i + 1).padStart(3, "0")} — {s.label}
                  </span>
                  <Odometer
                    value={s.value}
                    className="font-mono text-56 font-bold text-offwhite md:text-140"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Парящие карточки 001–004 поверх потоков (референс: careers) */}
        <section className="relative border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <HeadlineReveal
              as="h2"
              text={t.services.title}
              className="text-32 font-bold uppercase leading-0.9 md:text-56"
            />
            <span className="font-mono text-11 uppercase tracking-4 text-offwhite/50">
              {c.about.processChapter}
            </span>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[34rem] text-16 font-light leading-1.6 text-offwhite/70">
              {t.services.body}
            </p>
          </Reveal>

          <div className="relative mt-14 flex flex-col gap-8 md:mt-20 md:block md:h-[210vh]">
            {process.map((s, i) => (
              <Reveal
                key={s.key}
                delay={i * 0.06}
                className={`md:absolute md:w-[24rem] ${CARD_POSITIONS[i]}`}
              >
                <div className="border border-offwhite/12 bg-night/45 p-7 backdrop-blur-md transition-colors duration-500 hover:bg-night/65 md:p-8">
                  <div className="flex items-start justify-between">
                    <span className="inline-block h-1.5 w-1.5 bg-offwhite/60" aria-hidden />
                    <span className="font-mono text-10 tracking-4 text-offwhite/50">
                      ■ {String(i + 1).padStart(3, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-24 font-bold uppercase leading-1.1 md:text-30">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-14 font-light leading-1.6 text-offwhite/65">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
