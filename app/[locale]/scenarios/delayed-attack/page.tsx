"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findScenario } from "@/lib/scenarios";
import { buildRedirectTarget } from "@/lib/redirectTarget";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { SITE_URL } from "@/lib/site";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

type Action = "top-redirect" | "post-message" | "form-submit" | "open-popup";

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

const DelayedAttackPage = () => {
  const scenario = findScenario("delayed-attack")!;
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const { lines, push, clear } = useLog();
  const [delay, setDelay] = useState(5);
  const [action, setAction] = useState<Action>("top-redirect");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [origin, setOrigin] = useState(SITE_URL);
  const t = usePageI18n(I18N);
  const actions: { key: Action; label: string }[] = [
    { key: "top-redirect", label: t.text?.actionTopRedirect ?? "top-redirect" },
    { key: "post-message", label: t.text?.actionPostMessage ?? "post-message" },
    { key: "form-submit", label: t.text?.actionFormSubmit ?? "form-submit" },
    { key: "open-popup", label: t.text?.actionOpenPopup ?? "open-popup" },
  ];

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      fire();
      setRemaining(null);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => (r ?? 0) - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const start = () => {
    push(fmt(t.log?.countdown, { delay, action }));
    setRemaining(delay);
  };

  const cancel = () => {
    setRemaining(null);
    push(t.log?.cancelled ?? "");
  };

  const fire = () => {
    push(fmt(t.log?.firing, { action }));
    switch (action) {
      case "top-redirect": {
        try {
          window.top!.location.href = buildRedirectTarget(
            window.location.origin,
            locale,
            "delayed-attack",
          );
        } catch (e) {
          push(fmt(t.log?.blocked, { message: (e as Error).message }));
        }
        break;
      }
      case "post-message": {
        window.parent.postMessage(
          { type: "DELAYED_ATTACK", fired: Date.now() },
          "*",
        );
        push(t.log?.postMessage ?? "");
        break;
      }
      case "form-submit": {
        const f = document.createElement("form");
        f.method = "POST";
        f.action = "https://httpbin.org/post";
        f.target = "_blank";
        const i = document.createElement("input");
        i.name = "delayed";
        i.value = "fired";
        f.appendChild(i);
        document.body.appendChild(f);
        f.submit();
        f.remove();
        push(t.log?.formSubmitted ?? "");
        break;
      }
      case "open-popup": {
        const w = window.open("about:blank", "_blank");
        push(
          fmt(t.log?.popupResult, {
            result: w ? t.log?.opened : t.log?.blockedPlain,
          }),
        );
        break;
      }
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="delayed-attack" />

      <h2>{t.actionsHeading}</h2>
      <div className="kv">
        <div className="k">{t.text?.actionLabel}</div>
        <div>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as Action)}
            style={{
              background: "var(--bg-elev-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              padding: "8px 10px",
              borderRadius: 6,
              width: "100%",
            }}
          >
            {actions.map((a) => (
              <option key={a.key} value={a.key}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div className="k">{t.text?.delayLabel}</div>
        <div>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value) || 0)}
            min={0}
            max={120}
          />
        </div>
      </div>
      <div className="actions">
        <button
          className="danger"
          onClick={start}
          disabled={remaining !== null}
        >
          {remaining === null
            ? t.buttons?.start
            : fmt(t.buttons?.remaining, { n: remaining })}
        </button>
        <button onClick={cancel} disabled={remaining === null}>
          {t.buttons?.cancel}
        </button>
        <button onClick={fire}>{t.buttons?.fireNow}</button>
        <button onClick={clear}>{t.buttons?.clearLog}</button>
      </div>
      <Log lines={lines} />

      <h2>{t.text?.autoHeading}</h2>
      <p className="summary">{t.text?.autoBody}</p>
      <pre>{`<iframe src="${origin}/embed/delayed-attack?auto=top-redirect&delay=5" width="600" height="420"></iframe>`}</pre>

      <h2>{t.explanationHeading}</h2>
      <ul>
        {t.explanation?.map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default DelayedAttackPage;
