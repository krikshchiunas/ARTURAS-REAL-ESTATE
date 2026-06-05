import { getSocials } from "@/lib/i18n";

// Минималистичные монохромные глифы. Наследуют currentColor — без фирменных
// цветов, в единой премиальной стилистике. Размер небольшой (14px).
const icons: Record<string, React.ReactNode> = {
  WhatsApp: (
    <path
      fill="currentColor"
      d="M12.04 2.5c-5.2 0-9.42 4.22-9.42 9.42 0 1.66.43 3.28 1.26 4.71L2.5 21.5l4.99-1.31a9.4 9.4 0 0 0 4.55 1.16h.004c5.2 0 9.42-4.22 9.42-9.42 0-2.52-.98-4.88-2.76-6.66a9.36 9.36 0 0 0-6.66-2.77Zm0 1.78c2.04 0 3.95.8 5.39 2.24a7.58 7.58 0 0 1 2.24 5.4c0 4.21-3.43 7.63-7.64 7.63a7.6 7.6 0 0 1-3.88-1.06l-.28-.17-2.88.76.77-2.81-.18-.29a7.6 7.6 0 0 1-1.17-4.06c0-4.21 3.43-7.64 7.63-7.64Zm-2.54 4.04c-.12 0-.32.05-.49.23-.17.18-.65.64-.65 1.55 0 .92.67 1.8.76 1.93.09.12 1.31 2 3.19 2.81 1.56.67 1.88.54 2.22.51.34-.03 1.1-.45 1.25-.88.16-.43.16-.8.11-.88-.04-.08-.16-.12-.35-.21-.19-.1-1.1-.55-1.27-.61-.17-.06-.29-.09-.42.09-.12.19-.47.61-.58.73-.11.12-.21.14-.4.05-.19-.1-.79-.29-1.5-.93-.56-.5-.93-1.11-1.04-1.3-.11-.19-.01-.29.08-.38.09-.09.19-.21.28-.33.1-.11.13-.19.19-.32.06-.12.03-.23-.02-.33-.05-.09-.41-1.02-.57-1.39-.15-.36-.3-.31-.41-.32h-.36Z"
    />
  ),
  Telegram: (
    <path
      fill="currentColor"
      d="M21.5 4.3 2.9 11.5c-1.1.45-1.1 1.08-.2 1.36l4.73 1.48 1.83 5.62c.22.6.39.83.78.83.3 0 .43-.13.6-.3l2.28-2.22 4.74 3.5c.87.48 1.5.23 1.72-.81l3.1-14.63c.32-1.3-.34-1.89-1.18-1.53Zm-3.96 3.4-8.2 7.46c-.13.12-.18.27-.16.4l-.17 2.78-1.21-3.96 9.5-6.18c.21-.13.4.05.24.16Z"
    />
  ),
  TelegramChannel: (
    <path
      fill="currentColor"
      d="M21.5 4.3 2.9 11.5c-1.1.45-1.1 1.08-.2 1.36l4.73 1.48 1.83 5.62c.22.6.39.83.78.83.3 0 .43-.13.6-.3l2.28-2.22 4.74 3.5c.87.48 1.5.23 1.72-.81l3.1-14.63c.32-1.3-.34-1.89-1.18-1.53Zm-3.96 3.4-8.2 7.46c-.13.12-.18.27-.16.4l-.17 2.78-1.21-3.96 9.5-6.18c.21-.13.4.05.24.16Z"
    />
  ),
  Instagram: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </g>
  ),
  YouTube: (
    <g fill="currentColor">
      <path d="M22.5 7.4a2.66 2.66 0 0 0-1.87-1.89C18.97 5.07 12 5.07 12 5.07s-6.97 0-8.63.44A2.66 2.66 0 0 0 1.5 7.4 27.9 27.9 0 0 0 1.06 12c0 1.55.15 3.1.44 4.6a2.66 2.66 0 0 0 1.87 1.89c1.66.44 8.63.44 8.63.44s6.97 0 8.63-.44a2.66 2.66 0 0 0 1.87-1.89c.29-1.5.44-3.05.44-4.6 0-1.55-.15-3.1-.44-4.6ZM9.79 15.2V8.8l5.55 3.2-5.55 3.2Z" />
    </g>
  ),
  TikTok: (
    <path
      fill="currentColor"
      d="M16.2 3c.27 2.02 1.5 3.55 3.55 3.86v2.27c-1.26.1-2.5-.27-3.55-.96v5.93c0 2.82-2.23 5.13-5.05 5.13S6.1 18.93 6.1 16.1s2.23-5.13 5.05-5.13c.28 0 .55.02.82.07v2.43c-.27-.09-.55-.14-.82-.14-1.49 0-2.66 1.2-2.66 2.7s1.17 2.7 2.66 2.7 2.66-1.2 2.66-2.7V3h2.39Z"
    />
  ),
};

// Список соцканалов. Текстовые ссылки с минималистичной иконкой-глифом.
export function Socials({
  className = "",
  lang,
}: {
  className?: string;
  lang: string;
}) {
  const socials = getSocials(lang);
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {socials.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-bone-muted transition-colors duration-300 hover:text-bone"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              aria-hidden
              className="shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            >
              {icons[s.key]}
            </svg>
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
