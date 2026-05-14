"use client";

import { useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const TARGET = "https://example.com/?attacker-was-here";

const TopRedirectPage = () => {
  const scenario = findScenario("top-redirect")!;
  const { lines, push, clear } = useLog();
  const [autoFireSec, setAutoFireSec] = useState(5);

  const tryTopLocation = () => {
    push(`window.top === window.self ? ${window.top === window.self}`);
    push(`시도: window.top.location = "${TARGET}"`);
    try {
      // 이게 진짜 공격이라면 사용자는 알아채기 전에 페이지가 통째로 바뀐다.
      window.top!.location.href = TARGET;
      push("호출 성공 (페이지가 곧 이동합니다)");
    } catch (e) {
      push(`차단됨: ${(e as Error).message}`);
    }
  };

  const tryTopLocationAssign = () => {
    push(`시도: window.top.location.assign("${TARGET}")`);
    try {
      window.top!.location.assign(TARGET);
      push("호출 성공");
    } catch (e) {
      push(`차단됨: ${(e as Error).message}`);
    }
  };

  const tryAnchorTargetTop = () => {
    push(`시도: <a target="_top" href="${TARGET}"> 가짜 클릭`);
    const a = document.createElement("a");
    a.href = TARGET;
    a.target = "_top";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    push("호출 완료 (성공했다면 페이지 이동)");
  };

  const tryMetaRefresh = () => {
    push(`시도: meta http-equiv="refresh" 삽입 (자기 origin 내에서만 동작)`);
    const meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "refresh");
    meta.setAttribute("content", `0;url=${TARGET}`);
    document.head.appendChild(meta);
    push("meta refresh 삽입 완료");
  };

  const scheduleAuto = () => {
    push(`${autoFireSec}초 뒤 자동 리다이렉트 예약`);
    setTimeout(() => {
      tryTopLocation();
    }, autoFireSec * 1000);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="top-redirect" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={tryTopLocation}>
          window.top.location = url
        </button>
        <button className="danger" onClick={tryTopLocationAssign}>
          window.top.location.assign()
        </button>
        <button className="danger" onClick={tryAnchorTargetTop}>
          {"<a target=_top> 가짜 클릭"}
        </button>
        <button onClick={tryMetaRefresh}>meta refresh (자기 origin)</button>
        <button onClick={scheduleAuto}>
          {autoFireSec}초 뒤 자동 발사 (피싱 시나리오)
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          <code>window.top.location</code> 변경은 cross-origin 이어도 기본 허용
          됩니다. SOP 가 막아주지 않는 영역입니다.
        </li>
        <li>
          차단하려면 sandbox 에 <code>allow-top-navigation</code> 을 주지 않으면
          됩니다. <code>sandbox=&quot;allow-scripts&quot;</code> 만 줘도 차단됩니다.
        </li>
        <li>
          실제 공격 가치는 매우 큽니다. 사용자가 알렌 안에서 무언가 클릭한 직후
          페이지가 통째로 피싱 사이트로 갈아치워지는 시나리오가 만들어집니다.
        </li>
      </ul>
    </>
  );
};

export default TopRedirectPage;
