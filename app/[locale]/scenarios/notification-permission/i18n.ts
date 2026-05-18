import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: { request: string; show: string; clearLog: string };
  log: {
    current: string;
    result: string;
    failed: string;
    permission: string;
    noPermission: string;
    fired: string;
  };
  notification: { title: string; body: string };
  explanation: string[];
}

const ko: IPageText = {
  title: "알림 권한 요청 / 푸시 hijack",
  summary:
    "Notification.requestPermission 을 호출해 권한 프롬프트와 이후 피싱 알림 가능성을 확인한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    request: "Notification.requestPermission()",
    show: "알림 표시 시도",
    clearLog: "로그 초기화",
  },
  log: {
    current: "현재 상태: {value}",
    result: "결과: {value}",
    failed: "실패: {message}",
    permission: "Notification.permission = {value}",
    noPermission: "권한 없음 → 알림 표시 불가",
    fired: "알림 발사",
  },
  notification: {
    title: "보안 알림",
    body: "(이건 attacker.example 에서 보낸 알림입니다)",
  },
  explanation: [
    "최신 Chrome/Firefox 는 cross-origin iframe 에서 알림 권한을 요청하는 흐름을 막습니다. 테스트할 때는 HTTPS, 사용자 제스처, top-level 문서 여부를 함께 기록하세요.",
    "위험성은 즉시 정보 탈취가 아니라 <strong>사용자가 알림 권한을 허용한 origin 이 이후 피싱 알림을 보낼 수 있다는 점</strong>입니다. 장기 push 는 별도의 service worker / push subscription 흐름까지 필요합니다.",
    "임의 호스트 iframe 에 강력한 browser permission 을 위임하는 정책을 두지 마세요. 권한 API 는 브라우저별 차이가 커서 실제 대상 브라우저에서 확인해야 합니다.",
  ],
};

const en: IPageText = {
  title: "Notification permission / push hijack",
  summary:
    "Call Notification.requestPermission and inspect permission prompts plus later phishing-notification risk.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    request: "Notification.requestPermission()",
    show: "Try showing notification",
    clearLog: "Clear log",
  },
  log: {
    current: "current state: {value}",
    result: "result: {value}",
    failed: "failed: {message}",
    permission: "Notification.permission = {value}",
    noPermission: "no permission → cannot show",
    fired: "notification fired",
  },
  notification: {
    title: "Security notice",
    body: "(this came from attacker.example)",
  },
  explanation: [
    "Modern Chrome/Firefox block notification permission requests from cross-origin iframes. When testing, record HTTPS, user gesture, and whether the request runs in a top-level document.",
    "The risk is not immediate exfiltration — it is <strong>an origin with notification permission being able to send phishing notifications later</strong>. Long-lived push also requires a service worker / push subscription flow.",
    "Do not delegate powerful browser permissions to arbitrary-host iframes. Permission APIs differ by browser, so verify behavior in the browsers you support.",
  ],
};

const ja: IPageText = {
  title: "通知権限リクエスト / push hijack",
  summary:
    "Notification.requestPermission を呼び出し、権限 prompt と後続のフィッシング通知リスクを確認します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    request: "Notification.requestPermission()",
    show: "通知表示を試す",
    clearLog: "ログをクリア",
  },
  log: {
    current: "現在の状態: {value}",
    result: "結果: {value}",
    failed: "失敗: {message}",
    permission: "Notification.permission = {value}",
    noPermission: "権限なし → 通知表示不可",
    fired: "通知を発火",
  },
  notification: {
    title: "セキュリティ通知",
    body: "(これは attacker.example から送られた通知です)",
  },
  explanation: [
    "最新の Chrome/Firefox は cross-origin iframe からの通知権限要求をブロックします。テスト時は HTTPS、ユーザー操作、top-level document かどうかを記録します。",
    "リスクは即時の情報窃取ではなく、<strong>通知権限を得た origin が後で phishing 通知を送れる</strong>点です。長期 push には service worker / push subscription の流れも必要です。",
    "任意ホスト iframe に強力な browser permission を委任しないでください。Permission API はブラウザ差が大きいため、対象ブラウザで確認します。",
  ],
};

const zh: IPageText = {
  title: "通知权限请求 / push 劫持",
  summary:
    "调用 Notification.requestPermission，检查权限提示以及后续钓鱼通知风险。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    request: "Notification.requestPermission()",
    show: "尝试显示通知",
    clearLog: "清空日志",
  },
  log: {
    current: "当前状态: {value}",
    result: "结果: {value}",
    failed: "失败: {message}",
    permission: "Notification.permission = {value}",
    noPermission: "无权限 → 无法显示通知",
    fired: "通知已触发",
  },
  notification: {
    title: "安全通知",
    body: "（这是 attacker.example 发送的通知）",
  },
  explanation: [
    "现代 Chrome/Firefox 会阻止 cross-origin iframe 请求通知权限。测试时应同时记录 HTTPS、用户手势以及是否在 top-level document 中触发。",
    "风险不是立即窃取信息，而是<strong>获得通知权限的 origin 之后可以发送钓鱼通知</strong>。长期 push 还需要 service worker / push subscription 流程。",
    "不要把强大的浏览器权限委托给任意主机 iframe。Permission API 的浏览器差异较大，应在目标浏览器中验证。",
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
