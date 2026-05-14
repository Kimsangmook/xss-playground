import type { IDictionary } from "./types";

export const ja: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "iframe / sanitize 攻撃シナリオ集",
    description:
      "DOMPurify などの HTML sanitizer が iframe 埋め込みをどこまで許容するかを検証するための PoC カタログ。自社サービスの sanitize ポリシー検証、sandbox キーワードの効果確認、セキュリティ学習用途で利用できます。",
  },
  nav: {
    home: "ホーム",
    embedHelper: "Embed Helper",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "フロントエンド開発者の Sangmook Kim です。担当サービスの iframe sanitize ポリシーを実装している過程で、ホスト許可リストを設けない場合に残る攻撃面を実際に検証したくて、このサイトを作りました。",
      "各シナリオは親サイト内に埋め込まれた iframe の中で何が起こるかを再現します。自社サービスの sanitize 検証、各 sandbox キーワードの効果確認、セキュリティ研修用に活用してください。",
      "XSS / iframe セキュリティを学ぶ方、自社サービスをテストする方に開かれたサイドプロジェクトです。",
    ],
    contact: "問い合わせ",
    scenariosHeading: "シナリオ",
    scenariosIntro:
      "カテゴリ別の攻撃シナリオ。各ページで embed スニペットをコピーし、自サービスでの sanitize 結果を確認してください。",
    howToUseHeading: "使い方",
    howToUseSteps: [
      "目的のシナリオページを開く。",
      "embed スニペットカードで sandbox プリセットを選択し iframe コードをコピー。",
      "自サービス(エディタ、ノート、wiki など)に貼り付けて保存。",
      "レンダリング結果と実際の挙動を確認。",
    ],
    warningTitle: "注意",
    warningBody:
      "自身が権限を持つサービスに対してのみテストしてください。第三者サービスに対する試行は不正アクセス禁止法等に抵触する可能性があります。",
  },
  scenarioPage: {
    sandboxMatrix: "sandbox ポリシー別の挙動",
    policy: "ポリシー",
    expectedResult: "想定結果",
    noSandbox: "sandbox 未指定",
    scriptsOnly: 'sandbox="allow-scripts"',
    fullSandbox: 'sandbox="" (最も厳格)',
    sopBlocks:
      "このシナリオは sandbox とは別に Same-Origin Policy が直接ブロックします。",
    works: "動作",
    blocked: "ブロック",
    partial: "部分動作",
    actions: "実行",
    explanation: "解説",
    embedSnippet: "Embed スニペット",
    copySnippet: "コピー",
    copied: "コピー済み",
  },
  // 시나리오/카테고리는 영어 dictionary 를 fallback 으로 사용
  scenarios: {},
  categories: {
    navigation: "Navigation",
    communication: "Communication",
    exfil: "Exfiltration",
    phishing: "Phishing",
    delayed: "Delayed / Chained",
    annoyance: "Annoyance",
    probe: "Probe",
  },
};
