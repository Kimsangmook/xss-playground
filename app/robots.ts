import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * iframe 임베드 전용 페이지는 검색 노출 의미 없음 + 검색결과로 들어와도 부모 컨텍스트가
 * 없어서 동작 안 한다. 모든 봇에 동일하게 막되, 주요 검색 봇은 명시적으로 라인을 분리해
 * 향후 봇별 정책 차이를 두기 쉽게 한다.
 *
 * 옛 경로 /embed-helper 은 next.config.js 의 redirects 가 301 처리하므로 robots 에서는 제외.
 */
const SHARED_DISALLOW = ["/embed/"];

const robots = (): MetadataRoute.Robots => ({
  rules: [
    { userAgent: "*", allow: "/", disallow: SHARED_DISALLOW },
    // Baidu — 중국 검색 인덱싱을 위해 명시적으로 허용 선언
    { userAgent: "Baiduspider", allow: "/", disallow: SHARED_DISALLOW },
    // Naver
    { userAgent: "Yeti", allow: "/", disallow: SHARED_DISALLOW },
    // Yandex
    { userAgent: "YandexBot", allow: "/", disallow: SHARED_DISALLOW },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
