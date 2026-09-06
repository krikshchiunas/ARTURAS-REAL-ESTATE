import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import {
  founderName,
  getDictionary,
  getProjects,
  getStats,
  siteConfig,
  whatsappHref,
} from "@/lib/i18n";
import { chromeDict } from "@/components/dict";
import { HeroVideo } from "@/components/HeroVideo";
import { Reveal } from "@/components/Reveal";
import { HeroReveal, HeroHeadline } from "@/components/HeroReveal";
import { Odometer } from "@/components/Odometer";
import { Button } from "@/components/Button";

// Главная. Композиция ведётся по «Analog Meditation × Geometric Silence»:
// кадр доминирует, воздуха много, текста мало, иерархию держат разница
// кеглей и клинические метки-маркеры, а не пять оттенков серого.
//
// Ключевая инверсия в герое: возражение («не делает за день») сказано тихо
// гротеском, обещание («делает через 10 лет») — крупно ар-деко. Так фраза
// читается как одна мысль с ударением, а не как два одинаковых заголовка.

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
  const t = getDictionary(lang).meta;
  const url = `${siteConfig.url}/${lang}`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru`;
  return {
    title: t.homeTitle,
    description: t.description,
    alternates: { canonical: url, languages },
  };
}

// Координаты острова — «reference marker». Дисциплина, которую подсказывает
// система: маленькая точная деталь, намекающая на измеримость.
const COORDS = "7°53′N 98°23′E";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const d = getDictionary(lang);
  const c = chromeDict(lang);
  const stats = getStats(lang);
  const allProjects = getProjects(lang);
  const projects = allProjects.slice(0, 3);
  const base = `/${lang}`;

  return (
    <main id="main">
      {/* ─────────────────────────── Герой ─────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <HeroVideo
          poster="/hero/hero-poster.jpg"
          srcDesktop="/hero/hero-1920.mp4"
          srcMobile="/hero/hero-1280.mp4"
          label={d.meta.tagline}
        />

        {/* Метки вынесены вниз, к линии кадра. Наверху они лежали бы на голом
            небе: там 1.3:1, а тянуть ради двух подписей затемнение на всё небо
            значит снова похоронить ролик. Внизу опора уже есть — и верх кадра
            остаётся открытым. */}
        <div className="shell relative z-10 mt-auto pb-14 md:pb-20">
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
            {/* Левая колонка — голос */}
            <div className="lg:col-span-7">
              <HeroReveal>
                <span className="marker text-bone">01 — {d.hero.eyebrow}</span>
              </HeroReveal>

              {/* Возражение: тихо, гротеском, узкой мерой. */}
              <HeroReveal delay={120}>
                <p className="mt-7 max-w-[34ch] text-lead font-light text-bone">
                  {d.hero.titleTop}
                </p>
              </HeroReveal>

              {/* Обещание: крупно, ар-деко. Это и есть единственный
                  «скульптурный» момент первого экрана. */}
              <HeroHeadline
                as="h1"
                text={d.hero.titleEmphasis}
                delay={300}
                stagger={70}
                className="mt-5 max-w-[15ch] font-display text-display tracking-monument text-bone"
              />
            </div>

            {/* Правая колонка — сведения и действие, отбита волосяной линией */}
            <div className="lg:col-span-4 lg:col-start-9">
              <HeroReveal delay={640} className="lg:border-l lg:border-bone/15 lg:pl-8">
                <p className="max-w-[42ch] text-micro leading-relaxed text-bone">
                  {d.hero.body}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={`${base}/map`} variant="primary" arrow>
                    {c.nav.projects}
                  </Button>
                  {/* secondary, а не ghost: у ghost нет рамки, и его
                      bone-dim на светлых кадрах не добирает 4.5:1. */}
                  <Button
                    href={whatsappHref(d.common.whatsappPrefill)}
                    variant="secondary"
                  >
                    {d.common.whatsapp}
                  </Button>
                </div>
              </HeroReveal>
            </div>
          </div>

          {/* Нижняя кромка кадра — «приборная панель»: координаты, подсказка
              прокрутки и счётчик объектов, разделённые волосяными линиями.
              Она же граница композиции. */}
          <HeroReveal delay={1000} className="mt-12 hidden items-center gap-5 md:flex">
            <span className="marker text-bone">{COORDS}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-bone/20" />
            <span className="marker text-bone">{c.home.scrollHint}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-bone/20" />
            <span className="marker tabular text-bone">
              {String(allProjects.length).padStart(2, "0")} —{" "}
              {d.projectsSection.eyebrow}
            </span>
          </HeroReveal>
        </div>
      </section>

      {/* ───────────────────────── Манифест ─────────────────────────
          Максимум воздуха, минимум элементов: метка в первой колонке,
          заявление — в средних. Больше на экране нет ничего. */}
      <section className="shell border-t border-bone/10 py-section">
        <div className="grid gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-2">
            <span className="marker text-gold">02</span>
            <span className="mt-3 block text-eyebrow uppercase tracking-eyebrow text-bone-faint">
              {d.intro.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-9 lg:col-start-4">
            <p className="max-w-[30ch] font-display text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] leading-[1.15] tracking-monument text-bone">
              {d.intro.manifesto}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────── Цифры ───────────────────────────
          Полоса-таблица: волосяные вертикали, огромные цифры ар-деко,
          подписи моно. Повторяющийся модуль задаёт ритм. */}
      <section className="border-t border-bone/10">
        <div className="shell py-section">
          <div className="grid gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <span className="marker text-gold">03</span>
              <h2 className="mt-4 max-w-[14ch] font-display text-title tracking-monument text-bone">
                {d.stats.title}
              </h2>
              <p className="mt-5 max-w-[38ch] text-micro leading-relaxed text-bone-dim">
                {d.stats.body}
              </p>
            </Reveal>

            <dl className="grid grid-cols-2 gap-px bg-bone/10 lg:col-span-8 lg:col-start-5 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 90} className="bg-ink px-5 pb-6 pt-7">
                  <dt className="marker tabular">{String(i + 1).padStart(2, "0")}</dt>
                  <dd className="mt-6">
                    <Odometer
                      value={s.value}
                      className="font-display text-[clamp(2.75rem,1.6rem+3.4vw,4.5rem)] leading-none tracking-monument text-gold"
                    />
                    <p className="mt-4 text-micro leading-snug text-bone-dim">
                      {s.label}
                    </p>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── Объекты ───────────────────────────
          Асимметрия вместо ровной тройки: первая карточка крупнее и выше,
          остальные смещены вниз — глаз идёт по диагонали, а не по линейке. */}
      <section className="border-t border-bone/10">
        <div className="shell py-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <span className="marker text-gold">04 — {d.projectsSection.eyebrow}</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12] tracking-monument">
                  {d.projectsSection.heading}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <Button href={`${base}/projects`} variant="ghost" arrow>
                {c.projectsPage.title}
              </Button>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-12">
            {projects.map((p, i) => {
              // Первая — крупная и без смещения; вторая и третья уже,
              // со ступенчатым сдвигом вниз.
              const layout = [
                "md:col-span-7",
                "md:col-span-5 md:mt-24",
                "md:col-span-5 md:col-start-2 md:-mt-8",
              ][i];
              const ratio = i === 0 ? "aspect-[5/4]" : "aspect-[4/5]";
              return (
                <Reveal as="li" key={p.slug} delay={(i % 3) * 110} className={layout}>
                  <Link href={`${base}/projects/${p.slug}`} className="group block">
                    <div className={`relative ${ratio} overflow-hidden bg-ink-raised`}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 55vw"
                        className="object-cover transition-transform duration-slow ease-smooth group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                      />
                    </div>

                    <div className="mt-5 flex items-baseline gap-4 border-t border-bone/15 pt-4">
                      <span className="marker tabular text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-title tracking-monument transition-colors duration-micro group-hover:text-gold">
                          {p.name}
                        </h3>
                        <p className="mt-1.5 text-micro text-bone-dim">
                          {p.location} · {p.type}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-micro text-bone-faint transition-transform duration-micro group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─────────────────────────── Основатель ─────────────────────────── */}
      <section className="border-t border-bone/10">
        <div className="shell grid gap-x-8 gap-y-12 py-section lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-raised">
              <Image
                src="/arturas.jpg"
                alt={founderName(lang)}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="marker">{founderName(lang)}</span>
              <span className="marker">{COORDS}</span>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <Reveal>
              <span className="marker text-gold">05 — {d.founder.eyebrow}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12] tracking-monument">
                {d.founder.titleLead}
                <em className="not-italic text-gold">{d.founder.titleEmphasis}</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 max-w-[46ch] space-y-4 text-micro leading-relaxed text-bone-dim">
                <p>{d.founder.p1}</p>
                <p>{d.founder.p2}</p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 border-t border-bone/15 pt-5 text-body text-bone">
                {d.founder.note}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-9">
                <Button href={`${base}/about`} variant="secondary" arrow>
                  {c.nav.about}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
