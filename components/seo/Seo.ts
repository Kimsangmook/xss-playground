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
        (l) => OG_LOCALE[l]
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
        (l) => OG_LOCALE[l]
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
  const meta = scenario ? getScenarioI18n(locale, slug) ?? scenario : null;
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
