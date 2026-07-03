import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/i18n";
import { guideMeta, projectMeta } from "@/lib/i18n/meta";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${siteConfig.url}/${lang}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  }));
  const projects: MetadataRoute.Sitemap = locales.flatMap((lang) =>
    projectMeta.map((p) => ({
      url: `${siteConfig.url}/${lang}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );
  const guidesIndex: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${siteConfig.url}/${lang}/guides`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const guides: MetadataRoute.Sitemap = locales.flatMap((lang) =>
    guideMeta.map((g) => ({
      url: `${siteConfig.url}/${lang}/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  );
  return [...home, ...projects, ...guidesIndex, ...guides];
}
