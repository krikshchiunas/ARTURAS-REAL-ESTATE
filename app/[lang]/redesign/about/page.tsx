import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getServices, getStats } from "@/lib/i18n";
import { chromeDict } from "@/components/redesign/dict";
import { Reveal, HeadlineReveal } from "@/components/redesign/Reveal";
import { Odometer } from "@/components/redesign/Odometer";
import { BracketButton } from "@/components/redesign/BracketButton";

// About в структуре референса: hero → манифест → «паспорт компании» →
// одометры → карточки процесса 001–004. Все тексты берутся из существующих
// локализованных словарей старого сайта (founder/stats/services/intro).

export const metadata: Metadata = {
  title: "About",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Карточки процесса: четыре самых сильных сервиса в фиксированном порядке.
const PROCESS_KEYS = ["selection", "analysis", "deal", "management"] as const;

export default function AboutPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  const c = chromeDict(lang);
  const t = getDictionary(lang);
  const stats = getStats(lang);
  const services = getServices(lang);
  const process = PROCESS_KEYS.map((k) => services.find((s) => s.key === k)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  return (
    <main className="min-h-screen">
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

      {/* Паспорт данных */}
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
              <div key={label} className="bg-night p-6 md:p-8">
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
            <BracketButton href={`/${lang}/redesign/contact`}>{c.workCta}</BracketButton>
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

      {/* Процесс 001–004 */}
      <section className="border-t border-offwhite/10 px-6 py-24 md:px-16 md:py-32">
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
        <div className="mt-14 grid gap-px bg-offwhite/10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08} className="bg-night">
              <div className="group flex h-full min-h-[16rem] flex-col justify-between p-6 transition-colors duration-500 hover:bg-night-raised md:p-8">
                <span className="font-mono text-11 tracking-4 text-offwhite/40">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <div>
                  <h3 className="text-20 font-bold uppercase leading-1.1 md:text-24">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-14 font-light leading-1.6 text-offwhite/60">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
