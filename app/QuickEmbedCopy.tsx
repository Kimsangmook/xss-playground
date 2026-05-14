"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/i18n";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";

interface IQuickEmbedCopyProps {
  slug: string;
  title: string;
}

const escapeAttribute = (value: string) => value.replace(/"/g, "&quot;");

const pickLocale = (raw: unknown): Locale => {
  if (typeof raw === "string" && LOCALES.includes(raw as Locale)) {
    return raw as Locale;
  }
  return DEFAULT_LOCALE;
};

const TEXT: Record<Locale, { copy: string; copied: string }> = {
  ko: { copy: "임베드 복사", copied: "복사됨!" },
  en: { copy: "Copy embed", copied: "Copied!" },
  ja: { copy: "Embed をコピー", copied: "コピー済み!" },
  zh: { copy: "复制 Embed", copied: "已复制!" },
};

export const QuickEmbedCopy = ({ slug, title }: IQuickEmbedCopyProps) => {
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const dict = getDictionary(locale);
  const localizedTitle = dict.scenarios[slug]?.title ?? title;
  const t = TEXT[locale];

  const [origin, setOrigin] = useState(SITE_URL);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = `${origin}/embed/${slug}?lang=${locale}`;
  const snippet = `<iframe src="${url}" title="XSS Playground - ${escapeAttribute(localizedTitle)}" width="600" height="420" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

  const copy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="quick-copy">
      <pre aria-label={`${localizedTitle} embed snippet`}>{snippet}</pre>
      <button onClick={copy}>{copied ? t.copied : t.copy}</button>
    </div>
  );
};
