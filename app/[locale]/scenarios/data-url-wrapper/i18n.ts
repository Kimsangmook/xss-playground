import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "iframe data document",
    value:
      "<iframe src=\"data:text/html,<script>parent.postMessage({type:'DATA_URL_XSS'},'*')</script>\"></iframe>",
  },
  {
    label: "object data document",
    value:
      "<object data=\"data:text/html,<script>alert('data-url-xss')</script>\"></object>",
  },
];

const ko: IScenarioPageI18n = {
  title: "data: URL wrapper",
  summary:
    "iframe, object, embed, link preview 같은 wrapper URL 속성에서 data:text/html 이 허용되어 별도 HTML 문서가 실행되는지 확인한다.",
  checks: [
    "src/data/href 같은 URL 속성에서 data: 스킴을 기본 차단하는지 확인",
    "허용이 필요하다면 MIME type 을 이미지 등으로 좁히는지 확인",
    "wrapper 태그가 sandbox 없이 HTML 문서를 만들 수 있는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "data: URL 로 생성된 하위 문서가 script 를 실행하고 부모와 통신할 수 있는지 확인한다.",
    },
    {
      ...payloads[1],
      note: "iframe 외 wrapper 태그에서도 data: URL 이 살아남는지 확인한다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "<code>data:text/html</code> 은 URL처럼 보이지만 브라우저에는 새 HTML 문서를 만들 수 있는 wrapper 입니다.",
    "DOMPurify 같은 sanitizer 에서 태그는 허용하면서 URL 스킴을 넓게 열어두면 iframe/object/embed 조합이 위험해질 수 있습니다.",
    "embed 기능은 태그 allowlist 와 별개로 URL protocol, host allowlist, sandbox, referrer 정책을 같이 설계해야 합니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "data: URL wrapper",
  summary:
    "Check whether data:text/html is allowed in wrapper URL attributes such as iframe, object, embed, or link previews.",
  checks: [
    "Block data: by default in URL attributes such as src, data, and href",
    "If data: is required, restrict it by MIME type, such as images only",
    "Check whether wrapper tags can create unsandboxed HTML documents",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Checks whether a data: child document can execute script and message its parent.",
    },
    {
      ...payloads[1],
      note: "Checks data: URL survival outside iframe tags as well.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "<code>data:text/html</code> looks like a URL, but the browser can treat it as a fresh HTML document.",
    "A sanitizer can allow a tag while accidentally leaving its URL policy too broad, making iframe/object/embed combinations dangerous.",
    "Embed features need URL protocol policy, host allowlists, sandbox, and referrer policy in addition to tag allowlists.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "data: URL wrapper",
  summary:
    "iframe、object、embed、link preview などの URL 属性で data:text/html が許可され、別 HTML 文書が実行されるか確認します。",
  checks: [
    "src/data/href などの URL 属性で data: scheme を基本ブロックするか確認",
    "必要な場合は MIME type を画像などに限定するか確認",
    "wrapper tag が sandbox なしで HTML 文書を作れるか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "data: URL の子文書が script を実行し親へ message できるか確認します。",
    },
    {
      ...payloads[1],
      note: "iframe 以外の wrapper tag でも data: URL が残るか確認します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "<code>data:text/html</code> は URL に見えますが、ブラウザは新しい HTML 文書として扱えます。",
    "sanitizer が tag を許可しつつ URL policy を広くしすぎると iframe/object/embed の組み合わせが危険になります。",
    "embed 機能では tag allowlist だけでなく URL protocol、host allowlist、sandbox、referrer policy も設計します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "data: URL wrapper",
  summary:
    "检查 iframe、object、embed、link preview 等 URL 属性是否允许 data:text/html 并创建可执行 HTML 文档。",
  checks: [
    "默认阻止 src/data/href 等 URL 属性中的 data: scheme",
    "如必须允许 data:，应限制 MIME type，例如仅图片",
    "检查 wrapper 标签是否能在无 sandbox 下创建 HTML 文档",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "检查 data: 子文档是否能执行脚本并向父页面发消息。",
    },
    {
      ...payloads[1],
      note: "检查 iframe 之外的 wrapper 标签是否也保留 data: URL。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "<code>data:text/html</code> 看起来像 URL，但浏览器可将其当作新的 HTML 文档。",
    "sanitizer 允许标签但 URL 策略过宽时，iframe/object/embed 组合会变得危险。",
    "embed 功能除了 tag allowlist，还需要 URL protocol、host allowlist、sandbox 和 referrer policy。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
