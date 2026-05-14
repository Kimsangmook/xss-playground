"use client";

import { useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

type Step = "idle" | "overlay" | "captured" | "redirected";

const ChainedAttackPage = () => {
  const scenario = findScenario("chained-attack")!;
  const { lines, push, clear } = useLog();
  const [step, setStep] = useState<Step>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const start = () => {
    push("[1/3] 풀스크린 가짜 서비스 UI 표시");
    setStep("overlay");
  };

  const capture = (e: React.FormEvent) => {
    e.preventDefault();
    push(`[2/3] 자격증명 캡쳐: email=${email} password=${"*".repeat(password.length)}`);
    push("실제 공격에서는 fetch/sendBeacon 으로 attacker 서버에 전송");
    setStep("captured");
    setTimeout(() => {
      push("[3/3] 의심 회피용으로 원래 페이지로 top redirect");
      try {
        window.top!.location.href =
          document.referrer || "https://example.com";
      } catch (err) {
        push(`redirect 차단: ${(err as Error).message}`);
      }
      setStep("redirected");
    }, 1500);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="chained-attack" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={start} disabled={step !== "idle"}>
          체인 공격 시작
        </button>
        <button
          onClick={() => {
            setStep("idle");
            setEmail("");
            setPassword("");
            clear();
          }}
        >
          리셋
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
            Example Workspace
          </h1>
          <p style={{ fontSize: 14, color: "#555" }}>
            보안 정책 변경에 따라 다시 로그인이 필요합니다. (PoC 가짜 화면)
          </p>
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
            <label style={{ fontSize: 12, color: "#555" }}>이메일</label>
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
            <label style={{ fontSize: 12, color: "#555" }}>비밀번호</label>
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
              로그인
            </button>
          </form>
        </div>
      )}

      <h2>해설</h2>
      <ol>
        <li>
          iframe 임베드 후 즉시 풀스크린 오버레이로 서비스 UI 위장 (사용자는
          여전히 신뢰하는 사이트라고 인지).
        </li>
        <li>자격증명 입력 → 자기 origin 으로 전송 → attacker 서버 도착.</li>
        <li>
          전송 직후 top redirect 로 원래 페이지로 보내서 의심 회피. 사용자
          입장에서는 &quot;로그인 한 번 했네&quot; 정도로 끝남.
        </li>
      </ol>
      <ul>
        <li>
          각 단계가 모두 cross-origin iframe 에서 합법적으로 동작하는 API 들로만
          구성됨. SOP 가 막아주지 않는 영역만 사용.
        </li>
        <li>
          1단계만 막아도 체인이 끊김 → host allowlist 또는 sandbox 의 적절한
          조합으로 1단계(임의 호스트 iframe 임베드)를 막는 게 가장 효과적.
        </li>
      </ul>
    </>
  );
};

export default ChainedAttackPage;
