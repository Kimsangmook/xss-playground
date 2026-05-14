"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const PopupSpamPage = () => {
  const scenario = findScenario("popup-spam")!;
  const { lines, push, clear } = useLog();

  const openSelf = () => {
    push("window.open(self) 시도");
    const w = window.open(location.href, "_blank");
    push(`반환: ${w ? "Window 객체" : "null (팝업 차단됨)"}`);
  };

  const openExternal = () => {
    push("window.open('https://example.com') 시도");
    const w = window.open("https://example.com", "_blank");
    push(`반환: ${w ? "Window 객체" : "null (팝업 차단됨)"}`);
    if (w) {
      push("opener 관계로 부모와 연결됨. noopener 없으면 window.opener 접근 가능");
    }
  };

  const tryFlood = () => {
    push("3번 연속 window.open 시도 (브라우저는 보통 첫 1개 외에는 차단)");
    for (let i = 0; i < 3; i++) {
      const w = window.open("about:blank", "_blank");
      push(`[${i + 1}] ${w ? "열림" : "차단됨"}`);
    }
  };

  const tryOpenerTakeover = () => {
    push(
      "공격 시나리오: 새 창 띄운 후 opener 가 noopener 없으면 opener.location 변경 가능 (tabnabbing)"
    );
    const w = window.open("about:blank", "_blank");
    if (!w) return push("팝업 차단됨");
    try {
      // 이 페이지에서 띄운 새 창은 같은 origin 이라 opener 접근 가능
      // 실제 공격은 새 창 안의 페이지가 부모 opener.location 을 바꾸는 형태
      push(`(opener tabnabbing 은 새 창 컨텍스트에서 동작. 여기서는 데모 불가)`);
    } catch (e) {
      push(`차단: ${(e as Error).message}`);
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="popup-spam" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={openSelf}>
          window.open(self)
        </button>
        <button className="danger" onClick={openExternal}>
          window.open(external)
        </button>
        <button className="danger" onClick={tryFlood}>
          여러 개 동시 열기
        </button>
        <button onClick={tryOpenerTakeover}>opener tabnabbing 설명</button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          브라우저는 사용자 제스처 없는 window.open 을 막아 주지만,
          사용자가 iframe 영역을 한 번이라도 클릭한 직후라면 보통 통과합니다.
        </li>
        <li>
          <code>sandbox</code> 에 <code>allow-popups</code> 키워드가 없으면
          차단됩니다. 알렌처럼 임의 호스트를 허용한다면 이 키워드는 빼는 게
          맞습니다.
        </li>
        <li>
          새 창이 부모와 같은 origin 이면 opener 를 통한 tabnabbing 도 가능합니다.
          알렌 부모는 cross-origin 이라 직접 영향은 적지만,{" "}
          <code>opener.location</code> 변경은 cross-origin 이어도 허용되는 점을
          기억하세요.
        </li>
      </ul>
    </>
  );
};

export default PopupSpamPage;
