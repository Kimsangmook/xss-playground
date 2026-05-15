import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: {
    beacon: string;
    fetch: string;
    trackingOn: string;
    trackingOff: string;
    clearLog: string;
  };
  log: {
    clickCapture: string;
    keyCapture: string;
    sendingBeacon: string;
    beaconResult: string;
    sendingFetch: string;
    fetchStatus: string;
    failed: string;
    empty: string;
  };
  text: { referrerLabel: string; uaLabel: string };
  explanation: string[];
}

const ko: IPageText = {
  title: "navigator.sendBeacon / fetch exfiltration",
  summary:
    "iframe 자기 origin 안에서 수집한 정보와 referrer 를 sendBeacon 또는 fetch 로 외부 전송하는 흐름을 확인한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    beacon: "sendBeacon 으로 전송",
    fetch: "fetch 로 전송",
    trackingOn: "키/클릭 수집 켜기",
    trackingOff: "키/클릭 수집 끄기",
    clearLog: "로그 초기화",
  },
  log: {
    clickCapture: "click 좌표 수집: x={x} y={y}",
    keyCapture: 'key 수집: "{key}" (실제 공격이라면 비밀번호도 그대로 수집)',
    sendingBeacon: 'navigator.sendBeacon("{endpoint}", ...)',
    beaconResult: "결과: {result}",
    sendingFetch: "fetch POST → {endpoint}",
    fetchStatus: "응답 status={status}",
    failed: "실패: {message}",
    empty: "(없음)",
  },
  text: { referrerLabel: "document.referrer", uaLabel: "navigator.userAgent" },
  explanation: [
    "iframe 안에서 일어난 클릭/키 입력은 자기 origin 이라 자유롭게 수집할 수 있습니다. iframe 위에 가짜 입력 필드를 두면 사용자가 거기 친 비밀번호 그대로 attacker 서버로 보낼 수 있습니다.",
    "<code>document.referrer</code> 로 부모 페이지 URL 의 origin / path 까지 확인 가능합니다 (Referrer-Policy 에 따라 다름). 어떤 문서, 게시글, 대시보드에 임베드됐는지 추적할 수 있습니다.",
    "이 공격은 진짜 데이터 탈취에 가장 가깝습니다. 대응은 sandbox 빈 값으로 JS 자체를 막거나 호스트 allowlist 로 신뢰 도메인만 허용하는 것.",
  ],
};

const en: IPageText = {
  title: "navigator.sendBeacon / fetch exfiltration",
  summary:
    "Check how data collected inside the iframe's own origin and referrer information can be sent out via sendBeacon or fetch.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    beacon: "Send via sendBeacon",
    fetch: "Send via fetch",
    trackingOn: "Enable key/click capture",
    trackingOff: "Disable key/click capture",
    clearLog: "Clear log",
  },
  log: {
    clickCapture: "click captured: x={x} y={y}",
    keyCapture:
      'key captured: "{key}" (a real attack would log passwords the same way)',
    sendingBeacon: 'navigator.sendBeacon("{endpoint}", ...)',
    beaconResult: "result: {result}",
    sendingFetch: "fetch POST → {endpoint}",
    fetchStatus: "response status={status}",
    failed: "failed: {message}",
    empty: "(empty)",
  },
  text: { referrerLabel: "document.referrer", uaLabel: "navigator.userAgent" },
  explanation: [
    "Clicks and keystrokes happening inside the iframe belong to its own origin, so they can be captured freely. A fake input field can harvest the user's typed password and ship it out.",
    "<code>document.referrer</code> exposes the parent page's origin / path (subject to Referrer-Policy). You can tell exactly which document, post, or dashboard the iframe is embedded in.",
    'This is the closest thing to actual data exfiltration. Mitigations: <code>sandbox=""</code> blocks JS entirely, or restrict iframe src to a trusted host allowlist.',
  ],
};

const ja: IPageText = {
  title: "navigator.sendBeacon / fetch による exfiltration",
  summary:
    "iframe 自身の origin 内で収集した情報や referrer を sendBeacon / fetch で外部送信できるか確認します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    beacon: "sendBeacon で送信",
    fetch: "fetch で送信",
    trackingOn: "キー/クリック収集を有効化",
    trackingOff: "キー/クリック収集を無効化",
    clearLog: "ログをクリア",
  },
  log: {
    clickCapture: "click 座標を収集: x={x} y={y}",
    keyCapture: 'key を収集: "{key}" (実攻撃ならパスワードも同様)',
    sendingBeacon: 'navigator.sendBeacon("{endpoint}", ...)',
    beaconResult: "結果: {result}",
    sendingFetch: "fetch POST → {endpoint}",
    fetchStatus: "応答 status={status}",
    failed: "失敗: {message}",
    empty: "(なし)",
  },
  text: { referrerLabel: "document.referrer", uaLabel: "navigator.userAgent" },
  explanation: [
    "iframe 内で発生したクリックやキー入力はその iframe の origin に属するため、自由に収集できます。偽入力欄を置けばユーザーが入力したパスワードも収集できます。",
    "<code>document.referrer</code> から親ページの origin / path を確認できます (Referrer-Policy に依存)。どの文書、投稿、ダッシュボードに埋め込まれたか追跡できます。",
    'これは実データ送信に最も近いシナリオです。対策は <code>sandbox=""</code> で JS 自体を止めるか、host allowlist で信頼ドメインだけ許可することです。',
  ],
};

const zh: IPageText = {
  title: "navigator.sendBeacon / fetch 数据外传",
  summary:
    "检查 iframe 自身 origin 中收集的信息和 referrer 是否可通过 sendBeacon 或 fetch 发送到外部。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    beacon: "通过 sendBeacon 发送",
    fetch: "通过 fetch 发送",
    trackingOn: "开启键盘/点击收集",
    trackingOff: "关闭键盘/点击收集",
    clearLog: "清空日志",
  },
  log: {
    clickCapture: "收集 click 坐标: x={x} y={y}",
    keyCapture: '收集 key: "{key}"（真实攻击中密码也会被同样收集）',
    sendingBeacon: 'navigator.sendBeacon("{endpoint}", ...)',
    beaconResult: "结果: {result}",
    sendingFetch: "fetch POST → {endpoint}",
    fetchStatus: "响应 status={status}",
    failed: "失败: {message}",
    empty: "（无）",
  },
  text: { referrerLabel: "document.referrer", uaLabel: "navigator.userAgent" },
  explanation: [
    "iframe 内发生的点击和键盘输入属于它自己的 origin，因此可以自由收集。放置假输入框时，用户输入的密码也可能被发送出去。",
    "<code>document.referrer</code> 可以暴露父页面的 origin / path（取决于 Referrer-Policy），从而知道 iframe 被嵌入在哪个文档、帖子或仪表盘中。",
    '这是最接近真实数据外传的场景。防护方式是用 <code>sandbox=""</code> 完全阻止 JS，或通过 host allowlist 只允许可信域名。',
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
