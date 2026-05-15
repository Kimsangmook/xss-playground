"use client";

import { useRef } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const ClipboardHijackPage = () => {
  const scenario = findScenario("clipboard-hijack")!;
  const { lines, push, clear } = useLog();
  const textRef = useRef<HTMLDivElement>(null);
  const t = usePageI18n(I18N);

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const hijack = t.text.hijackValue;
    e.clipboardData.setData("text/plain", hijack);
    push(fmt(t.log.hijacked, { value: hijack }));
  };

  const tryWriteClipboard = async () => {
    push(t.log.tryWrite);
    try {
      await navigator.clipboard.writeText(t.text.writeValue);
      push(t.log.writeSuccess);
    } catch (e) {
      push(fmt(t.log.failed, { message: (e as Error).message }));
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="clipboard-hijack" />

      <h2>{t.actionsHeading}</h2>
      <div ref={textRef} className="card" onCopy={handleCopy}>
        {t.text.victim}
      </div>
      <div className="actions">
        <button className="danger" onClick={tryWriteClipboard}>
          {t.buttons.writeText}
        </button>
        <button onClick={clear}>{t.buttons.clearLog}</button>
      </div>
      <Log lines={lines} />

      <h2>{t.explanationHeading}</h2>
      <ul>
        {(t.explanation ?? []).map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default ClipboardHijackPage;
