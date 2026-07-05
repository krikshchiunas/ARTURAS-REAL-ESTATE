"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Кастомный курсор редизайна: точка следует за мышью мгновенно, кольцо —
// с ленивым lerp-хвостом (gsap.quickTo). Над интерактивными элементами кольцо
// растёт. Активен только на точных указателях и без prefers-reduced-motion;
// системный курсор на это время прячется классом rd-cursor-on (globals.css).
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduce || !dot || !ring) return;

    document.documentElement.classList.add("rd-cursor-on");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const interactive = (e.target as Element | null)?.closest?.(
        "a, button, [data-cursor]",
      );
      gsap.to(ring, {
        scale: interactive ? 1.8 : 1,
        opacity: interactive ? 0.9 : 0.5,
        duration: 0.3,
      });
    };

    const leave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("rd-cursor-on");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[190] h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-offwhite opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[190] h-7 w-7 -translate-x-1/2 -translate-y-1/2 border border-offwhite/50 opacity-0"
      />
    </>
  );
}
