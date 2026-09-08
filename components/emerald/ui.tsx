import type { CSSProperties, ReactNode } from "react";
import { media, widths, base } from "@/lib/emerald/media.mjs";

/* Иконки — тонкий штрих, единый размер, без заливок. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const Icon = {
  /* «Цветок жизни»: 19 окружностей по треугольной решётке (шаг равен радиусу,
     ряды через r*sin60) плюс обод радиусом 3r — он касается крайних лепестков.
     Штрих тоньше остальных иконок: девятнадцать линий на 22px иначе слипаются. */
  flower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.55} aria-hidden>
      <circle cx="12" cy="12" r="10.2" strokeWidth={0.9} />
      <circle cx="8.6" cy="6.11" r="3.4" />
      <circle cx="12" cy="6.11" r="3.4" />
      <circle cx="15.4" cy="6.11" r="3.4" />
      <circle cx="6.9" cy="9.06" r="3.4" />
      <circle cx="10.3" cy="9.06" r="3.4" />
      <circle cx="13.7" cy="9.06" r="3.4" />
      <circle cx="17.1" cy="9.06" r="3.4" />
      <circle cx="5.2" cy="12" r="3.4" />
      <circle cx="8.6" cy="12" r="3.4" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="15.4" cy="12" r="3.4" />
      <circle cx="18.8" cy="12" r="3.4" />
      <circle cx="6.9" cy="14.94" r="3.4" />
      <circle cx="10.3" cy="14.94" r="3.4" />
      <circle cx="13.7" cy="14.94" r="3.4" />
      <circle cx="17.1" cy="14.94" r="3.4" />
      <circle cx="8.6" cy="17.89" r="3.4" />
      <circle cx="12" cy="17.89" r="3.4" />
      <circle cx="15.4" cy="17.89" r="3.4" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden>
      <path d="M12 2 4 12l8 10 8-10z" />
      <path d="M12 6.5 7.5 12 12 17.5 16.5 12z" />
    </svg>
  ),
  arrow: (
    <svg {...stroke}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),
  pin: (
    <svg {...stroke}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  prev: (
    <svg {...stroke}>
      <path d="m14 6-6 6 6 6" />
    </svg>
  ),
  next: (
    <svg {...stroke}>
      <path d="m10 6 6 6-6 6" />
    </svg>
  ),
};

type MediaEntry = { w: number; h: number; base?: string };
const manifest = media as Record<string, MediaEntry>;

/** Кадр из манифеста: webp + jpg, размеры проставлены, чтобы не дёргалась вёрстка. */
export function Picture({
  name,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const dim = manifest[name];
  if (!dim) throw new Error(`<Picture>: нет изображения "${name}"`);
  const dir = dim.base || base;
  const set = (ext: string) =>
    (widths as number[]).map((w) => `${dir}/${name}-${w}.${ext} ${w}w`).join(", ");

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${dir}/${name}-1100.jpg`}
        srcSet={set("jpg")}
        sizes={sizes}
        width={dim.w}
        height={dim.h}
        alt={alt}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : "lazy"}
        decoding="async"
      />
    </picture>
  );
}

/** Заголовок из маскированных строк: анимацию ведёт reveal.js по data-reveal. */
export function MaskLines({
  lines,
  level = 2,
  className = "",
  step = 90,
  from = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  level?: number;
  className?: string;
  step?: number;
  from?: number;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={`display display--${level} ${className}`.trim()} data-reveal="mask">
      {lines.map((l, i) => (
        <span className="mask-line" key={i}>
          <span style={{ "--delay": `${from + i * step}ms` } as CSSProperties}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Шапка раздела: надзаголовок + заголовок с волосяной линейкой вправо. */
export function Chead({
  index,
  kicker,
  heading,
  level = 2,
}: {
  index: string;
  kicker: string;
  heading: ReactNode[];
  level?: number;
}) {
  return (
    <div className="chead">
      <p className="label chead__k" data-reveal="rise">
        <span style={{ opacity: 0.55 }}>{index}</span> &nbsp; {kicker}
      </p>
      <MaskLines lines={heading} level={level} className="display--rule" />
    </div>
  );
}

export function Btn({
  label,
  href,
  variant = "ghost",
  arrow = true,
  magnetic = true,
}: {
  label: string;
  href: string;
  variant?: "ghost" | "solid";
  arrow?: boolean;
  magnetic?: boolean;
}) {
  return (
    <a
      className={`btn${variant === "solid" ? " btn--solid" : ""}`}
      href={href}
      {...(magnetic ? { "data-magnetic": "" } : {})}
    >
      <span>{label}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          &rarr;
        </span>
      )}
    </a>
  );
}

export function Figure({
  name, alt, ratio = "ar-classic", sizes, caption, zoom = false,
  className = "", delay = 0, parallax = 0, flat = false,
}: {
  name: string; alt: string; ratio?: string; sizes?: string; caption?: string;
  zoom?: boolean; className?: string; delay?: number; parallax?: number; flat?: boolean;
}) {
  const inner = <Picture name={name} alt={alt} sizes={sizes} />;
  return (
    <figure className={`figure ${className}`.trim()}>
      <div
        className={`frame ${ratio} ${flat ? "frame--flat" : ""} ${zoom ? "zoom" : ""}`}
        data-reveal="wipe"
        style={{ "--delay": `${delay}ms` } as CSSProperties}
      >
        {parallax ? <div data-parallax={parallax}>{inner}</div> : inner}
      </div>
      {caption && <figcaption className="cap">{caption}</figcaption>}
    </figure>
  );
}

export const Prose = ({ paras, className = "" }: { paras: string[]; className?: string }) => (
  <div className={`prose ${className}`.trim()}>
    {paras.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
  </div>
);
