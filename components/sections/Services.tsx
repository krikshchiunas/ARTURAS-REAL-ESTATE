import { getDictionary } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Сервис как сетка 3×3 из плиток: в каждой — мелкая мет­ка «Шаг 0X»,
// крупная полупрозрачная цифра-водяной знак и текст шага внизу.
// На телефоне и планшете — две колонки (компактнее по высоте; длинные слова
// спасает hyphens-auto), на десктопе — три.
export function Services({ lang }: { lang: string }) {
  const t = getDictionary(lang).services;
  const steps = t.steps;
  return (
    <section id="services" className="relative py-20 md:py-40">
      <div className="shell">
        <SectionHeading eyebrow={t.eyebrow} title={<>{t.title}</>} body={t.body} />

        <ol className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-20 lg:grid-cols-3">
          {steps.map((step, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={step} delay={(i % 3) * 0.06}>
                <li className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[18px] bg-gradient-to-br from-ink-700 to-ink-800 p-4 ring-1 ring-white/[0.06] transition-colors duration-500 ease-smooth hover:ring-white/15 sm:min-h-[180px] sm:p-6 md:p-7">
                  {/* Крупная цифра-водяной знак */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-2 right-2 select-none font-display text-[4rem] leading-none text-platinum/10 sm:-top-3 sm:text-[6rem]"
                  >
                    {num}
                  </span>
                  <p className="relative mt-auto hyphens-auto break-words text-pretty text-sm leading-snug text-bone sm:text-[15px] md:text-base">
                    {step}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
