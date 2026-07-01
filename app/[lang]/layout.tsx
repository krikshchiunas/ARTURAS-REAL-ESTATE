import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
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

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext", "cyrillic-ext"],
  display: "swap",
  variable: "--font-sans",
});

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
    name: siteConfig.name,
    description: t.meta.description,
    url: `${siteConfig.url}/${lang}`,
    founder: { "@type": "Person", name: siteConfig.founder },
    areaServed: { "@type": "Place", name: t.meta.region },
    sameAs: [
      siteConfig.contacts.instagram,
      siteConfig.contacts.youtube,
      siteConfig.contacts.tiktok,
      siteConfig.contacts.telegramChannel,
    ],
    priceRange: "$$$",
  };

  return (
    <html
      lang={htmlLang[lang]}
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
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
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingWhatsApp lang={lang} />
        <Analytics />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
