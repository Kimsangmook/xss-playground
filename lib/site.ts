/**
 * 사이트 전역 설정. 환경변수로 채워지는 값들과 빌드타임 고정값을 한 곳에서.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xss-playground.vercel.app";

export const SITE_AUTHOR = {
  name: process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Sangmook Kim",
  role: "Frontend Engineer",
  email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL ?? "",
  github: process.env.NEXT_PUBLIC_AUTHOR_GITHUB ?? "Kimsangmook",
  profileImage: "/profile.jpg",
};

export const SOCIAL = {
  githubRepo: `https://github.com/${SITE_AUTHOR.github}/xss-playground`,
};

export const GOOGLE = {
  /** GA4 Measurement ID, 예: G-XXXXXXXXXX */
  ga: process.env.NEXT_PUBLIC_GA_ID ?? "",
  /** AdSense publisher ID, 예: ca-pub-1234567890 */
  adsense: process.env.NEXT_PUBLIC_ADSENSE_ID ?? "",
  /** Search Console verification meta content */
  searchConsole: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
};
