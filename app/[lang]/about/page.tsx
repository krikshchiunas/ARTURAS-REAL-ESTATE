import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import {
  founderName,
  getDictionary,
  getServices,
  getStats,
  siteConfig,
  whatsappHref,
} from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { Reveal } from "@/components/Reveal";
import { HeroReveal, HeroHeadline } from "@/components/HeroReveal";
import { Odometer } from "@/components/Odometer";
import { Button } from "@/components/Button";

// «Обо мне»: портрет + манифест + паспорт данных + цифры + процесс.
// Фоновая WebGL-сцена «путь света» удалена вместе со старым дизайном — фон
// здесь держат типографика и воздух, а не третий слой графики.

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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
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
    <main id="main">
      {/* Hero: портрет слева, заявление справа */}
      <section className="shell grid gap-12 pb-section pt-36 lg:grid-cols-12 lg:items-end">
        <HeroReveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-raised">
            <Image
              src="/arturas.jpg"
              alt={founderName(lang)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </HeroReveal>

        <div className="lg:col-span-7">
          <HeroReveal>
            <span className="marker text-gold">{c.stubs.about.chapter}</span>
          </HeroReveal>
          <HeroHeadline
            as="h1"
            text={c.stubs.about.title}
            delay={100}
            className="mt-5 max-w-[16ch] font-display tracking-monument text-display"
          />
          <HeroReveal delay={420}>
            <p className="mt-7 max-w-[46ch] text-lead text-bone-dim">
              {c.stubs.about.sub}
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Манифест */}
      <section className="border-t border-bone/10">
        <div className="shell py-section">
          <Reveal>
            <span className="marker text-gold">{t.intro.eyebrow}</span>
          </Reveal>
          <Reveal delay={100}>
            <p className="measure mt-8 font-display font-display tracking-monument text-section text-balance">
              {t.intro.manifesto}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Паспорт данных */}
      <section className="border-t border-bone/10 bg-ink-soft">
        <div className="shell py-section">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display tracking-monument text-section">{c.about.specTitle}</h2>
            <span className="marker text-gold">{c.about.specSubtitle}</span>
          </div>

          <Reveal className="mt-12">
            {/* Линии рисует просвет фона (gap-px), а не рамки ячеек —
                иначе на стыках они удваиваются. */}
            <dl className="grid grid-cols-2 gap-px bg-bone/10 md:grid-cols-3">
              {c.about.specs.map(([label, value]) => (
                <div key={label} className="bg-ink-soft p-6 md:p-8">
                  <dt className="text-eyebrow uppercase tracking-eyebrow text-bone-dim">
                    {label}
                  </dt>
                  <dd className="mt-3 font-display text-title text-bone">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <p className="text-body text-bone-dim">{t.founder.p1}</p>
            </Reveal>
            <Reveal delay={110}>
              <p className="text-body text-bone-dim">{t.founder.p2}</p>
            </Reveal>
          </div>

          <Reveal className="mt-12" delay={80}>
            <div className="flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[42ch] border-l-2 border-gold pl-5 text-body text-bone">
                {t.founder.note}
              </p>
              <Button href={whatsappHref(t.common.whatsappPrefill)} arrow>
                {c.workCta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Цифры */}
      <section className="border-t border-bone/10">
        <div className="shell py-section">
          <div className="max-w-prose">
            <h2 className="font-display tracking-monument text-section text-balance">{t.stats.title}</h2>
            <Reveal delay={120}>
              <p className="mt-6 text-body text-bone-dim">{t.stats.body}</p>
            </Reveal>
          </div>

          <dl className="mt-14">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="flex flex-col gap-3 border-t border-bone/10 py-8 md:flex-row md:items-baseline md:justify-between md:gap-10">
                  <dt className="flex max-w-[44ch] items-baseline gap-4 text-body text-bone-dim">
                    <span className="tabular text-eyebrow text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.label}
                  </dt>
                  <dd>
                    <Odometer
                      value={s.value}
                      className="shrink-0 font-display text-[clamp(2.5rem,1.8rem+2.6vw,4.5rem)] text-bone"
                    />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Процесс */}
      <section className="border-t border-bone/10 bg-ink-soft">
        <div className="shell py-section">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display tracking-monument text-section">{t.services.title}</h2>
            <span className="marker text-gold">{c.about.processChapter}</span>
          </div>
          <Reveal delay={120}>
            <p className="measure mt-6 text-body text-bone-dim">{t.services.body}</p>
          </Reveal>

          <ol className="mt-14 grid gap-px bg-bone/10 md:grid-cols-2">
            {process.map((s, i) => (
              <li key={s.key} className="bg-ink-soft">
                <Reveal delay={i * 80} className="h-full p-7 md:p-10">
                  <span className="tabular text-eyebrow tracking-eyebrow text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-title">{s.title}</h3>
                  <p className="mt-4 text-body text-bone-dim">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
