import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Analytics } from "./Analytics";
import { GOOGLE, SITE_URL } from "@/lib/site";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "XSS Playground",
    template: "%s | XSS Playground",
  },
  description:
    "Open XSS testing playground with copyable iframe scenarios for sandbox, CSP, postMessage, phishing UI, and browser behavior checks.",
  applicationName: "XSS Playground",
  authors: [{ name: "Sangmook Kim" }],
  creator: "Sangmook Kim",
  publisher: "Sangmook Kim",
  category: "technology",
  keywords: [
    "XSS",
    "iframe",
    "sandbox",
    "CSP",
    "postMessage",
    "web security",
    "PoC",
  ],
  verification: GOOGLE.searchConsole
    ? { google: GOOGLE.searchConsole }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const EMBED_DETECTION = `
try { if (window.self !== window.top) document.documentElement.classList.add('embed'); }
catch (e) { document.documentElement.classList.add('embed'); }
`;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // middleware 에서 주입한 x-locale 헤더로 SSR 시점부터 html lang 을 정확히 잡는다.
  const headerLocale = headers().get("x-locale") as Locale | null;
  const lang =
    headerLocale && LOCALES.includes(headerLocale)
      ? headerLocale
      : DEFAULT_LOCALE;

  return (
    <html lang={lang}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: EMBED_DETECTION }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
