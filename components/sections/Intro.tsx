"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const goals = [
  "Жизнь",
  "Образ жизни",
  "Инвестиции",
  "Арендный доход",
  "Капитал",
  "Релокация",
];

// Манифест-секция: одно крупное editorial-утверждение со скраб-подсветкой слов.
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const line =
    "Мы не продаём недвижимость. Мы помогаем выбрать верное решение под вашу цель: чтобы покупка делала жизнь лучше, а капитал работал на годы вперёд.";
  const tokens = line.split(" ");

  return (
    <section id="approach" className="relative py-28 md:py-44">
      <div ref={ref} className="shell">
        <p className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-[0.3em] gap-y-1 text-center font-display text-3xl font-light leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
          {tokens.map((word, i) => {
            const start = i / tokens.length;
            const end = start + 1 / tokens.length;
            return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
          })}
        </p>
      </div>

      {/* Направления подбора: статичная осмысленная строка вместо бегущей ленты.
          Лейбл задаёт контекст — это не случайные слова, а цели под подбор. */}
      <div className="mt-20 flex flex-col items-center gap-7 md:mt-28">
        <Reveal>
          <Eyebrow>Подбираем под вашу цель</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2.5 font-display text-xl font-light text-bone-muted md:gap-x-7 md:text-[1.7rem]">
            {goals.map((goal, i) => (
              <Fragment key={goal}>
                <li>{goal}</li>
                {i < goals.length - 1 && (
                  <li aria-hidden className="flex items-center">
                    <span className="h-[3px] w-[3px] rounded-full bg-platinum/50" />
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </Reveal>
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
