import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";

const LOCALE_RE = new RegExp(`^/(${LOCALES.join("|")})(/|$)`);

const detectLocaleFromAcceptLanguage = (req: NextRequest): Locale => {
  const accept = req.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (LOCALES.includes(tag as Locale)) return tag as Locale;
  }
  return DEFAULT_LOCALE;
};

const extractLocaleFromPath = (pathname: string): Locale | null => {
  const m = pathname.match(/^\/([a-z]{2})(?:\/|$)/i);
  if (!m) return null;
  const candidate = m[1].toLowerCase() as Locale;
  return LOCALES.includes(candidate) ? candidate : null;
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /embed/* 는 locale 무관 (iframe 전용). 그대로 통과시키되 헤더만 기본값으로.
  if (pathname.startsWith("/embed")) {
    const reqHeaders = new Headers(req.headers);
    reqHeaders.set("x-pathname", pathname);
    reqHeaders.set("x-locale", DEFAULT_LOCALE);
    return NextResponse.next({ request: { headers: reqHeaders } });
  }

  // locale prefix 가 이미 있는 경우 → 헤더만 주입해서 통과
  if (LOCALE_RE.test(pathname)) {
    const locale = extractLocaleFromPath(pathname) ?? DEFAULT_LOCALE;
    const reqHeaders = new Headers(req.headers);
    reqHeaders.set("x-pathname", pathname);
    reqHeaders.set("x-locale", locale);
    return NextResponse.next({ request: { headers: reqHeaders } });
  }

  // locale prefix 가 없으면 redirect
  const locale = detectLocaleFromAcceptLanguage(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml|ads\\.txt|.*\\..*).*)",
  ],
};
