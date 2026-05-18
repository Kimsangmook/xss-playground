"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";

const DEFAULT_MAX_LOG_LINES = 120;

export const useLog = (maxLines = DEFAULT_MAX_LOG_LINES) => {
  const [lines, setLines] = useState<string[]>([]);
  const push = (msg: string) => {
    const time = new Date().toISOString().slice(11, 19);
    setLines(prev => [...prev, `[${time}] ${msg}`].slice(-maxLines));
  };
  const clear = () => setLines([]);
  return { lines, push, clear };
};

interface ILogProps {
  lines: string[];
}

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

const EMPTY_LOG: Record<Locale, string> = {
  ko: "// 로그 없음",
  en: "// no logs",
  ja: "// ログなし",
  zh: "// 无日志",
};

export const Log = ({ lines }: ILogProps) => {
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);
  return (
    <div ref={ref} className="log">
      {lines.length === 0 ? EMPTY_LOG[locale] : lines.join("\n")}
    </div>
  );
};
