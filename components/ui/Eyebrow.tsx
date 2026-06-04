// Надзаголовок-метка. Рационируется: не больше одного на каждые ~3 секции.
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2.5">
      <span className="h-px w-6 bg-platinum/50" aria-hidden />
      {children}
    </span>
  );
}
