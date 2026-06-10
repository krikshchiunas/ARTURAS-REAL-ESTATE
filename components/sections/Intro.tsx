"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDictionary } from "@/lib/i18n";

// Манифест-секция: заголовок + одно крупное editorial-утверждение
// со скраб-подсветкой слов по мере скролла.
export function Intro({ lang }: { lang: string }) {
  const t = getDictionary(lang).intro;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const tokens = t.manifesto.split(" ");

  return (
    <section id="approach" className="relative py-20 md:py-44">
      <div ref={ref} className="shell">
        <Reveal>
          <div className="mb-12 flex justify-center md:mb-16">
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </div>
        </Reveal>
        <p className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-[0.3em] gap-y-1 text-center font-display text-3xl font-light leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
          {tokens.map((word, i) => {
            const start = i / tokens.length;
            const end = start + 1 / tokens.length;
            return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}
