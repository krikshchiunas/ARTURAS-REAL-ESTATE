import type { CSSProperties } from "react";
import type { EmeraldContent } from "@/lib/emerald/content";
import { Btn, Chead, Icon, MaskLines, Picture, Prose } from "./ui";
import { TrustChart } from "./Chart";

const delay = (ms: number) => ({ "--delay": `${ms}ms` } as CSSProperties);

/* --- Первый экран -------------------------------------------------------- */
const POSTERS = [640, 1024, 1440, 1920, 2560];

export function Hero({ c }: { c: EmeraldContent }) {
  const h = c.hero;
  return (
    <section className="hero" id="top" data-playing="false">
      <div className="hero__stage">
        <video
          className="hero__media hero__video"
          id="hero-video"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          // @ts-expect-error — атрибут есть в Safari, но не в типах React
          disableremoteplayback=""
        />
        <picture className="hero__poster hero__media">
          <source
            type="image/webp"
            srcSet={POSTERS.map((w) => `/media/hero-poster-${w}.webp ${w}w`).join(", ")}
            sizes="100vw"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/hero-poster-1440.jpg"
            srcSet={POSTERS.map((w) => `/media/hero-poster-${w}.jpg ${w}w`).join(", ")}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            width={1920}
            height={1072}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero__tint" aria-hidden="true" />
        <div className="hero__scrim" id="hero-scrim" />
      </div>

      <div className="hero__body">
        <div className="hero__headline">
          <MaskLines
            as="h1"
            level={1}
            from={220}
            step={110}
            lines={h.headline.map((l, i) =>
              i === h.headline.length - 1 ? <em key={i}>{l}</em> : l,
            )}
          />
        </div>
        <div className="hero__aside">
          <p className="hero__standfirst" data-reveal="rise" style={delay(620)}>
            {h.standfirst}
          </p>
          <div className="hero__actions" data-reveal="rise" style={delay(740)}>
            <Btn label={h.primaryCta.label} href={h.primaryCta.href} variant="solid" />
            <Btn label={h.secondaryCta.label} href={h.secondaryCta.href} arrow={false} />
          </div>
        </div>
      </div>

      <div className="hero__strip" data-reveal="rise" style={delay(860)}>
        <div className="hero__strip-in">
          {h.strip.map((s) => (
            <div className="hero__stat" key={s.u}>
              <b>{s.v}</b>
              <span>{s.u}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Заявление поверх кадра ---------------------------------------------- */
export function Statement({ c }: { c: EmeraldContent }) {
  const s = c.statement;
  return (
    <section className="stmt">
      <div className="stmt__media">
        <div data-parallax="0.08">
          <Picture name={s.image.name} alt={s.image.alt} sizes="100vw" />
        </div>
      </div>
      <div className="stmt__body">
        <div className="stmt__lines">
          <p className="label" data-reveal="rise" style={{ marginBottom: "1.2rem" }}>
            {s.kicker}
          </p>
          <MaskLines lines={s.lines} level={2} step={100} />
        </div>
        <div className="stmt__text" data-reveal="rise" style={delay(200)}>
          <Prose paras={s.body} />
        </div>
      </div>
    </section>
  );
}

/* --- Цифры --------------------------------------------------------------- */
export function Numbers({ c }: { c: EmeraldContent }) {
  const n = c.numbers;
  return (
    <section className="section section--tight" id="proekt" data-tone="panel">
      <div className="shell">
        <Chead index={n.index} kicker={n.kicker} heading={n.heading} level={3} />
        <div className="trust__tiles" style={{ marginTop: 0 }}>
          {n.items.map((it, i) => (
            <div className="tile" data-reveal="rise" style={delay(i * 60)} key={it.label}>
              <span className="tile__k">{it.label}</span>
              <span className="tile__v numeral">
                <span data-count={it.n}>{it.n}</span>
                {it.suffix}
              </span>
              {it.note && <span className="tile__c">{it.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Портфель: карусель объектов ----------------------------------------- */
function ResCard({ it, i, c, lang }: { it: EmeraldContent["residences"]["items"][number]; i: number; c: EmeraldContent; lang: string }) {
  return (
    <article className="res__card" data-reveal="rise" style={delay(i * 70)}>
      <div className="res__shot">
        <span className="badge">{it.badge}</span>
        <Picture name={it.image.name} alt={it.image.alt} sizes="(max-width:900px) 80vw, 24rem" />
      </div>
      <div className="res__meta">
        <h3 className="res__name">{it.name}</h3>
        <div className="res__hr" />
        <div className="res__facts">
          <p className="res__fact">
            {Icon.pin}
            {it.location}
          </p>
          <p className="res__fact">
            {Icon.diamond}
            {it.badge}
          </p>
        </div>
        <div className="res__foot">
          <span>
            {it.developer ? (
              <>
                <span className="res__price-k">{c.ui.cardDeveloper}</span>
                <span className="res__price-v">{it.developer}</span>
              </>
            ) : (
              <span className="res__price-v">{c.residences.onRequest}</span>
            )}
          </span>
          <span className="arrow-btn" aria-hidden="true">
            {Icon.arrow}
          </span>
        </div>
        {/* Ссылка на всю площадь карточки ведёт на страницу объекта:
            карточка — это анонс, подробности живут отдельной страницей. */}
        <a className="res__stretch" href={`/${lang}/projects/${it.slug}`}>
          <span className="vh">
            {it.name} — {it.location}
          </span>
        </a>
      </div>
    </article>
  );
}

export function Portfolio({ c, lang }: { c: EmeraldContent; lang: string }) {
  const r = c.residences;
  return (
    <section className="section" id="rezidencii" data-tone="lift">
      <div className="shell">
        <div className="res__top">
          <div style={{ flex: "1 1 24rem" }}>
            <Chead index={r.index} kicker={r.kicker} heading={r.heading} />
            <p className="lead" data-reveal="rise" style={delay(160)}>
              {r.intro}
            </p>
          </div>
          <div className="res__tools" data-reveal="rise" style={delay(220)}>
            <button className="res__tool" type="button" data-rail="prev" aria-label={c.ui.railPrev}>
              {Icon.prev}
            </button>
            <button className="res__tool" type="button" data-rail="next" aria-label={c.ui.railNext}>
              {Icon.next}
            </button>
          </div>
        </div>

        <div className="res__rail" id="res-rail" role="region" aria-label={c.ui.railRegion} tabIndex={0}>
          {r.items.map((it, i) => (
            <ResCard it={it} i={i} c={c} lang={lang} key={it.slug} />
          ))}
        </div>

        {/* Приписка про презентацию AYANA снята: она относилась к одному
            объекту, а стоит под всем портфелем. */}
        <div className="res__bar">
          <div className="dots" id="res-dots" aria-hidden="true">
            {r.items.map((_, i) => (
              <i data-on={i === 0} key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Инвестиции: только диапазоны, точные цифры — по запросу -------------
   Раньше здесь стоял график и таблица «планировка → доходность → доля
   прибыли» с точными числами по каждому типу. Их убрали: конкретной
   доходности по объекту не существует, она считается под покупателя, а
   доля прибыли к разговору с клиентом отношения не имеет. Осталось то,
   что действительно взято из презентации, — вилки, — и прямой призыв
   спросить цифры у агента. */
export function Invest({ c, lang }: { c: EmeraldContent; lang: string }) {
  const inv = c.invest;
  const layouts = inv.rows.map((r) => r.type).join(" · ");
  const band = inv.chart.series[0].values;
  const range = `${Math.min(...band)}\u2013${Math.max(...band)}%`;

  return (
    <section className="section" id="investicii" data-tone="deep">
      <div className="shell">
        <Chead index={inv.index} kicker={inv.kicker} heading={inv.heading} />
        <p className="lead" data-reveal="rise" style={delay(160)}>
          {inv.intro}
        </p>

        <div className="trust__tiles">
          {inv.highlights.map((h, i) => (
            <div className="tile" data-reveal="rise" style={delay(i * 80)} key={h.k}>
              <span className="tile__k">{h.k}</span>
              <span className="tile__v numeral">{h.v}</span>
            </div>
          ))}
          <div className="tile" data-reveal="rise" style={delay(160)}>
            <span className="tile__k">{c.ui.yieldBand}</span>
            <span className="tile__v numeral">{range}</span>
            <span className="tile__c">{layouts}</span>
          </div>
        </div>

        <div className="trust__ask" data-reveal="rise" style={delay(120)}>
          <p className="trust__note">{c.ui.exactOnRequest}</p>
          <Btn label={c.ui.askYield} href={`/${lang}/contact`} variant="solid" />
        </div>
      </div>
    </section>
  );
}
