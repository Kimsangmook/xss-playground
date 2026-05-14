import type { IDictionary } from "./types";

export const ko: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "iframe / sanitize 공격 시나리오 모음",
    description:
      "DOMPurify 같은 HTML sanitize 가 iframe 임베드를 어디까지 허용하는지 검증하기 위한 PoC 시나리오 모음. 개발자가 본인 서비스 보안 테스트 시 활용할 수 있는 오픈 플레이그라운드입니다.",
  },
  nav: {
    home: "홈",
    embedHelper: "임베드 헬퍼",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "프론트엔드 개발자 김상묵입니다. 회사 서비스에 iframe sanitize 정책을 적용하다가, 화이트리스트 없는 iframe 허용이 실제로 어떤 공격면을 만드는지 직접 검증하고 싶어 이 사이트를 만들었습니다.",
      "각 시나리오는 부모 사이트에서 임베드된 iframe 안에서 일어나는 실제 동작을 재현합니다. 본인이 권한을 가진 서비스의 sanitize 정책을 검증할 때, sandbox 키워드의 효과를 확인할 때, 또는 보안 교육 자료로 활용할 때 도움이 되길 바랍니다.",
      "이 페이지는 XSS / iframe 보안을 공부하거나 본인 서비스를 테스트하는 모두에게 열려 있는 사이드 프로젝트입니다.",
    ],
    contact: "문의",
    scenariosHeading: "시나리오",
    scenariosIntro:
      "카테고리별로 정리된 공격 시나리오. 각 페이지에서 임베드 스니펫을 복사해 본인 서비스에서 sanitize 결과를 검증하세요.",
    howToUseHeading: "사용 방법",
    howToUseSteps: [
      "원하는 시나리오 페이지를 엽니다.",
      "임베드 스니펫 카드에서 sandbox 프리셋을 고르고 iframe 코드를 복사합니다.",
      "본인 서비스(에디터, 노트, 위키 등)에 그 스니펫을 붙여 넣고 저장합니다.",
      "렌더링된 페이지에서 sanitize 결과와 실제 동작을 확인합니다.",
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
    navigation: "내비게이션",
    communication: "통신",
    exfil: "탈취",
    phishing: "피싱",
    delayed: "지연 / 연속",
    annoyance: "방해",
    probe: "탐색",
  },
};
