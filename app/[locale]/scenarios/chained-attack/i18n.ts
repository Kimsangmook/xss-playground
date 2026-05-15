import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "체인 공격 (피싱 + 풀스크린 + redirect)",
  summary:
    "풀스크린 가짜 UI, 자격증명 캡처, top redirect 를 묶어 의심을 줄이는 공격 흐름을 재현한다.",
  actionLabels: {
    start: "체인 공격 시작",
    reset: "리셋",
    login: "로그인",
  },
  logMessages: {
    step1: "[1/3] 풀스크린 가짜 서비스 UI 표시",
    step2: "[2/3] 자격증명 캡쳐: email={email} password={password}",
    step2Notice: "실제 공격에서는 fetch/sendBeacon 으로 attacker 서버에 전송",
    step3: "[3/3] 의심 회피용으로 원래 페이지로 top redirect",
    redirectBlocked: "redirect 차단: {message}",
  },
  text: {
    overlayTitle: "Example Workspace",
    overlayBody:
      "보안 정책 변경에 따라 다시 로그인이 필요합니다. (PoC 가짜 화면)",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
  },
  explanation: [
    "iframe 임베드 후 즉시 풀스크린 오버레이로 서비스 UI 를 위장합니다. 사용자는 여전히 신뢰하는 사이트 안에 있다고 느낄 수 있습니다.",
    "사용자가 자격증명을 입력하면 값은 iframe 의 자기 origin 으로 흐르고, 실제 공격에서는 공격자 서버로 전송됩니다.",
    '전송 직후 top redirect 로 원래 페이지를 다시 열면 사용자는 "로그인 한 번 했네" 정도로 받아들이고 이상 징후를 놓치기 쉽습니다.',
    "각 단계는 SOP 를 깨지 않고도 동작 가능한 브라우저 API 만 사용합니다.",
    "host allowlist 또는 엄격한 sandbox 정책으로 임의 호스트 iframe 자체를 막는 것이 가장 큰 효과를 냅니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Chained attack (phishing + fullscreen + redirect)",
  summary:
    "Reproduce a chain that shows fake fullscreen UI, captures credentials, then top-redirects to reduce suspicion.",
  actionLabels: {
    start: "Start chained attack",
    reset: "Reset",
    login: "Sign in",
  },
  logMessages: {
    step1: "[1/3] show fullscreen fake service UI",
    step2: "[2/3] captured credentials: email={email} password={password}",
    step2Notice:
      "A real attack would exfiltrate via fetch/sendBeacon to an attacker server",
    step3: "[3/3] top-redirect to the real page to evade suspicion",
    redirectBlocked: "redirect blocked: {message}",
  },
  text: {
    overlayTitle: "Example Workspace",
    overlayBody:
      "Please sign in again due to a security policy change. (Fake PoC screen.)",
    emailLabel: "Email",
    passwordLabel: "Password",
  },
  explanation: [
    "Right after the iframe loads, a fullscreen overlay impersonates the service UI, while the user still feels they are inside the trusted site.",
    "The user enters credentials; values flow to the iframe's own origin and would be sent to an attacker server in a real attack.",
    'Immediately after capture, a top redirect to the real site makes the flow feel like "I just signed in once."',
    "Each step uses browser APIs that can work without breaking Same-Origin Policy.",
    "A host allowlist or strict sandbox that blocks arbitrary-host iframes is the most effective single defense.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "連鎖攻撃 (フィッシング + フルスクリーン + redirect)",
  summary:
    "偽フルスクリーン UI、認証情報の取得、top redirect をつなげて不審さを下げる流れを再現します。",
  actionLabels: {
    start: "連鎖攻撃を開始",
    reset: "リセット",
    login: "ログイン",
  },
  logMessages: {
    step1: "[1/3] 偽サービス UI をフルスクリーン表示",
    step2: "[2/3] 認証情報を取得: email={email} password={password}",
    step2Notice: "実攻撃では fetch/sendBeacon で攻撃者サーバーへ送信",
    step3: "[3/3] 疑念を避けるため元ページへ top redirect",
    redirectBlocked: "redirect がブロックされました: {message}",
  },
  text: {
    overlayTitle: "Example Workspace",
    overlayBody:
      "セキュリティポリシー変更のため再ログインしてください。(PoC の偽画面)",
    emailLabel: "メール",
    passwordLabel: "パスワード",
  },
  explanation: [
    "iframe 読み込み直後にフルスクリーン風のオーバーレイでサービス UI を偽装します。ユーザーは信頼しているサイト内にいると感じやすくなります。",
    "認証情報を入力すると値は iframe 自身の origin に流れ、実攻撃では攻撃者サーバーに送信されます。",
    "取得直後に top redirect で本物のページへ戻すと、ユーザーは単に一度ログインしただけだと受け取りがちです。",
    "各ステップは Same-Origin Policy を破らずに動作し得るブラウザ API だけで構成されています。",
    "任意ホスト iframe を host allowlist や厳格な sandbox で止めることが最も効果的です。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "链式攻击（钓鱼 + 全屏 + redirect）",
  summary:
    "复现假全屏 UI、凭据捕获、top redirect 组合在一起降低用户怀疑的攻击流程。",
  actionLabels: {
    start: "开始链式攻击",
    reset: "重置",
    login: "登录",
  },
  logMessages: {
    step1: "[1/3] 显示全屏假服务 UI",
    step2: "[2/3] 捕获凭据: email={email} password={password}",
    step2Notice: "真实攻击会通过 fetch/sendBeacon 发送到攻击者服务器",
    step3: "[3/3] top redirect 回真实页面以降低怀疑",
    redirectBlocked: "redirect 被阻止: {message}",
  },
  text: {
    overlayTitle: "Example Workspace",
    overlayBody: "由于安全策略变更，请重新登录。（PoC 假页面）",
    emailLabel: "邮箱",
    passwordLabel: "密码",
  },
  explanation: [
    "iframe 加载后立即用全屏覆盖层冒充服务 UI，用户仍然会感觉自己在可信站点内。",
    "用户输入凭据后，数据进入 iframe 自己的 origin；在真实攻击中会被发送到攻击者服务器。",
    "捕获后马上 top redirect 回真实页面，用户容易以为只是正常重新登录了一次。",
    "每一步都只使用不需要突破 Same-Origin Policy 的浏览器 API。",
    "通过 host allowlist 或严格 sandbox 阻止任意主机 iframe，是最有效的单点防护。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };

