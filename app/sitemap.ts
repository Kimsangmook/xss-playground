import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/types";
import { SCENARIOS } from "@/lib/scenarios";
import { SITE_URL } from "@/lib/site";

const languageAlternates = (path = "") =>
  Object.fromEntries([
    ...LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ["x-default", `${SITE_URL}/${DEFAULT_LOCALE}${path}`],
  ]);

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // 홈
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: languageAlternates() },
    });

    // embed-helper
    entries.push({
      url: `${SITE_URL}/${locale}/embed-helper`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: languageAlternates("/embed-helper"),
      },
    });

    // 시나리오 페이지들
    for (const s of SCENARIOS) {
      entries.push({
        url: `${SITE_URL}/${locale}/scenarios/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: languageAlternates(`/scenarios/${s.slug}`),
        },
      });
    }
  }

  return entries;
};

export default sitemap;
