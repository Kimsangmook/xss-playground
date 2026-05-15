"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const SopProbePage = () => {
  const scenario = findScenario("sop-probe")!;
  const { lines, push, clear } = useLog();
  const t = usePageI18n(I18N);

  const probeParentDocument = () => {
    push(t.log?.tryDocument ?? "");
    try {
      // Intentional SOP violation probe; cross-origin cases should throw.
      const html = window.parent.document.documentElement.outerHTML;
      push(fmt(t.log?.documentSuccess, { html: html.slice(0, 80) }));
    } catch (e) {
      push(fmt(t.log?.sopBlocked, { message: (e as Error).message }));
    }
  };

  const probeParentLocation = () => {
    push(t.log?.tryLocation ?? "");
    try {
      const href = window.parent.location.href;
      push(fmt(t.log?.locationSuccess, { href }));
    } catch (e) {
      push(fmt(t.log?.sopBlocked, { message: (e as Error).message }));
    }
  };

  const probeParentLocationWrite = () => {
    push(t.log?.tryLocationWrite ?? "");
    push(t.log?.locationWriteNote ?? "");
  };

  const probeParentCookies = () => {
    push(t.log?.tryCookie ?? "");
  };

  const probeLocalStorage = () => {
    push(t.log?.tryOwnStorage ?? "");
    try {
      localStorage.setItem("attacker-probe", "ok");
      const v = localStorage.getItem("attacker-probe");
      push(fmt(t.log?.ownStorage, { value: v ?? "" }));
    } catch (e) {
      push(fmt(t.log?.failed, { message: (e as Error).message }));
    }
    push(t.log?.storageNote ?? "");
  };

  const probeFetchSameOrigin = () => {
    push(t.log?.tryFetchSelf ?? "");
    fetch("/")
      .then((r) => push(fmt(t.log?.fetchStatus, { status: r.status })))
      .catch((e) => push(fmt(t.log?.failed, { message: e.message })));
  };

  const probeFetchParent = () => {
    push(t.log?.tryFetchParent ?? "");
    push(t.log?.fetchParentNote ?? "");
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="sop-probe" />

      <div className="callout">
        {t.text?.callout}
      </div>

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button onClick={probeParentDocument}>{t.buttons?.parentDocument}</button>
        <button onClick={probeParentLocation}>{t.buttons?.parentLocation}</button>
        <button onClick={probeParentLocationWrite}>
          {t.buttons?.parentLocationWrite}
        </button>
        <button onClick={probeParentCookies}>{t.buttons?.parentCookie}</button>
        <button onClick={probeLocalStorage}>{t.buttons?.localStorage}</button>
        <button onClick={probeFetchSameOrigin}>{t.buttons?.fetchSelf}</button>
        <button onClick={probeFetchParent}>{t.buttons?.fetchParent}</button>
        <button onClick={clear}>{t.buttons?.clearLog}</button>
      </div>
      <Log lines={lines} />

      <h2>{t.explanationHeading}</h2>
      <ul>
        {t.explanation?.map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default SopProbePage;
