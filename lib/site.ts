export const site = {
  name: "Arturas Real Estate",
  founder: "Артурас",
  tagline: "Недвижимость на Пхукете под ваши цели",
  region: "Пхукет, Таиланд",
  description:
    "Arturas Real Estate помогает выбрать недвижимость на Пхукете под личные цели: жизнь, образ жизни, сохранение капитала, арендный доход и долгосрочные инвестиции. Мы не продаём объекты — мы помогаем принять верное решение.",
  url: "https://arturas-realestate.example",
  locale: "ru_RU",
  // Основные каналы связи. CTA ведут в WhatsApp и Telegram.
  contacts: {
    whatsapp: "https://wa.me/380667808098",
    telegram: "https://t.me/arturas0788",
    telegramChannel: "https://t.me/arturas_invest",
    instagram:
      "https://www.instagram.com/arturas_krik?igsh=bjg5Y3hocm1ka2ph&utm_source=qr",
    youtube: "https://youtube.com/@arturas.k?si=vCGlkRzRy3Hk2JZy",
    tiktok: "https://www.tiktok.com/@arturas_krik?_r=1&_t=ZG-96WU3EI43P6",
  },
  nav: [
    { label: "Подход", href: "#approach" },
    { label: "Проекты", href: "#projects" },
    { label: "Обо мне", href: "#founder" },
    { label: "Сервис", href: "#services" },
    { label: "Контакт", href: "#contact" },
  ],
} as const;

// Соцканалы для футера и блока основателя.
export const socials = [
  { label: "WhatsApp", href: site.contacts.whatsapp },
  { label: "Telegram", href: site.contacts.telegram },
  { label: "Telegram канал", href: site.contacts.telegramChannel },
  { label: "Instagram", href: site.contacts.instagram },
  { label: "YouTube", href: site.contacts.youtube },
  { label: "TikTok", href: site.contacts.tiktok },
] as const;
