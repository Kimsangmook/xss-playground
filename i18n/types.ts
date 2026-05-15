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
    keywords: string[];
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
    intentHeading: string;
    intentBody: string[];
    threatsHeading: string;
    threatsIntro: string;
    threats: { title: string; body: string }[];
    referencesHeading: string;
    references: { label: string; href: string }[];
    scenariosHeading: string;
    scenariosIntro: string;
    howToUseHeading: string;
    howToUseSteps: string[];
    warningTitle: string;
    warningBody: string;
    contributingHeading: string;
    contributingBody: string[];
    contributingLinks: { label: string; href: string }[];
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
    embedSnippetDescription: string;
    embeddedBadge: string;
    htmlSurfaceTitle: string;
    domSurfaceTitle: string;
    surfaceDescription: string;
    sandboxPresetLabels: [string, string, string, string, string, string];
    copySnippet: string;
    copied: string;
  };
  scenarios: Record<
    string,
    {
      title: string;
      summary: string;
      body?: IScenarioBody;
    }
  >;
  categories: Record<string, string>;
}

/**
 * 각 시나리오 페이지가 사용하는 본문 데이터.
 * 페이지 코드와 키가 1:1 매칭됩니다. 4개 언어 dict 가 같은 키 구조를 유지해야 합니다.
 */
export interface IScenarioBody {
  /** "실행" 섹션 아래 버튼 라벨 */
  actionLabels?: Record<string, string>;
  /** push() 호출 시 출력할 로그 메시지 */
  logMessages?: Record<string, string>;
  /** "해설" 섹션의 bullet list */
  explanation?: string[];
  /** 기타 inline 텍스트 (placeholder, callout 등) */
  text?: Record<string, string>;
}
