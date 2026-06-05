// Языко-НЕЗАВИСИМЫЕ данные сайта: ссылки, имена брендов, пути к картинкам,
// порядок объектов и услуг, раскладка bento. Тексты — в файлах локалей.

// Бренд и каналы связи. Не переводятся.
export const siteConfig = {
  name: "Arturas Real Estate",
  founder: "Артурас",
  url: "https://arturas-realestate.example",
  contacts: {
    whatsapp: "https://wa.me/380667808098",
    telegram: "https://t.me/arturas0788",
    telegramChannel: "https://t.me/arturas_invest",
    instagram:
      "https://www.instagram.com/arturas_krik?igsh=bjg5Y3hocm1ka2ph&utm_source=qr",
    youtube: "https://youtube.com/@arturas.k?si=vCGlkRzRy3Hk2JZy",
    tiktok: "https://www.tiktok.com/@arturas_krik?_r=1&_t=ZG-96WU3EI43P6",
  },
} as const;

// Соцканалы: стабильный key (для иконки) + href. Label берётся из словаря,
// но у брендов он один на всех языках (кроме «Telegram канал»).
export const socialChannels = [
  { key: "WhatsApp", href: siteConfig.contacts.whatsapp },
  { key: "Telegram", href: siteConfig.contacts.telegram },
  { key: "TelegramChannel", href: siteConfig.contacts.telegramChannel },
  { key: "Instagram", href: siteConfig.contacts.instagram },
  { key: "YouTube", href: siteConfig.contacts.youtube },
  { key: "TikTok", href: siteConfig.contacts.tiktok },
] as const;

// Порядок и медиа услуг. Тексты (title/body) — в локалях по key.
export const serviceMeta: {
  key: string;
  span: string;
  image?: string;
}[] = [
  {
    key: "selection",
    span: "md:col-span-3 md:row-span-2",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  },
  { key: "deal", span: "md:col-span-3" },
  { key: "analysis", span: "md:col-span-3" },
  { key: "developer", span: "md:col-span-2" },
  { key: "management", span: "md:col-span-2" },
  { key: "rental", span: "md:col-span-2" },
  {
    key: "relocation",
    span: "md:col-span-6",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=80",
  },
];

// Порядок и медиа объектов. Тексты — в локалях по slug.
export const projectMeta: {
  slug: string;
  image: string;
  gallery: string[];
}[] = [
  {
    slug: "silhouette",
    image: "/projects/silhouette.jpg",
    gallery: [
      "/projects/silhouette/01-aerial.jpg",
      "/projects/silhouette/02-exterior.jpg",
      "/projects/silhouette/03-rooftop.jpg",
      "/projects/silhouette/04-suite-living.jpg",
      "/projects/silhouette/05-2bed-living.jpg",
      "/projects/silhouette/06-1bed-living.jpg",
      "/projects/silhouette/07-studio.jpg",
    ],
  },
  {
    slug: "ayana-heights",
    image: "/projects/ayana.jpg",
    gallery: [
      "/projects/ayana/01-aerial.jpg",
      "/projects/ayana/02-exterior.jpg",
      "/projects/ayana/03-park.jpg",
      "/projects/ayana/04-exterior.jpg",
      "/projects/ayana/05-fitness.jpg",
      "/projects/ayana/06-lobby.jpg",
      "/projects/ayana/07-coworking.jpg",
    ],
  },
  {
    slug: "sun-hills-layan",
    image: "/projects/sunhills-layan.jpg",
    gallery: [
      "/projects/sunhills-layan/01-exterior.jpg",
      "/projects/sunhills-layan/02-exterior.jpg",
      "/projects/sunhills-layan/03-pool.jpg",
      "/projects/sunhills-layan/04-terrace.jpg",
      "/projects/sunhills-layan/05-fitness.jpg",
      "/projects/sunhills-layan/06-restaurant.jpg",
      "/projects/sunhills-layan/07-lobby.jpg",
      "/projects/sunhills-layan/08-kids.jpg",
    ],
  },
  {
    slug: "sun-hills-lakeside",
    image: "/projects/lakeside.jpg",
    gallery: [
      "/projects/lakeside/01-exterior.jpg",
      "/projects/lakeside/02-exterior.jpg",
      "/projects/lakeside/03-aerial.jpg",
      "/projects/lakeside/04-pool.jpg",
      "/projects/lakeside/05-interior.jpg",
      "/projects/lakeside/06-interior.jpg",
      "/projects/lakeside/07-interior.jpg",
    ],
  },
];
