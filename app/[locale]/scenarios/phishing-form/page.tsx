"use client";

import { Log, useLog } from "@/app/Log";

import { EmbedSnippet } from "@/app/EmbedSnippet";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { findScenario } from "@/lib/scenarios";
import { useScenarioBody } from "../useScenarioBody";
import { useState } from "react";

const PhishingFormPage = () => {
  const scenario = findScenario("phishing-form")!;
  const { lines, push, clear } = useLog();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions, log, text, explanation, scenarioPage } =
    useScenarioBody("phishing-form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    push(log("captured", { email, password }));
    push(log("notice"));
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="phishing-form" />

      <div className="callout danger">{text("callout")}</div>

      <h2>{text("formHeading")}</h2>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 360 }}>
        <div style={{ marginBottom: 8 }}>
          <div
            style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}
          >
            {text("emailLabel")}
          </div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={text("emailPlaceholder")}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <div
            style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}
          >
            {text("passwordLabel")}
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="danger" type="submit">
          {actions("submit")}
        </button>
      </form>

      <h2>{text("logsHeading")}</h2>
      <div className="actions">
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

export default PhishingFormPage;
