"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { PayloadLab } from "@/app/PayloadLab";

const SvgOnloadPage = () => {
  const scenario = findScenario("svg-onload")!;

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <PayloadLab payloads={scenario.payloads ?? []} previewMode="srcdoc" />

      <h2>해설</h2>
      <ul>
        <li>
          SVG / MathML 은 HTML 과 다른 namespace 를 쓰기 때문에 느슨한 필터가
          태그 구조나 이벤트 속성을 놓치는 경우가 있습니다.
        </li>
        <li>
          실제 서비스에서 SVG 가 꼭 필요하지 않다면 제거하는 편이 단순하고
          안전합니다.
        </li>
        <li>
          허용해야 한다면 태그, 속성, URL 속성을 모두 구조적으로 검증하세요.
        </li>
      </ul>
    </>
  );
};

export default SvgOnloadPage;
