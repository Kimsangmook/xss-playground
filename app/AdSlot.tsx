"use client";

import { useEffect, useRef } from "react";
import { GOOGLE } from "@/lib/site";

interface IAdSlotProps {
  slot: string;
  format?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdSlot = ({
  slot,
  format = "auto",
  responsive = true,
}: IAdSlotProps) => {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!GOOGLE.adsense) return;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      /* AdSense 미로딩 등 — 조용히 무시 */
    }
  }, []);

  if (!GOOGLE.adsense) return null;

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", margin: "20px 0" }}
      data-ad-client={GOOGLE.adsense}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
};
