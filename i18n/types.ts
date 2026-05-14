export type Locale = "ko" | "en" | "ja" | "zh";

export const LOCALES: Locale[] = ["ko", "en", "ja", "zh"];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

export interface IDictionary {
  site: {
    name: string;
    tagline: string;
    description: string;
  };
  nav: {
    home: string;
    embedHelper: string;
    github: string;
  };
  home: {
    aboutHeading: string;
    aboutBody: string[];
    contact: string;
    scenariosHeading: string;
    scenariosIntro: string;
    howToUseHeading: string;
    howToUseSteps: string[];
    warningTitle: string;
    warningBody: string;
  };
  scenarioPage: {
    sandboxMatrix: string;
    policy: string;
    expectedResult: string;
    noSandbox: string;
    scriptsOnly: string;
    fullSandbox: string;
    sopBlocks: string;
    works: string;
    blocked: string;
    partial: string;
    actions: string;
    explanation: string;
    embedSnippet: string;
    copySnippet: string;
    copied: string;
  };
  scenarios: Record<string, { title: string; summary: string }>;
  categories: Record<string, string>;
}
