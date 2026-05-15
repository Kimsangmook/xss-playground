import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "markdown source",
    value: "[click me](javascript:alert('markdown-xss'))",
  },
  {
    label: "rendered anchor",
    value:
      "<a href=\"javascript:alert('markdown-xss')\">markdown-rendered link</a>",
  },
];

const ko: IScenarioPageI18n = {
  title: "Markdown 링크 XSS",
  summary:
    "Markdown/MDX/에디터 렌더러가 링크 URL, raw HTML, 이미지 URL 을 안전하게 정규화하고 sanitize 하는지 확인한다.",
  checks: [
    "Markdown 렌더링 후 최종 HTML 을 다시 sanitize 하는지 확인",
    "링크 URL 은 프로토콜 allowlist 로 검증하는지 확인",
    "raw HTML 허용 옵션이 켜져 있는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Markdown 소스를 저장하는 에디터에 붙여 넣고 렌더러 결과의 href 를 확인한다.",
    },
    {
      ...payloads[1],
      note: "Markdown 렌더러가 만든 최종 HTML 을 sanitizer 가 다시 검증하는지 확인한다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "Markdown은 안전한 텍스트 포맷처럼 보이지만, 렌더링 결과는 결국 HTML 입니다. 링크와 이미지 URL 정책이 약하면 <code>javascript:</code> 같은 스킴이 살아남을 수 있습니다.",
    "ProseMirror, Markdown, MDX, rich text renderer 는 저장 형식과 출력 형식이 다를 수 있습니다. 저장 전 sanitize 만 믿지 말고 최종 출력 HTML 기준으로도 검증하세요.",
    "raw HTML 허용, custom node renderer, embed 확장 기능은 별도 공격면입니다. 플러그인별로 허용 태그와 URL 정책을 문서화하는 편이 좋습니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Markdown link XSS",
  summary:
    "Check whether Markdown, MDX, or editor renderers safely normalize and sanitize link URLs, raw HTML, and image URLs.",
  checks: [
    "Sanitize the final HTML after Markdown rendering",
    "Validate link URLs through a protocol allowlist",
    "Check whether raw HTML support is enabled",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Paste this into a Markdown-backed editor and inspect the rendered href.",
    },
    {
      ...payloads[1],
      note: "Checks whether the sanitizer validates the final HTML produced by the renderer.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "Markdown feels like safe text, but the rendered result is HTML. Weak URL policy can leave schemes such as <code>javascript:</code> alive.",
    "ProseMirror, Markdown, MDX, and rich-text renderers often have different storage and output formats. Validate the final rendered HTML, not just the saved input.",
    "Raw HTML, custom node renderers, and embed extensions are separate attack surfaces. Document allowed tags and URL policy per plugin.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "Markdown link XSS",
  summary:
    "Markdown/MDX/editor renderer が link URL、raw HTML、image URL を安全に正規化・sanitize するか確認します。",
  checks: [
    "Markdown rendering 後の最終 HTML を再度 sanitize するか確認",
    "link URL を protocol allowlist で検証するか確認",
    "raw HTML 許可オプションが有効か確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Markdown 保存型 editor に貼り付け、render 結果の href を確認します。",
    },
    {
      ...payloads[1],
      note: "renderer が作った最終 HTML を sanitizer が再検証するか確認します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "Markdown は安全なテキストに見えますが、render 結果は HTML です。URL policy が弱いと <code>javascript:</code> が残る可能性があります。",
    "ProseMirror、Markdown、MDX、rich text renderer は保存形式と出力形式が違うことがあります。保存前だけでなく最終 HTML で検証します。",
    "raw HTML、custom node renderer、embed 拡張は別の攻撃面です。plugin ごとの許可 tag と URL policy を文書化します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "Markdown 链接 XSS",
  summary:
    "检查 Markdown/MDX/编辑器 renderer 是否安全规范化并 sanitize 链接 URL、raw HTML 和图片 URL。",
  checks: [
    "Markdown 渲染后对最终 HTML 再做 sanitize",
    "链接 URL 使用 protocol allowlist 校验",
    "检查 raw HTML 选项是否开启",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "粘贴到 Markdown 编辑器中，检查最终渲染出的 href。",
    },
    {
      ...payloads[1],
      note: "检查 sanitizer 是否验证 renderer 产生的最终 HTML。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "Markdown 看似安全文本，但渲染结果仍是 HTML。URL 策略薄弱时，<code>javascript:</code> 等 scheme 可能保留下来。",
    "ProseMirror、Markdown、MDX、富文本 renderer 的存储格式和输出格式可能不同。不要只信任保存前 sanitize，也要检查最终 HTML。",
    "raw HTML、custom node renderer、embed 扩展都是独立攻击面。建议按插件记录允许标签和 URL 策略。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
