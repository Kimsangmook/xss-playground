import { ko } from "./ko";
import { en } from "./en";
import { ja } from "./ja";
import { zh } from "./zh";
import type { IDictionary, IScenarioBody, Locale } from "./types";

export const DICTIONARIES: Record<Locale, IDictionary> = { ko, en, ja, zh };

const mergeScenarios = (
  primary: IDictionary["scenarios"],
  fallback: IDictionary["scenarios"]
): IDictionary["scenarios"] => {
  const merged: IDictionary["scenarios"] = { ...fallback };
  for (const [slug, meta] of Object.entries(primary)) {
    const fb = fallback[slug];
    merged[slug] = {
      title: meta.title || fb?.title || slug,
      summary: meta.summary || fb?.summary || "",
      body: mergeScenarioBody(meta.body, fb?.body),
    };
  }
  return merged;
};

const mergeScenarioBody = (
  primary: IScenarioBody | undefined,
  fallback: IScenarioBody | undefined
): IScenarioBody | undefined => {
  if (!primary && !fallback) return undefined;
  return {
    actionLabels: {
      ...(fallback?.actionLabels ?? {}),
      ...(primary?.actionLabels ?? {}),
    },
    logMessages: {
      ...(fallback?.logMessages ?? {}),
      ...(primary?.logMessages ?? {}),
    },
    explanation:
      primary?.explanation && primary.explanation.length > 0
        ? primary.explanation
        : fallback?.explanation ?? [],
    text: {
      ...(fallback?.text ?? {}),
      ...(primary?.text ?? {}),
    },
  };
};

/**
 * locale dictionary + 영어 fallback merge.
 * 시나리오 메타와 body 가 비어 있으면 영어로 fallback.
 */
export const getDictionary = (locale: Locale): IDictionary => {
  const d = DICTIONARIES[locale] ?? en;
  if (locale === "en") return d;
  const merged: IDictionary = {
    ...d,
    scenarios: mergeScenarios(d.scenarios, en.scenarios),
  };
  return merged;
};

export * from "./types";
