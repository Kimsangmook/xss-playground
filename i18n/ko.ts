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
    embedHelper: "임베드 헬퍼",
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
      summary:
        "SVG, MathML namespace 와 이벤트 속성이 필터를 우회하는지 확인.",
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
    },
    "post-message": {
      title: "postMessage 스푸핑",
      summary:
        "parent.postMessage 로 부모 페이지에 메시지를 보낸다. 부모가 event.origin 검증을 안 하면 위조된 메시지를 신뢰할 수 있다.",
    },
    "phishing-form": {
      title: "가짜 로그인 폼 (피싱)",
      summary:
        "iframe 안에 부모 사이트와 똑같이 생긴 로그인 폼을 보여주고 입력값을 외부로 빼낸다.",
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
        "Notification.requestPermission 으로 권한 프롬프트. 허용되면 attacker 도메인이 푸시 발송 가능.",
    },
    "clipboard-hijack": {
      title: "클립보드 hijack",
      summary: "copy 이벤트를 가로채 클립보드 내용을 덮어쓴다.",
    },
    "fullscreen-overlay": {
      title: "풀스크린 오버레이 위장",
      summary: "iframe 안에 풀스크린 가짜 UI 를 띄워 사용자 기만.",
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
      summary:
        "iframe 자기 origin 안에서 수집한 정보를 attacker 서버로 송신.",
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
      summary:
        "다양한 페이로드를 부모에게 던지고 응답 / 사이드 이펙트 관찰.",
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
    },
  },
  categories: {
    html: "HTML 삽입",
    dom: "DOM XSS",
    protocol: "URL / 프로토콜",
    navigation: "내비게이션",
    communication: "통신",
    exfil: "탈취",
    phishing: "피싱",
    delayed: "지연 / 연속",
    annoyance: "방해",
    probe: "탐색",
  },
};
