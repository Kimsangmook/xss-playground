"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findScenario } from "@/lib/scenarios";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/i18n";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";
import { getScenarioI18n } from "@/app/[locale]/scenarios/i18nRegistry";

interface IEmbedSnippetProps {
  slug: string;
}

const SANDBOX_VALUES: (string | null)[] = [
  null,
  "",
  "allow-scripts",
  "allow-scripts allow-same-origin",
  "allow-scripts allow-top-navigation",
  "allow-scripts allow-forms allow-popups",
];

const pickLocale = (raw: unknown): Locale => {
  if (typeof raw === "string" && LOCALES.includes(raw as Locale)) {
    return raw as Locale;
  }
  return DEFAULT_LOCALE;
};

export const EmbedSnippet = ({ slug }: IEmbedSnippetProps) => {
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const dict = getDictionary(locale);
  const sp = dict.scenarioPage;

  const [origin, setOrigin] = useState<string>(SITE_URL);
  const [sandboxIdx, setSandboxIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const scenario = findScenario(slug);
  const title = getScenarioI18n(locale, slug)?.title ?? scenario?.title ?? slug;

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const sandbox = SANDBOX_VALUES[sandboxIdx] ?? null;
  // ?lang= 으로 임베드 페이지에 부모 사이트의 locale 전달
  const url = `${origin}/embed/${slug}?lang=${locale}`;
  const sandboxAttr =
    sandbox === null ? "" : sandbox === "" ? " sandbox" : ` sandbox="${sandbox}"`;
  const snippet = `<iframe src="${url}" title="XSS Playground - ${title}"${sandboxAttr} width="600" height="420" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card" data-only-standalone>
      <strong>{sp.embedSnippet}</strong>
      <p style={{ color: "var(--text-dim)", margin: "6px 0 0" }}>
        {sp.embedSnippetDescription}
      </p>
      <div className="actions" style={{ marginTop: 10 }}>
        {sp.sandboxPresetLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setSandboxIdx(i)}
            style={
              sandboxIdx === i
                ? { borderColor: "var(--accent)", color: "var(--accent)" }
                : undefined
            }
          >
            {label}
          </button>
        ))}
      </div>
      <pre>{snippet}</pre>
      <div className="actions">
        <button onClick={handleCopy}>
          {copied ? sp.copied : sp.copySnippet}
        </button>
      </div>
    </div>
  );
};
