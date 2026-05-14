import type { Metadata } from "next";
import { Analytics } from "./Analytics";
import { GOOGLE, SITE_URL } from "@/lib/site";
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

const EMBED_DETECTION = `
try { if (window.self !== window.top) document.documentElement.classList.add('embed'); }
catch (e) { document.documentElement.classList.add('embed'); }
`;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: EMBED_DETECTION }} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
