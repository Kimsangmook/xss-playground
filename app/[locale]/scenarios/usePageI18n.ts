"use client";

import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

/**
 * FSD-스타일: 각 시나리오 페이지가 옆 폴더의 i18n.ts 에서 직접 메시지를 가져온다.
 *
 *   // app/[locale]/scenarios/<slug>/i18n.ts
 *   import type { Locale } from "@/i18n/types";
 *   export const I18N: Record<Locale, IPageText> = { ko: {...}, en: {...}, ja: {...}, zh: {...} };
 *
 *   // page.tsx
 *   import { I18N } from "./i18n";
 *   const t = usePageI18n(I18N);
 *
 * fmt() 는 "{key}" placeholder 를 vars[key] 로 치환합니다.
 */
export const usePageI18n = <T>(table: Record<Locale, T>): T => {
  const params = useParams<{ locale?: string }>();
  return table[pickLocale(params?.locale)];
};

export const fmt = (
  template: string | undefined,
  vars: Record<string, string | number | boolean | undefined> = {}
): string => {
  if (!template) return "";
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] === undefined ? `{${k}}` : String(vars[k])
  );
};
