"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const TokenExfilPage = () => {
  const scenario = findScenario("token-exfil")!;
  const { lines, push, clear } = useLog();

  const probeReferrer = () => {
    push(`document.referrer = "${document.referrer || "(빈 값)"}"`);
    if (document.referrer) {
      const u = new URL(document.referrer);
      push(`→ parent origin = ${u.origin}, pathname = ${u.pathname}`);
    }
  };

  const probeAncestorOrigins = () => {
    const ao = (location as Location & { ancestorOrigins?: DOMStringList })
      .ancestorOrigins;
    if (!ao) return push("ancestorOrigins 미지원");
    const arr = Array.from(ao);
    push(`location.ancestorOrigins = ${JSON.stringify(arr)}`);
  };

  const probeMyStorage = () => {
    push("자기 origin localStorage / sessionStorage 키 나열");
    push(`localStorage keys: ${JSON.stringify(Object.keys(localStorage))}`);
    push(`sessionStorage keys: ${JSON.stringify(Object.keys(sessionStorage))}`);
    push("→ 부모 origin storage 는 SOP 로 접근 불가");
  };

  const askParentForToken = () => {
    const PAYLOADS = [
      { type: "GET_TOKEN" },
      { type: "GET_AUTH_TOKEN" },
      { type: "AUTH_REQUEST" },
      { type: "REQUEST_USER", fields: ["token", "refreshToken", "email"] },
      "GET_TOKEN",
    ];
    push(`부모에게 토큰 요청 페이로드 ${PAYLOADS.length}개 발사`);
    PAYLOADS.forEach((p, i) => {
      setTimeout(() => {
        window.parent.postMessage(p, "*");
        push(`  sent: ${JSON.stringify(p)}`);
      }, i * 200);
    });
  };

  const wrapXHR = () => {
    push("자기 origin XHR/fetch 가로채기 설치 — 부모 네트워크는 못 본다");
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
      isAsync?: boolean,
      username?: string | null,
      password?: string | null
    ) {
      push(`[XHR] ${method} ${String(url)}`);
      return origOpen.call(
        this,
        method,
        url,
        isAsync ?? true,
        username,
        password
      );
    };
    const origFetch = window.fetch;
    window.fetch = function (...args: Parameters<typeof fetch>) {
      const url =
        typeof args[0] === "string"
          ? args[0]
          : args[0] instanceof URL
            ? args[0].toString()
            : "(Request)";
      push(`[fetch] ${url}`);
      return origFetch.apply(this, args);
    };
    push("훅 설치 완료. 부모의 axios/fetch 는 부모 컨텍스트라 안 잡힘.");
  };

  const tryParentLocalStorage = () => {
    push("시도: parent.localStorage 키 접근");
    try {
      const keys = Object.keys(window.parent.localStorage);
      push(`성공 (same-origin): ${JSON.stringify(keys)}`);
    } catch (e) {
      push(`차단됨 (SOP): ${(e as Error).message}`);
    }
  };

  const fetchTokenFromOurOrigin = async () => {
    push("자기 origin /api/dummy 호출 (테스트용 — 부모 서비스 origin 과는 다름)");
    try {
      const r = await fetch("/api/dummy");
      push(`status=${r.status}`);
    } catch (e) {
      push(`실패: ${(e as Error).message}`);
    }
  };

  const runAll = () => {
    push("=== 전체 시도 시작 ===");
    probeReferrer();
    probeAncestorOrigins();
    probeMyStorage();
    setTimeout(askParentForToken, 200);
    setTimeout(tryParentLocalStorage, 2000);
    setTimeout(wrapXHR, 2300);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="token-exfil" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={runAll}>
          전체 자동 시도
        </button>
        <button onClick={probeReferrer}>document.referrer</button>
        <button onClick={probeAncestorOrigins}>ancestorOrigins</button>
        <button onClick={probeMyStorage}>내 storage 키</button>
        <button onClick={tryParentLocalStorage}>parent.localStorage</button>
        <button className="danger" onClick={askParentForToken}>
          부모에게 토큰 달라고 postMessage
        </button>
        <button onClick={wrapXHR}>XHR/fetch 훅 설치</button>
        <button onClick={fetchTokenFromOurOrigin}>자기 origin fetch</button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          <strong>막힘:</strong> parent.localStorage, parent.document.cookie,
          parent.document 접근, 부모 XHR/fetch 가로채기 — 모두 SOP 가 차단.
        </li>
        <li>
          <strong>통과:</strong> document.referrer (부모 URL 노출),
          location.ancestorOrigins (부모 origin 노출), parent.postMessage 송신,
          자기 origin 안에서 키/클릭/입력 수집.
        </li>
        <li>
          <strong>위험 변수:</strong> 부모 서비스가 message 리스너에서 토큰을
          돌려주는 핸들러를 두고 있다면, 인가되지 않은 호스트의 iframe 에도
          토큰이 흘러갈 수 있음. <code>event.origin</code> 검증 필수.
        </li>
      </ul>
    </>
  );
};

export default TokenExfilPage;
