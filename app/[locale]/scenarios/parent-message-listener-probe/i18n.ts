import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "부모의 message 리스너 fingerprinting",
  summary:
    "여러 postMessage payload 를 부모에게 보내 응답이나 사이드 이펙트로 리스너 존재를 관찰한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    fireAll: "payload 전체 발사",
    clearLog: "로그 초기화",
  },
  text: {
    targetOriginLabel: "target origin",
    repliesHeading: "부모로부터 받은 응답",
    noReplies: "// 응답 없음",
  },
  log: {
    received: "부모/다른 프레임에서 message 수신: origin={origin} data={data}",
    sending: "fire: {label}",
    sentAll: "payload {count}개 전송 완료",
  },
  explanation: [
    "부모 페이지가 어떤 message listener 를 갖고 있는지 직접 읽을 수는 없지만, 다양한 payload 를 던진 뒤 응답이나 화면 변화, 라우팅 변화를 관찰할 수 있습니다.",
    "리스너가 origin 검증 없이 라우팅, 인증, resize, close 같은 동작을 수행하면 iframe 이 부모 동작을 유도할 수 있습니다.",
    "대응은 origin allowlist, message schema 검증, 예상하지 않은 message 무시, 그리고 민감한 동작의 사용자 확인입니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Parent message listener fingerprinting",
  summary:
    "Send multiple postMessage payloads to the parent and observe responses or side effects.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    fireAll: "Fire all payloads",
    clearLog: "Clear log",
  },
  text: {
    targetOriginLabel: "target origin",
    repliesHeading: "Responses from parent",
    noReplies: "// no responses",
  },
  log: {
    received: "message received from parent/other frame: origin={origin} data={data}",
    sending: "fire: {label}",
    sentAll: "sent {count} payloads",
  },
  explanation: [
    "You cannot directly read the parent's message listeners, but you can send varied payloads and watch for replies, visual changes, or routing side effects.",
    "If a listener performs routing, auth, resize, or close actions without origin checks, the iframe can influence parent behavior.",
    "Mitigate with an origin allowlist, message schema validation, ignoring unexpected messages, and user confirmation for sensitive actions.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "親ページ message listener フィンガープリント",
  summary:
    "複数の postMessage payload を親へ送り、応答や副作用から listener の存在を観察します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    fireAll: "全 payload を送信",
    clearLog: "ログをクリア",
  },
  text: {
    targetOriginLabel: "target origin",
    repliesHeading: "親から受け取った応答",
    noReplies: "// 応答なし",
  },
  log: {
    received: "親/別フレームから message 受信: origin={origin} data={data}",
    sending: "fire: {label}",
    sentAll: "{count} 個の payload を送信しました",
  },
  explanation: [
    "親ページの message listener を直接読むことはできませんが、複数の payload を送り、応答や表示変化、ルーティング変化を観察できます。",
    "origin 検証なしで routing、auth、resize、close などを行う listener があると、iframe が親の動作に影響できます。",
    "origin allowlist、message schema 検証、想定外 message の無視、重要操作のユーザー確認で防ぎます。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "父页面 message listener 指纹探测",
  summary:
    "向父页面发送多种 postMessage payload，并观察响应或副作用。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    fireAll: "发送全部 payload",
    clearLog: "清空日志",
  },
  text: {
    targetOriginLabel: "target origin",
    repliesHeading: "来自父页面的响应",
    noReplies: "// 无响应",
  },
  log: {
    received: "从父页面/其他 frame 收到 message: origin={origin} data={data}",
    sending: "fire: {label}",
    sentAll: "已发送 {count} 个 payload",
  },
  explanation: [
    "无法直接读取父页面的 message listener，但可以发送多种 payload，并观察回复、视觉变化或路由变化。",
    "如果 listener 在没有 origin 校验的情况下执行路由、认证、resize、关闭等动作，iframe 就可能影响父页面行为。",
    "防护方式包括 origin allowlist、message schema 校验、忽略意外消息，以及敏感动作需要用户确认。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
