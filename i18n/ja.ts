import type { IDictionary } from "./types";

export const ja: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "コピーして試せる XSS シナリオ集",
    description:
      "権限のあるサービスで script タグ、イベントハンドラ、javascript: URL、DOM sink、iframe 埋め込み、postMessage のリスクを確認するための公開テストプレイグラウンドです。",
    keywords: [
      "XSS テスト",
      "iframe セキュリティ",
      "Web セキュリティ",
      "postMessage 検証",
      "CSP",
      "sandbox",
      "DOM XSS",
      "セキュリティ研修",
    ],
  },
  nav: {
    home: "ホーム",
    embedHelper: "Embed Helper",
    learn: "学習ノート",
    forum: "フォーラム",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "フロントエンド開発者の Sangmook Kim です。このサイトは特定サービス専用の PoC ではなく、自分が権限を持つ Web サービスの XSS 対策を確認するための公開プレイグラウンドです。",
      "各シナリオは、script タグ、イベントハンドラ属性、javascript: URL、DOM sink、埋め込み iframe、親ページとのメッセージ通信など、実サービスで見落としやすい攻撃面を小さなテストページとして再現します。",
      "シナリオカードまたは詳細ページから HTML payload または iframe コードをコピーし、自分のプロジェクトに貼り付けてレンダリング結果とブラウザの挙動を確認してください。",
    ],
    contact: "問い合わせ",
    intentHeading: "プロジェクトの意図",
    intentBody: [
      "XSS 対策は HTML フィルタの名前や 1 行のフィルタだけでは完了しません。iframe、メッセージ、権限プロンプト、自動リクエスト、偽 UI が実際のブラウザでどこまで動くかを確認する必要があります。",
      "このサイトは攻撃自動化ツールではなく、開発者やセキュリティ担当者が権限のあるサービスのレンダリングポリシーを再現可能な形で確認するためのチェックリストです。",
      "すべてのスニペットは dev / staging 環境にコピーして使う前提です。HTML payload が実行されたり iframe シナリオが動作すれば調査すべきサインであり、ブロックされればどのポリシーが止めたか記録できます。",
    ],
    threatsHeading: "XSS 脅威マップ",
    threatsIntro:
      "Hacker101 CTF の XSS Playground 分類と PortSwigger Web Security Academy のガイドを参考に、このプロジェクトで確認すべきリスクを整理しています。",
    threats: [
      {
        title: "Reflected XSS",
        body: "クエリ、検索語、エラーメッセージなど現在のリクエスト由来の値が、安全でない形で HTML に反映されるケースです。",
      },
      {
        title: "Stored XSS",
        body: "コメント、プロフィール、文書本文など保存された入力が、後から他ユーザーに active content として表示されるケースです。",
      },
      {
        title: "DOM-based XSS",
        body: "クライアントコードが location、hash、postMessage などの信頼できない値を unsafe sink に渡すケースです。",
      },
      {
        title: "Filter / CSP bypass",
        body: "イベントハンドラ、SVG/MathML、javascript: URL、エンコーディング、テンプレート構文で弱いフィルタや不完全な CSP を迂回できないか確認します。",
      },
      {
        title: "Account abuse",
        body: "スクリプトが実行されると、ユーザー権限でリクエストを送信し、画面を操作し、ユーザーがアクセスできるデータを悪用できます。",
      },
      {
        title: "Phishing / exfiltration",
        body: "iframe、オーバーレイ、通知、クリップボード、postMessage により、秘密情報の入力誘導や観測可能な情報の外部送信が起こります。",
      },
    ],
    referencesHeading: "参考資料",
    references: [
      {
        label: "Hacker101 CTF write-ups",
        href: "https://github.com/8r0wn13/hacker101_ctf",
      },
      {
        label: "PortSwigger XSS overview",
        href: "https://portswigger.net/web-security/cross-site-scripting",
      },
      {
        label: "PortSwigger XSS cheat sheet",
        href: "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",
      },
      {
        label: "PayloadsAllTheThings XSS",
        href: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md",
      },
    ],
    scenariosHeading: "シナリオ",
    scenariosIntro:
      "カテゴリ別の攻撃シナリオ。カードから HTML payload または embed コードをコピーし、詳細ページでさらにテストできます。",
    howToUseHeading: "使い方",
    howToUseSteps: [
      "目的のシナリオページを開く。",
      "ホームカードまたは詳細ページから HTML payload または iframe コードをコピー。",
      "自サービス(エディタ、ノート、wiki など)に貼り付けて保存。",
      "レンダリング、sandbox、CSP、postMessage 検証、実際のブラウザ挙動を確認。",
    ],
    warningTitle: "注意",
    warningBody:
      "自身が権限を持つサービスに対してのみテストしてください。第三者サービスに対する試行は不正アクセス禁止法等に抵触する可能性があります。",
    contributingHeading: "コントリビュート (Issues / PR)",
    contributingBody: [
      "本プロジェクトは source-available ライセンスで運用しています。ソースは公開していますが、フォークして別のデプロイを運用したり、再配布・商用利用することは許可していません。",
      "アイデア、バグ報告、翻訳改善、新シナリオ提案は歓迎します。まず Issue を立てて方針を合意し、採用された変更は collaborator として直接ブランチを push する PR フローを推奨します。",
      "ライセンスとコントリビューションポリシーの全文は LICENSE と CONTRIBUTING.md を参照してください。",
    ],
    contributingLinks: [
      {
        label: "Issue を立てる",
        href: "https://github.com/Kimsangmook/xss-playground/issues/new/choose",
      },
      {
        label: "Pull Request 一覧",
        href: "https://github.com/Kimsangmook/xss-playground/pulls",
      },
      {
        label: "CONTRIBUTING.md",
        href: "https://github.com/Kimsangmook/xss-playground/blob/main/CONTRIBUTING.md",
      },
      {
        label: "LICENSE",
        href: "https://github.com/Kimsangmook/xss-playground/blob/main/LICENSE",
      },
    ],
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
    embedSnippetDescription:
      "このスニペットは埋め込み専用ページを使用します。自サービスに貼り付けてレンダリング/ブロックの挙動を確認してください。",
    embeddedBadge: "EMBEDDED",
    htmlSurfaceTitle: "HTML payload テスト",
    domSurfaceTitle: "DOM sink テスト",
    surfaceDescription:
      "このシナリオは iframe sandbox ではなく、ユーザー入力が HTML/DOM にどう描画されるかを検証します。",
    sandboxPresetLabels: [
      "sandbox なし (基本動作)",
      'sandbox="" (最も厳格)',
      'sandbox="allow-scripts"',
      'sandbox="allow-scripts allow-same-origin"',
      'sandbox="allow-scripts allow-top-navigation"',
      'sandbox="allow-scripts allow-forms allow-popups"',
    ],
    copySnippet: "コピー",
    copied: "コピー済み",
  },
  // 시나리오/카테고리는 영어 dictionary 를 fallback 으로 사용
  scenarios: {},
  categories: {
    html: "HTML Injection",
    dom: "DOM XSS",
    protocol: "URL / Protocol",
    context: "Context Breakout",
    file: "File Upload",
    content: "User Content",
    navigation: "Navigation",
    communication: "Communication",
    exfil: "Exfiltration",
    phishing: "Phishing",
    delayed: "Delayed / Chained",
    annoyance: "Annoyance",
    probe: "Probe",
  },
};
