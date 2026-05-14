"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { PayloadLab } from "@/app/PayloadLab";

const EventHandlerAttributePage = () => {
  const scenario = findScenario("event-handler-attribute")!;

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <PayloadLab payloads={scenario.payloads ?? []} previewMode="innerHTML" />

      <h2>해설</h2>
      <ul>
        <li>
          <code>{"<script>"}</code> 태그를 제거해도 <code>onerror</code>,{" "}
          <code>onclick</code>, <code>onload</code> 같은 이벤트 속성이 남으면
          스크립트 실행이 가능합니다.
        </li>
        <li>
          태그 allowlist 와 별도로 속성 allowlist 를 관리해야 하며,{" "}
          <code>on*</code> 속성은 기본적으로 제거하는 편이 안전합니다.
        </li>
        <li>
          CSP 에서 inline event handler 를 막는지도 함께 확인하세요.
        </li>
      </ul>
    </>
  );
};

export default EventHandlerAttributePage;
