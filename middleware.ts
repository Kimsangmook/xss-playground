import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/types";

const LOCALE_RE = new RegExp(`^/(${LOCALES.join("|")})(/|$)`);

const detectLocale = (req: NextRequest) => {
  const accept = req.headers.get("accept-language") ?? "";
  // 단순 prefix 매칭: "ko-KR,en;q=0.9" → ko 가 먼저
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (LOCALES.includes(tag as (typeof LOCALES)[number])) {
      return tag as (typeof LOCALES)[number];
    }
  }
  return DEFAULT_LOCALE;
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 이미 locale prefix 있음
  if (LOCALE_RE.test(pathname)) return;

  // /embed/* 는 locale 무관 (iframe 전용)
  if (pathname.startsWith("/embed")) return;

  // 정적 자원, API 등 제외 (matcher 에서 1차 필터링 됨)
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // _next, api, 정적 파일(.*\..*), embed 는 제외
    "/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml|ads\\.txt|embed|.*\\..*).*)",
  ],
};
