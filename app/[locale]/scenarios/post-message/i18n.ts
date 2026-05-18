import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "postMessage 스푸핑",
  summary:
    "parent.postMessage 로 부모 페이지에 위조 메시지를 보내고 origin 검증 누락을 확인한다.",
  actionLabels: {
    presetString: "단순 string",
    presetAuth: "auth 류 객체",
    presetRouter: "router 류 객체",
    presetResize: "iframe-resize 류 객체",
    presetScript: "스크립트 문자열 (eval-trap 탐색용)",
    clearLog: "로그 초기화",
  },
  logMessages: {
    sending: 'parent.postMessage({data}, "{target}")',
    sent: "전송 완료",
    sendFailed: "전송 실패: {message}",
  },
  text: {
    targetOriginLabel: "target origin",
    targetPlaceholder: '"*" 또는 정확한 origin',
  },
  explanation: [
    "postMessage 는 cross-origin 통신용으로 의도된 API 입니다. SOP 가 막아 주지 않으므로 부모 쪽에서 <strong>event.origin 검증</strong>을 해야 합니다.",
    "부모 페이지가 결제 위젯, iframe-resizer, 유튜브 IFrame API 같은 message 리스너를 두고 있다면, 그 포맷을 흉내낸 메시지가 공격 표면이 됩니다.",
    '대응은 <code>event.origin</code> 검증과 메시지 type/schema 검증입니다. sandbox 에서는 <code>sandbox=""</code> 이라야 postMessage 까지 막힙니다.',
  ],
};

const en: IScenarioPageI18n = {
  title: "postMessage spoofing",
  summary:
    "Send forged messages to the parent page and check whether origin validation is missing.",
  actionLabels: {
    presetString: "plain string",
    presetAuth: "auth-style object",
    presetRouter: "router-style object",
    presetResize: "iframe-resize style object",
    presetScript: "script string (eval-trap probe)",
    clearLog: "Clear log",
  },
  logMessages: {
    sending: 'parent.postMessage({data}, "{target}")',
    sent: "sent",
    sendFailed: "send failed: {message}",
  },
  text: {
    targetOriginLabel: "target origin",
    targetPlaceholder: '"*" or a specific origin',
  },
  explanation: [
    "postMessage is the intended cross-origin channel. SOP does not block it, so the parent must validate <strong>event.origin</strong>.",
    "If the parent uses message listeners for a payment widget, iframe-resizer, the YouTube IFrame API, and similar integrations, mimicking that format becomes an attack surface.",
    'Defense is <code>event.origin</code> validation plus message type/schema validation. In sandbox, only <code>sandbox=""</code> blocks postMessage itself.',
  ],
};

const ja: IScenarioPageI18n = {
  title: "postMessage スプーフィング",
  summary:
    "parent.postMessage で親ページへ偽メッセージを送り、origin 検証漏れを確認します。",
  actionLabels: {
    presetString: "単純な string",
    presetAuth: "auth 系 object",
    presetRouter: "router 系 object",
    presetResize: "iframe-resize 系 object",
    presetScript: "script 文字列 (eval-trap 調査)",
    clearLog: "ログをクリア",
  },
  logMessages: {
    sending: 'parent.postMessage({data}, "{target}")',
    sent: "送信しました",
    sendFailed: "送信失敗: {message}",
  },
  text: {
    targetOriginLabel: "target origin",
    targetPlaceholder: '"*" または正確な origin',
  },
  explanation: [
    "postMessage は cross-origin 通信用の API です。SOP は止めないため、親側で <strong>event.origin 検証</strong>が必要です。",
    "親ページが決済ウィジェット、iframe-resizer、YouTube IFrame API などの message listener を持つ場合、その形式を真似たメッセージが攻撃面になります。",
    '対策は <code>event.origin</code> 検証と message type/schema 検証です。sandbox では <code>sandbox=""</code> のみ postMessage 自体を止めます。',
  ],
};

const zh: IScenarioPageI18n = {
  title: "postMessage 欺骗",
  summary:
    "通过 parent.postMessage 向父页面发送伪造消息，检查是否缺少 origin 校验。",
  actionLabels: {
    presetString: "普通 string",
    presetAuth: "auth 类对象",
    presetRouter: "router 类对象",
    presetResize: "iframe-resize 类对象",
    presetScript: "script 字符串（eval-trap 探测）",
    clearLog: "清空日志",
  },
  logMessages: {
    sending: 'parent.postMessage({data}, "{target}")',
    sent: "已发送",
    sendFailed: "发送失败: {message}",
  },
  text: {
    targetOriginLabel: "target origin",
    targetPlaceholder: '"*" 或准确 origin',
  },
  explanation: [
    "postMessage 是设计用于 cross-origin 通信的 API。SOP 不会阻止它，因此父页面必须验证 <strong>event.origin</strong>。",
    "如果父页面为支付组件、iframe-resizer、YouTube IFrame API 等集成保留了 message listener，模仿这些格式就会成为攻击面。",
    '防护需要验证 <code>event.origin</code>，并校验消息 type/schema。在 sandbox 中，只有 <code>sandbox=""</code> 会阻止 postMessage 本身。',
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
