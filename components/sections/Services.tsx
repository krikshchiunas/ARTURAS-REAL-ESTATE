import { getDictionary } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Сервис как последовательный процесс: пронумерованные шаги, связанные в поток.
// На мобиле — одна колонка-таймлайн сверху вниз. На десктопе — две колонки,
// заполняемые по столбцам (1–5 вниз, затем 6–9 вниз), как на эскизе.
const ROWS = 5; // граница переноса во вторую колонку на десктопе

export function Services({ lang }: { lang: string }) {
  const t = getDictionary(lang).services;
  const steps = t.steps;
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="shell">
        <SectionHeading eyebrow={t.eyebrow} title={<>{t.title}</>} body={t.body} />

        <ol className="mt-16 flex flex-col md:mt-20 md:grid md:grid-flow-col md:grid-cols-2 md:grid-rows-5 md:gap-x-16 lg:gap-x-24">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            // На десктопе элемент на границе колонки (каждый ROWS-й) не тянет линию вниз.
            const isColumnEnd = (i + 1) % ROWS === 0;
            return (
              <Reveal key={step} delay={(i % ROWS) * 0.05}>
                <li className="flex gap-5">
                  {/* Узел + соединительная линия, тянущаяся к следующему шагу */}
                  <div className="flex flex-col items-center self-stretch">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-900 font-mono text-sm text-platinum ring-1 ring-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!isLast && (
                      <span
                        aria-hidden
                        className={`mt-2 w-px flex-1 bg-gradient-to-b from-white/20 to-white/5 ${
                          isColumnEnd ? "md:hidden" : ""
                        }`}
                      />
                    )}
                  </div>
                  <p
                    className={`max-w-md pt-3 text-pretty text-[15px] leading-relaxed text-bone-muted md:text-base ${
                      isLast ? "pb-0" : "pb-10"
                    }`}
                  >
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
