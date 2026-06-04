// Премиальный амбиентный фон. Фиксированный слой за всем контентом (-z-10),
// клики не перехватывает. Глубокий off-black с мягкими тёплыми платиновыми
// «лужицами» света и виньеткой — ощущение тёмной галереи, а не плоской заливки.
// Свечения дрейфуют очень медленно и едва заметно; при reduce-motion замирают.
export function Ambient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* Базовая вертикальная глубина: чуть светлее вверху, глубже к низу */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0C0C11_0%,#08080A_50%,#060608_100%)]" />

      {/* Мягкий верхний свет по центру */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_-4%,rgba(227,214,194,0.07),transparent_60%)]" />

      {/* Тёплое платиновое свечение сверху-слева */}
      <div className="absolute -left-[8%] -top-[8%] h-[66vmax] w-[66vmax] rounded-full bg-[radial-gradient(closest-side,rgba(203,184,155,0.14),transparent_72%)] blur-[50px] animate-ambient-a motion-reduce:animate-none" />

      {/* Тёплое платиновое свечение снизу-справа */}
      <div className="absolute -bottom-[10%] -right-[8%] h-[76vmax] w-[76vmax] rounded-full bg-[radial-gradient(closest-side,rgba(227,214,194,0.12),transparent_72%)] blur-[70px] animate-ambient-b motion-reduce:animate-none" />

      {/* Виньетка: мягко обрамляет контент и углубляет дальние края */}
      <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_50%_44%,transparent_58%,rgba(2,2,4,0.5)_100%)]" />
    </div>
  );
}
