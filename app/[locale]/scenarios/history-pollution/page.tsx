"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const HistoryPollutionPage = () => {
  const scenario = findScenario("history-pollution")!;
  const { lines, push, clear } = useLog();
  const t = usePageI18n(I18N);

  const pollute = (count: number) => {
    push(fmt(t.log.polluting, { count }));
    for (let i = 0; i < count; i++) {
      history.pushState({}, "", `?pollute=${Date.now()}-${i}`);
    }
    push(t.log.done);
  };

  const tryBackBlock = () => {
    push(t.log.trapInstalled);
    window.addEventListener("popstate", (e) => {
      push(t.log.intercepted);
      history.pushState({}, "", "?trapped=" + Date.now());
    });
    push(t.log.trapNote);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="history-pollution" />

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button className="danger" onClick={() => pollute(10)}>
          {t.buttons.pollute10}
        </button>
        <button className="danger" onClick={() => pollute(100)}>
          {t.buttons.pollute100}
        </button>
        <button className="danger" onClick={tryBackBlock}>
          {t.buttons.trap}
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

export default HistoryPollutionPage;
