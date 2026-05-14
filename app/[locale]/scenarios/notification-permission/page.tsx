"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const NotificationPermissionPage = () => {
  const scenario = findScenario("notification-permission")!;
  const { lines, push, clear } = useLog();

  const tryRequest = async () => {
    push(`현재 상태: ${Notification.permission}`);
    try {
      const result = await Notification.requestPermission();
      push(`결과: ${result}`);
    } catch (e) {
      push(`실패: ${(e as Error).message}`);
    }
  };

  const tryShow = () => {
    push(`Notification.permission = ${Notification.permission}`);
    if (Notification.permission !== "granted") {
      push("권한 없음 → 알림 표시 불가");
      return;
    }
    new Notification("보안 알림", {
      body: "(이건 attacker.example 에서 보낸 알림입니다)",
      icon: "/favicon.ico",
    });
    push("알림 발사");
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="notification-permission" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={tryRequest}>
          Notification.requestPermission()
        </button>
        <button className="danger" onClick={tryShow}>
          알림 표시 시도
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          최신 크롬은 사용자 제스처 + 메인 프레임 + 안전한 origin 을 요구해서
          iframe 안의 자동 호출은 보통 차단됩니다. 사파리/파폭은 정책이 더
          느슨할 수 있습니다.
        </li>
        <li>
          위험성은 즉시 정보 탈취가 아니라{" "}
          <strong>이후 사용자가 다른 페이지를 보고 있을 때 attacker 도메인이
          푸시 알림으로 피싱 가능</strong> 해진다는 점입니다.
        </li>
        <li>
          iframe 에서 권한 프롬프트가 뜨려면 <code>allow=&quot;notifications&quot;</code>
          가 필요한 브라우저도 있습니다. 임의 호스트 iframe 이라면 절대 부여하면
          안 됩니다.
        </li>
      </ul>
    </>
  );
};

export default NotificationPermissionPage;
