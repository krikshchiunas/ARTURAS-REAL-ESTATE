import type { CSSProperties } from "react";
import type { EmeraldContent } from "@/lib/emerald/content";
import { Chead, Figure, Picture, Prose } from "./ui";

const delay = (ms: number) => ({ "--delay": `${ms}ms` } as CSSProperties);

/* --- Место --------------------------------------------------------------- */
export function Place({ c }: { c: EmeraldContent }) {
  const p = c.place;
  return (
    <section className="section" id="mesto" data-tone="lift">
      <div className="shell e-grid">
        <div className="place__head">
          <Chead index={p.index} kicker={p.kicker} heading={p.heading} />
        </div>
        <div className="place__body" data-reveal="rise" style={delay(160)}>
          <Prose paras={p.body} />
        </div>
        <div className="place__mosaic">
          <div className="place__a">
            <Figure
              name={p.images[0].name}
              alt={p.images[0].alt}
              ratio="ar-classic"
              sizes="(max-width:1000px) 100vw, 55vw"
              zoom
            />
          </div>
          <div className="place__b">
            <Figure
              name={p.images[1].name}
              alt={p.images[1].alt}
              ratio="ar-column"
              sizes="(max-width:1000px) 100vw, 30vw"
              zoom
              delay={120}
            />
          </div>
          <div className="place__c">
            <figure className="figure">
              <div className="frame ar-pano" data-reveal="wipe" style={delay(80)}>
                <Picture
                  name={p.images[2].name}
                  alt={p.images[2].alt}
                  sizes="(max-width:1000px) 100vw, 78vw"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Сервис (в лендинге — «Территория») ---------------------------------- */
export function Services({ c }: { c: EmeraldContent }) {
  const p = c.plan;
  return (
    <section className="section" data-tone="deep">
      <div className="shell e-grid">
        <div className="plan__head">
          <Chead index={p.index} kicker={p.kicker} heading={p.heading} />
        </div>
        <div className="plan__body" data-reveal="rise" style={delay(160)}>
          <Prose paras={p.body} />
        </div>
        <div className="plan__media">
          <Figure
            name={p.image.name}
            alt={p.image.alt}
            ratio="ar-classic"
            sizes="(max-width:1000px) 100vw, 56vw"
          />
        </div>
        <dl className="plan__facts" data-reveal="rise" style={delay(120)}>
          {p.facts.map((f) => (
            <div className="plan__fact" key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* --- Районы (в лендинге — «Инфраструктура») ------------------------------ */
export function Areas({ c }: { c: EmeraldContent }) {
  const a = c.amenities;
  return (
    <section className="section" id="infrastruktura" data-tone="lift">
      <div className="shell e-grid">
        <div className="am__head">
          <Chead index={a.index} kicker={a.kicker} heading={a.heading} />
        </div>
        <div className="am__intro" data-reveal="rise" style={delay(160)}>
          <p className="lead">{a.intro}</p>
        </div>
        <div className="am__mosaic">
          {a.tiles.map((t, i) => (
            <div
              className="am__tile"
              data-size={t.size}
              data-reveal="rise"
              style={delay(i * 55)}
              key={`${t.name}-${i}`}
            >
              <Picture name={t.name} alt={t.alt} sizes="(max-width:900px) 50vw, 25vw" />
              <span className="am__label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Об агенте (в лендинге — «Застройщик») ------------------------------- */
export function Founder({ c }: { c: EmeraldContent }) {
  const d = c.developer;
  return (
    <section className="section" data-tone="deep">
      <div className="shell e-grid">
        <div className="dev__media">
          <Figure
            name={d.image.name}
            alt={d.image.alt}
            ratio="ar-tall"
            sizes="(max-width:1000px) 100vw, 47vw"
            zoom
          />
        </div>
        <div className="dev__copy">
          <Chead index={d.index} kicker={d.kicker} heading={d.heading} level={3} />
          <div data-reveal="rise" style={delay(140)}>
            <Prose paras={d.body} />
          </div>
          {d.awardYears.length > 0 && (
            <div className="dev__years" data-reveal="rise" style={delay(220)}>
              <span className="label label--mute">{c.ui.awards}</span>
              {d.awardYears.map((y) => (
                <span className="dev__year" key={y}>
                  {y}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
