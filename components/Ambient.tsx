// Премиальный амбиентный фон. Фиксированный слой за всем контентом (-z-10),
// клики не перехватывает. Кинематографичный диагональный световой луч с
// парящими в свете пылинками («god-ray») на глубоком off-black — ассет
// отрендерен офлайн и слегка затемнён, лежит в /public/ambient-d8.webp.
export function Ambient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* Сам световой луч с пылинками: cover, по центру.
          Имя файла версионируем (-v3), чтобы сбросить кэш CDN/браузера. */}
      <div className="absolute inset-0 bg-ink bg-[url('/ambient-d8-v4.webp')] bg-cover bg-center bg-no-repeat" />

      {/* Виньетка: мягко обрамляет контент и углубляет дальние края */}
      <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_50%_44%,transparent_55%,rgba(2,2,4,0.55)_100%)]" />
    </div>
  );
}
