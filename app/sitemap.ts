import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/types";
import { SCENARIOS } from "@/lib/scenarios";
import { SITE_URL } from "@/lib/site";

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const altLanguages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
    );

    // 홈
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: altLanguages },
    });

    // embed-helper
    entries.push({
      url: `${SITE_URL}/${locale}/embed-helper`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/embed-helper`])
        ),
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
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}/scenarios/${s.slug}`])
          ),
        },
      });
    }
  }

  return entries;
};

export default sitemap;
