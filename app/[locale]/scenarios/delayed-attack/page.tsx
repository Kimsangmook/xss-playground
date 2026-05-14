"use client";

import { useEffect, useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

type Action = "top-redirect" | "post-message" | "form-submit" | "open-popup";

const ACTIONS: { key: Action; label: string }[] = [
  { key: "top-redirect", label: "top.location 리다이렉트" },
  { key: "post-message", label: "parent.postMessage" },
  { key: "form-submit", label: "외부 form submit" },
  { key: "open-popup", label: "window.open" },
];

const DelayedAttackPage = () => {
  const scenario = findScenario("delayed-attack")!;
  const { lines, push, clear } = useLog();
  const [delay, setDelay] = useState(5);
  const [action, setAction] = useState<Action>("top-redirect");
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      fire();
      setRemaining(null);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => (r ?? 0) - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const start = () => {
    push(`${delay}초 카운트다운 시작 — 액션 = ${action}`);
    setRemaining(delay);
  };

  const cancel = () => {
    setRemaining(null);
    push("취소됨");
  };

  const fire = () => {
    push(`발사: ${action}`);
    switch (action) {
      case "top-redirect": {
        try {
          window.top!.location.href = "https://example.com/?delayed=1";
        } catch (e) {
          push(`차단: ${(e as Error).message}`);
        }
        break;
      }
      case "post-message": {
        window.parent.postMessage(
          { type: "DELAYED_ATTACK", fired: Date.now() },
          "*"
        );
        push("parent.postMessage 발사");
        break;
      }
      case "form-submit": {
        const f = document.createElement("form");
        f.method = "POST";
        f.action = "https://httpbin.org/post";
        f.target = "_blank";
        const i = document.createElement("input");
        i.name = "delayed";
        i.value = "fired";
        f.appendChild(i);
        document.body.appendChild(f);
        f.submit();
        f.remove();
        push("form submit");
        break;
      }
      case "open-popup": {
        const w = window.open("about:blank", "_blank");
        push(`window.open ${w ? "성공" : "차단"}`);
        break;
      }
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="delayed-attack" />

      <h2>실행</h2>
      <div className="kv">
        <div className="k">액션</div>
        <div>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as Action)}
            style={{
              background: "var(--bg-elev-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              padding: "8px 10px",
              borderRadius: 6,
              width: "100%",
            }}
          >
            {ACTIONS.map((a) => (
              <option key={a.key} value={a.key}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div className="k">지연(초)</div>
        <div>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value) || 0)}
            min={0}
            max={120}
          />
        </div>
      </div>
      <div className="actions">
        <button className="danger" onClick={start} disabled={remaining !== null}>
          {remaining === null ? "카운트다운 시작" : `${remaining}초 남음`}
        </button>
        <button onClick={cancel} disabled={remaining === null}>
          취소
        </button>
        <button onClick={fire}>즉시 발사</button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>임베드 페이지 자동 발사</h2>
      <p className="summary">
        실제 임베드 시에는 사용자 상호작용 없이 자동 실행되도록 URL 파라미터를
        넣어두면 됩니다. 예시:
      </p>
      <pre>{`<iframe src="https://YOUR-VERCEL-URL/embed/delayed-attack?auto=top-redirect&delay=5"></iframe>`}</pre>

      <h2>해설</h2>
      <ul>
        <li>
          사용자가 알렌 노트를 보고 있는 동안 잠깐 무관한 콘텐츠처럼 보이게
          한 뒤 N초 뒤 발사하는 시나리오 재현. 즉시 발사는 사용자 의심을
          유발하지만 5~10초 지연은 자연스럽게 보임.
        </li>
        <li>
          모든 액션이 sandbox 정책의 해당 키워드(allow-top-navigation, forms,
          popups 등) 가 없으면 차단됨.
        </li>
      </ul>
    </>
  );
};

export default DelayedAttackPage;
