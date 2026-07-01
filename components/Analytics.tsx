"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

// Подключение Google-аналитики. Включается только когда заданы переменные
// окружения, поэтому в деве/без настройки ничего не грузится.
//   NEXT_PUBLIC_GA_ID   — GA4, например "G-XXXXXXX"
//   NEXT_PUBLIC_GTM_ID  — Google Tag Manager, например "GTM-XXXXXX"
// Достаточно задать одну из них (рекомендуется GTM — через него удобнее
// навесить и GA4, и конверсии Google Ads, и Meta Pixel без правок кода).
//
// Реализован Google Consent Mode v2: по умолчанию все согласия = denied
// (требование GDPR для трафика из ЕС/Германии). Баннер согласия (CookieConsent)
// поднимает их в granted после клика «Принять».
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function Analytics() {
  // Источник трафика фиксируем на первой странице визита.
  useEffect(() => {
    captureAttribution();
  }, []);

  if (!GA_ID && !GTM_ID) return null;

  return (
    <>
      {/* Consent Mode по умолчанию — запрет до согласия пользователя. */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>

      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

// Тег <noscript> для GTM рекомендуется ставить сразу после <body>.
export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
