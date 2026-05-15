import type { Locale } from "@/i18n/types";

export interface ILearnI18n {
  title: string;
  summary: string;
  methodologyTitle: string;
  methodology: string[];
  surfacesTitle: string;
  surfaces: { title: string; body: string }[];
  defensesTitle: string;
  defenses: string[];
  storiesTitle: string;
  stories: { title: string; body: string }[];
  referencesTitle: string;
  references: { label: string; href: string }[];
}

export const I18N: Record<Locale, ILearnI18n> = {
  ko: {
    title: "XSS 학습 노트",
    summary:
      "PayloadsAllTheThings, OWASP, MDN 자료를 바탕으로 이 플레이그라운드가 다루는 XSS 공격면과 방어 체크리스트를 실무 관점으로 정리했습니다.",
    methodologyTitle: "테스트 방법",
    methodology: [
      "먼저 입력이 어느 컨텍스트에 출력되는지 확인합니다: HTML text, attribute, URL, JavaScript string, CSS, DOM sink, iframe wrapper.",
      "그 다음 컨텍스트별 payload 를 하나씩 붙여 넣고, 실행 여부뿐 아니라 어떤 정책이 막았는지 기록합니다.",
      "사용자 화면만 보지 말고 관리자 콘솔, 알림, 메일, 로그 뷰어, 미리보기, 검색 인덱서처럼 나중에 렌더링되는 화면까지 같은 payload 로 확인합니다.",
    ],
    surfacesTitle: "놓치기 쉬운 공격면",
    surfaces: [
      {
        title: "HTML / attribute",
        body: "script 태그를 지워도 onerror, autofocus/onfocus, SVG onload, 속성 따옴표 탈출이 남을 수 있습니다.",
      },
      {
        title: "URL / protocol",
        body: "href, src, action, data 속성은 javascript:, data:text/html, 인코딩된 프로토콜을 정규화 후 allowlist 해야 합니다.",
      },
      {
        title: "DOM sink",
        body: "location, hash, postMessage, storage 값을 innerHTML, insertAdjacentHTML, eval 류 API 로 넘기면 서버 로그 없이 실행됩니다.",
      },
      {
        title: "Rich text / Markdown",
        body: "ProseMirror, Markdown, MDX 렌더러는 저장 형식과 최종 HTML 이 달라집니다. 최종 렌더 HTML 기준으로 sanitize 해야 합니다.",
      },
      {
        title: "iframe embed",
        body: "embed 기능은 태그 허용만으로 끝나지 않습니다. URL host/protocol allowlist, sandbox, allow 속성, referrer 정책을 함께 봐야 합니다.",
      },
      {
        title: "파일 / Blind XSS",
        body: "SVG/HTML 업로드와 관리자 검수 화면은 나중에 실행되는 저장형 XSS 의 대표적인 지점입니다.",
      },
    ],
    defensesTitle: "방어 체크리스트",
    defenses: [
      "출력 컨텍스트별 인코딩을 적용하고, HTML 이 필요한 곳만 검증된 sanitizer 를 사용합니다.",
      "URL 은 디코딩/정규화 후 protocol + host allowlist 로 검증합니다.",
      "DOM sink 는 textContent, setAttribute, createElement 같은 구조적 API 로 대체합니다.",
      "DOMPurify 를 쓴다면 허용 태그/속성/URL policy 를 제품 기능 단위로 문서화하고 테스트합니다.",
      "iframe 은 필요한 host 만 허용하고 sandbox 기본값을 보수적으로 잡습니다.",
      "CSP 는 보조 안전망으로 두되, sanitize 실패를 대신하는 단일 방어선으로 보지 않습니다.",
    ],
    storiesTitle: "프로젝트에서 토론하고 싶은 실제 고민",
    stories: [
      {
        title: "커뮤니티 에디터와 iframe embed",
        body: "ProseMirror 로 저장한 글을 별도 renderer 로 보여주면서 XSS surface 가 생겼고, DOMPurify 를 적용했습니다. 문제는 embed 기능입니다. 유튜브, 코드펜, 문서, 지도처럼 사용자가 원하는 링크가 다양할 때 iframe URL 을 host allowlist 로만 관리하는 것이 현실적인지 계속 토론이 필요합니다.",
      },
      {
        title: "닉네임과 아이콘 렌더링",
        body: "프로필 필드는 작아서 놓치기 쉽습니다. 닉네임이 속성으로 들어가거나 아이콘 URL 이 커스텀 renderer 를 거치면 댓글, 알림, 관리자 목록 전체로 저장형 XSS 가 퍼질 수 있습니다.",
      },
    ],
    referencesTitle: "참고 자료",
    references: [
      {
        label: "PayloadsAllTheThings - XSS Injection",
        href: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md",
      },
      {
        label: "OWASP XSS Prevention Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      },
      {
        label: "OWASP DOM based XSS Prevention",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html",
      },
      {
        label: "MDN - Cross-site scripting",
        href: "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS",
      },
    ],
  },
  en: {
    title: "XSS Learning Notes",
    summary:
      "A practical map of XSS attack surfaces and defense checks, based on PayloadsAllTheThings, OWASP, and MDN.",
    methodologyTitle: "Testing Method",
    methodology: [
      "Identify the output context first: HTML text, attribute, URL, JavaScript string, CSS, DOM sink, or iframe wrapper.",
      "Paste context-specific payloads one by one, and record not only whether they execute but which policy blocks them.",
      "Test delayed surfaces too: admin consoles, notifications, mail, log viewers, previews, and search indexers.",
    ],
    surfacesTitle: "Commonly Missed Surfaces",
    surfaces: [
      {
        title: "HTML / attribute",
        body: "Removing script tags is not enough if event handlers, SVG onload, autofocus/onfocus, or quote breakouts survive.",
      },
      {
        title: "URL / protocol",
        body: "href, src, action, and data need protocol allowlists after decoding and normalization.",
      },
      {
        title: "DOM sink",
        body: "location, hash, postMessage, or storage values become DOM XSS when they reach innerHTML or string-eval APIs.",
      },
      {
        title: "Rich text / Markdown",
        body: "ProseMirror, Markdown, and MDX often store one format and render another. Sanitize the final HTML.",
      },
      {
        title: "iframe embed",
        body: "Embed safety needs host/protocol allowlists, sandbox, allow attributes, and referrer policy, not just tag filtering.",
      },
      {
        title: "Files / Blind XSS",
        body: "SVG/HTML uploads and admin review screens are classic delayed stored-XSS surfaces.",
      },
    ],
    defensesTitle: "Defense Checklist",
    defenses: [
      "Apply output encoding per context, and use a trusted sanitizer only where HTML is truly needed.",
      "Normalize URLs, then validate protocol and host allowlists.",
      "Replace DOM sinks with structured APIs such as textContent, setAttribute, and createElement.",
      "If you use DOMPurify, document and test allowed tags, attributes, and URL policy per product feature.",
      "Allow only necessary iframe hosts and start with a conservative sandbox.",
      "Use CSP as a safety net, not as the only layer that stands in for sanitization.",
    ],
    storiesTitle: "Real Product Questions To Discuss",
    stories: [
      {
        title: "Community editor and iframe embeds",
        body: "A ProseMirror editor saved content to a database, then a separate renderer displayed it. Sanitization with DOMPurify helped, but iframe embeds raised a hard question: when users want many providers, is host allowlisting still the right operational model?",
      },
      {
        title: "Nickname and icon rendering",
        body: "Profile fields look small, but they are reused everywhere. A nickname in an attribute or an icon URL through a custom renderer can spread stored XSS into comments, notifications, and admin lists.",
      },
    ],
    referencesTitle: "References",
    references: [
      {
        label: "PayloadsAllTheThings - XSS Injection",
        href: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md",
      },
      {
        label: "OWASP XSS Prevention Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      },
      {
        label: "OWASP DOM based XSS Prevention",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html",
      },
      {
        label: "MDN - Cross-site scripting",
        href: "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS",
      },
    ],
  },
  ja: {
    title: "XSS 学習ノート",
    summary:
      "PayloadsAllTheThings、OWASP、MDN を参考に、XSS の攻撃面と防御チェックを実務向けに整理しました。",
    methodologyTitle: "テスト方法",
    methodology: [
      "まず出力コンテキストを確認します: HTML text、attribute、URL、JavaScript string、CSS、DOM sink、iframe wrapper。",
      "コンテキスト別 payload を貼り付け、実行有無とブロックした policy を記録します。",
      "管理者画面、通知、メール、ログ、preview など遅れて描画される surface も確認します。",
    ],
    surfacesTitle: "見落としやすい攻撃面",
    surfaces: [
      {
        title: "HTML / attribute",
        body: "script tag だけでなく event handler、SVG onload、quote breakout も確認します。",
      },
      {
        title: "URL / protocol",
        body: "href/src/action/data は正規化後に protocol allowlist で検証します。",
      },
      {
        title: "DOM sink",
        body: "location、hash、postMessage が innerHTML 等へ入ると DOM XSS になります。",
      },
      {
        title: "Rich text / Markdown",
        body: "保存形式ではなく最終 HTML を sanitize します。",
      },
      {
        title: "iframe embed",
        body: "host/protocol allowlist、sandbox、allow、referrer policy を一緒に設計します。",
      },
      {
        title: "Files / Blind XSS",
        body: "SVG/HTML upload と管理者 review は delayed stored XSS の典型です。",
      },
    ],
    defensesTitle: "防御チェックリスト",
    defenses: [
      "コンテキスト別出力 encoding と信頼できる sanitizer を組み合わせます。",
      "URL は正規化後に protocol/host allowlist で検証します。",
      "DOM sink は textContent や createElement など構造的 API に置き換えます。",
      "DOMPurify の許可 tag/attribute/URL policy を機能単位で文書化します。",
      "iframe は必要な host のみ許可し、sandbox を保守的に設定します。",
      "CSP は補助線であり sanitize の代替にはしません。",
    ],
    storiesTitle: "議論したい実際の悩み",
    stories: [
      {
        title: "Community editor と iframe embed",
        body: "ProseMirror の保存内容を別 renderer で表示し DOMPurify を適用しましたが、多様な embed provider を host allowlist で管理し続ける運用が現実的かが課題です。",
      },
      {
        title: "Nickname と icon rendering",
        body: "profile field は小さく見えますが、attribute や custom renderer を通ると stored XSS が広がります。",
      },
    ],
    referencesTitle: "参考資料",
    references: [
      {
        label: "PayloadsAllTheThings - XSS Injection",
        href: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md",
      },
      {
        label: "OWASP XSS Prevention Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      },
      {
        label: "OWASP DOM based XSS Prevention",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html",
      },
      {
        label: "MDN - Cross-site scripting",
        href: "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS",
      },
    ],
  },
  zh: {
    title: "XSS 学习笔记",
    summary:
      "基于 PayloadsAllTheThings、OWASP、MDN，把 XSS 攻击面和防护检查整理成实践清单。",
    methodologyTitle: "测试方法",
    methodology: [
      "先确认输出上下文：HTML text、attribute、URL、JavaScript string、CSS、DOM sink、iframe wrapper。",
      "逐个粘贴对应 payload，记录是否执行以及由哪条策略阻止。",
      "同时测试管理员控制台、通知、邮件、日志、预览等延迟渲染 surface。",
    ],
    surfacesTitle: "容易遗漏的攻击面",
    surfaces: [
      {
        title: "HTML / attribute",
        body: "仅移除 script 不够，还要检查 event handler、SVG onload、引号逃逸。",
      },
      {
        title: "URL / protocol",
        body: "href/src/action/data 需在解码规范化后做 protocol allowlist。",
      },
      {
        title: "DOM sink",
        body: "location、hash、postMessage 进入 innerHTML 等 API 会形成 DOM XSS。",
      },
      {
        title: "Rich text / Markdown",
        body: "不要只看存储格式，应 sanitize 最终 HTML。",
      },
      {
        title: "iframe embed",
        body: "需要 host/protocol allowlist、sandbox、allow 属性与 referrer policy。",
      },
      {
        title: "Files / Blind XSS",
        body: "SVG/HTML 上传和管理员审核页是延迟存储型 XSS 常见 surface。",
      },
    ],
    defensesTitle: "防护清单",
    defenses: [
      "按输出上下文编码，只在确实需要 HTML 的地方使用可信 sanitizer。",
      "URL 先规范化，再校验 protocol/host allowlist。",
      "用 textContent、setAttribute、createElement 替代危险 DOM sink。",
      "按产品功能记录并测试 DOMPurify 的标签、属性、URL 策略。",
      "iframe 只允许必要 host，并采用保守 sandbox。",
      "CSP 是安全网，不应替代 sanitize。",
    ],
    storiesTitle: "希望讨论的真实问题",
    stories: [
      {
        title: "社区编辑器与 iframe embed",
        body: "ProseMirror 内容由独立 renderer 展示并使用 DOMPurify 后，仍需面对多 provider iframe embed 是否能长期靠 host allowlist 管理的问题。",
      },
      {
        title: "昵称与图标渲染",
        body: "profile 字段看似很小，但进入 attribute 或 custom renderer 后会把 stored XSS 扩散到评论、通知和管理员列表。",
      },
    ],
    referencesTitle: "参考资料",
    references: [
      {
        label: "PayloadsAllTheThings - XSS Injection",
        href: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md",
      },
      {
        label: "OWASP XSS Prevention Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      },
      {
        label: "OWASP DOM based XSS Prevention",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html",
      },
      {
        label: "MDN - Cross-site scripting",
        href: "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS",
      },
    ],
  },
};
