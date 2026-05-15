import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "quoted string breakout",
    value: '";alert("xss-playground");//',
  },
  {
    label: "script close breakout",
    value: "</script><img src=x onerror=\"alert('xss-playground')\"><script>",
  },
];

const ko: IScenarioPageI18n = {
  title: "JavaScript 문자열 컨텍스트 탈출",
  summary:
    "사용자 입력이 script 블록 안의 문자열, JSON 초기 상태, inline 이벤트 코드에 들어갈 때 따옴표와 script 종료 토큰으로 컨텍스트를 탈출하는지 확인한다.",
  checks: [
    "사용자 입력을 script 블록에 직접 넣지 않는지 확인",
    "JSON.stringify / 안전한 JSON 직렬화가 </script> 같은 종료 토큰까지 처리하는지 확인",
    "HTML 인코딩만으로 JavaScript 문자열 컨텍스트를 보호하려 하지 않는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "값이 JavaScript 문자열 리터럴 안에 삽입되는 경우를 검증한다.",
    },
    {
      ...payloads[1],
      note: "</script> 종료 토큰이 JSON/script 초기 상태를 깨는지 확인한다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    'XSS 방어는 HTML 컨텍스트만 보면 부족합니다. 사용자 값이 <code>&lt;script&gt;window.__DATA__ = "..."&lt;/script&gt;</code> 같은 위치에 들어가면 JavaScript 문자열 규칙으로 인코딩되어야 합니다.',
    "<code>&lt;/script&gt;</code> 는 JavaScript 문자열 안에 있어도 HTML parser 입장에서는 script 종료 토큰이 될 수 있습니다. 초기 상태 주입에는 안전한 JSON 직렬화와 종료 토큰 이스케이프가 필요합니다.",
    "가장 좋은 구조는 사용자 입력을 script 블록에 직접 넣지 않고, 서버에서 JSON 응답으로 내려받거나 DOM 의 text/attribute API 로 분리해 렌더링하는 것입니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "JavaScript string context breakout",
  summary:
    "Check whether user input can break out of script-block strings, JSON boot state, or inline event code.",
  checks: [
    "Verify that user input is not written directly into script blocks",
    "Verify that safe JSON serialization handles closing </script> tokens",
    "Do not rely on HTML encoding to protect JavaScript string contexts",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Use this when a value is inserted inside a JavaScript string literal.",
    },
    {
      ...payloads[1],
      note: "Checks whether a closing script token breaks JSON or boot-state markup.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    'XSS defense must account for the output context. A value placed inside <code>&lt;script&gt;window.__DATA__ = "..."&lt;/script&gt;</code> needs JavaScript-string encoding, not ordinary HTML escaping.',
    "<code>&lt;/script&gt;</code> can terminate the HTML script element even when it appears inside a JavaScript string. Boot-state JSON needs safe serialization and closing-token escaping.",
    "Prefer keeping untrusted values out of script blocks entirely: fetch JSON separately, or render via text/attribute DOM APIs.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "JavaScript 文字列コンテキスト脱出",
  summary:
    "script ブロック内の文字列、JSON 初期状態、inline event code からユーザー入力が脱出できるか確認します。",
  checks: [
    "ユーザー入力を script ブロックへ直接書き込んでいないか確認",
    "安全な JSON 直列化が </script> 終了トークンまで処理するか確認",
    "JavaScript 文字列コンテキストを HTML エンコードだけで守っていないか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "値が JavaScript 文字列リテラル内に挿入される場合の検証用。",
    },
    {
      ...payloads[1],
      note: "</script> 終了トークンが JSON/script 初期状態を壊すか確認します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    'XSS 防御では出力コンテキストが重要です。<code>&lt;script&gt;window.__DATA__ = "..."&lt;/script&gt;</code> のような位置では JavaScript 文字列用のエンコードが必要です。',
    "<code>&lt;/script&gt;</code> は JavaScript 文字列内にあっても HTML parser には script 終了トークンとして扱われ得ます。",
    "できるだけ script ブロックに信頼できない値を置かず、JSON API や DOM の text/attribute API で分離して描画します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "JavaScript 字符串上下文逃逸",
  summary:
    "检查用户输入进入 script 字符串、JSON 启动状态或 inline 事件代码时，是否能逃逸当前上下文。",
  checks: [
    "确认用户输入不会直接写入 script 块",
    "确认安全 JSON 序列化会处理 </script> 结束标记",
    "不要只用 HTML 编码来保护 JavaScript 字符串上下文",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "用于测试值被插入 JavaScript 字符串字面量的场景。",
    },
    {
      ...payloads[1],
      note: "检查 </script> 结束标记是否能破坏 JSON/script 启动状态。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    'XSS 防护必须看输出上下文。放入 <code>&lt;script&gt;window.__DATA__ = "..."&lt;/script&gt;</code> 的值需要 JavaScript 字符串编码。',
    "<code>&lt;/script&gt;</code> 即使出现在 JavaScript 字符串里，也可能被 HTML parser 当成 script 结束标记。",
    "更稳妥的做法是避免把不可信值直接放进 script 块，通过 JSON API 或 DOM text/attribute API 渲染。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
