import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  Inter,
  Noto_Sans_Thai,
  Noto_Serif_Thai,
  Poiret_One,
} from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics, GtmNoScript } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  htmlLang,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary, siteConfig } from "@/lib/i18n";
import "../globals.css";

// Тройка: волосяной ар-деко для «скульптурных» моментов, нейтральный гротеск
// для текста, моно для клинических меток. Иерархию держит смена гарнитуры и
// огромная разница кеглей, а не пять оттенков серого.
//
// Poiret One существует в одном начертании и это осознанный выбор: у него нет
// «жирного», значит заголовок нельзя сделать громче весом — только размером и
// воздухом. Ровно та дисциплина, которой требует система.
const display = Poiret_One({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

// Тайский набор — отдельными шрифтами и намеренно без preload: у Playfair и
// Inter нет тайских глифов, но тянуть эти файлы в четырёх остальных локалях
// незачем. Браузер возьмёт их, только когда встретит тайский текст; порядок в
// font-family (tailwind.config.ts) ставит их сразу после основных, поэтому
// подмена идёт по глифам, а не по всему абзацу.
const displayThai = Noto_Serif_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-display-thai",
});

const sansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  display: "swap",
  preload: false,
  variable: "--font-sans-thai",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "ru";
  const t = getDictionary(lang).meta;
  const url = `${siteConfig.url}/${lang}`;

  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}`]),
  );
  languages["x-default"] = `${siteConfig.url}/ru`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t.homeTitle,
      template: `%s — ${siteConfig.name}`,
    },
    description: t.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url,
      siteName: siteConfig.name,
      title: t.homeTitle,
      description: t.description,
      images: [{ url: "/hero/hero-poster.jpg", width: 1280, height: 715 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.homeTitle,
      description: t.description,
      images: ["/hero/hero-poster.jpg"],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: url, languages },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0C0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Edge-to-edge на iPhone: фон уходит под чёлку и индикатор.
  viewportFit: "cover",
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = raw as Locale;
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: ["Arturas Krik Real Estate", "Артурас — недвижимость Пхукет"],
    description: t.meta.description,
    url: `${siteConfig.url}/${lang}`,
    logo: `${siteConfig.url}/hero/hero-poster.jpg`,
    image: `${siteConfig.url}/hero/hero-poster.jpg`,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: "Founder & Real Estate Advisor",
      image: `${siteConfig.url}/arturas.jpg`,
    },
    areaServed: [
      { "@type": "Place", name: t.meta.region },
      { "@type": "Place", name: "Phuket, Thailand" },
      { "@type": "Place", name: "Bang Tao" },
      { "@type": "Place", name: "Layan" },
      { "@type": "Place", name: "Nai Yang" },
      { "@type": "Place", name: "Laguna Phuket" },
      { "@type": "Place", name: "Cherng Talay" },
    ],
    knowsAbout: [
      "Phuket real estate",
      "Off-plan condominiums in Thailand",
      "Hotel-managed residences",
      "Rental yield modelling",
      "Freehold and leasehold structures for foreign buyers in Thailand",
      "Relocation to Thailand",
      "Property management in Phuket",
    ],
    knowsLanguage: ["ru", "uk", "en", "de", "th"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["Russian", "Ukrainian", "English", "German", "Thai"],
        url: siteConfig.contacts.whatsapp,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: siteConfig.contacts.telegram,
      },
    ],
    sameAs: [
      siteConfig.contacts.instagram,
      siteConfig.contacts.youtube,
      siteConfig.contacts.tiktok,
      siteConfig.contacts.telegramChannel,
      siteConfig.contacts.telegram,
    ],
    priceRange: "$$$",
    slogan: t.meta.tagline,
  };

  return (
    <html
      lang={htmlLang[lang]}
      className={`${display.variable} ${sans.variable} ${mono.variable} ${displayThai.variable} ${sansThai.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-bone">
        {/* Помечаем документ как «скрипты работают» ДО первой отрисовки:
            только под этим классом появляющиеся блоки стартуют прозрачными
            (см. .js .reveal-init в globals.css). Инлайн и синхронно —
            иначе между отрисовкой и гидратацией контент мигнёт. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <GtmNoScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:rounded-control focus:bg-gold focus:px-5 focus:py-3 focus:text-micro focus:font-medium focus:text-ink"
        >
          {t.a11y.skipToContent}
        </a>
        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
        <Analytics />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
