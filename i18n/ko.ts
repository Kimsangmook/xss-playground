import type { IDictionary } from "./types";

export const ko: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "복사해서 테스트하는 XSS 시나리오 모음",
    description:
      "권한 있는 서비스에서 script 태그, 이벤트 핸들러, javascript: URL, DOM sink, iframe 임베드, postMessage 위험을 빠르게 점검할 수 있는 공개 보안 테스트 플레이그라운드입니다.",
    keywords: [
      "XSS 테스트",
      "iframe 보안",
      "웹 보안",
      "postMessage 검증",
      "CSP",
      "sandbox",
      "DOM XSS",
      "보안 교육",
    ],
  },
  nav: {
    home: "홈",
    simulator: "시뮬레이터",
    learn: "학습 노트",
    forum: "포럼",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "프론트엔드 개발자 김상묵입니다. 이 사이트는 특정 서비스 전용 PoC 가 아니라, 누구나 본인이 권한을 가진 웹 서비스에서 XSS 대응을 빠르게 확인할 수 있도록 만든 공개 플레이그라운드입니다.",
      "각 시나리오는 script 태그, 이벤트 핸들러 속성, javascript: URL, DOM sink, 임베드된 iframe, 부모 페이지와의 메시지 통신처럼 실제 서비스에서 자주 놓치는 공격면을 작은 테스트 페이지로 재현합니다.",
      "시나리오 카드나 상세 페이지에서 HTML payload 또는 iframe 코드를 복사해 본인 프로젝트에 붙여 넣고, 렌더링 차단 여부와 실제 브라우저 동작을 확인하세요.",
    ],
    contact: "문의",
    intentHeading: "프로젝트 의도",
    intentBody: [
      "XSS 대응은 코드 한 줄이나 HTML 필터 이름만으로 끝나지 않습니다. 실제 브라우저에서 iframe, 메시지, 권한 요청, 자동 요청, 사용자 기만 UI 가 어디까지 동작하는지 직접 확인해야 합니다.",
      "이 사이트는 공격 자동화 도구가 아니라, 개발자와 보안 담당자가 본인 서비스의 렌더링 정책을 재현 가능한 시나리오로 점검하기 위한 체크리스트입니다.",
      "모든 스니펫은 복사해서 dev/staging 환경에 붙여 넣는 흐름을 기준으로 만들었습니다. HTML payload 가 실행되거나 iframe 시나리오가 동작하면 위험 신호이고, 차단되면 어떤 정책이 막았는지 기록하기 좋습니다.",
    ],
    threatsHeading: "XSS 위협 요약",
    threatsIntro:
      "Hacker101 CTF 의 XSS Playground 분류와 PortSwigger Web Security Academy 의 XSS 가이드를 기준으로, 이 프로젝트에서 테스트할 위험을 다음 축으로 정리했습니다.",
    threats: [
      {
        title: "반사형 XSS",
        body: "URL, 검색어, 오류 메시지처럼 현재 요청의 입력값이 즉시 응답 HTML 안에 안전하지 않게 반영될 때 발생합니다.",
      },
      {
        title: "저장형 XSS",
        body: "댓글, 프로필, 문서 본문 등 저장된 사용자 입력이 나중에 다른 사용자에게 실행 가능한 콘텐츠로 렌더링될 때 발생합니다.",
      },
      {
        title: "DOM 기반 XSS",
        body: "클라이언트 코드가 location, hash, postMessage 같은 신뢰할 수 없는 값을 읽어 innerHTML, eval, setTimeout 문자열 같은 sink 에 넣을 때 발생합니다.",
      },
      {
        title: "필터 / CSP 우회",
        body: "이벤트 핸들러, SVG/MathML, javascript: URL, 인코딩, 템플릿 문법처럼 약한 블랙리스트나 불완전한 CSP 를 우회하는 벡터를 확인해야 합니다.",
      },
      {
        title: "계정 권한 악용",
        body: "XSS 가 실행되면 사용자의 권한으로 요청을 보내거나 화면을 조작하고, 접근 가능한 데이터와 세션 상태를 악용할 수 있습니다.",
      },
      {
        title: "피싱 / 정보 유출",
        body: "iframe, 오버레이, 알림, 클립보드, postMessage 를 이용해 자격증명을 속여 입력받거나 관찰 가능한 정보를 외부로 보낼 수 있습니다.",
      },
    ],
    sanitizationHeading: "Sanitize 실무 가이드",
    sanitizationIntro:
      "HTML 을 사용자 기능으로 허용해야 한다면 단순 문자열 replace 나 블랙리스트가 아니라, 출력 컨텍스트별 인코딩과 검증된 sanitizer 정책을 함께 설계해야 합니다.",
    sanitizationCards: [
      {
        title: "DOMPurify",
        body: "DOMPurify 는 HTML, SVG, MathML 에서 실행 가능한 위험 요소를 제거하는 대표적인 sanitizer 입니다. React 의 dangerouslySetInnerHTML, Markdown/MDX 렌더러, rich text 출력처럼 HTML 을 의도적으로 넣는 지점에만 사용하세요.",
      },
      {
        title: "Node.js / SSR",
        body: "서버에서 sanitize 하려면 DOMPurify 에 DOM 구현이 필요합니다. Node 환경에서는 최신 jsdom 조합을 쓰고, 클라이언트와 서버의 allowlist 가 달라지지 않도록 정책을 공유해 테스트하세요.",
      },
      {
        title: "정책 문서화",
        body: "허용 태그, 속성, URL protocol/host, iframe sandbox, CSP 를 기능 단위로 기록해야 합니다. sanitize 후 다른 렌더러가 HTML 을 다시 변형하면 방어 효과가 깨질 수 있습니다.",
      },
    ],
    sanitizationLinksHeading: "DOMPurify / sanitize 자료",
    sanitizationLinks: [
      {
        label: "DOMPurify GitHub",
        href: "https://github.com/cure53/DOMPurify",
      },
      {
        label: "DOMPurify npm",
        href: "https://www.npmjs.com/package/dompurify",
      },
      {
        label: "DOMPurify on Node.js",
        href: "https://github.com/cure53/DOMPurify?tab=readme-ov-file#running-dompurify-on-the-server",
      },
      {
        label: "OWASP HTML Sanitization",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#html-sanitization",
      },
    ],
    referencesHeading: "참고 자료",
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
    scenariosHeading: "시나리오",
    scenariosIntro:
      "카테고리별로 정리된 공격 시나리오입니다. 카드의 HTML payload 또는 임베드 코드를 바로 복사하거나 상세 페이지에서 더 자세히 테스트하세요.",
    howToUseHeading: "사용 방법",
    howToUseSteps: [
      "원하는 시나리오 페이지를 엽니다.",
      "홈 카드 또는 상세 페이지에서 HTML payload 나 iframe 코드를 복사합니다.",
      "본인 서비스(에디터, 노트, 위키 등)에 그 스니펫을 붙여 넣고 저장합니다.",
      "렌더링 허용 여부, sandbox 정책, CSP, postMessage 검증, 실제 브라우저 동작을 확인합니다.",
    ],
    warningTitle: "주의",
    warningBody:
      "본인이 권한을 가진 서비스에 대해서만 테스트하세요. 타인의 서비스를 대상으로 시도하면 부정접근 또는 정보통신망법 위반에 해당할 수 있습니다.",
    contributingHeading: "기여하기 (Issues / PR)",
    contributingBody: [
      "이 프로젝트는 source-available 라이선스로 운영합니다. 코드는 공개되어 있지만, fork 후 별도 배포·재배포·상업적 이용은 허용되지 않습니다.",
      "아이디어·버그·번역 개선·새 시나리오 제안은 환영합니다. Issue 로 먼저 논의한 뒤, 승인된 변경은 collaborator 로 추가받아 본 레포에 직접 브랜치를 올려 PR 을 보내는 흐름을 권장합니다.",
      "라이선스와 contribution 정책 전문은 LICENSE 와 CONTRIBUTING.md 를 참고해 주세요.",
    ],
    contributingLinks: [
      {
        label: "Issue 등록",
        href: "https://github.com/Kimsangmook/xss-playground/issues/new/choose",
      },
      {
        label: "Pull Request 보기",
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
    sandboxMatrix: "sandbox 정책별 동작",
    policy: "정책",
    expectedResult: "예상 결과",
    noSandbox: "sandbox 미부착",
    scriptsOnly: 'sandbox="allow-scripts"',
    fullSandbox: 'sandbox="" (가장 엄격)',
    sopBlocks:
      "이 시나리오는 sandbox 와 별개로 Same-Origin Policy 가 직접 차단합니다.",
    works: "동작함",
    blocked: "차단됨",
    partial: "부분 동작",
    actions: "실행",
    explanation: "해설",
    embedSnippet: "임베드 스니펫",
    embedSnippetDescription:
      "이 코드는 임베드 전용 페이지를 사용합니다. 본인 서비스에 그대로 붙여 넣고 렌더링/차단 여부를 확인하세요.",
    embeddedBadge: "EMBEDDED",
    htmlSurfaceTitle: "HTML payload 테스트",
    domSurfaceTitle: "DOM sink 테스트",
    surfaceDescription:
      "이 시나리오는 iframe sandbox 가 아니라 사용자 입력이 HTML/DOM 으로 렌더링되는 지점을 검증합니다.",
    sandboxPresetLabels: [
      "sandbox 없음 (기본 동작)",
      'sandbox="" (가장 엄격)',
      'sandbox="allow-scripts"',
      'sandbox="allow-scripts allow-same-origin"',
      'sandbox="allow-scripts allow-top-navigation"',
      'sandbox="allow-scripts allow-forms allow-popups"',
    ],
    copySnippet: "스니펫 복사",
    copied: "복사됨!",
  },
  scenarios: {
    "script-tag-injection": {
      title: "script 태그 삽입",
      summary:
        "사용자 입력이 HTML 문서로 그대로 파싱될 때 script 태그가 실행 가능한지 확인.",
    },
    "event-handler-attribute": {
      title: "이벤트 핸들러 속성 삽입",
      summary:
        "img onerror, details ontoggle 같은 on* 속성이 살아남아 실행되는지 확인.",
    },
    "javascript-url": {
      title: "javascript: URL 프로토콜",
      summary:
        "href, action 같은 URL 속성에 javascript: 프로토콜이 남아 실행되는지 확인.",
    },
    "svg-onload": {
      title: "SVG / MathML onload payload",
      summary: "SVG, MathML namespace 와 이벤트 속성이 필터를 우회하는지 확인.",
    },
    "dom-innerhtml-sink": {
      title: "DOM innerHTML sink",
      summary:
        "location, hash, postMessage 값이 innerHTML 같은 unsafe sink 로 들어가는지 확인.",
    },
    "top-redirect": {
      title: "top.location 강제 리다이렉트",
      summary:
        "iframe 안에서 부모 창 전체를 다른 URL로 보내버린다. sandbox allow-top-navigation 유무로 차이를 확인할 수 있는 대표 시나리오.",
      body: {
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
          tryMetaLog:
            '시도: meta http-equiv="refresh" 삽입 (자기 origin 내에서만 동작)',
          metaInserted: "meta refresh 삽입 완료",
          autoScheduled: "{n}초 뒤 자동 리다이렉트 예약",
        },
        explanation: [
          "same-origin frame 은 <code>window.top.location</code> 으로 최상위 페이지를 바꿀 수 있고, cross-origin frame 은 최신 브라우저에서 사용자 상호작용이 있을 때만 허용되는 편입니다. SOP 가 읽기는 막지만 이 navigation surface 를 완전히 대신 막아주지는 않습니다.",
          '차단하려면 sandbox 에 <code>allow-top-navigation</code> 을 주지 않으면 됩니다. <code>sandbox="allow-scripts"</code> 만 줘도 차단됩니다.',
          "실제 공격 가치는 매우 큽니다. 사용자가 신뢰하는 서비스 안에서 무언가 클릭한 직후 페이지가 통째로 피싱 사이트로 갈아치워지는 시나리오가 만들어집니다.",
        ],
      },
    },
    "post-message": {
      title: "postMessage 스푸핑",
      summary:
        "parent.postMessage 로 부모 페이지에 메시지를 보낸다. 부모가 event.origin 검증을 안 하면 위조된 메시지를 신뢰할 수 있다.",
      body: {
        actionLabels: {
          presetString: "단순 string",
          presetAuth: "auth 류 객체",
          presetRouter: "router 류 객체",
          presetResize: "iframe-resize 류 객체",
          presetScript: "스크립트 문자열 (eval-trap 탐색용)",
          clearLog: "로그 초기화",
        },
        logMessages: {
          sending: 'parent.postMessage({data}, "{target}")',
          sent: "전송 완료",
          sendFailed: "전송 실패: {message}",
        },
        text: {
          targetOriginLabel: "target origin",
          targetPlaceholder: '"*" 또는 정확한 origin',
        },
        explanation: [
          "postMessage 는 cross-origin 통신용으로 의도된 API 입니다. SOP 가 막아 주지 않습니다. <strong>부모 쪽에서 origin 검증</strong>을 제대로 해야 합니다.",
          "부모 페이지가 <code>iframe-resizer</code>, 결제 위젯, 유튜브 IFrame API 등을 위해 message 리스너를 두고 있다면, 그 리스너의 메시지 포맷을 흉내내서 보내는 게 흔한 공격 패턴입니다.",
          '차단 방법: 부모 쪽 <code>event.origin</code> 정확히 검증 + 메시지 타입 / 스키마 검증. sandbox 에서는 <code>sandbox=""</code> (빈 값) 여야 postMessage 까지 막힙니다.',
        ],
      },
    },
    "phishing-form": {
      title: "가짜 로그인 폼 (피싱)",
      summary:
        "iframe 안에 부모 사이트와 똑같이 생긴 로그인 폼을 보여주고 입력값을 외부로 빼낸다.",
      body: {
        actionLabels: {
          submit: "로그인",
          clearLog: "로그 초기화",
        },
        logMessages: {
          captured: "수집된 자격증명: email={email} password={password}",
          notice:
            "실제 공격에서는 이 값을 fetch / sendBeacon 으로 attacker 서버에 전송. (이 PoC 에서는 전송하지 않음)",
        },
        text: {
          callout:
            "실제 공격 시 이 iframe 은 부모 페이지 안에서 마치 서비스의 모달/로그인 영역처럼 보이도록 위치됩니다. 사용자는 도메인이 attacker.example 인 것을 알기 어렵습니다. (아래 풀스크린 오버레이 시나리오와 결합되면 더 위험.)",
          formHeading: "가짜 로그인 폼 (자기 origin 안에서 자유롭게 그려짐)",
          emailLabel: "이메일",
          passwordLabel: "비밀번호",
          logsHeading: "수집 로그",
          emailPlaceholder: "you@example.com",
        },
        explanation: [
          "iframe 안의 폼은 자기 origin 의 페이지이므로 어떤 UI 도 자유롭게 그릴 수 있고, 입력값을 자기 서버로 보낼 수 있습니다. SOP 와 무관합니다.",
          '<code>sandbox="allow-scripts"</code> 만 줘도 form submit 자체는 막을 수 있지만, JS 로 값을 수집해 fetch 로 보내는 건 여전히 가능합니다. <code>sandbox=""</code> (빈 값) 이라야 JS 도 막힙니다.',
          "가장 확실한 대응은 iframe 의 host 를 allowlist 로 제한하는 것입니다. 유튜브/비메오 같은 신뢰 호스트만 통과시키면 이 시나리오 자체가 성립하지 않습니다.",
        ],
      },
    },
    "auto-download": {
      title: "자동 다운로드 트리거",
      summary: "사용자 클릭 없이 파일 다운로드를 강제로 시작한다.",
    },
    "popup-spam": {
      title: "popup / window.open 스팸",
      summary:
        "window.open 으로 새 창을 띄운다. 자기 origin 으로 띄우면 다양한 피싱 UI 가 가능.",
    },
    "autoplay-media": {
      title: "자동재생 미디어 / 자동 풀스크린",
      summary: "소리 있는 비디오 자동재생, requestFullscreen 풀스크린 시도.",
    },
    "notification-permission": {
      title: "알림 권한 요청 / 푸시 hijack",
      summary:
        "Notification.requestPermission 으로 권한 프롬프트를 시도한다. 최신 브라우저는 cross-origin iframe 요청을 대부분 막지만, 허용되면 공격자 origin 에서 피싱 알림이 가능하다.",
    },
    "clipboard-hijack": {
      title: "클립보드 hijack",
      summary: "copy 이벤트를 가로채 클립보드 내용을 덮어쓴다.",
    },
    "fullscreen-overlay": {
      title: "풀스크린 오버레이 위장",
      summary: "iframe 안에 풀스크린 가짜 UI 를 띄워 사용자 기만.",
      body: {
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
            "실제 공격에서는 iframe 자체를 부모 페이지의 CSS 로 화면 전체를 덮는 position:fixed; top:0; width:100%; height:100% 으로 배치합니다. iframe 자기 origin 안에서는 그 안에 어떤 UI 든 자유롭게 그릴 수 있어서, 실제 서비스와 똑같이 생긴 가짜 페이지로 사용자를 속일 수 있습니다.",
          overlayTitle: "Example Workspace — 본인 인증이 필요합니다",
          overlayBody:
            "서비스 정책 변경에 따라 다시 로그인해 주세요. (이건 가짜 화면입니다)",
          emailLabel: "이메일",
          passwordLabel: "비밀번호",
        },
        explanation: [
          "iframe 자체 영역을 부모 CSS 가 어떻게 배치할지는 부모 책임입니다. 서비스가 임의 iframe 을 100% 너비/높이로 그리고 있다면 그 자체로 시각적 위장이 가능합니다.",
          "진짜 풀스크린 API 는 사용자 제스처 필요. 하지만 z-index:99999 의 일반 DOM 오버레이는 사용자 제스처 없이도 즉시 가능합니다.",
        ],
      },
    },
    "history-pollution": {
      title: "history.pushState 오염",
      summary: "history 를 마구 쌓아 부모 뒤로가기 동작을 망가뜨림.",
    },
    "sop-probe": {
      title: "Same-Origin Policy 프로브 (실패 확인용)",
      summary:
        "parent.document, parent.localStorage 등 SOP 가 막아주는 영역을 직접 확인.",
    },
    "form-auto-submit": {
      title: "숨겨진 form 자동 submit (CSRF-like)",
      summary: "사용자 모르게 외부 도메인으로 form 을 submit.",
    },
    "beacon-exfil": {
      title: "navigator.sendBeacon / fetch exfiltration",
      summary: "iframe 자기 origin 안에서 수집한 정보를 attacker 서버로 송신.",
    },
    "csrf-image": {
      title: "img 태그 GET 요청 CSRF",
      summary: "img.src 로 외부 도메인 GET 요청 발사. 가장 오래된 CSRF.",
    },
    "token-exfil": {
      title: "부모 토큰 / 네트워크 탈취 시도",
      summary:
        "JWT, 진행 중 네트워크, storage 등 부모 데이터를 빼낼 수 있는지 여러 각도로 시도.",
    },
    "parent-message-listener-probe": {
      title: "부모 message 리스너 fingerprinting",
      summary: "다양한 페이로드를 부모에게 던지고 응답 / 사이드 이펙트 관찰.",
    },
    "delayed-attack": {
      title: "지연 / 자동 실행 페이로드",
      summary:
        "URL 파라미터로 N초 카운트다운 후 자동 액션. 사용자 신뢰 회피용.",
    },
    "chained-attack": {
      title: "체인 공격 (피싱 + 풀스크린 + redirect)",
      summary:
        "풀스크린 가짜 UI → 자격증명 캡처 → 진짜 사이트로 redirect 의심 회피.",
      body: {
        actionLabels: {
          start: "체인 공격 시작",
          reset: "리셋",
          login: "로그인",
        },
        logMessages: {
          step1: "[1/3] 풀스크린 가짜 서비스 UI 표시",
          step2: "[2/3] 자격증명 캡쳐: email={email} password={password}",
          step2Notice:
            "실제 공격에서는 fetch/sendBeacon 으로 attacker 서버에 전송",
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
          "iframe 임베드 후 즉시 풀스크린 오버레이로 서비스 UI 위장 (사용자는 여전히 신뢰하는 사이트라고 인지).",
          "자격증명 입력 → 자기 origin 으로 전송 → attacker 서버 도착.",
          '전송 직후 top redirect 로 원래 페이지로 보내서 의심 회피. 사용자 입장에서는 "로그인 한 번 했네" 정도로 끝남.',
          "각 단계가 모두 cross-origin iframe 에서 합법적으로 동작하는 API 들로만 구성됨. SOP 가 막아주지 않는 영역만 사용.",
          "1단계만 막아도 체인이 끊김 → host allowlist 또는 sandbox 의 적절한 조합으로 1단계(임의 호스트 iframe 임베드)를 막는 게 가장 효과적.",
        ],
      },
    },
  },
  categories: {
    html: "HTML 삽입",
    dom: "DOM XSS",
    protocol: "URL / 프로토콜",
    context: "컨텍스트 탈출",
    file: "파일 업로드",
    content: "사용자 콘텐츠",
    navigation: "내비게이션",
    communication: "통신",
    exfil: "탈취",
    phishing: "피싱",
    delayed: "지연 / 연속",
    annoyance: "방해",
    probe: "탐색",
  },
};
