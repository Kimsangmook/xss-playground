"use client";

import { useEffect, useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const PAYLOADS: Array<{ label: string; data: unknown }> = [
  { label: "string ping", data: "ping" },
  { label: "iframe-resizer init", data: "[iFrameSizer]getPage:abc" },
  {
    label: "iframe-resizer height",
    data: { type: "iframe-resizer", height: 9999 },
  },
  {
    label: "google ads style",
    data: { googMsgType: "adpnt", adData: "x" },
  },
  {
    label: "youtube iframe API style",
    data: '{"event":"command","func":"playVideo","args":""}',
  },
  {
    label: "auth grant style",
    data: { type: "AUTH_GRANT", token: "FAKE.JWT.xxx", expiresAt: 9999999999 },
  },
  {
    label: "router push",
    data: { type: "ROUTER_PUSH", url: "/admin" },
  },
  {
    label: "toast style",
    data: { type: "SHOW_TOAST", text: "Your session expired - click here to relogin" },
  },
  {
    label: "set theme",
    data: { type: "SET_THEME", value: "<script>alert(1)</script>" },
  },
];

const MAX_REPLIES = 80;

const ParentListenerProbePage = () => {
  const scenario = findScenario("parent-message-listener-probe")!;
  const { lines, push, clear } = useLog();
  const [target, setTarget] = useState("*");
  const [replies, setReplies] = useState<string[]>([]);
  const t = usePageI18n(I18N);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.source === window) return;
      setReplies((prev) => [
        ...prev,
        fmt(t.log?.received, {
          origin: e.origin,
          data: JSON.stringify(e.data).slice(0, 200),
        }),
      ].slice(-MAX_REPLIES));
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [t.log?.received]);

  const clearAll = () => {
    clear();
    setReplies([]);
  };

  const fire = (data: unknown, label: string) => {
    push(fmt(t.log?.sending, { label }));
    window.parent.postMessage(data, target as string);
  };

  const fireAll = () => {
    push(fmt(t.log?.sentAll, { count: PAYLOADS.length }));
    PAYLOADS.forEach((p, i) =>
      setTimeout(() => fire(p.data, p.label), i * 250)
    );
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="parent-message-listener-probe" />

      <h2>{t.actionsHeading}</h2>
      <div className="kv">
        <div className="k">{t.text?.targetOriginLabel}</div>
        <div>
          <input value={target} onChange={(e) => setTarget(e.target.value)} />
        </div>
      </div>
      <div className="actions">
        {PAYLOADS.map((p, i) => (
          <button key={i} className="danger" onClick={() => fire(p.data, p.label)}>
            {p.label}
          </button>
        ))}
        <button className="danger" onClick={fireAll}>
          {t.buttons?.fireAll}
        </button>
        <button onClick={clearAll}>{t.buttons?.clearLog}</button>
      </div>
      <Log lines={lines} />

      <h2>{t.text?.repliesHeading}</h2>
      <pre>{replies.length === 0 ? t.text?.noReplies : replies.join("\n")}</pre>

      <h2>{t.explanationHeading}</h2>
      <ul>
        {t.explanation?.map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default ParentListenerProbePage;
