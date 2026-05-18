import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const payloads = [
  {
    label: "anchor href javascript",
    value: "<a href=\"javascript:alert('xss-playground')\">click me</a>",
  },
  {
    label: "form action javascript",
    value:
      "<form action=\"javascript:alert('xss-playground')\"><button>submit</button></form>",
  },
];

const ko: IScenarioPageI18n = {
  title: "javascript: URL 프로토콜",
  summary:
    "a href, form action 같은 URL 속성에 javascript: 프로토콜이 남아 클릭 또는 submit 시 실행되는지 확인한다.",
  checks: [
    "href/action/src 같은 URL 속성에서 javascript: 가 제거되는지 확인",
    "대소문자, 공백, entity encoding 을 정규화한 뒤 검증하는지 확인",
    "사용자 클릭이 필요한 지연 실행 payload 도 차단되는지 확인",
  ],
  payloads: [
    { ...payloads[0], note: "사용자 클릭 후 실행되는 URL 프로토콜 기반 XSS." },
    {
      ...payloads[1],
      note: "href 뿐 아니라 action 같은 URL 속성도 함께 검증.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "<code>javascript:</code> URL 은 클릭이나 submit 같은 사용자 액션 뒤에 실행되므로 단순 렌더링 확인만으로 놓치기 쉽습니다.",
    "<code>href</code>, <code>src</code>, <code>action</code>, <code>formaction</code> 등 URL 을 받는 모든 속성에서 프로토콜 검증이 필요합니다.",
    "검증 전에는 entity decoding, trim, 대소문자 정규화를 먼저 적용하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "javascript: URL protocol",
  summary:
    "Check whether javascript: remains in URL attributes such as href or action and executes on user interaction.",
  checks: [
    "Verify that javascript: is removed from URL-bearing attributes such as href, action, and src",
    "Normalize case, whitespace, and entity encoding before validation",
    "Confirm that delayed payloads requiring a user click are also blocked",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "URL-protocol XSS that executes after a user click.",
    },
    {
      ...payloads[1],
      note: "Checks URL attributes beyond href, such as form action.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "<code>javascript:</code> URLs fire on user action such as click or submit, so a render-only check can miss them.",
    "Validate the protocol on every URL-bearing attribute: <code>href</code>, <code>src</code>, <code>action</code>, <code>formaction</code>, and similar attributes.",
    "Before comparing, normalize entity decoding, trim, and case.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "javascript: URL プロトコル",
  summary:
    "href や action などの URL 属性に javascript: が残り、クリックや submit で実行されるか確認します。",
  checks: [
    "href/action/src などの URL 属性から javascript: が除去されるか確認",
    "大文字小文字、空白、entity encoding を正規化してから検証するか確認",
    "ユーザークリックが必要な遅延 payload もブロックされるか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "ユーザークリック後に実行される URL プロトコル型 XSS。",
    },
    {
      ...payloads[1],
      note: "href だけでなく action などの URL 属性も検証します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "<code>javascript:</code> URL はクリックや submit などのユーザー操作後に実行されるため、レンダリング確認だけでは見落とされやすいです。",
    "<code>href</code>, <code>src</code>, <code>action</code>, <code>formaction</code> など URL を受け取るすべての属性でプロトコル検証が必要です。",
    "比較前に entity decoding、trim、大文字小文字を正規化してください。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "javascript: URL 协议",
  summary:
    "检查 href、action 等 URL 属性中是否残留 javascript:，并在点击或 submit 时执行。",
  checks: [
    "确认 href/action/src 等 URL 属性中的 javascript: 是否被移除",
    "先归一化大小写、空白和 entity encoding 后再校验",
    "确认需要用户点击的延迟 payload 也会被阻止",
  ],
  payloads: [
    { ...payloads[0], note: "用户点击后执行的 URL 协议型 XSS。" },
    { ...payloads[1], note: "除 href 外，也检查 action 等 URL 属性。" },
  ],
  explanationHeading: "说明",
  explanation: [
    "<code>javascript:</code> URL 会在点击或 submit 等用户操作后执行，仅靠渲染检查很容易漏掉。",
    "需要在 <code>href</code>、<code>src</code>、<code>action</code>、<code>formaction</code> 等所有 URL 属性上校验协议。",
    "比较前先做 entity decoding、trim 和大小写归一化。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
