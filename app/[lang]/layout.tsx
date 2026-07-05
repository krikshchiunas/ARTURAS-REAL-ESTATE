import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SoundProvider } from "@/components/redesign/SoundManager";
import { PageTransition } from "@/components/redesign/PageTransition";
import { Ambient } from "@/components/Ambient";
import { Grain } from "@/components/Grain";
import { Analytics, GtmNoScript } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  htmlLang,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary, siteConfig } from "@/lib/i18n";
import "../globals.css";

// Редизайн (hubtown-style): один гротеск на всё — Onest (геометрический,
// полная кириллица; свободный аналог Px Grotesk оригинала). --font-display
// указывает на него же: гигантские uppercase-заголовки и текст делит один шрифт,
// иерархию строят кегль и вес, как в референсе.
const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "ru";
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
    },
    twitter: {
      card: "summary_large_image",
      title: t.homeTitle,
      description: t.description,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: url, languages },
  };
}

export const viewport: Viewport = {
  themeColor: "#08080A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Edge-to-edge на iPhone: фон уходит под чёлку/индикатор,
  // отступы безопасных зон добавлены через env(safe-area-inset-*).
  viewportFit: "cover",
};

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: ["Arturas Krik Real Estate", "Артурас — недвижимость Пхукет"],
    description: t.meta.description,
    url: `${siteConfig.url}/${lang}`,
    logo: `${siteConfig.url}/hero-poster.jpg`,
    image: `${siteConfig.url}/hero-poster.jpg`,
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
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <GtmNoScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:glass focus:rounded-full focus:px-5 focus:py-2 focus:text-sm"
        >
          {t.a11y.skipToContent}
        </a>
        <Ambient />
        <Grain />
        <SoundProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <PageTransition />
        </SoundProvider>
        <FloatingWhatsApp lang={lang} />
        <Analytics />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
