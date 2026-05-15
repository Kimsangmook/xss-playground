import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "풀스크린 오버레이 위장",
  summary:
    "iframe 을 화면 전체에 배치하고 부모 사이트와 비슷한 UI 를 그려 사용자를 속이는 시나리오.",
  actionLabels: {
    showOverlay: "가짜 서비스 UI 오버레이 표시",
    tryRealFs: "진짜 풀스크린 API",
    clearLog: "로그 초기화",
    login: "로그인",
    closePoc: "(PoC 닫기)",
  },
  logMessages: {
    tryFs: "document.documentElement.requestFullscreen() 시도",
    fsEntered: "진입 성공",
    blocked: "차단: {message}",
  },
  text: {
    callout:
      "실제 공격에서는 iframe 자체를 부모 페이지 CSS 로 화면 전체를 덮게 배치합니다. iframe 자기 origin 안에서는 어떤 UI 든 자유롭게 그릴 수 있어서 실제 서비스처럼 보이는 가짜 화면으로 사용자를 속일 수 있습니다.",
    overlayTitle: "Example Workspace — 본인 인증이 필요합니다",
    overlayBody:
      "서비스 정책 변경에 따라 다시 로그인해 주세요. (이건 가짜 화면입니다)",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
  },
  explanation: [
    "iframe 영역을 부모 CSS 가 어떻게 배치할지는 부모 페이지 책임입니다. 서비스가 임의 iframe 을 넓은 영역에 배치한다면 시각적 위장이 가능합니다.",
    "진짜 Fullscreen API 는 사용자 제스처가 필요하지만, 일반 DOM 오버레이는 사용자 제스처 없이도 그려질 수 있습니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Fullscreen overlay impersonation",
  summary:
    "Place an iframe over the screen and draw a parent-like UI to deceive the user.",
  actionLabels: {
    showOverlay: "Show fake service overlay",
    tryRealFs: "Real fullscreen API",
    clearLog: "Clear log",
    login: "Sign in",
    closePoc: "(close PoC)",
  },
  logMessages: {
    tryFs: "try document.documentElement.requestFullscreen()",
    fsEntered: "entered fullscreen",
    blocked: "blocked: {message}",
  },
  text: {
    callout:
      "In a real attack the iframe itself is positioned to cover the screen by the parent page's CSS. Inside its own origin, the iframe can draw any UI and make it look like the real service.",
    overlayTitle: "Example Workspace — re-authentication required",
    overlayBody:
      "Please sign in again due to a security policy change. (This is a fake screen.)",
    emailLabel: "Email",
    passwordLabel: "Password",
  },
  explanation: [
    "How the iframe is laid out is the parent page's responsibility. If a service places arbitrary iframes in large trusted regions, visual impersonation is possible.",
    "The real Fullscreen API requires a user gesture, but a plain DOM overlay can be drawn without one.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "フルスクリーンオーバーレイ偽装",
  summary:
    "iframe を画面全体に配置し、親サイトに似た UI を描いてユーザーを欺くシナリオです。",
  actionLabels: {
    showOverlay: "偽サービス UI を表示",
    tryRealFs: "本物の Fullscreen API",
    clearLog: "ログをクリア",
    login: "ログイン",
    closePoc: "(PoC を閉じる)",
  },
  logMessages: {
    tryFs: "document.documentElement.requestFullscreen() を試行",
    fsEntered: "フルスクリーンに入りました",
    blocked: "ブロック: {message}",
  },
  text: {
    callout:
      "実攻撃では親ページの CSS で iframe 自体を画面全体に配置します。iframe の origin 内では任意の UI を描けるため、本物のサービスに見える偽画面を作れます。",
    overlayTitle: "Example Workspace — 本人確認が必要です",
    overlayBody:
      "サービス方針の変更により、もう一度ログインしてください。(これは偽画面です)",
    emailLabel: "メール",
    passwordLabel: "パスワード",
  },
  explanation: [
    "iframe をどのように配置するかは親ページ側の責任です。任意 iframe を信頼された広い領域に置けるなら、視覚的な偽装が可能です。",
    "本物の Fullscreen API にはユーザー操作が必要ですが、通常の DOM オーバーレイは操作なしでも描画できます。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "全屏覆盖层伪装",
  summary:
    "把 iframe 放到屏幕区域上，并绘制类似父站点的 UI 来欺骗用户。",
  actionLabels: {
    showOverlay: "显示假服务覆盖层",
    tryRealFs: "真实 Fullscreen API",
    clearLog: "清空日志",
    login: "登录",
    closePoc: "（关闭 PoC）",
  },
  logMessages: {
    tryFs: "尝试 document.documentElement.requestFullscreen()",
    fsEntered: "已进入全屏",
    blocked: "已阻止: {message}",
  },
  text: {
    callout:
      "真实攻击会由父页面 CSS 把 iframe 本身铺满屏幕。iframe 在自己的 origin 内可以自由绘制任何 UI，因此能做出像真实服务一样的假页面。",
    overlayTitle: "Example Workspace — 需要重新验证",
    overlayBody: "由于服务策略变更，请重新登录。（这是一个假页面）",
    emailLabel: "邮箱",
    passwordLabel: "密码",
  },
  explanation: [
    "iframe 的布局由父页面负责。如果服务允许任意 iframe 占据可信的大区域，就可能发生视觉伪装。",
    "真实 Fullscreen API 需要用户手势，但普通 DOM 覆盖层可以在没有手势的情况下绘制。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };

