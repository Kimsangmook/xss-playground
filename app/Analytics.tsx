import Script from "next/script";
import { GOOGLE } from "@/lib/site";

export const Analytics = () => {
  return (
    <>
      {GOOGLE.ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE.ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE.ga}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {GOOGLE.adsense && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE.adsense}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
};
