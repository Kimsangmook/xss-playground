"use client";

import { useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const FullscreenOverlayPage = () => {
  const scenario = findScenario("fullscreen-overlay")!;
  const { lines, push, clear } = useLog();
  const [showOverlay, setShowOverlay] = useState(false);

  const tryRealFullscreen = async () => {
    push("document.documentElement.requestFullscreen() 시도");
    try {
      await document.documentElement.requestFullscreen();
      push("진입 성공");
    } catch (e) {
      push(`차단: ${(e as Error).message}`);
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="fullscreen-overlay" />

      <h2>실행</h2>
      <div className="callout">
        실제 공격에서는 iframe 자체를 부모 페이지의 CSS 로 화면 전체를 덮는
        position:fixed; top:0; width:100%; height:100% 으로 배치합니다. iframe
        자기 origin 안에서는 그 안에 어떤 UI 든 자유롭게 그릴 수 있어서, 알렌과
        똑같이 생긴 가짜 페이지로 사용자를 속일 수 있습니다.
      </div>
      <div className="actions">
        <button className="danger" onClick={() => setShowOverlay(true)}>
          가짜 알렌 UI 오버레이 표시
        </button>
        <button className="danger" onClick={tryRealFullscreen}>
          진짜 풀스크린 API
        </button>
        <button onClick={clear}>로그 초기화</button>
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
          <h1 style={{ fontSize: 28, marginTop: 0 }}>
            알렌의 서재 — 본인 인증이 필요합니다
          </h1>
          <p style={{ fontSize: 15, color: "#555" }}>
            서비스 정책 변경에 따라 다시 로그인해 주세요. (이건 가짜 화면입니다)
          </p>
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
              <label style={{ fontSize: 12, color: "#555" }}>이메일</label>
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
              <label style={{ fontSize: 12, color: "#555" }}>비밀번호</label>
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
              로그인
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
              (PoC 닫기)
            </button>
          </div>
        </div>
      )}

      <h2>해설</h2>
      <ul>
        <li>
          iframe 자체 영역을 부모 CSS 가 어떻게 배치할지는 부모 책임입니다.
          알렌이 임의 iframe 을 100% 너비/높이로 그리고 있다면 그 자체로 시각적
          위장이 가능합니다.
        </li>
        <li>
          진짜 풀스크린 API 는 사용자 제스처 필요. 하지만 z-index:99999 의 일반
          DOM 오버레이는 사용자 제스처 없이도 즉시 가능합니다.
        </li>
      </ul>
    </>
  );
};

export default FullscreenOverlayPage;
