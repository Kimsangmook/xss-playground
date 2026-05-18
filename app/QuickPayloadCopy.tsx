"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";

interface IQuickPayloadCopyProps {
  payload: string;
  title: string;
}

const pickLocale = (raw: unknown): Locale => {
  if (typeof raw === "string" && LOCALES.includes(raw as Locale)) {
    return raw as Locale;
  }
  return DEFAULT_LOCALE;
};

const TEXT: Record<Locale, { copy: string; copied: string }> = {
  ko: { copy: "페이로드 복사", copied: "복사됨!" },
  en: { copy: "Copy payload", copied: "Copied!" },
  ja: { copy: "Payload をコピー", copied: "コピー済み!" },
  zh: { copy: "复制 Payload", copied: "已复制!" },
};

export const QuickPayloadCopy = ({
  payload,
  title,
}: IQuickPayloadCopyProps) => {
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const t = TEXT[locale];

  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="quick-copy">
      <pre aria-label={`${title} payload snippet`}>{payload}</pre>
      <button onClick={copy}>{copied ? t.copied : t.copy}</button>
    </div>
  );
};
