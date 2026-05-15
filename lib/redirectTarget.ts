import type { Locale } from "@/i18n/types";

export const buildRedirectTarget = (
  origin: string,
  locale: Locale,
  from: string,
  extra: Record<string, string | number | boolean | undefined> = {},
) => {
  const params = new URLSearchParams({ from });
  for (const [key, value] of Object.entries(extra)) {
    if (value !== undefined) params.set(key, String(value));
  }
  return `${origin}/${locale}/redirected?${params.toString()}`;
};
