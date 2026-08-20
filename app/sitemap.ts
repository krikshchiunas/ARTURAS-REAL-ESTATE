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
  // Разделы верхнего уровня. Карта — тот же реестр объектов, но в 3D, поэтому
  // приоритет чуть ниже списка.
  const sections: MetadataRoute.Sitemap = locales.flatMap((lang) =>
    [
      { path: "projects", priority: 0.9 },
      { path: "about", priority: 0.8 },
      { path: "contact", priority: 0.8 },
      { path: "map", priority: 0.7 },
    ].map((s) => ({
      url: `${siteConfig.url}/${lang}/${s.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.priority,
    })),
  );
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
  return [...home, ...sections, ...projects, ...guidesIndex, ...guides];
}
