"use client";

import { useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const CsrfImagePage = () => {
  const scenario = findScenario("csrf-image")!;
  const { lines, push, clear } = useLog();
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const fireImage = () => {
    const url = `https://httpbin.org/image/png?fired=${Date.now()}`;
    push(`img.src 로 GET 요청: ${url}`);
    setImgSrc(url);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="csrf-image" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={fireImage}>
          img.src 로 GET 발사
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      {imgSrc && (
        <img
          alt=""
          src={imgSrc}
          onLoad={() => push("img onload 발생")}
          onError={() => push("img onerror 발생")}
          style={{ display: "block", margin: "10px 0", maxWidth: 200 }}
        />
      )}
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          가장 오래된 CSRF 형태. <code>&lt;img src=&quot;https://target/action?a=b&quot;&gt;</code>{" "}
          한 줄로 사용자 쿠키와 함께 GET 요청이 날아갑니다.
        </li>
        <li>
          sandbox 가 빈 값이어도 img 요청은 갑니다. 진짜 막으려면 CSP{" "}
          <code>img-src</code> 또는 HTML 렌더링 단계에서 img 태그 src 호스트 검증이
          필요합니다.
        </li>
        <li>
          타깃이 SameSite=Lax 쿠키를 쓴다면 cross-site GET 으로는 쿠키가 안 붙어
          CSRF 영향은 거의 없습니다. 다만 IP 노출, 트래킹 픽셀, internal-only
          엔드포인트 핑 정도는 여전히 가능합니다.
        </li>
        <li>
          참고: 많은 에디터와 CMS 는 img 태그를 일반적으로 허용하므로, 이
          공격면을 막으려면 host allowlist 또는 CSP 가 필요합니다.
        </li>
      </ul>
    </>
  );
};

export default CsrfImagePage;
