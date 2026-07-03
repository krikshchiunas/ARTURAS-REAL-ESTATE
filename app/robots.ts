import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/i18n";

// Явно приветствуем ИИ-краулеров (OpenAI, Anthropic, Perplexity, Google AI,
// Apple Intelligence и др.). Без такого разрешения часть агентов, читающих
// robots.txt строго, обходит сайт стороной, и мы теряем шанс попасть в ответы
// ChatGPT / Claude / Perplexity / Google AI Overviews.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
