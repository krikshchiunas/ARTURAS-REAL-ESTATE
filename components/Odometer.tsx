"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Одометр референса: каждая цифра — колонка 0–9, при входе секции во вьюпорт
// колонки прокручиваются до целевого значения с каскадом слева направо.
// Нецифровые символы («+», «М» и т.п.) рендерятся статично.
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cols = Array.from(el.querySelectorAll<HTMLElement>("[data-odo-col]"));

    if (reduce) {
      cols.forEach((col) => {
        const digit = Number(col.dataset.odoCol);
        gsap.set(col, { yPercent: -digit * 10 });
      });
      return;
    }

    const tweens = cols.map((col, i) => {
      const digit = Number(col.dataset.odoCol);
      return gsap.fromTo(
        col,
        { yPercent: 0 },
        {
          yPercent: -digit * 10,
          duration: 1.7 + i * 0.15,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [value]);

  return (
    <span
      ref={ref}
      aria-label={value}
      className={`inline-flex items-baseline leading-none ${className}`}
    >
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span
            key={i}
            aria-hidden
            className="inline-block h-[1em] overflow-hidden"
          >
            <span data-odo-col={ch} className="block will-change-transform">
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="block h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="inline-block">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
