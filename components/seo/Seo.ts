import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";
import { getScenarioI18n } from "@/app/[locale]/scenarios/i18nRegistry";
import { findScenario } from "@/lib/scenarios";
import { SITE_AUTHOR, SITE_URL } from "@/lib/site";

export type TRobots =
  | "index, follow"
  | "index, nofollow"
  | "noindex, follow"
  | "noindex, nofollow";

const OG_LOCALE: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
};

const SITE_IMAGE_PATH = "/profile.jpg";

const getSiteUrl = (path = "") => `${SITE_URL}${path}`;

const getLocalizedUrl = (locale: Locale, path = "") =>
  `${SITE_URL}/${locale}${path}`;

const getImageUrl = (path = SITE_IMAGE_PATH) =>
  path.startsWith("http") ? path : getSiteUrl(path);

const getRobots = (robots: TRobots): Metadata["robots"] => ({
  index: robots.includes("index") && !robots.includes("noindex"),
  follow: robots.includes("follow") && !robots.includes("nofollow"),
  googleBot: {
    index: robots.includes("index") && !robots.includes("noindex"),
    follow: robots.includes("follow") && !robots.includes("nofollow"),
  },
});

const getAbsoluteMetadataTitle = (metadata: Metadata, fallback: string) => {
  const title = metadata.title;
  if (typeof title === "string") return title;
  if (
    title &&
    typeof title === "object" &&
    "absolute" in title &&
    typeof title.absolute === "string"
  ) {
    return title.absolute;
  }
  return fallback;
};

const getTitle = ({
  locale,
  title,
  absoluteTitle,
}: {
  locale: Locale;
  title?: string;
  absoluteTitle?: string;
}) => {
  const dict = getDictionary(locale);
  if (absoluteTitle) return absoluteTitle;
  if (!title || title === dict.site.name) {
    return `${dict.site.name} - ${dict.site.tagline}`;
  }
  return `${title} | ${dict.site.name}`;
};

export const buildLanguageAlternates = (path = "") =>
  Object.fromEntries([
    ...LOCALES.map((locale) => [locale, getLocalizedUrl(locale, path)]),
    ["x-default", getLocalizedUrl(DEFAULT_LOCALE, path)],
  ]);

interface ISeoMetadataProps {
  locale: Locale;
  path?: string;
  title?: string;
  absoluteTitle?: string;
  description?: string;
  keywords?: string[];
  imagePath?: string;
  robots?: TRobots;
}

export const createSeoMetadata = ({
  locale,
  path = "",
  title,
  absoluteTitle,
  description,
  keywords,
  imagePath = SITE_IMAGE_PATH,
  robots = "index, follow",
}: ISeoMetadataProps): Metadata => {
  const dict = getDictionary(locale);
  const resolvedTitle = getTitle({ locale, title, absoluteTitle });
  const resolvedDescription = description ?? dict.site.description;
  const url = getLocalizedUrl(locale, path);
  const imageUrl = getImageUrl(imagePath);

  return {
    title: { absolute: resolvedTitle },
    description: resolvedDescription,
    keywords: keywords ?? dict.site.keywords,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: dict.site.name,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
      type: "website",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl],
    },
    robots: getRobots(robots),
  };
};

export const createLocaleBaseMetadata = (locale: Locale): Metadata => {
  const dict = getDictionary(locale);

  return {
    title: {
      default: `${dict.site.name} - ${dict.site.tagline}`,
      template: `%s | ${dict.site.name}`,
    },
    description: dict.site.description,
    keywords: dict.site.keywords,
    applicationName: dict.site.name,
    authors: [{ name: SITE_AUTHOR.name }],
    creator: SITE_AUTHOR.name,
    publisher: SITE_AUTHOR.name,
    category: "technology",
    openGraph: {
      siteName: dict.site.name,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
      type: "website",
      images: [{ url: getImageUrl() }],
    },
    twitter: {
      card: "summary_large_image",
      images: [getImageUrl()],
    },
    robots: getRobots("index, follow"),
  };
};

export const createHomeSeoMetadata = (locale: Locale) => {
  const dict = getDictionary(locale);
  return createSeoMetadata({
    locale,
    absoluteTitle: `${dict.site.name} - ${dict.site.tagline}`,
    description: dict.site.description,
  });
};

