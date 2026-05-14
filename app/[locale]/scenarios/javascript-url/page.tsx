"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { PayloadLab } from "@/app/PayloadLab";

const JavascriptUrlPage = () => {
  const scenario = findScenario("javascript-url")!;

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <PayloadLab payloads={scenario.payloads ?? []} previewMode="innerHTML" />

      <h2>해설</h2>
      <ul>
        <li>
          <code>javascript:</code> URL 은 클릭이나 submit 같은 사용자 액션 뒤에
          실행되므로 단순 렌더링 확인만으로 놓치기 쉽습니다.
        </li>
        <li>
          <code>href</code>, <code>src</code>, <code>action</code>,{" "}
          <code>formaction</code> 등 URL 을 받는 모든 속성에서 프로토콜 검증이
          필요합니다.
        </li>
        <li>
          검증 전에는 entity decoding, trim, 대소문자 정규화를 먼저 적용하세요.
        </li>
      </ul>
    </>
  );
};

export default JavascriptUrlPage;
