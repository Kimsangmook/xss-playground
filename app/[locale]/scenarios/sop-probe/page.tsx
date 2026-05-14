"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const SopProbePage = () => {
  const scenario = findScenario("sop-probe")!;
  const { lines, push, clear } = useLog();

  const probeParentDocument = () => {
    push("시도: parent.document 접근");
    try {
      // 의도적 SOP 위반 시도. cross-origin 일 경우 런타임 에러로 catch 로 빠진다.
      const html = window.parent.document.documentElement.outerHTML;
      push(`성공 (cross-origin 아님): ${html.slice(0, 80)}...`);
    } catch (e) {
      push(`차단됨 (SOP): ${(e as Error).message}`);
    }
  };

  const probeParentLocation = () => {
    push("시도: parent.location.href 읽기");
    try {
      const href = window.parent.location.href;
      push(`성공 (same-origin): ${href}`);
    } catch (e) {
      push(`차단됨 (SOP): ${(e as Error).message}`);
    }
  };

  const probeParentLocationWrite = () => {
    push("시도: parent.location.href = ... (쓰기)");
    push(
      "참고: location 쓰기는 cross-origin 이어도 허용됨 (top-redirect 시나리오 참고)"
    );
  };

  const probeParentCookies = () => {
    push("시도: parent.document.cookie 읽기 → 위 parent.document 와 동일하게 차단");
  };

  const probeLocalStorage = () => {
    push("시도: 자기 origin localStorage");
    try {
      localStorage.setItem("attacker-probe", "ok");
      const v = localStorage.getItem("attacker-probe");
      push(`자기 origin storage: ${v}`);
    } catch (e) {
      push(`실패: ${(e as Error).message}`);
    }
    push(
      "참고: 부모 origin 의 localStorage 는 SOP 로 접근 불가. cookie/sessionStorage 도 동일."
    );
  };

  const probeFetchSameOrigin = () => {
    push("시도: fetch('/') 자기 origin");
    fetch("/")
      .then((r) => push(`결과: status=${r.status}`))
      .catch((e) => push(`실패: ${e.message}`));
  };

  const probeFetchParent = () => {
    push("시도: fetch(parent origin) → CORS 헤더 없으면 응답 읽기 차단");
    push("참고: 요청 자체는 나가지만 응답 read 가 막힘. cookie 는 SameSite 정책 따름.");
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="sop-probe" />

      <div className="callout">
        이 페이지는 &quot;안 되는 것&quot; 을 확인하는 페이지입니다. 모든 시도가
        차단되어야 정상입니다. 부모와 같은 origin (같은 사이트 내) 에서 임베드
        한 경우에는 일부가 성공할 수 있습니다.
      </div>

      <h2>실행</h2>
      <div className="actions">
        <button onClick={probeParentDocument}>parent.document 읽기</button>
        <button onClick={probeParentLocation}>parent.location 읽기</button>
        <button onClick={probeParentLocationWrite}>parent.location 쓰기 (안내)</button>
        <button onClick={probeParentCookies}>parent.document.cookie</button>
        <button onClick={probeLocalStorage}>localStorage 비교</button>
        <button onClick={probeFetchSameOrigin}>fetch (자기 origin)</button>
        <button onClick={probeFetchParent}>fetch (부모 origin)</button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          cross-origin iframe 은 부모의 DOM, storage, cookie 를 직접 읽지 못합니다.
          이게 진짜 SOP 가 보호해 주는 영역입니다.
        </li>
        <li>
          반면 <code>parent.location</code> <em>쓰기</em>, <code>parent.postMessage</code>,
          form submit, fetch 송신 자체 는 cross-origin 이어도 허용됩니다. 차단은
          모두 sandbox 와 부모 측 검증에 의존합니다.
        </li>
        <li>
          알렌의 진짜 위험 표면은 &quot;데이터 탈취&quot; 가 아니라 &quot;사용자
          기만&quot; 쪽에 더 가깝습니다. 이 페이지를 한번 돌려보면 그 차이가
          분명해집니다.
        </li>
      </ul>
    </>
  );
};

export default SopProbePage;
