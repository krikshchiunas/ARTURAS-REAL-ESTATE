// Премиальный амбиентный фон. Фиксированный слой за всем контентом (-z-10),
// клики не перехватывает. Кинематографичный диагональный световой луч с
// парящими в свете пылинками («god-ray») на глубоком off-black — ассет
// отрендерен офлайн и слегка затемнён, лежит в /public/ambient-d8-v4.webp.
// Поверх — два очень мягких платиновых свечения, которые медленно дрейфуют,
// создавая ощущение «дышащего» света. Отключается при prefers-reduced-motion.
export function Ambient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* Сам световой луч с пылинками: cover, по центру. */}
      <div className="absolute inset-0 bg-ink bg-[url('/ambient-d8-v4.webp')] bg-cover bg-center bg-no-repeat" />

      {/* Дрейфующие тёплые свечения — очень тихие, только чтобы фон дышал. */}
      <div
        className="absolute -left-[15%] top-[10%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(closest-side,rgba(203,184,155,0.11),transparent_70%)] blur-3xl animate-ambient-a motion-reduce:animate-none will-change-transform"
      />
      <div
        className="absolute -right-[10%] bottom-[-10%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(closest-side,rgba(203,184,155,0.09),transparent_70%)] blur-3xl animate-ambient-b motion-reduce:animate-none will-change-transform"
      />

      {/* Виньетка: мягко обрамляет контент и углубляет дальние края */}
      <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_50%_44%,transparent_55%,rgba(2,2,4,0.55)_100%)]" />
    </div>
  );
}
