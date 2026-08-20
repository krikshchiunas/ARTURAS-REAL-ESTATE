import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SoundProvider } from "@/components/SoundManager";
import { PageTransition } from "@/components/PageTransition";
import { Analytics, GtmNoScript } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { chromeDict } from "@/components/dict";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ChatChip } from "@/components/ChatChip";
import { BottomBar } from "@/components/BottomBar";
import { Preloader } from "@/components/Preloader";
import { HudFrame } from "@/components/HudFrame";
import {
  htmlLang,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary, siteConfig } from "@/lib/i18n";
import "../globals.css";

// Один гротеск на всё — Onest (геометрический, полная кириллица; свободный
// аналог Px Grotesk оригинала). Гигантские uppercase-заголовки и текст делят
// один шрифт: иерархию строят кегль и вес, а не смена гарнитуры.
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
  themeColor: "#020a19",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Edge-to-edge на iPhone: фон уходит под чёлку/индикатор,
  // отступы безопасных зон добавлены через env(safe-area-inset-*).
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
  const c = chromeDict(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: ["Arturas Krik Real Estate", "Артурас — недвижимость Пхукет"],
    description: t.meta.description,
    url: `${siteConfig.url}/${lang}/about`,
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
      <body className="bg-night text-offwhite selection:bg-royal selection:text-offwhite">
        <GtmNoScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[140] focus:border focus:border-offwhite/40 focus:bg-night focus:px-5 focus:py-3 focus:font-mono focus:text-11 focus:uppercase focus:tracking-4 focus:text-offwhite"
        >
          {t.a11y.skipToContent}
        </a>
        <SoundProvider>
          <SmoothScroll>
            <Preloader texts={c.preloader} />
            <HudFrame />
            <Header lang={lang} />
            {children}
            <Footer lang={lang} />
            {/* Desktop: постоянная нижняя HUD-полоса; mobile: компактный чип чата */}
            <BottomBar lang={lang} />
            <ChatChip lang={lang} label={c.chat} />
          </SmoothScroll>
          <PageTransition />
        </SoundProvider>
        <Cursor />
        <Analytics />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
