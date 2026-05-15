"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { SCENARIOS } from "@/lib/scenarios";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";
import { getScenarioI18n } from "@/app/[locale]/scenarios/i18nRegistry";
import { I18N } from "./i18n";

const EMBEDDABLE_SCENARIOS = SCENARIOS.filter(
  (scenario) => (scenario.surface ?? "iframe") === "iframe"
);

const SANDBOX_VALUES = [
  null,
  "",
  "allow-scripts",
  "allow-scripts allow-same-origin",
  "allow-scripts allow-top-navigation",
  "allow-scripts allow-forms allow-popups",
] as const;

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

const EmbedHelperPage = () => {
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const t = I18N[locale];
  const [scenarioSlug, setScenarioSlug] = useState(EMBEDDABLE_SCENARIOS[0].slug);
  const [sandboxIdx, setSandboxIdx] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const msg = `[message] origin=${e.origin} data=${JSON.stringify(e.data).slice(0, 200)}`;
      setMessages((prev) => [...prev, msg]);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const sandbox = SANDBOX_VALUES[sandboxIdx] ?? null;
  const src = `/embed/${scenarioSlug}`;

  const sandboxProps =
    sandbox === null ? {} : sandbox === "" ? { sandbox: "" } : { sandbox };

  return (
    <>
      <h1>{t.title}</h1>
      <p className="summary">{t.summary}</p>

      <div className="callout">{t.warning}</div>

      <h2>{t.settingsHeading}</h2>
      <div className="kv">
        <div className="k">{t.scenarioLabel}</div>
        <div>
          <select
            value={scenarioSlug}
            onChange={(e) => setScenarioSlug(e.target.value)}
            style={{
              background: "var(--bg-elev-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              padding: "8px 10px",
              borderRadius: 6,
              width: "100%",
            }}
          >
            {EMBEDDABLE_SCENARIOS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {getScenarioI18n(locale, s.slug)?.title ?? s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="k">{t.sandboxLabel}</div>
        <div>
          <div className="actions" style={{ margin: 0 }}>
            {t.sandboxPresets.map((label, i) => (
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
        </div>
      </div>

      <h2>{t.iframeHeading}</h2>
      <iframe
        ref={iframeRef}
        key={`${scenarioSlug}-${sandboxIdx}`}
        src={src}
        width="100%"
        height="420"
        style={{ border: "1px solid var(--border)", borderRadius: 6 }}
        {...sandboxProps}
      />

      <h2>{t.messageLogHeading}</h2>
      <button onClick={() => setMessages([])}>{t.clearLog}</button>
      <pre style={{ marginTop: 10 }}>
        {messages.length === 0 ? t.emptyLog : messages.join("\n")}
      </pre>
    </>
  );
};

export default EmbedHelperPage;