export const createEmbedHelperSeoMetadata = (locale: Locale) => {
  const dict = getDictionary(locale);
  const titleByLocale: Record<Locale, string> = {
    ko: "부모 페이지 임베드 헬퍼",
    en: "Parent Embed Helper",
    ja: "親ページ Embed Helper",
    zh: "父页面 Embed Helper",
  };
  const descriptionByLocale: Record<Locale, string> = {
    ko: "XSS Playground 시나리오를 부모 페이지 안에 임베드하고 sandbox 정책별 브라우저 동작과 postMessage 로그를 비교하는 테스트 헬퍼입니다.",
    en: "Embed XSS Playground scenarios inside a parent page and compare browser behavior, sandbox policies, and postMessage logs.",
    ja: "XSS Playground のシナリオを親ページ内に埋め込み、sandbox ポリシーと postMessage ログを比較するテストヘルパーです。",
    zh: "将 XSS Playground 场景嵌入父页面，并比较 sandbox 策略、浏览器行为与 postMessage 日志。",
  };

  return createSeoMetadata({
    locale,
    path: "/embed-helper",
    title: titleByLocale[locale],
    description: descriptionByLocale[locale],
    keywords: [...dict.site.keywords, "iframe helper", "sandbox test"],
  });
};

export const createLearnSeoMetadata = (locale: Locale) => {
  const dict = getDictionary(locale);
  const titleByLocale: Record<Locale, string> = {
    ko: "XSS 학습 노트와 방어 체크리스트",
    en: "XSS Learning Notes and Defense Checklist",
    ja: "XSS 学習ノートと防御チェックリスト",
    zh: "XSS 学习笔记与防护清单",
  };
  const descriptionByLocale: Record<Locale, string> = {
    ko: "PayloadsAllTheThings, OWASP, MDN 자료를 바탕으로 XSS 공격 표면과 방어 정책을 실무 체크리스트로 정리한 학습 페이지입니다.",
    en: "A practical XSS learning page that summarizes attack surfaces and defense policies from PayloadsAllTheThings, OWASP, and MDN.",
    ja: "PayloadsAllTheThings、OWASP、MDN を参考に XSS の攻撃面と防御ポリシーを実務チェックリストとして整理した学習ページです。",
    zh: "基于 PayloadsAllTheThings、OWASP 与 MDN 整理 XSS 攻击面和防护策略的实践学习页。",
  };

  return createSeoMetadata({
    locale,
    path: "/learn",
    title: titleByLocale[locale],
    description: descriptionByLocale[locale],
    keywords: [
      ...dict.site.keywords,
      "XSS checklist",
      "PayloadsAllTheThings",
      "OWASP XSS Prevention",
      "DOM XSS prevention",
    ],
  });
};

export const createForumSeoMetadata = (locale: Locale) => {
  const dict = getDictionary(locale);
  const titleByLocale: Record<Locale, string> = {
    ko: "XSS 방어 포럼",
    en: "XSS Defense Forum",
    ja: "XSS 防御フォーラム",
    zh: "XSS 防护论坛",
  };
  const descriptionByLocale: Record<Locale, string> = {
    ko: "GitHub Issues 를 포럼처럼 사용해 XSS 대응 경험, DOMPurify 정책, iframe embed allowlist, 프로필 렌더링 이슈를 논의합니다.",
    en: "Use GitHub Issues as a forum for XSS defense stories, DOMPurify policy, iframe embed allowlists, and profile-rendering risks.",
    ja: "GitHub Issues をフォーラムとして使い、XSS 防御経験、DOMPurify policy、iframe embed allowlist、profile rendering risk を議論します。",
    zh: "使用 GitHub Issues 作为论坛，讨论 XSS 防护经验、DOMPurify 策略、iframe embed allowlist 与资料渲染风险。",
  };

  return createSeoMetadata({
    locale,
    path: "/forum",
    title: titleByLocale[locale],
    description: descriptionByLocale[locale],
    keywords: [
      ...dict.site.keywords,
      "XSS forum",
      "DOMPurify",
      "iframe allowlist",
      "security discussion",
    ],
  });
};

