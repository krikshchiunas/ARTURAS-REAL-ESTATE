/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────────────────────
// Content-Security-Policy. Разрешаем только свой домен + Google (Tag Manager,
// Analytics, Ads) и картинки Unsplash. Это главная защита от XSS: даже если
// кто-то внедрит чужой <script>, браузер его не выполнит.
//
// 'unsafe-inline' в script-src оставлен намеренно: Google Tag Manager
// динамически вставляет inline-скрипты, а nonce-подход с GTM ненадёжен.
// Защита всё равно работает — ограничивает загрузку скриптов доменами Google.
// ─────────────────────────────────────────────────────────────────────────────
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.google.com https://www.google.co.th https://googleads.g.doubleclick.net",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://tagmanager.google.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline' https://tagmanager.google.com https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://www.google.com https://googleads.g.doubleclick.net",
  "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://bid.g.doubleclick.net https://www.google.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Заголовки безопасности применяются ко всем маршрутам сайта.
const securityHeaders = [
  // Cross-Origin Opener Policy: изолирует вкладку от cross-origin попапов
  // (защита от Spectre-атак). same-origin-allow-popups нужен для Google Sign-In
  // и других OAuth-попапов.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // Cross-Origin Resource Policy: разрешаем загрузку ресурсов с этого домена
  // только одноимённым и cross-origin запросам (нужен Vercel CDN + GTM).
  { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
  // Заставляет браузер всегда ходить по HTTPS (защита от downgrade/MITM).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Запрещает браузеру «угадывать» тип файла (защита от MIME-sniffing атак).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Запрещает встраивать сайт в чужие <iframe> (защита от clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Не передавать полный URL-реферер на сторонние сайты.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Отключаем доступ к камере/микрофону/геолокации и FLoC-трекингу.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
