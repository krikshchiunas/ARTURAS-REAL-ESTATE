"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

// Горизонтальный pin-скролл каталога. Изолирован в листовом компоненте:
// gsap.context + ctx.revert на размонтировании. Отключён при reduce-motion и < 768px.
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || narrow) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const distance = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-0"
    >
      {/* Заголовок: статичный над лентой на десктопе */}
      <div className="shell md:absolute md:left-1/2 md:top-16 md:z-20 md:-translate-x-1/2">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>Проекты</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[20ch] font-display text-4xl font-light leading-[1.05] tracking-tight text-balance md:text-5xl">
              Объекты, отобранные под цель
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Лента: горизонтальная на десктопе, вертикальная на мобиле */}
      <div className="mt-14 md:mt-0 md:flex md:h-[100svh] md:items-center">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 px-6 md:flex-row md:gap-10 md:px-[max(2rem,calc((100vw-1440px)/2+2rem))] md:pt-24 md:will-change-transform"
        >
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              aria-label={`${p.name} — подробнее`}
              className="group relative block shrink-0 md:w-[clamp(320px,38vw,460px)]"
            >
              <div className="relative overflow-hidden rounded-bezel bg-white/[0.04] p-1.5 shadow-inner-hi ring-1 ring-white/[0.06] transition-colors duration-500 group-hover:ring-white/15">
                <div className="relative overflow-hidden rounded-core bg-ink-900">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-glass group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent"
                    />
                    <div className="absolute left-6 top-6 flex items-center gap-3">
                      <span className="font-mono text-xs text-platinum">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-bone-muted">
                        {p.type}
                      </span>
                    </div>

                    <div className="absolute inset-x-6 bottom-6">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="font-display text-3xl font-light tracking-tight text-bone md:text-4xl">
                            {p.name}
                          </h3>
                          <p className="mt-1.5 text-sm text-bone-muted">
                            {p.location}
                          </p>
                        </div>
                        <span className="shrink-0 font-display text-xl font-light text-platinum-soft">
                          {p.priceFrom}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors duration-500 group-hover:text-bone">
                        Подробнее
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden
                          className="transition-transform duration-500 ease-glass group-hover:translate-x-1"
                        >
                          <path
                            d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
