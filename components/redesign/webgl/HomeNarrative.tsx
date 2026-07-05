"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/i18n/config";
import { chromeDict } from "@/components/redesign/dict";
import { BracketButton } from "@/components/redesign/BracketButton";

gsap.registerPlugin(ScrollTrigger);

// WebGL грузим только на клиенте (three.js тяжёлый, SSR ему не нужен).
const HomeScene = dynamic(() => import("@/components/redesign/webgl/HomeScene"), {
  ssr: false,
});

// Скролл-нарратив главной: длинная секция-«трек» пинит canvas, прогресс скролла
// пишется в ref (питает камеру в HomeScene без ре-рендеров React) и переключает
// активную главу. Текст глав кроссфейдит поверх сцены.
//
// Fallback (reduced-motion / нет WebGL): статичный тёмный фон + главы обычными
// секциями (см. HomeNarrativeFallback ниже — выбирается в HomeExperience).

export function HomeNarrative({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const chapters = t.home.chapters;
  const progressRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [parallax, setParallax] = useState(true);

  useEffect(() => {
    setParallax(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        // Индекс активной главы из прогресса (равные сегменты).
        const idx = Math.min(
          chapters.length - 1,
          Math.floor(self.progress * chapters.length + 0.0001),
        );
        setActive((prev) => (prev === idx ? prev : idx));
      },
    });

    return () => st.kill();
  }, [chapters.length]);

  const hrefFor = (target: string) => `/${lang}/redesign/${target === "map" ? "map" : target}`;

  return (
    <section ref={trackRef} className="relative" style={{ height: `${chapters.length * 100}vh` }}>
      {/* Пиннится на всё время трека */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <HomeScene progressRef={progressRef} parallax={parallax} />
        </div>

        {/* Виньетка снизу — читаемость текста поверх сцены */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />

        {/* Главы: показывается активная, остальные скрыты */}
        <div className="pointer-events-none absolute inset-0 flex items-end px-6 pb-24 md:items-center md:px-16 md:pb-0">
          <div className="relative w-full max-w-[46rem]">
            {chapters.map((ch, i) => (
              <article
                key={ch.tag}
                aria-hidden={i !== active}
                className={`transition-all duration-700 ease-smooth ${
                  i === active
                    ? "pointer-events-auto relative opacity-100 blur-0"
                    : "pointer-events-none absolute inset-0 opacity-0 blur-sm"
                }`}
              >
                <p className="font-mono text-11 uppercase tracking-4 text-offwhite/60">
                  {String(i + 1).padStart(2, "0")} — {ch.tag}
                </p>
                <h2 className="mt-6 text-40 font-bold uppercase leading-0.9 text-offwhite md:text-104 md:leading-0.8">
                  {ch.title}
                </h2>
                <p className="mt-6 max-w-[34rem] text-16 font-light leading-1.6 text-offwhite/70">
                  {ch.body}
                </p>
                {ch.cta && (
                  <div className="mt-8">
                    <BracketButton href={hrefFor(ch.ctaHref)}>{ch.cta}</BracketButton>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Индикатор глав справа */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {chapters.map((ch, i) => (
            <span
              key={ch.tag}
              className={`h-6 w-px transition-colors duration-500 ${
                i === active ? "bg-offwhite" : "bg-offwhite/20"
              }`}
            />
          ))}
        </div>

        {/* Подсказка скролла — только на первой главе */}
        <div
          className={`pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-10 uppercase tracking-4 text-offwhite/40 transition-opacity duration-500 ${
            active === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.home.scrollHint}
        </div>
      </div>
    </section>
  );
}

// Статичный fallback: сцена не грузится, главы — обычные секции.
export function HomeNarrativeFallback({ lang }: { lang: Locale }) {
  const t = chromeDict(lang);
  const hrefFor = (target: string) => `/${lang}/redesign/${target}`;
  return (
    <div className="relative">
      <p className="px-6 pt-32 font-mono text-10 uppercase tracking-4 text-offwhite/40 md:px-16">
        {t.home.fallbackNote}
      </p>
      {t.home.chapters.map((ch, i) => (
        <section
          key={ch.tag}
          className="flex min-h-[80vh] flex-col justify-center border-b border-offwhite/10 px-6 md:px-16"
        >
          <p className="font-mono text-11 uppercase tracking-4 text-offwhite/60">
            {String(i + 1).padStart(2, "0")} — {ch.tag}
          </p>
          <h2 className="mt-6 max-w-[16ch] text-40 font-bold uppercase leading-0.9 md:text-104 md:leading-0.8">
            {ch.title}
          </h2>
          <p className="mt-6 max-w-[34rem] text-16 font-light leading-1.6 text-offwhite/70">
            {ch.body}
          </p>
          {ch.cta && (
            <div className="mt-8">
              <Link
                href={hrefFor(ch.ctaHref)}
                className="inline-block border border-offwhite/20 px-7 py-4 font-mono text-12 uppercase tracking-4 text-offwhite transition-colors duration-300 hover:bg-offwhite/5"
              >
                {ch.cta}
              </Link>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
