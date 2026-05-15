import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const payloads = [
  {
    label: "inline script alert",
    value: '<script>alert("xss-playground")</script>',
  },
  {
    label: "script side effect",
    value:
      '<script>document.body.dataset.xssPlayground="script-fired"</script>',
  },
];

const ko: IScenarioPageI18n = {
  title: "script 태그 삽입",
  summary:
    "사용자 입력이 HTML 문서로 그대로 파싱될 때 <script> 태그가 실행 가능한지 확인한다.",
  checks: [
    "입력값이 텍스트로 이스케이프되는지, 실제 script 태그로 파싱되는지 확인",
    "HTML 필터가 script 태그와 위험 속성을 제거하는지 확인",
    "CSP script-src 가 inline script 실행을 막는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "서버가 입력을 그대로 HTML 문서에 반영하는지 확인하는 가장 기본적인 payload.",
    },
    {
      ...payloads[1],
      note: "alert 없이 DOM 변경으로 실행 여부를 확인할 때 사용.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "서버가 사용자 입력을 HTML 문서에 그대로 반영하면 <code>&lt;script&gt;</code> 태그가 파서에 의해 실행될 수 있습니다.",
    "반대로 <code>innerHTML</code> 로 나중에 삽입한 script 태그는 최신 브라우저에서 보통 실행되지 않습니다. 그래서 이 페이지의 미리보기는 전체 HTML 문서 파싱 상황을 재현하기 위해 격리된 미리보기를 사용합니다.",
    "대응은 출력 컨텍스트별 인코딩, 신뢰 가능한 HTML 필터, CSP <code>script-src</code> 조합으로 확인하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "script tag injection",
  summary:
    "Check whether a raw script tag executes when user input is parsed as an HTML document.",
  checks: [
    "Verify whether input is escaped as text or parsed as a real script tag",
    "Verify whether your HTML filter removes script tags and dangerous attributes",
    "Verify whether CSP script-src blocks inline script execution",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "The baseline payload for checking raw reflection into an HTML document.",
    },
    {
      ...payloads[1],
      note: "Use a DOM side effect when you do not want an alert dialog.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "If the server reflects user input directly into the HTML document, <code>&lt;script&gt;</code> tags get parsed and executed.",
    "<code>innerHTML</code>-inserted script tags do not execute in modern browsers, which is why this preview uses an isolated full-document render to reproduce the parse.",
    "Defense is a combination of context-aware output encoding, a trusted HTML filter, and CSP <code>script-src</code>.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "script タグ挿入",
  summary:
    "ユーザー入力が HTML 文書としてそのまま解析されるとき、script タグが実行されるか確認します。",
  checks: [
    "入力値がテキストとしてエスケープされるか、本物の script タグとして解析されるか確認",
    "HTML フィルタが script タグと危険な属性を除去するか確認",
    "CSP script-src が inline script 実行を止めるか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "HTML 文書への生反映を確認する最も基本的な payload。",
    },
    {
      ...payloads[1],
      note: "alert を出さず DOM の副作用で実行を確認したい場合に使います。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "サーバーがユーザー入力を HTML 文書にそのまま反映すると、<code>&lt;script&gt;</code> タグが parser によって実行されます。",
    "一方で <code>innerHTML</code> に後から挿入された script タグは現在のブラウザでは通常実行されません。そのため、このページでは文書全体の解析を隔離プレビューで再現します。",
    "対策はコンテキスト別の出力エンコーディング、信頼できる HTML フィルタ、CSP <code>script-src</code> の組み合わせで確認します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "script 标签注入",
  summary:
    "检查用户输入被直接作为 HTML 文档解析时，script 标签是否会执行。",
  checks: [
    "确认输入是被转义为文本，还是被解析成真实 script 标签",
    "确认 HTML 过滤器是否移除 script 标签和危险属性",
    "确认 CSP script-src 是否阻止 inline script 执行",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "用于检查原始输入是否直接反射到 HTML 文档中的基础 payload。",
    },
    {
      ...payloads[1],
      note: "不想弹 alert 时，可用 DOM 副作用判断是否执行。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "如果服务器把用户输入直接反射进 HTML 文档，<code>&lt;script&gt;</code> 标签会被解析并执行。",
    "相反，后来通过 <code>innerHTML</code> 插入的 script 标签在现代浏览器中通常不会执行，因此本页面用隔离的完整文档预览来复现解析过程。",
    "防护需要结合上下文感知的输出编码、可信 HTML 过滤器和 CSP <code>script-src</code> 来验证。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };

