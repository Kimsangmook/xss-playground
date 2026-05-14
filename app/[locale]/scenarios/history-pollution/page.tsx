"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const HistoryPollutionPage = () => {
  const scenario = findScenario("history-pollution")!;
  const { lines, push, clear } = useLog();

  const pollute = (count: number) => {
    push(`pushState ${count}회 시도`);
    for (let i = 0; i < count; i++) {
      history.pushState({}, "", `?pollute=${Date.now()}-${i}`);
    }
    push("완료. 부모 페이지의 뒤로가기가 이 iframe history 로 묶입니다.");
  };

  const tryBackBlock = () => {
    push("popstate 가로채기 설치");
    window.addEventListener("popstate", (e) => {
      push("popstate 가로챔 → 다시 pushState");
      history.pushState({}, "", "?trapped=" + Date.now());
    });
    push(
      "이제 사용자가 뒤로가기를 눌러도 즉시 다시 앞으로 끌려옵니다 (history trap)"
    );
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="history-pollution" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={() => pollute(10)}>
          history 10개 오염
        </button>
        <button className="danger" onClick={() => pollute(100)}>
          history 100개 오염
        </button>
        <button className="danger" onClick={tryBackBlock}>
          뒤로가기 트랩 설치
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          iframe 의 pushState 는 자기 origin URL 만 변경하지만, 부모 탭의
          뒤로가기 동작에 누적됩니다. 사용자가 알렌에서 다른 페이지로
          돌아가려고 뒤로가기를 눌러도 iframe history 만 돌아가게 됩니다.
        </li>
        <li>
          공격 가치는 annoyance / 사용자가 사이트를 떠나지 못하게 가두는
          용도입니다.
        </li>
        <li>
          sandbox 빈 값(<code>sandbox=&quot;&quot;</code>) 이면 JS 가 막혀
          이 공격도 차단됩니다. <code>allow-scripts</code> 만 줘도 history
          API 자체는 자유롭게 호출됩니다.
        </li>
      </ul>
    </>
  );
};

export default HistoryPollutionPage;
