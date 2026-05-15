import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "지연 / 자동 실행 페이로드",
  summary:
    "URL 파라미터나 카운트다운으로 일정 시간 뒤 top-redirect, postMessage, form submit 등을 자동 실행한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    start: "카운트다운 시작",
    remaining: "{n}초 남음",
    cancel: "취소",
    fireNow: "즉시 발사",
    clearLog: "로그 초기화",
  },
  text: {
    actionLabel: "액션",
    delayLabel: "지연(초)",
    actionTopRedirect: "top.location 리다이렉트",
    actionPostMessage: "parent.postMessage",
    actionFormSubmit: "외부 form submit",
    actionOpenPopup: "window.open",
    autoHeading: "임베드 페이지 자동 발사",
    autoBody:
      "실제 임베드 시에는 사용자 상호작용 없이 자동 실행되도록 URL 파라미터를 넣어두면 됩니다. 예시:",
  },
  log: {
    countdown: "{delay}초 카운트다운 시작 — 액션 = {action}",
    cancelled: "취소됨",
    firing: "발사: {action}",
    blocked: "차단: {message}",
    postMessage: "parent.postMessage 발사",
    formSubmitted: "외부 form submit 호출",
    popupResult: "window.open {result}",
    opened: "성공",
    blockedPlain: "차단",
  },
  explanation: [
    "저장형 XSS 나 임베드 공격은 페이지 로드 직후가 아니라 사용자가 신뢰를 형성한 뒤 실행될 때 더 위험합니다.",
    "지연 실행은 보안 리뷰에서 놓치기 쉽습니다. 저장 후 즉시 확인만 하지 말고 몇 초 뒤, 상호작용 뒤, 재방문 뒤 실행도 확인해야 합니다.",
    "방어는 렌더링 단계에서 payload 를 제거하거나, CSP / sandbox / message 검증으로 실행 표면을 막는 방식으로 확인합니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Delayed / auto-fire payload",
  summary:
    "Auto-fire top-redirect, postMessage, form submit, and similar actions after a timer or URL parameter.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    start: "Start countdown",
    remaining: "{n}s left",
    cancel: "Cancel",
    fireNow: "Fire now",
    clearLog: "Clear log",
  },
  text: {
    actionLabel: "Action",
    delayLabel: "Delay (seconds)",
    actionTopRedirect: "top.location redirect",
    actionPostMessage: "parent.postMessage",
    actionFormSubmit: "external form submit",
    actionOpenPopup: "window.open",
    autoHeading: "Auto-fire embed page",
    autoBody:
      "For real embed testing, add URL parameters so the action runs without user interaction. Example:",
  },
  log: {
    countdown: "countdown started: {delay}s — action = {action}",
    cancelled: "cancelled",
    firing: "fire: {action}",
    blocked: "blocked: {message}",
    postMessage: "parent.postMessage fired",
    formSubmitted: "external form submit called",
    popupResult: "window.open {result}",
    opened: "opened",
    blockedPlain: "blocked",
  },
  explanation: [
    "Stored XSS and embedded attacks are often more dangerous when they run after the user has developed trust, not immediately at page load.",
    "Delayed execution is easy to miss in review. Test a few seconds later, after interaction, and on revisit instead of only checking the first render.",
    "Defenses are validated either by removing the payload at render time or by closing execution surfaces with CSP, sandbox, and message validation.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "遅延 / 自動実行 payload",
  summary:
    "タイマーや URL パラメータで top-redirect、postMessage、form submit などを後から自動実行します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    start: "カウントダウン開始",
    remaining: "残り {n} 秒",
    cancel: "キャンセル",
    fireNow: "今すぐ実行",
    clearLog: "ログをクリア",
  },
  text: {
    actionLabel: "アクション",
    delayLabel: "遅延(秒)",
    actionTopRedirect: "top.location redirect",
    actionPostMessage: "parent.postMessage",
    actionFormSubmit: "外部 form submit",
    actionOpenPopup: "window.open",
    autoHeading: "埋め込みページの自動実行",
    autoBody:
      "実際の埋め込みテストでは、ユーザー操作なしで動くよう URL パラメータを付けられます。例:",
  },
  log: {
    countdown: "{delay}秒のカウントダウン開始 — action = {action}",
    cancelled: "キャンセルしました",
    firing: "実行: {action}",
    blocked: "ブロック: {message}",
    postMessage: "parent.postMessage を発火",
    formSubmitted: "外部 form submit を呼び出しました",
    popupResult: "window.open {result}",
    opened: "成功",
    blockedPlain: "ブロック",
  },
  explanation: [
    "Stored XSS や埋め込み攻撃は、ページ読み込み直後ではなくユーザーが信頼した後に動くとより危険です。",
    "遅延実行はレビューで見落としやすいため、初回描画だけでなく数秒後、操作後、再訪問後も確認します。",
    "対策はレンダリング時の payload 除去、または CSP / sandbox / message 検証で実行面を閉じることで確認できます。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "延迟 / 自动触发 payload",
  summary:
    "通过计时器或 URL 参数，在一段时间后自动触发 top-redirect、postMessage、form submit 等动作。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    start: "开始倒计时",
    remaining: "剩余 {n} 秒",
    cancel: "取消",
    fireNow: "立即触发",
    clearLog: "清空日志",
  },
  text: {
    actionLabel: "动作",
    delayLabel: "延迟（秒）",
    actionTopRedirect: "top.location 跳转",
    actionPostMessage: "parent.postMessage",
    actionFormSubmit: "外部 form submit",
    actionOpenPopup: "window.open",
    autoHeading: "嵌入页面自动触发",
    autoBody:
      "实际嵌入测试时，可以添加 URL 参数让动作在没有用户交互的情况下运行。示例：",
  },
  log: {
    countdown: "开始 {delay} 秒倒计时 — action = {action}",
    cancelled: "已取消",
    firing: "触发: {action}",
    blocked: "已阻止: {message}",
    postMessage: "parent.postMessage 已触发",
    formSubmitted: "已调用外部 form submit",
    popupResult: "window.open {result}",
    opened: "成功",
    blockedPlain: "阻止",
  },
  explanation: [
    "Stored XSS 和嵌入式攻击如果不是页面加载后立即执行，而是在用户建立信任后执行，风险会更高。",
    "延迟执行很容易在审查中漏掉。不要只检查首次渲染，还要检查几秒后、交互后和再次访问时的行为。",
    "防护可以通过渲染阶段移除 payload，或用 CSP / sandbox / message 校验关闭执行表面来验证。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
