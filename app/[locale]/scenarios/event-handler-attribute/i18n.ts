import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const payloads = [
  {
    label: "img onerror",
    value: "<img src=x onerror=\"alert('xss-playground')\">",
  },
  {
    label: "details ontoggle",
    value:
      "<details open ontoggle=\"alert('xss-playground')\"><summary>open</summary></details>",
  },
];

const ko: IScenarioPageI18n = {
  title: "이벤트 핸들러 속성 삽입",
  summary:
    "img onerror, details ontoggle 같은 이벤트 핸들러 속성이 렌더링 과정에서 살아남아 실행되는지 확인한다.",
  checks: [
    "onerror, onclick, onload 등 on* 속성이 제거되는지 확인",
    "태그 allowlist 는 있어도 속성 allowlist 가 느슨하지 않은지 확인",
    "CSP 가 inline event handler 를 차단하는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "이미지 로드 실패 이벤트를 이용하는 대표적인 HTML attribute XSS.",
    },
    {
      ...payloads[1],
      note: "script 태그를 막아도 이벤트 속성이 남으면 실행될 수 있다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "<code>&lt;script&gt;</code> 태그를 제거해도 <code>onerror</code>, <code>onclick</code>, <code>onload</code> 같은 이벤트 속성이 남으면 스크립트 실행이 가능합니다.",
    "태그 allowlist 와 별도로 속성 allowlist 를 관리해야 하며, <code>on*</code> 속성은 기본적으로 제거하는 편이 안전합니다.",
    "CSP 에서 inline event handler 를 막는지도 함께 확인하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Event-handler attribute injection",
  summary:
    "Check whether on* attributes such as img onerror or details ontoggle survive rendering and execute.",
  checks: [
    "Verify that on* attributes such as onerror, onclick, and onload are removed",
    "Check that an attribute allowlist is not looser than the tag allowlist",
    "Verify that CSP blocks inline event handlers",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "A classic HTML attribute XSS using an image load failure event.",
    },
    {
      ...payloads[1],
      note: "Even when script tags are blocked, surviving event attributes can execute.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "Stripping <code>&lt;script&gt;</code> is not enough. Event-handler attributes such as <code>onerror</code>, <code>onclick</code>, and <code>onload</code> can still execute scripts.",
    "Maintain an attribute allowlist alongside the tag allowlist, and prefer dropping all <code>on*</code> attributes by default.",
    "Confirm that your CSP also blocks inline event handlers.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "イベントハンドラ属性挿入",
  summary:
    "img onerror や details ontoggle などのイベント属性が残って実行されるか確認します。",
  checks: [
    "onerror, onclick, onload などの on* 属性が除去されるか確認",
    "タグ allowlist はあっても属性 allowlist が緩くないか確認",
    "CSP が inline event handler をブロックするか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "画像読み込み失敗イベントを利用する代表的な HTML 属性 XSS。",
    },
    {
      ...payloads[1],
      note: "script タグを止めてもイベント属性が残ると実行されることがあります。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "<code>&lt;script&gt;</code> タグを除去しても、<code>onerror</code>, <code>onclick</code>, <code>onload</code> などのイベント属性が残ると script を実行できます。",
    "タグ allowlist とは別に属性 allowlist を管理し、<code>on*</code> 属性は基本的に除去する方が安全です。",
    "CSP が inline event handler もブロックするか確認してください。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "事件处理器属性注入",
  summary:
    "检查 img onerror、details ontoggle 等事件属性是否在渲染后保留并执行。",
  checks: [
    "确认 onerror、onclick、onload 等 on* 属性是否被移除",
    "确认即使有标签 allowlist，属性 allowlist 也没有过于宽松",
    "确认 CSP 是否阻止 inline event handler",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "利用图片加载失败事件的经典 HTML 属性 XSS。",
    },
    {
      ...payloads[1],
      note: "即使阻止 script 标签，只要事件属性残留仍可能执行。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "仅移除 <code>&lt;script&gt;</code> 标签并不够。<code>onerror</code>、<code>onclick</code>、<code>onload</code> 等事件属性仍可执行脚本。",
    "除了标签 allowlist，还要维护属性 allowlist，并默认移除所有 <code>on*</code> 属性会更安全。",
    "同时确认 CSP 是否阻止 inline event handler。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
