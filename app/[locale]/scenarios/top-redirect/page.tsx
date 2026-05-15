"use client";

import { Log, useLog } from "@/app/Log";

import { EmbedSnippet } from "@/app/EmbedSnippet";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { buildRedirectTarget } from "@/lib/redirectTarget";
import { findScenario } from "@/lib/scenarios";
import { useScenarioBody } from "../useScenarioBody";
import { useState } from "react";

const TopRedirectPage = () => {
  const scenario = findScenario("top-redirect")!;
  const { lines, push, clear } = useLog();
  const [autoFireSec, setAutoFireSec] = useState(5);
  const { locale, actions, log, explanation, scenarioPage } =
    useScenarioBody("top-redirect");
  const target = buildRedirectTarget(
    typeof window === "undefined" ? "" : window.location.origin,
    locale,
    "top-redirect",
  );

  const tryTopLocation = () => {
    push(
      log("checkTop", { value: window.top === window.self ? "true" : "false" }),
    );
    push(log("tryTopLog", { target }));
    try {
      window.top!.location.href = target;
      push(log("successNav"));
    } catch (e) {
      push(log("blocked", { message: (e as Error).message }));
    }
  };

  const tryTopLocationAssign = () => {
    push(log("tryAssignLog", { target }));
    try {
      window.top!.location.assign(target);
      push(log("successPlain"));
    } catch (e) {
      push(log("blocked", { message: (e as Error).message }));
    }
  };

  const tryAnchorTargetTop = () => {
    push(log("tryAnchorLog", { target }));
    const a = document.createElement("a");
    a.href = target;
    a.target = "_top";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    push(log("anchorCalled"));
  };

  const tryMetaRefresh = () => {
    push(log("tryMetaLog"));
    const meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "refresh");
    meta.setAttribute("content", `0;url=${target}`);
    document.head.appendChild(meta);
    push(log("metaInserted"));
  };

  const scheduleAuto = () => {
    push(log("autoScheduled", { n: autoFireSec }));
    setTimeout(() => {
      tryTopLocation();
    }, autoFireSec * 1000);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="top-redirect" />

      <h2>{scenarioPage.actions}</h2>
      <div className="actions">
        <button className="danger" onClick={tryTopLocation}>
          {actions("tryTop")}
        </button>
        <button className="danger" onClick={tryTopLocationAssign}>
          {actions("tryAssign")}
        </button>
        <button className="danger" onClick={tryAnchorTargetTop}>
          {actions("tryAnchor")}
        </button>
        <button onClick={tryMetaRefresh}>{actions("tryMetaRefresh")}</button>
        <button onClick={scheduleAuto}>
          {actions("scheduleAuto").replace("{n}", String(autoFireSec))}
        </button>
        <button onClick={clear}>{actions("clearLog")}</button>
      </div>
      <Log lines={lines} />

      <h2>{scenarioPage.explanation}</h2>
      <ul>
        {explanation.map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default TopRedirectPage;
