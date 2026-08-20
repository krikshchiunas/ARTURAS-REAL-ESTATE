// HUD-рамка по периметру экрана — фирменный интерфейсный «прицельный» контур
// Hubtown, присутствует на всех страницах. Тонкая линия, отступ от краёв, с
// уголками-скобками и засечками по серединам сторон. Чисто декоративная,
// не перехватывает события.
export function HudFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      {/* Основной контур с отступом */}
      <div className="absolute inset-[14px] border border-offwhite/12" />

      {/* Уголки-скобки (L-образные, поверх контура, ярче) */}
      {(
        [
          "left-[14px] top-[14px] border-l border-t",
          "right-[14px] top-[14px] border-r border-t",
          "left-[14px] bottom-[14px] border-l border-b",
          "right-[14px] bottom-[14px] border-r border-b",
        ] as const
      ).map((pos) => (
        <span key={pos} className={`absolute h-5 w-5 border-offwhite/40 ${pos}`} />
      ))}

      {/* Засечки по серединам сторон */}
      <span className="absolute left-1/2 top-[14px] h-2 w-px -translate-x-1/2 bg-offwhite/25" />
      <span className="absolute left-1/2 bottom-[14px] h-2 w-px -translate-x-1/2 bg-offwhite/25" />
      <span className="absolute left-[14px] top-1/2 h-px w-2 -translate-y-1/2 bg-offwhite/25" />
      <span className="absolute right-[14px] top-1/2 h-px w-2 -translate-y-1/2 bg-offwhite/25" />
    </div>
  );
}
