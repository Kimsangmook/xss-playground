"use client";

import { useParams } from "next/navigation";
import { getDictionary } from "@/i18n";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";
import { getScenarioI18n } from "./i18nRegistry";

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

/** "{key}" placeholder 를 vars[key] 로 치환 */
export const fmt = (
  template: string | undefined,
  vars: Record<string, string | number | boolean | undefined> = {}
): string => {
  if (!template) return "";
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] === undefined ? `{${k}}` : String(vars[k])
  );
};

interface IUseScenarioBody {
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
  scenarioPage: ReturnType<typeof getDictionary>["scenarioPage"];
  actions: (key: string) => string;
  log: (
    key: string,
    vars?: Record<string, string | number | boolean>
  ) => string;
  text: (key: string) => string;
  explanation: string[];
}

export const useScenarioBody = (slug: string): IUseScenarioBody => {
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const dict = getDictionary(locale);
  const body = getScenarioI18n(locale, slug);

  return {
    locale,
    dict,
    scenarioPage: dict.scenarioPage,
    actions: key => body?.actionLabels?.[key] ?? key,
    log: (key, vars = {}) => fmt(body?.logMessages?.[key], vars),
    text: key => body?.text?.[key] ?? "",
    explanation: body?.explanation ?? [],
  };
};
