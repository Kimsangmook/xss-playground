"use client";

import { useEffect, useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const PAYLOADS: Array<{ label: string; data: unknown }> = [
  { label: "string ping", data: "ping" },
  { label: "iframe-resizer init", data: "[iFrameSizer]getPage:abc" },
  {
    label: "iframe-resizer height",
    data: { type: "iframe-resizer", height: 9999 },
  },
  {
    label: "google ads style",
    data: { googMsgType: "adpnt", adData: "x" },
  },
  {
    label: "youtube iframe API style",
    data: '{"event":"command","func":"playVideo","args":""}',
  },
  {
    label: "auth grant style",
    data: { type: "AUTH_GRANT", token: "FAKE.JWT.xxx", expiresAt: 9999999999 },
  },
  {
    label: "router push",
    data: { type: "ROUTER_PUSH", url: "/admin" },
  },
  {
    label: "toast style",
    data: { type: "SHOW_TOAST", text: "Your session expired - click here to relogin" },
  },
  {
    label: "set theme",
    data: { type: "SET_THEME", value: "<script>alert(1)</script>" },
  },
];

const ParentListenerProbePage = () => {
  const scenario = findScenario("parent-message-listener-probe")!;
  const { lines, push, clear } = useLog();
  const [target, setTarget] = useState("*");
  const [replies, setReplies] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      setReplies((prev) => [
        ...prev,
        `[from parent] origin=${e.origin} data=${JSON.stringify(e.data).slice(0, 200)}`,
      ]);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const fire = (data: unknown, label: string) => {
    push(`fire: ${label}`);
    window.parent.postMessage(data, target as string);
  };

  const fireAll = () => {
    push("전체 페이로드 순차 발사");
    PAYLOADS.forEach((p, i) =>
      setTimeout(() => fire(p.data, p.label), i * 250)
    );
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="parent-message-listener-probe" />

      <h2>실행</h2>
      <div className="kv">
        <div className="k">target origin</div>
        <div>
          <input value={target} onChange={(e) => setTarget(e.target.value)} />
        </div>
      </div>
      <div className="actions">
        {PAYLOADS.map((p, i) => (
          <button key={i} className="danger" onClick={() => fire(p.data, p.label)}>
            {p.label}
          </button>
        ))}
        <button className="danger" onClick={fireAll}>
          전체 순차 발사
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>부모로부터 받은 응답</h2>
      <pre>{replies.length === 0 ? "// 응답 없음" : replies.join("\n")}</pre>

      <h2>해설</h2>
      <ul>
        <li>
          부모 페이지에 어떤 message 리스너가 등록돼 있는지 검은상자 상태에서
          fingerprinting 하는 페이지입니다. 알려진 라이브러리(iframe
          resizer, 유튜브 API, GTM 등) 의 페이로드 포맷을 흉내내서 응답 / 사이드
          이펙트(DOM 변화, 새 message 등) 를 관찰합니다.
        </li>
        <li>
          진짜 위험은 서비스가 자체적으로 등록한 커스텀 메시지 핸들러가 있을 때
          입니다. 예: <code>{`{ type: "AUTH_GRANT", token: ... }`}</code> 같은
          메시지로 인증 상태를 갈아끼우는 핸들러가 있다면 즉시 권한 우회.
        </li>
        <li>
          테스트 단계에서는 본인 서비스의 dev/staging 환경에 임베드해서 부모
          message 리스너 / DOM 변화 / 콘솔 에러를 같이 관찰하세요.
        </li>
      </ul>
    </>
  );
};

export default ParentListenerProbePage;
