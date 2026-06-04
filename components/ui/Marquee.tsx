// Бесконечная лента. Одна на страницу. CSS-анимация, останавливается при reduce.
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="mask-x overflow-hidden py-2">
      <ul className="flex w-max items-center gap-16 animate-marquee motion-reduce:animate-none">
        {row.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-16 font-display text-2xl font-light text-bone-faint"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-platinum/40" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
