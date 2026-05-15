import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "nickname attribute breakout",
    value: '" autofocus onfocus="alert(\'nickname-xss\')" x="',
  },
  {
    label: "icon renderer HTML",
    value: "<img src=x onerror=\"alert('profile-icon-xss')\">",
  },
];

const ko: IScenarioPageI18n = {
  title: "프로필 닉네임 / 아이콘 렌더링 XSS",
  summary:
    "닉네임, 상태 메시지, 아이콘 URL 처럼 사소해 보이는 프로필 필드가 속성/HTML 컨텍스트에서 실행 가능한 코드가 되는지 확인한다.",
  checks: [
    "닉네임은 textContent 로만 렌더링되는지 확인",
    "속성에 넣는 값은 attribute context 에 맞게 인코딩되는지 확인",
    "아이콘 URL 은 URL 객체와 host/protocol allowlist 로 검증하는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "닉네임이 title, aria-label, value 같은 속성에 들어갈 때 따옴표 탈출을 확인한다.",
    },
    {
      ...payloads[1],
      note: "아이콘/배지/프로필 꾸미기 필드를 dangerouslySetInnerHTML 로 그리는지 확인한다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "프로필 필드는 화면 곳곳에서 재사용됩니다. 댓글, 알림, 관리자 목록, 공유 카드처럼 렌더링 위치가 많아져서 하나의 누락이 저장형 XSS 로 이어질 수 있습니다.",
    "닉네임은 HTML 이 아니라 텍스트입니다. React/DOM 의 기본 텍스트 렌더링을 유지하고, 별도 formatter 가 <code>dangerouslySetInnerHTML</code> 을 쓰지 않는지 확인하세요.",
    "아이콘은 URL 검증이 핵심입니다. 사용자가 입력한 아이콘 URL 을 그대로 <code>src</code>, CSS URL, innerHTML 로 넘기지 말고, 프로토콜/호스트/콘텐츠 타입을 검증하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Profile nickname / icon rendering XSS",
  summary:
    "Check whether small profile fields such as nicknames, status text, or icon URLs become executable code in attribute or HTML contexts.",
  checks: [
    "Render nicknames with textContent only",
    "Encode values according to the attribute context before placing them in attributes",
    "Validate icon URLs with URL parsing plus host/protocol allowlists",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Checks quote breakout when a nickname is placed inside title, aria-label, or value attributes.",
    },
    {
      ...payloads[1],
      note: "Checks whether icon, badge, or profile decoration fields are rendered with dangerouslySetInnerHTML.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "Profile fields are reused everywhere: comments, notifications, admin lists, share cards. One missed rendering path can become stored XSS.",
    "A nickname is text, not HTML. Keep React/DOM default text rendering and check that formatters do not switch to <code>dangerouslySetInnerHTML</code>.",
    "Icon fields are mostly URL-policy problems. Do not pass user-provided icon URLs directly into <code>src</code>, CSS URLs, or innerHTML without protocol, host, and content-type checks.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "Profile nickname / icon rendering XSS",
  summary:
    "nickname、status text、icon URL のような小さな profile field が attribute/HTML context で実行可能コードになるか確認します。",
  checks: [
    "nickname は textContent としてのみ描画するか確認",
    "attribute に入れる値は attribute context に合わせて encode するか確認",
    "icon URL は URL parser と host/protocol allowlist で検証するか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "nickname が title、aria-label、value 属性に入るとき quote breakout を確認します。",
    },
    {
      ...payloads[1],
      note: "icon/badge/profile decoration field を dangerouslySetInnerHTML で描画していないか確認します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "profile field は comments、notifications、admin list、share card など多くの場所で再利用されます。ひとつの漏れが stored XSS になります。",
    "nickname は HTML ではなく text です。React/DOM の標準 text rendering を維持し、formatter が <code>dangerouslySetInnerHTML</code> を使わないか確認します。",
    "icon は URL policy が中心です。ユーザー提供 URL を <code>src</code>、CSS URL、innerHTML にそのまま渡さず、protocol/host/content-type を検証します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "资料昵称 / 图标渲染 XSS",
  summary:
    "检查昵称、状态文本、图标 URL 等看似很小的资料字段，在属性或 HTML 上下文中是否会变成可执行代码。",
  checks: [
    "昵称仅以 textContent 渲染",
    "放入属性前按 attribute context 编码",
    "图标 URL 使用 URL 解析和 host/protocol allowlist 校验",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "检查昵称进入 title、aria-label、value 属性时是否能引号逃逸。",
    },
    {
      ...payloads[1],
      note: "检查图标、徽章、资料装饰字段是否使用 dangerouslySetInnerHTML 渲染。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "资料字段会在评论、通知、管理员列表、分享卡片等大量位置复用。任一路径遗漏都可能变成存储型 XSS。",
    "昵称是文本，不是 HTML。保留 React/DOM 默认文本渲染，并检查 formatter 不要切换到 <code>dangerouslySetInnerHTML</code>。",
    "图标字段主要是 URL 策略问题。不要把用户提供的图标 URL 直接传入 <code>src</code>、CSS URL 或 innerHTML，需验证 protocol、host、content-type。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
