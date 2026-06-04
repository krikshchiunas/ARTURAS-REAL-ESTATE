import { socials } from "@/lib/site";

// Список соцканалов. Текстовые ссылки в премиальном стиле (без «тяжёлых» иконок).
export function Socials({
  className = "",
}: {
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-bone-muted transition-colors duration-300 hover:text-bone"
          >
            {s.label}
            <svg
              width="10"
              height="10"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-60"
            >
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