export const createRedirectedSeoMetadata = (locale: Locale) => {
  const titleByLocale: Record<Locale, string> = {
    ko: "리다이렉트 테스트 도착 페이지",
    en: "Redirect Test Target",
    ja: "Redirect Test Target",
    zh: "Redirect Test Target",
  };
  const descriptionByLocale: Record<Locale, string> = {
    ko: "XSS Playground 의 top.location, delayed attack, chained attack 테스트가 외부 example.com 대신 도착하는 내부 페이지입니다.",
    en: "The internal target page used by XSS Playground top.location, delayed attack, and chained attack tests instead of external example.com.",
    ja: "XSS Playground の top.location、delayed attack、chained attack が外部 example.com の代わりに到達する内部ページです。",
    zh: "XSS Playground 的 top.location、delayed attack、chained attack 测试会到达此内部页面，而非外部 example.com。",
  };

  return createSeoMetadata({
    locale,
    path: "/redirected",
    title: titleByLocale[locale],
    description: descriptionByLocale[locale],
    robots: "noindex, nofollow",
  });
};

export const createScenarioSeoMetadata = (locale: Locale, slug: string) => {
  const dict = getDictionary(locale);
  const scenario = findScenario(slug);
  const meta = getScenarioI18n(locale, slug) ?? scenario;

  if (!scenario || !meta) return createHomeSeoMetadata(locale);

  return createSeoMetadata({
    locale,
    path: `/scenarios/${slug}`,
    title: meta.title,
    description: meta.summary,
    keywords: [
      ...dict.site.keywords,
      meta.title,
      scenario.category,
      "XSS scenario",
      "security test",
    ],
  });
};

export const createEmbedSeoMetadata = (slug: string): Metadata => {
  const scenario = findScenario(slug);
  const meta = getScenarioI18n(DEFAULT_LOCALE, slug) ?? scenario;
  const title = meta
    ? `${meta.title} embed | XSS Playground`
    : "Embed scenario | XSS Playground";

  return {
    title: { absolute: title },
    description:
      meta?.summary ??
      "Embeddable XSS Playground scenario for authorized security testing.",
    robots: getRobots("noindex, nofollow"),
  };
};

export const createHomeJsonLd = (locale: Locale) => {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.site.name,
    url: getLocalizedUrl(locale),
    description: dict.site.description,
    inLanguage: locale,
    image: getImageUrl(),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR.name,
      jobTitle: SITE_AUTHOR.role,
      url: `https://github.com/${SITE_AUTHOR.github}`,
    },
  };
};

export const createScenarioJsonLd = (locale: Locale, slug: string) => {
  const dict = getDictionary(locale);
  const scenario = findScenario(slug);
  const meta = scenario ? (getScenarioI18n(locale, slug) ?? scenario) : null;
  const url = getLocalizedUrl(locale, `/scenarios/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title ?? "XSS Playground scenario",
    url,
    description: meta?.summary ?? dict.site.description,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: dict.site.name,
      url: getLocalizedUrl(locale),
    },
    about: scenario
      ? {
          "@type": "Thing",
          name: scenario.category,
        }
      : undefined,
  };
};

export const createEmbedHelperJsonLd = (locale: Locale) => {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Parent Embed Helper",
    url: getLocalizedUrl(locale, "/embed-helper"),
    description: dict.site.description,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: dict.site.name,
      url: getLocalizedUrl(locale),
    },
  };
};

export const createLearnJsonLd = (locale: Locale) => {
  const dict = getDictionary(locale);
  const metadata = createLearnSeoMetadata(locale);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: getAbsoluteMetadataTitle(metadata, "XSS Learning Notes"),
    url: getLocalizedUrl(locale, "/learn"),
    description: metadata.description,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: dict.site.name,
      url: getLocalizedUrl(locale),
    },
  };
};

export const createForumJsonLd = (locale: Locale) => {
  const dict = getDictionary(locale);
  const metadata = createForumSeoMetadata(locale);
  return {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    name: getAbsoluteMetadataTitle(metadata, "XSS Defense Forum"),
    url: getLocalizedUrl(locale, "/forum"),
    description: metadata.description,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: dict.site.name,
      url: getLocalizedUrl(locale),
    },
  };
};
