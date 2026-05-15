import type { Locale } from "@/i18n/types";

interface IEmbedHelperI18n {
  title: string;
  summary: string;
  warning: string;
  settingsHeading: string;
  scenarioLabel: string;
  sandboxLabel: string;
  sandboxPresets: string[];
  iframeHeading: string;
  messageLogHeading: string;
  clearLog: string;
  emptyLog: string;
}

export const I18N: Record<Locale, IEmbedHelperI18n> = {
  ko: {
    title: "부모 페이지 임베드 헬퍼",
    summary:
      "이 페이지가 테스트 대상 서비스의 부모 페이지 역할을 합니다. 시나리오와 sandbox 조합을 바꿔가며 실제 어떤 차이가 나는지 한 페이지에서 비교할 수 있습니다.",
    warning:
      "실제 서비스의 대응을 검증하려면 이 헬퍼가 아니라 해당 서비스의 에디터, 위키, CMS, 댓글 영역처럼 HTML 이 렌더링되는 위치에 시나리오 iframe 을 직접 붙여 넣으세요. 이 헬퍼는 sandbox 옵션 자체의 효과를 빠르게 비교하는 용도입니다.",
    settingsHeading: "설정",
    scenarioLabel: "시나리오",
    sandboxLabel: "sandbox",
    sandboxPresets: [
      "sandbox 없음",
      'sandbox=""',
      'sandbox="allow-scripts"',
      'sandbox="allow-scripts allow-same-origin"',
      'sandbox="allow-scripts allow-top-navigation"',
      'sandbox="allow-scripts allow-forms allow-popups"',
    ],
    iframeHeading: "iframe",
    messageLogHeading: "부모 message 리스너 로그",
    clearLog: "로그 초기화",
    emptyLog: "// 메시지 없음",
  },
  en: {
    title: "Parent Embed Helper",
    summary:
      "This page acts as a parent page for testing. Change the scenario and sandbox policy to compare browser behavior in one place.",
    warning:
      "To validate your real service, paste the scenario iframe into the actual rendering surface such as your editor, wiki, CMS, or comment area. This helper is only for quickly comparing sandbox options.",
    settingsHeading: "Settings",
    scenarioLabel: "Scenario",
    sandboxLabel: "sandbox",
    sandboxPresets: [
      "No sandbox",
      'sandbox=""',
      'sandbox="allow-scripts"',
      'sandbox="allow-scripts allow-same-origin"',
      'sandbox="allow-scripts allow-top-navigation"',
      'sandbox="allow-scripts allow-forms allow-popups"',
    ],
    iframeHeading: "iframe",
    messageLogHeading: "Parent message listener log",
    clearLog: "Clear log",
    emptyLog: "// no messages",
  },
  ja: {
    title: "親ページ Embed Helper",
    summary:
      "このページはテスト対象サービスの親ページとして動作します。シナリオと sandbox の組み合わせを変えながら、ブラウザ挙動の違いを一箇所で比較できます。",
    warning:
      "実サービスの対策を検証するには、この helper ではなく、editor、wiki、CMS、コメント欄など HTML が描画される実際の場所にシナリオ iframe を貼り付けてください。この helper は sandbox option の効果を素早く比較するためのものです。",
    settingsHeading: "設定",
    scenarioLabel: "シナリオ",
    sandboxLabel: "sandbox",
    sandboxPresets: [
      "sandbox なし",
      'sandbox=""',
      'sandbox="allow-scripts"',
      'sandbox="allow-scripts allow-same-origin"',
      'sandbox="allow-scripts allow-top-navigation"',
      'sandbox="allow-scripts allow-forms allow-popups"',
    ],
    iframeHeading: "iframe",
    messageLogHeading: "親 message listener ログ",
    clearLog: "ログをクリア",
    emptyLog: "// メッセージなし",
  },
  zh: {
    title: "父页面 Embed Helper",
    summary:
      "此页面充当测试目标服务的父页面。可以切换场景和 sandbox 组合，在一个页面中比较浏览器行为差异。",
    warning:
      "要验证真实服务的防护，请不要只使用此 helper，而应把场景 iframe 粘贴到服务实际渲染 HTML 的位置，例如编辑器、wiki、CMS 或评论区域。此 helper 仅用于快速比较 sandbox 选项效果。",
    settingsHeading: "设置",
    scenarioLabel: "场景",
    sandboxLabel: "sandbox",
    sandboxPresets: [
      "无 sandbox",
      'sandbox=""',
      'sandbox="allow-scripts"',
      'sandbox="allow-scripts allow-same-origin"',
      'sandbox="allow-scripts allow-top-navigation"',
      'sandbox="allow-scripts allow-forms allow-popups"',
    ],
    iframeHeading: "iframe",
    messageLogHeading: "父页面 message listener 日志",
    clearLog: "清空日志",
    emptyLog: "// 无消息",
  },
};

