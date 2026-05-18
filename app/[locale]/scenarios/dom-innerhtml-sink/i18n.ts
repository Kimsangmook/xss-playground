import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const payloads = [
  {
    label: "img onerror DOM sink",
    value: "<img src=x onerror=\"alert('dom-xss')\">",
  },
  {
    label: "autofocus onfocus",
    value:
      '<input autofocus onfocus="alert(\'dom-xss\')" value="focus payload">',
  },
];

const ko: IScenarioPageI18n = {
  title: "DOM innerHTML sink",
  summary:
    "location, hash, postMessage 등에서 온 문자열을 innerHTML 같은 unsafe sink 에 넣을 때 DOM 기반 XSS 가 발생하는지 확인한다.",
  checks: [
    "untrusted source 가 innerHTML, outerHTML, insertAdjacentHTML 로 들어가는지 확인",
    "textContent / DOM API 기반 렌더링으로 대체 가능한지 확인",
    "클라이언트 라우터, hash, postMessage payload 를 sink 에 넣기 전 검증하는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "innerHTML 에 들어갔을 때 이벤트 핸들러가 실행되는지 확인.",
    },
    { ...payloads[1], note: "자동 focus 이벤트 기반 DOM XSS 확인." },
  ],
  explanationHeading: "해설",
  explanation: [
    "DOM 기반 XSS 는 서버 응답이 안전해도 클라이언트 코드가 untrusted source 를 unsafe sink 에 넣으면서 발생합니다.",
    "대표 source 는 <code>location.search</code>, <code>location.hash</code>, <code>postMessage</code>, storage 값이고, 대표 sink 는 <code>innerHTML</code>, <code>outerHTML</code>, <code>insertAdjacentHTML</code> 입니다.",
    "가능한 경우 <code>textContent</code> 나 DOM API 로 렌더링하고, HTML 이 필요할 때만 HTML 필터를 통과시키세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "DOM innerHTML sink",
  summary:
    "Check whether untrusted values from location, hash, postMessage, and similar sources reach unsafe sinks such as innerHTML.",
  checks: [
    "Verify whether untrusted sources reach innerHTML, outerHTML, or insertAdjacentHTML",
    "Check whether rendering can be replaced with textContent or DOM APIs",
    "Validate client router, hash, and postMessage payloads before writing to a sink",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Checks whether event handlers execute when inserted through innerHTML.",
    },
    {
      ...payloads[1],
      note: "Checks a DOM XSS path triggered by automatic focus.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "DOM-based XSS can happen even when the server response is safe. The client code itself passes an untrusted source into an unsafe sink.",
    "Typical sources are <code>location.search</code>, <code>location.hash</code>, <code>postMessage</code>, and storage values. Typical sinks are <code>innerHTML</code>, <code>outerHTML</code>, and <code>insertAdjacentHTML</code>.",
    "Render via <code>textContent</code> or DOM APIs whenever possible, and route real HTML only through a trusted HTML filter.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "DOM innerHTML sink",
  summary:
    "location, hash, postMessage などの信頼できない値が innerHTML のような unsafe sink に届くか確認します。",
  checks: [
    "untrusted source が innerHTML, outerHTML, insertAdjacentHTML に入るか確認",
    "textContent や DOM API に置き換えられるか確認",
    "client router, hash, postMessage payload を sink に入れる前に検証するか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "innerHTML 挿入時にイベントハンドラが実行されるか確認します。",
    },
    {
      ...payloads[1],
      note: "自動 focus イベントによる DOM XSS を確認します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "DOM-based XSS はサーバー応答が安全でも、クライアントコードが untrusted source を unsafe sink に渡すことで発生します。",
    "代表的な source は <code>location.search</code>, <code>location.hash</code>, <code>postMessage</code>, storage 値で、sink は <code>innerHTML</code>, <code>outerHTML</code>, <code>insertAdjacentHTML</code> です。",
    "可能なら <code>textContent</code> や DOM API で描画し、HTML が必要な場合だけ信頼できる HTML フィルタを通してください。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "DOM innerHTML sink",
  summary:
    "检查来自 location、hash、postMessage 等不可信来源的字符串是否进入 innerHTML 等 unsafe sink。",
  checks: [
    "确认 untrusted source 是否进入 innerHTML、outerHTML 或 insertAdjacentHTML",
    "确认是否可改用 textContent / DOM API 渲染",
    "在 client router、hash、postMessage payload 写入 sink 前进行校验",
  ],
  payloads: [
    { ...payloads[0], note: "检查通过 innerHTML 插入时事件处理器是否执行。" },
    { ...payloads[1], note: "检查由自动 focus 事件触发的 DOM XSS。" },
  ],
  explanationHeading: "说明",
  explanation: [
    "即使服务器响应安全，DOM-based XSS 也可能在客户端代码把不可信 source 传入 unsafe sink 时发生。",
    "典型 source 包括 <code>location.search</code>、<code>location.hash</code>、<code>postMessage</code> 和 storage；典型 sink 包括 <code>innerHTML</code>、<code>outerHTML</code>、<code>insertAdjacentHTML</code>。",
    "尽可能使用 <code>textContent</code> 或 DOM API 渲染；只有确实需要 HTML 时，才通过可信 HTML 过滤器。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
