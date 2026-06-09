import { getDictionary } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Сервис как сетка 3×3 из плиток: в каждой — мелкая мет­ка «Шаг 0X»,
// крупная полупрозрачная цифра-водяной знак и текст шага внизу.
// На мобиле и планшете — две колонки, на десктопе — три.
export function Services({ lang }: { lang: string }) {
  const t = getDictionary(lang).services;
  const steps = t.steps;
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHeading eyebrow={t.eyebrow} title={<>{t.title}</>} body={t.body} />

        <ol className="mt-16 grid grid-cols-2 gap-4 md:mt-20 lg:grid-cols-3">
          {steps.map((step, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={step} delay={(i % 3) * 0.06}>
                <li className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-[18px] bg-gradient-to-br from-ink-700 to-ink-800 p-6 ring-1 ring-white/[0.06] transition-colors duration-500 ease-smooth hover:ring-white/15 md:p-7">
                  {/* Крупная цифра-водяной знак */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-3 right-2 select-none font-display text-[6rem] leading-none text-platinum/10"
                  >
                    {num}
                  </span>
                  <p className="relative mt-auto text-pretty text-[15px] leading-snug text-bone md:text-base">
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
