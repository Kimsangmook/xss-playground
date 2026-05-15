import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "top.location 강제 리다이렉트",
  summary:
    "iframe 안에서 부모 창 전체를 다른 URL 로 보내며 sandbox allow-top-navigation 차이를 확인한다.",
  actionLabels: {
    tryTop: "window.top.location = url",
    tryAssign: "window.top.location.assign()",
    tryAnchor: "<a target=_top> 가짜 클릭",
    tryMetaRefresh: "meta refresh (자기 origin)",
    scheduleAuto: "{n}초 뒤 자동 발사 (피싱 시나리오)",
    clearLog: "로그 초기화",
  },
  logMessages: {
    checkTop: "window.top === window.self ? {value}",
    tryTopLog: '시도: window.top.location = "{target}"',
    successNav: "호출 성공 (페이지가 곧 이동합니다)",
    tryAssignLog: '시도: window.top.location.assign("{target}")',
    successPlain: "호출 성공",
    blocked: "차단됨: {message}",
    tryAnchorLog: '시도: <a target="_top" href="{target}"> 가짜 클릭',
    anchorCalled: "호출 완료 (성공했다면 페이지 이동)",
    tryMetaLog: '시도: meta http-equiv="refresh" 삽입 (자기 origin 내에서만 동작)',
    metaInserted: "meta refresh 삽입 완료",
    autoScheduled: "{n}초 뒤 자동 리다이렉트 예약",
  },
  explanation: [
    "<code>window.top.location</code> 변경은 cross-origin 이어도 기본 허용됩니다. SOP 가 막아주지 않는 영역입니다.",
    '차단하려면 sandbox 에 <code>allow-top-navigation</code> 을 주지 않으면 됩니다. <code>sandbox="allow-scripts"</code> 만 줘도 차단됩니다.',
    "공격 가치는 큽니다. 사용자가 신뢰하는 서비스 안에서 무언가 클릭한 직후 전체 탭이 피싱 사이트로 바뀔 수 있습니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "top.location forced redirect",
  summary:
    "Replace the whole parent window from inside an iframe and compare sandbox allow-top-navigation behavior.",
  actionLabels: {
    tryTop: "window.top.location = url",
    tryAssign: "window.top.location.assign()",
    tryAnchor: "<a target=_top> fake click",
    tryMetaRefresh: "meta refresh (same-origin only)",
    scheduleAuto: "Auto-fire in {n}s (phishing scenario)",
    clearLog: "Clear log",
  },
  logMessages: {
    checkTop: "window.top === window.self ? {value}",
    tryTopLog: 'try: window.top.location = "{target}"',
    successNav: "call succeeded (page navigating shortly)",
    tryAssignLog: 'try: window.top.location.assign("{target}")',
    successPlain: "call succeeded",
    blocked: "blocked: {message}",
    tryAnchorLog: 'try: <a target="_top" href="{target}"> fake click',
    anchorCalled: "click dispatched (navigation if allowed)",
    tryMetaLog: 'try: insert meta http-equiv="refresh" (same-origin only)',
    metaInserted: "meta refresh inserted",
    autoScheduled: "auto-redirect scheduled in {n}s",
  },
  explanation: [
    "Changing <code>window.top.location</code> is allowed by default even cross-origin. SOP does not protect this surface.",
    'To block it, do not grant <code>allow-top-navigation</code> in sandbox. Even <code>sandbox="allow-scripts"</code> is enough to block.',
    "The attack value is high: after the user clicks inside a trusted service, the whole tab can be replaced by a phishing site.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "top.location 強制リダイレクト",
  summary:
    "iframe 内から親ウィンドウ全体を別 URL へ遷移させ、sandbox allow-top-navigation の違いを確認します。",
  actionLabels: {
    tryTop: "window.top.location = url",
    tryAssign: "window.top.location.assign()",
    tryAnchor: "<a target=_top> 偽クリック",
    tryMetaRefresh: "meta refresh (同一 origin のみ)",
    scheduleAuto: "{n}秒後に自動実行 (フィッシング想定)",
    clearLog: "ログをクリア",
  },
  logMessages: {
    checkTop: "window.top === window.self ? {value}",
    tryTopLog: '試行: window.top.location = "{target}"',
    successNav: "呼び出し成功 (まもなく遷移します)",
    tryAssignLog: '試行: window.top.location.assign("{target}")',
    successPlain: "呼び出し成功",
    blocked: "ブロック: {message}",
    tryAnchorLog: '試行: <a target="_top" href="{target}"> 偽クリック',
    anchorCalled: "click を発火しました (許可されていれば遷移)",
    tryMetaLog: '試行: meta http-equiv="refresh" を挿入 (同一 origin のみ)',
    metaInserted: "meta refresh を挿入しました",
    autoScheduled: "{n}秒後の自動 redirect を予約",
  },
  explanation: [
    "<code>window.top.location</code> の変更は cross-origin でもデフォルトで許可されます。SOP はこの表面を守りません。",
    '<code>allow-top-navigation</code> を sandbox に付けなければブロックできます。<code>sandbox="allow-scripts"</code> だけでもブロックされます。',
    "信頼されたサービス内でユーザーが何かをクリックした直後、タブ全体がフィッシングサイトへ置き換わるため攻撃価値は高いです。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "top.location 强制跳转",
  summary:
    "从 iframe 内替换整个父窗口，并比较 sandbox allow-top-navigation 的行为差异。",
  actionLabels: {
    tryTop: "window.top.location = url",
    tryAssign: "window.top.location.assign()",
    tryAnchor: "<a target=_top> 假点击",
    tryMetaRefresh: "meta refresh（仅同源）",
    scheduleAuto: "{n} 秒后自动触发（钓鱼场景）",
    clearLog: "清空日志",
  },
  logMessages: {
    checkTop: "window.top === window.self ? {value}",
    tryTopLog: '尝试: window.top.location = "{target}"',
    successNav: "调用成功（页面即将跳转）",
    tryAssignLog: '尝试: window.top.location.assign("{target}")',
    successPlain: "调用成功",
    blocked: "已阻止: {message}",
    tryAnchorLog: '尝试: <a target="_top" href="{target}"> 假点击',
    anchorCalled: "click 已触发（如被允许则会跳转）",
    tryMetaLog: '尝试插入 meta http-equiv="refresh"（仅同源）',
    metaInserted: "meta refresh 已插入",
    autoScheduled: "{n} 秒后自动 redirect 已预约",
  },
  explanation: [
    "即使 cross-origin，<code>window.top.location</code> 默认也可以被修改。SOP 不保护这个表面。",
    '不授予 sandbox 的 <code>allow-top-navigation</code> 即可阻止。仅使用 <code>sandbox="allow-scripts"</code> 也足以阻止。',
    "攻击价值很高：用户在可信服务中点击后，整个标签页可能被替换成钓鱼站点。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };

