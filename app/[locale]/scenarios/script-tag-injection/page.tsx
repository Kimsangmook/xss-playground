"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { PayloadLab } from "@/app/PayloadLab";

const ScriptTagInjectionPage = () => {
  const scenario = findScenario("script-tag-injection")!;

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <PayloadLab payloads={scenario.payloads ?? []} previewMode="srcdoc" />

      <h2>해설</h2>
      <ul>
        <li>
          서버가 사용자 입력을 HTML 문서에 그대로 반영하면{" "}
          <code>{"<script>"}</code> 태그가 파서에 의해 실행될 수 있습니다.
        </li>
        <li>
          반대로 <code>innerHTML</code> 로 나중에 삽입한 script 태그는 최신
          브라우저에서 보통 실행되지 않습니다. 그래서 이 페이지의 미리보기는
          전체 HTML 문서 파싱 상황을 재현하기 위해 격리된 미리보기를 사용합니다.
        </li>
        <li>
          대응은 출력 컨텍스트별 인코딩, 신뢰 가능한 HTML 필터, CSP{" "}
          <code>script-src</code> 조합으로 확인하세요.
        </li>
      </ul>
    </>
  );
};

export default ScriptTagInjectionPage;
