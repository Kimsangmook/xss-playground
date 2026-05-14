import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      // iframe 임베드 전용 페이지는 검색 노출 의미 없음 + 검색결과로 들어와도 부모 컨텍스트가 없어서 동작 안 함
      disallow: ["/embed/"],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
