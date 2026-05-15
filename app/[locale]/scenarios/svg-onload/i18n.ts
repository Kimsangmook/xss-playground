import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const payloads = [
  {
    label: "svg onload",
    value:
      '<svg onload="alert(\'xss-playground\')" xmlns="http://www.w3.org/2000/svg"></svg>',
  },
  {
    label: "math annotation-xml",
    value:
      '<math><annotation-xml encoding="text/html"><svg onload="alert(\'xss-playground\')"></svg></annotation-xml></math>',
  },
];

const ko: IScenarioPageI18n = {
  title: "SVG / MathML onload payload",
  summary:
    "SVG, MathML 같은 비 HTML 네임스페이스 태그의 이벤트 속성과 중첩 HTML 이 필터를 우회하는지 확인한다.",
  checks: [
    "svg/math 태그를 허용할 필요가 있는지 확인",
    "namespace 안의 이벤트 속성과 중첩 HTML 이 제거되는지 확인",
    "태그 이름만 보는 블랙리스트가 아닌 구조적 HTML 필터를 쓰는지 확인",
  ],
  payloads: [
    { ...payloads[0], note: "script 태그 없이 onload 이벤트만으로 실행되는 대표적인 SVG payload." },
    { ...payloads[1], note: "HTML parser 경계와 namespace 처리가 느슨한 필터를 확인할 때 사용." },
  ],
  explanationHeading: "해설",
  explanation: [
    "SVG / MathML 은 HTML 과 다른 namespace 를 쓰기 때문에 느슨한 필터가 태그 구조나 이벤트 속성을 놓치는 경우가 있습니다.",
    "실제 서비스에서 SVG 가 꼭 필요하지 않다면 제거하는 편이 단순하고 안전합니다.",
    "허용해야 한다면 태그, 속성, URL 속성을 모두 구조적으로 검증하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "SVG / MathML onload payload",
  summary:
    "Check whether SVG, MathML namespaces, event attributes, and nested HTML bypass weak filters.",
  checks: [
    "Verify whether your service actually needs to allow svg/math tags",
    "Verify that event attributes and nested HTML inside namespaces are removed",
    "Use structural HTML filtering instead of a tag-name blacklist",
  ],
  payloads: [
    { ...payloads[0], note: "A representative SVG payload that executes through onload without a script tag." },
    { ...payloads[1], note: "Useful for checking weak parser-boundary and namespace handling." },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "SVG / MathML use namespaces different from HTML, so weak filters can miss their structure and event attributes.",
    "If your service does not actually need SVG, the simplest and safest option is to remove it.",
    "If you must allow it, validate tags, attributes, and URL attributes structurally.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "SVG / MathML onload payload",
  summary:
    "SVG, MathML など HTML 以外の namespace にあるイベント属性やネスト HTML が弱いフィルタを迂回しないか確認します。",
  checks: [
    "svg/math タグを本当に許可する必要があるか確認",
    "namespace 内のイベント属性とネスト HTML が除去されるか確認",
    "タグ名 blacklist ではなく構造的な HTML フィルタを使うか確認",
  ],
  payloads: [
    { ...payloads[0], note: "script タグなしで onload イベントだけで実行される代表的な SVG payload。" },
    { ...payloads[1], note: "HTML parser 境界や namespace 処理が緩いフィルタの確認に使います。" },
  ],
  explanationHeading: "解説",
  explanation: [
    "SVG / MathML は HTML と異なる namespace を使うため、弱いフィルタがタグ構造やイベント属性を見落とすことがあります。",
    "実サービスで SVG が不要なら、除去するのが単純で安全です。",
    "許可する必要がある場合は、タグ、属性、URL 属性をすべて構造的に検証してください。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "SVG / MathML onload payload",
  summary:
    "检查 SVG、MathML 等非 HTML namespace 的事件属性和嵌套 HTML 是否绕过弱过滤。",
  checks: [
    "确认是否真的需要允许 svg/math 标签",
    "确认 namespace 中的事件属性和嵌套 HTML 是否被移除",
    "确认使用结构化 HTML 过滤，而不是只看标签名的 blacklist",
  ],
  payloads: [
    { ...payloads[0], note: "无需 script 标签，仅通过 onload 事件执行的典型 SVG payload。" },
    { ...payloads[1], note: "用于检查 parser 边界和 namespace 处理不严的过滤器。" },
  ],
  explanationHeading: "说明",
  explanation: [
    "SVG / MathML 使用与 HTML 不同的 namespace，弱过滤器可能遗漏其结构和事件属性。",
    "如果服务实际上不需要 SVG，最简单安全的做法是移除它。",
    "如果必须允许，请对标签、属性和 URL 属性进行结构化校验。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };

