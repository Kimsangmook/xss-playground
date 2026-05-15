import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "HTML entity protocol",
    value:
      "<a href=\"jav&#x61;script:alert('xss-playground')\">encoded protocol</a>",
  },
  {
    label: "newline protocol",
    value:
      "<a href=\"java&#x0A;script:alert('xss-playground')\">newline protocol</a>",
  },
];

const ko: IScenarioPageI18n = {
  title: "인코딩된 javascript: 프로토콜 우회",
  summary:
    "HTML entity, 제어문자, 대소문자 변형으로 javascript: URL 검증을 우회할 수 있는지 확인한다.",
  checks: [
    "URL 속성 검증 전에 entity decoding 과 제어문자 제거가 수행되는지 확인",
    "프로토콜 allowlist(http, https, mailto 등) 기반으로 검증하는지 확인",
    "렌더러와 sanitizer 가 서로 다른 정규화 규칙을 쓰지 않는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "속성값을 디코딩한 뒤 프로토콜을 검증하는지 확인한다.",
    },
    {
      ...payloads[1],
      note: "공백/제어문자 정규화 없이 문자열 prefix 만 검사하는 필터를 찾기 위한 payload.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    'URL 필터가 <code>href.startsWith("javascript:")</code> 같은 문자열 검사만 하면 HTML entity 나 제어문자 변형을 놓칠 수 있습니다.',
    "검증 순서는 정규화가 먼저입니다. 브라우저가 해석하는 형태와 같은 기준으로 디코딩하고, 허용할 프로토콜만 통과시켜야 합니다.",
    "Markdown, link preview, embed 카드처럼 링크를 만드는 모든 렌더러에서 같은 URL 정책을 공유하는지 확인하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Encoded javascript: protocol bypass",
  summary:
    "Check whether HTML entities, control characters, or casing variations bypass javascript: URL validation.",
  checks: [
    "Decode entities and strip control characters before validating URL attributes",
    "Validate against a protocol allowlist such as http, https, and mailto",
    "Verify that renderers and sanitizers use the same normalization rules",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Checks whether protocol validation happens after attribute decoding.",
    },
    {
      ...payloads[1],
      note: "Finds filters that only use string prefix checks without normalizing whitespace/control characters.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    'A URL filter based only on <code>href.startsWith("javascript:")</code> can miss entity-encoded or control-character variants.',
    "Normalization must happen first. Validate the same form the browser will interpret, then allow only approved protocols.",
    "Reuse the same URL policy across Markdown renderers, link previews, embed cards, and profile fields.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "エンコードされた javascript: protocol bypass",
  summary:
    "HTML entity、制御文字、大文字小文字の変形で javascript: URL 検証を迂回できるか確認します。",
  checks: [
    "URL 属性検証の前に entity decoding と制御文字除去を行うか確認",
    "http, https, mailto など protocol allowlist で検証するか確認",
    "renderer と sanitizer が同じ正規化規則を使うか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "属性値をデコードした後に protocol を検証するか確認します。",
    },
    {
      ...payloads[1],
      note: "空白/制御文字を正規化せず prefix だけ見る filter の検出用。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    '<code>href.startsWith("javascript:")</code> だけの URL filter は entity や制御文字の変形を見逃す可能性があります。',
    "先に正規化し、ブラウザが解釈する形に揃えてから許可 protocol だけ通します。",
    "Markdown renderer、link preview、embed card などリンク生成箇所で同じ URL policy を共有します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "编码后的 javascript: 协议绕过",
  summary:
    "检查 HTML entity、控制字符或大小写变化是否能绕过 javascript: URL 校验。",
  checks: [
    "URL 属性校验前先进行 entity decoding 和控制字符移除",
    "基于 http、https、mailto 等 protocol allowlist 校验",
    "确认 renderer 与 sanitizer 使用相同的规范化规则",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "检查是否在属性解码后再校验协议。",
    },
    {
      ...payloads[1],
      note: "用于发现只做字符串前缀检查、未规范化空白/控制字符的过滤器。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    '只依赖 <code>href.startsWith("javascript:")</code> 的 URL filter 可能漏掉 entity 编码或控制字符变体。',
    "必须先规范化，再以浏览器将解释的形式进行 protocol allowlist 校验。",
    "Markdown、link preview、embed card、profile 字段应共享同一套 URL 策略。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
