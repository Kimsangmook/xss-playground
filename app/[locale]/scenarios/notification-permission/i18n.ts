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
    "최신 크롬은 사용자 제스처 + 메인 프레임 + 안전한 origin 을 요구해서 iframe 안의 자동 호출은 보통 차단됩니다. 사파리/파폭은 정책이 더 느슨할 수 있습니다.",
    "위험성은 즉시 정보 탈취가 아니라 <strong>이후 사용자가 다른 페이지를 보고 있을 때 attacker 도메인이 푸시 알림으로 피싱 가능</strong>해진다는 점입니다.",
    'iframe 에서 권한 프롬프트가 뜨려면 <code>allow="notifications"</code> 가 필요한 브라우저도 있습니다. 임의 호스트 iframe 이라면 절대 부여하면 안 됩니다.',
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
    "Chrome requires a user gesture + main frame + secure origin, so automatic calls inside an iframe are usually blocked. Safari/Firefox are more permissive.",
    "The risk is not immediate exfiltration — it is <strong>letting the attacker domain push phishing notifications later, while the user is on other pages</strong>.",
    'Some browsers require <code>allow="notifications"</code> on the iframe for the prompt to appear at all. For arbitrary-host iframes, never grant it.',
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
    "Chrome はユーザー操作、main frame、安全な origin を要求するため、iframe 内の自動呼び出しは通常ブロックされます。Safari/Firefox はより緩い場合があります。",
    "リスクは即時の情報窃取ではなく、<strong>後でユーザーが別ページを見ているときに攻撃者 domain が phishing 通知を送れる</strong>点です。",
    'iframe で権限 prompt を出すには <code>allow="notifications"</code> が必要なブラウザもあります。任意ホスト iframe には絶対に付与しないでください。',
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
    "Chrome 要求用户手势、主 frame 和安全 origin，因此 iframe 内自动调用通常会被阻止。Safari/Firefox 的策略可能更宽松。",
    "风险不是立即窃取信息，而是<strong>攻击者域名之后可以在用户浏览其他页面时推送钓鱼通知</strong>。",
    '某些浏览器要求 iframe 设置 <code>allow="notifications"</code> 才会出现权限提示。对任意主机 iframe 绝不要授予它。',
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
