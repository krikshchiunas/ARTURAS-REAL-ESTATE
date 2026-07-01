// Языко-НЕЗАВИСИМЫЕ данные сайта: ссылки, имена брендов, пути к картинкам,
// порядок объектов и услуг, раскладка bento. Тексты — в файлах локалей.

// Боевой адрес сайта. На Vercel задаётся переменной NEXT_PUBLIC_SITE_URL
// (Production Domain). Пока она не задана — используется заглушка, чтобы сборка
// и метаданные не падали. ВАЖНО для рекламы/SEO: до запуска кампаний задать
// реальный домен в переменных окружения Vercel.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://arturas-realestate.example";

// Номер WhatsApp в международном формате без "+" — для ссылок wa.me.
const WHATSAPP_NUMBER = "380667808098";

// Бренд и каналы связи. Не переводятся.
export const siteConfig = {
  name: "Arturas Real Estate",
  founder: "Артурас",
  url: SITE_URL,
  contacts: {
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
    telegram: "https://t.me/arturas0788",
    telegramChannel: "https://t.me/arturas_invest",
    instagram:
      "https://www.instagram.com/arturas_krik?igsh=bjg5Y3hocm1ka2ph&utm_source=qr",
    youtube: "https://youtube.com/@arturas.k?si=vCGlkRzRy3Hk2JZy",
    tiktok: "https://www.tiktok.com/@arturas_krik?_r=1&_t=ZG-96WU3EI43P6",
  },
} as const;

// Ссылка на WhatsApp с предзаполненным текстом первого сообщения.
// Предзаполненное сообщение заметно повышает конверсию в диалог: человеку не
// нужно ничего печатать, а агент сразу видит контекст (какой объект/страница).
export function whatsappHref(message?: string): string {
  const base = siteConfig.contacts.whatsapp;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

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
  {
    slug: "balcony",
    image: "/projects/balcony.jpg",
    gallery: [
      "/projects/balcony/01-beach-landscape.jpg",
      "/projects/balcony/02-beachfront-pool.jpg",
      "/projects/balcony/03-laguna-zone.jpg",
      "/projects/balcony/04-foresta-jacuzzi.jpg",
      "/projects/balcony/05-salute-bar.jpg",
      "/projects/balcony/06-lobby-lounge.jpg",
      "/projects/balcony/07-sauna-onsen.jpg",
      "/projects/balcony/08-playroom.jpg",
    ],
  },
  {
    slug: "serenity",
    image: "/projects/serenity.jpg",
    gallery: [
      "/projects/serenity/01-aerial.jpg",
      "/projects/serenity/02-naiyang-beach.jpg",
      "/projects/serenity/03-lobby.jpg",
      "/projects/serenity/04-rooftop-pool.jpg",
      "/projects/serenity/05-greenery.jpg",
      "/projects/serenity/06-coworking.jpg",
      "/projects/serenity/07-location.jpg",
    ],
  },
  {
    slug: "olive",
    image: "/projects/olive.jpg",
    gallery: [
      "/projects/olive/01-olive-grove.jpg",
      "/projects/olive/02-exterior.jpg",
      "/projects/olive/03-rooftop-pool.jpg",
      "/projects/olive/04-pool-lounge.jpg",
      "/projects/olive/05-location.jpg",
    ],
  },
  {
    slug: "gardens-of-eden",
    image: "/projects/gardens-of-eden.jpg",
    gallery: [
      "/projects/gardens-of-eden/01-aerial.jpg",
      "/projects/gardens-of-eden/02-lagoon-pool.jpg",
      "/projects/gardens-of-eden/03-sunset-terrace.jpg",
      "/projects/gardens-of-eden/04-residences-pool.jpg",
      "/projects/gardens-of-eden/05-living.jpg",
      "/projects/gardens-of-eden/06-bedroom.jpg",
      "/projects/gardens-of-eden/07-beachfront.jpg",
    ],
  },
  {
    slug: "layan-green-park",
    image: "/projects/layan-green-park.jpg",
    gallery: [
      "/projects/layan-green-park/01-exterior.jpg",
      "/projects/layan-green-park/02-pool.jpg",
      "/projects/layan-green-park/03-lobby.jpg",
      "/projects/layan-green-park/04-living.jpg",
      "/projects/layan-green-park/05-bedroom.jpg",
      "/projects/layan-green-park/06-amenities.jpg",
      "/projects/layan-green-park/07-location.jpg",
    ],
  },
  {
    slug: "layan-verde",
    image: "/projects/layan-verde.jpg",
    gallery: [
      "/projects/layan-verde/01-aerial.jpg",
      "/projects/layan-verde/02-pool.jpg",
      "/projects/layan-verde/03-rooftop.jpg",
      "/projects/layan-verde/04-living.jpg",
      "/projects/layan-verde/05-bedroom.jpg",
      "/projects/layan-verde/06-amenities.jpg",
      "/projects/layan-verde/07-nature.jpg",
    ],
  },
  {
    slug: "the-ozone",
    image: "/projects/the-ozone.jpg",
    gallery: [
      "/projects/the-ozone/01-exterior.jpg",
      "/projects/the-ozone/02-pool.jpg",
      "/projects/the-ozone/03-lobby.jpg",
      "/projects/the-ozone/04-living.jpg",
      "/projects/the-ozone/05-bedroom.jpg",
      "/projects/the-ozone/06-amenities.jpg",
    ],
  },
  {
    slug: "bellevue-beachfront",
    image: "/projects/bellevue-beachfront.jpg",
    gallery: [
      "/projects/bellevue-beachfront/01-exterior.jpg",
      "/projects/bellevue-beachfront/02-pool.jpg",
      "/projects/bellevue-beachfront/03-aerial.jpg",
      "/projects/bellevue-beachfront/04-living.jpg",
      "/projects/bellevue-beachfront/05-bedroom.jpg",
      "/projects/bellevue-beachfront/06-amenities.jpg",
      "/projects/bellevue-beachfront/07-beach.jpg",
    ],
  },
  {
    slug: "siamese-bangtao",
    image: "/projects/siamese-bangtao.jpg",
    gallery: [
      "/projects/siamese-bangtao/01-aerial.jpg",
      "/projects/siamese-bangtao/02-pool.jpg",
      "/projects/siamese-bangtao/03-exterior.jpg",
      "/projects/siamese-bangtao/04-wellness.jpg",
      "/projects/siamese-bangtao/05-golf.jpg",
      "/projects/siamese-bangtao/06-pet.jpg",
    ],
  },
];
