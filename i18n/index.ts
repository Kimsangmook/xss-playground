import { ko } from "./ko";
import { en } from "./en";
import { ja } from "./ja";
import { zh } from "./zh";
import type { IDictionary, Locale } from "./types";

export const DICTIONARIES: Record<Locale, IDictionary> = { ko, en, ja, zh };

/** locale dictionary + 영어 fallback merge */
export const getDictionary = (locale: Locale): IDictionary => {
  const d = DICTIONARIES[locale] ?? en;
  // scenarios 가 비어 있으면 en 에서 가져옴
  if (Object.keys(d.scenarios).length === 0) {
    return { ...d, scenarios: en.scenarios };
  }
  return d;
};

export * from "./types";
