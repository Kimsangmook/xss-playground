"use client";

import { useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const PhishingFormPage = () => {
  const scenario = findScenario("phishing-form")!;
  const { lines, push, clear } = useLog();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    push(`수집된 자격증명: email=${email} password=${password}`);
    push(
      "실제 공격에서는 이 값을 fetch / sendBeacon 으로 attacker 서버에 전송. (이 PoC 에서는 전송하지 않음)"
    );
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="phishing-form" />

      <div className="callout danger">
        실제 공격 시 이 iframe 은 부모 페이지 안에서 마치 서비스의 모달/로그인
        영역처럼 보이도록 위치됩니다. 사용자는 도메인이 attacker.example 인 것을
        알기 어렵습니다. (아래 풀스크린 오버레이 시나리오와 결합되면 더 위험.)
      </div>

      <h2>가짜 로그인 폼 (자기 origin 안에서 자유롭게 그려짐)</h2>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 360 }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>
            이메일
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>
            비밀번호
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="danger" type="submit">
          로그인
        </button>
      </form>

      <h2>수집 로그</h2>
      <div className="actions">
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          iframe 안의 폼은 자기 origin 의 페이지이므로 어떤 UI 도 자유롭게 그릴
          수 있고, 입력값을 자기 서버로 보낼 수 있습니다. SOP 와 무관합니다.
        </li>
        <li>
          <code>sandbox=&quot;allow-scripts&quot;</code> 만 줘도 form submit 자체
          는 막을 수 있지만, JS 로 값을 수집해 fetch 로 보내는 건 여전히 가능
          합니다. <code>sandbox=&quot;&quot;</code> (빈 값) 이라야 JS 도 막힙니다.
        </li>
        <li>
          가장 확실한 대응은 iframe 의 host 를 allowlist 로 제한하는 것입니다.
          유튜브/비메오 같은 신뢰 호스트만 통과시키면 이 시나리오 자체가
          성립하지 않습니다.
        </li>
      </ul>
    </>
  );
};

export default PhishingFormPage;
