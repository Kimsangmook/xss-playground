"use client";

import { Log, useLog } from "@/app/Log";

import { EmbedSnippet } from "@/app/EmbedSnippet";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { buildRedirectTarget } from "@/lib/redirectTarget";
import { findScenario } from "@/lib/scenarios";
import { useScenarioBody } from "../useScenarioBody";
import { useState } from "react";

type Step = "idle" | "overlay" | "captured" | "redirected";

const ChainedAttackPage = () => {
  const scenario = findScenario("chained-attack")!;
  const { lines, push, clear } = useLog();
  const [step, setStep] = useState<Step>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { locale, actions, log, text, explanation, scenarioPage } =
    useScenarioBody("chained-attack");

  const start = () => {
    push(log("step1"));
    setStep("overlay");
  };

  const capture = (e: React.FormEvent) => {
    e.preventDefault();
    push(log("step2", { email, password: "*".repeat(password.length) }));
    push(log("step2Notice"));
    setStep("captured");
    setTimeout(() => {
      push(log("step3"));
      try {
        window.top!.location.href = buildRedirectTarget(
          window.location.origin,
          locale,
          "chained-attack",
        );
      } catch (err) {
        push(log("redirectBlocked", { message: (err as Error).message }));
      }
      setStep("redirected");
    }, 1500);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="chained-attack" />

      <h2>{scenarioPage.actions}</h2>
      <div className="actions">
        <button className="danger" onClick={start} disabled={step !== "idle"}>
          {actions("start")}
        </button>
        <button
          onClick={() => {
            setStep("idle");
            setEmail("");
            setPassword("");
            clear();
          }}
        >
          {actions("reset")}
        </button>
      </div>
      <Log lines={lines} />

      {step === "overlay" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            color: "#111",
            zIndex: 99999,
            padding: 40,
            fontFamily: "system-ui",
          }}
        >
          <h1 style={{ fontSize: 28, marginTop: 0, color: "#111" }}>
            {text("overlayTitle")}
          </h1>
          <p style={{ fontSize: 14, color: "#555" }}>{text("overlayBody")}</p>
          <form
            onSubmit={capture}
            style={{
              maxWidth: 360,
              marginTop: 24,
              padding: 24,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <label style={{ fontSize: 12, color: "#555" }}>
              {text("emailLabel")}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                margin: "4px 0 12px",
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 6,
                background: "#fff",
                color: "#111",
              }}
            />
            <label style={{ fontSize: 12, color: "#555" }}>
              {text("passwordLabel")}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                margin: "4px 0 16px",
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 6,
                background: "#fff",
                color: "#111",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: 12,
                background: "#4493f8",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {actions("login")}
            </button>
          </form>
        </div>
      )}

      <h2>{scenarioPage.explanation}</h2>
      <ul>
        {explanation.map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default ChainedAttackPage;
