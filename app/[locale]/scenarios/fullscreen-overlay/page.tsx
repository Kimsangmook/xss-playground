"use client";

import { Log, useLog } from "@/app/Log";

import { EmbedSnippet } from "@/app/EmbedSnippet";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { findScenario } from "@/lib/scenarios";
import { useScenarioBody } from "../useScenarioBody";
import { useState } from "react";

const FullscreenOverlayPage = () => {
  const scenario = findScenario("fullscreen-overlay")!;
  const { lines, push, clear } = useLog();
  const [showOverlay, setShowOverlay] = useState(false);
  const { actions, log, text, explanation, scenarioPage } =
    useScenarioBody("fullscreen-overlay");

  const tryRealFullscreen = async () => {
    push(log("tryFs"));
    try {
      await document.documentElement.requestFullscreen();
      push(log("fsEntered"));
    } catch (e) {
      push(log("blocked", { message: (e as Error).message }));
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="fullscreen-overlay" />

      <h2>{scenarioPage.actions}</h2>
      <div className="callout">{text("callout")}</div>
      <div className="actions">
        <button className="danger" onClick={() => setShowOverlay(true)}>
          {actions("showOverlay")}
        </button>
        <button className="danger" onClick={tryRealFullscreen}>
          {actions("tryRealFs")}
        </button>
        <button onClick={clear}>{actions("clearLog")}</button>
      </div>
      <Log lines={lines} />

      {showOverlay && (
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
          <h1 style={{ fontSize: 28, marginTop: 0 }}>{text("overlayTitle")}</h1>
          <p style={{ fontSize: 15, color: "#555" }}>{text("overlayBody")}</p>
          <div
            style={{
              maxWidth: 360,
              marginTop: 24,
              padding: 24,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: "#555" }}>
                {text("emailLabel")}
              </label>
              <input
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 4,
                  padding: 10,
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  background: "#fff",
                  color: "#111",
                }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: "#555" }}>
                {text("passwordLabel")}
              </label>
              <input
                type="password"
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 4,
                  padding: 10,
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  background: "#fff",
                  color: "#111",
                }}
              />
            </div>
            <button
              style={{
                width: "100%",
                padding: 12,
                background: "#4493f8",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={() => setShowOverlay(false)}
            >
              {actions("login")}
            </button>
            <button
              style={{
                marginTop: 8,
                width: "100%",
                padding: 8,
                background: "transparent",
                color: "#888",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowOverlay(false)}
            >
              {actions("closePoc")}
            </button>
          </div>
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

export default FullscreenOverlayPage;
