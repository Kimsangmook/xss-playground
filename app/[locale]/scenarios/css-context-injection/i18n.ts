import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "style tag breakout",
    value: "</style><img src=x onerror=\"alert('css-context-xss')\"><style>",
  },
  {
    label: "style url token",
    value:
      "<div style=\"background-image:url(javascript:alert('css-url-xss'))\">css url probe</div>",
  },
];

const ko: IScenarioPageI18n = {
  title: "CSS / style 컨텍스트 삽입",
  summary:
    "사용자 입력이 style 태그, style 속성, CSS URL 토큰으로 들어갈 때 parser 탈출이나 위험 URL 이 남는지 확인한다.",
  checks: [
    "사용자 입력을 style 태그 내부에 직접 삽입하지 않는지 확인",
    "style 속성을 허용한다면 CSS 프로퍼티와 url() 스킴을 allowlist 로 제한하는지 확인",
    "HTML sanitizer 가 CSS parser 경계까지 안전하게 처리하는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "사용자 값이 style 태그 내부에 들어가는 경우 태그 탈출 여부를 확인한다.",
    },
    {
      ...payloads[1],
      note: "현대 브라우저에서 대부분 차단되지만, sanitizer 가 CSS URL 스킴을 정규화하는지 확인할 수 있다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "CSS 자체가 곧바로 JavaScript 를 실행하지 않는 환경이 많아졌지만, <code>&lt;/style&gt;</code> 탈출은 여전히 HTML parser 경계 문제입니다.",
    "스타일 속성을 허용하면 레이아웃 변조, clickjacking 보조, 원격 리소스 요청 같은 부작용도 함께 검토해야 합니다.",
    "필요한 CSS 속성만 allowlist 로 허용하고, <code>url()</code> 은 별도 URL 정책으로 정규화한 뒤 검증하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "CSS / style context injection",
  summary:
    "Check parser breakouts and risky URL tokens when user input enters style tags, style attributes, or CSS URLs.",
  checks: [
    "Verify that user input is not inserted directly inside style tags",
    "If style attributes are allowed, restrict CSS properties and url() schemes with an allowlist",
    "Verify that the HTML sanitizer safely handles CSS parser boundaries",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Use this when untrusted text is inserted inside a style element.",
    },
    {
      ...payloads[1],
      note: "Mostly blocked by modern browsers, but useful for checking CSS URL normalization.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "Modern browsers block many old CSS-to-JavaScript tricks, but <code>&lt;/style&gt;</code> breakouts are still HTML parser boundary issues.",
    "Allowing style attributes can still enable layout manipulation, clickjacking support, and remote resource requests.",
    "Allow only the CSS properties you need, and validate <code>url()</code> values through a dedicated URL policy.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "CSS / style コンテキスト挿入",
  summary:
    "style タグ、style 属性、CSS URL トークンにユーザー入力が入るとき、parser 脱出や危険な URL が残るか確認します。",
  checks: [
    "ユーザー入力を style タグ内へ直接挿入していないか確認",
    "style 属性を許可する場合、CSS property と url() scheme を allowlist で制限するか確認",
    "HTML sanitizer が CSS parser 境界を安全に扱うか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "信頼できない値が style 要素内に入る場合のタグ脱出検証。",
    },
    {
      ...payloads[1],
      note: "多くの現代ブラウザではブロックされますが、CSS URL 正規化の確認に使えます。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "古い CSS 由来の JavaScript 実行は多くの環境で防がれますが、<code>&lt;/style&gt;</code> 脱出は HTML parser 境界の問題です。",
    "style 属性を許可すると、レイアウト改ざんや clickjacking 補助、外部リソース要求も検討対象になります。",
    "必要な CSS property のみ allowlist し、<code>url()</code> は別の URL policy で検証します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "CSS / style 上下文注入",
  summary:
    "检查用户输入进入 style 标签、style 属性或 CSS URL token 时，是否存在 parser 逃逸或危险 URL。",
  checks: [
    "确认用户输入不会直接插入 style 标签内部",
    "如允许 style 属性，应以 allowlist 限制 CSS 属性和 url() scheme",
    "确认 HTML sanitizer 能安全处理 CSS parser 边界",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "用于测试不可信值进入 style 元素内部时是否能逃逸标签。",
    },
    {
      ...payloads[1],
      note: "现代浏览器大多会阻止，但可用于检查 CSS URL 规范化策略。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "很多旧式 CSS 执行技巧已被现代浏览器阻止，但 <code>&lt;/style&gt;</code> 逃逸仍是 HTML parser 边界问题。",
    "允许 style 属性还可能带来布局篡改、clickjacking 辅助和远程资源请求。",
    "只 allowlist 必需的 CSS 属性，并用单独的 URL 策略验证 <code>url()</code>。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
