"use client";

import { useRef } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const VICTIM_TEXT =
  "여기서 이 줄을 직접 선택해서 복사(Cmd/Ctrl+C) 해 보세요. 클립보드에 다른 내용이 들어갑니다.";

const ClipboardHijackPage = () => {
  const scenario = findScenario("clipboard-hijack")!;
  const { lines, push, clear } = useLog();
  const textRef = useRef<HTMLDivElement>(null);

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const hijack =
      "rm -rf /  ← 원래 복사하려던 내용이 이걸로 바뀌었습니다. (PoC: 클립보드 hijack 성공)";
    e.clipboardData.setData("text/plain", hijack);
    push(`copy 이벤트 가로챔 → 덮어쓴 값: "${hijack}"`);
  };

  const tryWriteClipboard = async () => {
    push("navigator.clipboard.writeText() 시도 (사용자 제스처 필요)");
    try {
      await navigator.clipboard.writeText(
        "이건 iframe 이 직접 clipboard.writeText() 로 쓴 값입니다."
      );
      push("쓰기 성공");
    } catch (e) {
      push(`실패: ${(e as Error).message}`);
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="clipboard-hijack" />

      <h2>실행</h2>
      <div ref={textRef} className="card" onCopy={handleCopy}>
        {VICTIM_TEXT}
      </div>
      <div className="actions">
        <button className="danger" onClick={tryWriteClipboard}>
          clipboard.writeText() 직접 쓰기
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          <code>copy</code> 이벤트는 자기 origin 페이지 안에서 자유롭게 가로챌 수
          있습니다. 사용자가 서비스 콘텐츠 안의 일부 텍스트를 복사한 줄 알았는데
          실제 클립보드에는 다른 내용이 들어갈 수 있습니다.
        </li>
        <li>
          공격 가치 예시: 송금 주소를 비슷한 형태의 다른 주소로 갈아 끼우기,
          쉘 명령어를 위험한 명령어로 바꾸기.
        </li>
        <li>
          <code>navigator.clipboard.writeText</code> 는 사용자 제스처 + 포커스 +
          permissions 가 필요해서 자동 호출은 보통 차단됩니다.
        </li>
        <li>
          sandbox 빈 값(<code>sandbox=&quot;&quot;</code>) 이면 JS 가 막혀서 이
          공격도 차단됩니다.
        </li>
      </ul>
    </>
  );
};

export default ClipboardHijackPage;
