"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { PayloadLab } from "@/app/PayloadLab";

const DomInnerHtmlSinkPage = () => {
  const scenario = findScenario("dom-innerhtml-sink")!;

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <PayloadLab payloads={scenario.payloads ?? []} previewMode="innerHTML" />

      <h2>해설</h2>
      <ul>
        <li>
          DOM 기반 XSS 는 서버 응답이 안전해도 클라이언트 코드가 untrusted source
          를 unsafe sink 에 넣으면서 발생합니다.
        </li>
        <li>
          대표 source 는 <code>location.search</code>, <code>location.hash</code>,{" "}
          <code>postMessage</code>, storage 값이고, 대표 sink 는{" "}
          <code>innerHTML</code>, <code>outerHTML</code>,{" "}
          <code>insertAdjacentHTML</code> 입니다.
        </li>
        <li>
          가능한 경우 <code>textContent</code> 나 DOM API 로 렌더링하고, HTML 이
          필요할 때만 HTML 필터를 통과시키세요.
        </li>
      </ul>
    </>
  );
};

export default DomInnerHtmlSinkPage;
