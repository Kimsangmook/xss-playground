import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "가짜 로그인 폼 (피싱)",
  summary:
    "iframe 안에 부모 사이트처럼 보이는 로그인 폼을 그려 사용자의 입력값을 자기 origin 에서 수집한다.",
  actionLabels: {
    submit: "로그인",
    clearLog: "로그 초기화",
  },
  logMessages: {
    captured: "수집된 자격증명: email={email} password={password}",
    notice:
      "실제 공격에서는 이 값을 fetch / sendBeacon 으로 attacker 서버에 전송합니다. 이 PoC 에서는 전송하지 않습니다.",
  },
  text: {
    callout:
      "실제 공격 시 이 iframe 은 부모 페이지 안에서 서비스의 모달/로그인 영역처럼 보이도록 배치됩니다. 사용자는 도메인이 attacker.example 인 것을 알기 어렵습니다.",
    formHeading: "가짜 로그인 폼 (자기 origin 안에서 자유롭게 그려짐)",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
    logsHeading: "수집 로그",
    emailPlaceholder: "you@example.com",
  },
  explanation: [
    "iframe 안의 폼은 자기 origin 의 페이지이므로 어떤 UI 도 자유롭게 그릴 수 있고, 입력값을 자기 서버로 보낼 수 있습니다. SOP 와 무관합니다.",
    '<code>sandbox="allow-scripts"</code> 만 줘도 form submit 자체는 막을 수 있지만, JS 로 값을 수집해 fetch 로 보내는 건 여전히 가능합니다. <code>sandbox=""</code> 이라야 JS 도 막힙니다.',
    "가장 확실한 대응은 iframe 의 host 를 allowlist 로 제한하는 것입니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Fake login form (phishing)",
  summary:
    "Draw a parent-like login form inside an iframe and collect user input on the iframe's own origin.",
  actionLabels: {
    submit: "Sign in",
    clearLog: "Clear log",
  },
  logMessages: {
    captured: "captured credentials: email={email} password={password}",
    notice:
      "A real attack would send these via fetch / sendBeacon to an attacker server. This PoC does not transmit anything.",
  },
  text: {
    callout:
      "In a real attack this iframe would be placed inside the parent page to look like the service's own modal or login area. The user has no easy way to notice the domain is attacker.example.",
    formHeading: "Fake login form (free to draw anything inside its own origin)",
    emailLabel: "Email",
    passwordLabel: "Password",
    logsHeading: "Captured log",
    emailPlaceholder: "you@example.com",
  },
  explanation: [
    "The form inside the iframe is just a page on its own origin, so it can render any UI and submit values to its own server. SOP is irrelevant here.",
    'Even <code>sandbox="allow-scripts"</code> blocks native form submit, but JS can still collect the values and fetch them out. Only <code>sandbox=""</code> blocks JS too.',
    "The strongest mitigation is a host allowlist for iframe src.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "偽ログインフォーム (フィッシング)",
  summary:
    "iframe 内に親サイト風のログインフォームを描き、入力値を iframe 自身の origin で収集します。",
  actionLabels: {
    submit: "ログイン",
    clearLog: "ログをクリア",
  },
  logMessages: {
    captured: "取得した認証情報: email={email} password={password}",
    notice:
      "実攻撃では fetch / sendBeacon で攻撃者サーバーへ送信します。この PoC では送信しません。",
  },
  text: {
    callout:
      "実攻撃ではこの iframe を親ページ内のモーダルやログイン領域のように配置します。ユーザーは domain が attacker.example であることに気づきにくくなります。",
    formHeading: "偽ログインフォーム (自分の origin 内で自由に描画)",
    emailLabel: "メール",
    passwordLabel: "パスワード",
    logsHeading: "取得ログ",
    emailPlaceholder: "you@example.com",
  },
  explanation: [
    "iframe 内のフォームは自分の origin のページなので、任意の UI を描画し、値を自分のサーバーへ送れます。SOP とは無関係です。",
    '<code>sandbox="allow-scripts"</code> だけでも通常の form submit は止まりますが、JS で値を集めて fetch することは可能です。<code>sandbox=""</code> で JS も止める必要があります。',
    "最も強い対策は iframe src の host allowlist です。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "假登录表单（钓鱼）",
  summary:
    "在 iframe 内绘制类似父站点的登录表单，并在 iframe 自己的 origin 中收集用户输入。",
  actionLabels: {
    submit: "登录",
    clearLog: "清空日志",
  },
  logMessages: {
    captured: "捕获的凭据: email={email} password={password}",
    notice:
      "真实攻击会通过 fetch / sendBeacon 发送到攻击者服务器。本 PoC 不会传输任何内容。",
  },
  text: {
    callout:
      "真实攻击会把此 iframe 放在父页面中，让它看起来像服务自己的弹窗或登录区域。用户很难注意到域名是 attacker.example。",
    formHeading: "假登录表单（可在自己的 origin 内自由绘制）",
    emailLabel: "邮箱",
    passwordLabel: "密码",
    logsHeading: "捕获日志",
    emailPlaceholder: "you@example.com",
  },
  explanation: [
    "iframe 内的表单只是其自身 origin 上的页面，因此可以绘制任何 UI，并把值发送到自己的服务器。SOP 不会阻止这一点。",
    '即使 <code>sandbox="allow-scripts"</code> 会阻止原生表单提交，JS 仍然可以收集值并通过 fetch 发出。只有 <code>sandbox=""</code> 也能阻止 JS。',
    "最有效的防护是限制 iframe src 的 host allowlist。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };

