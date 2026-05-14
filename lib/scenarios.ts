export interface IScenario {
  slug: string;
  title: string;
  summary: string;
  /** sandbox 미부착 상황에서 동작하는가 */
  noSandbox: "works" | "blocked" | "partial";
  /** sandbox="allow-scripts" 만 부착했을 때 */
  scriptsOnly: "works" | "blocked" | "partial";
  /** sandbox="" (빈 값, 가장 엄격) */
  fullSandbox: "works" | "blocked" | "partial";
  /** SOP 가 직접 막아주는 시나리오인가 */
  sopBlocks: boolean;
  category: "navigation" | "communication" | "phishing" | "annoyance" | "probe";
}

export const SCENARIOS: IScenario[] = [
  {
    slug: "top-redirect",
    title: "top.location 강제 리다이렉트",
    summary:
      "iframe 안에서 부모 창 전체를 다른 URL로 보내버린다. sandbox allow-top-navigation 유무로 차이를 확인할 수 있는 대표 시나리오.",
    noSandbox: "works",
    scriptsOnly: "blocked",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "navigation",
  },
  {
    slug: "post-message",
    title: "postMessage 스푸핑",
    summary:
      "parent.postMessage 로 부모 페이지에 메시지를 보낸다. 부모가 event.origin 검증을 안 하면 위조된 메시지를 신뢰할 수 있다.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "communication",
  },
  {
    slug: "phishing-form",
    title: "가짜 로그인 폼 (피싱)",
    summary:
      "iframe 안에 부모 사이트와 똑같이 생긴 로그인 폼을 보여주고 입력값을 외부로 빼낸다. 입력값은 자기 origin 으로 가니까 SOP 와 무관하게 동작한다.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "partial",
    sopBlocks: false,
    category: "phishing",
  },
  {
    slug: "auto-download",
    title: "자동 다운로드 트리거",
    summary:
      "사용자 클릭 없이 파일 다운로드를 강제로 시작한다. download 속성 + 가짜 클릭, 또는 Blob URL 이용.",
    noSandbox: "works",
    scriptsOnly: "blocked",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "annoyance",
  },
  {
    slug: "popup-spam",
    title: "popup / window.open 스팸",
    summary:
      "window.open 으로 새 창을 띄운다. 자기 origin 으로 띄우면 다양한 피싱 UI 를 보일 수 있고, 부모와는 opener 관계로 연결된다.",
    noSandbox: "works",
    scriptsOnly: "blocked",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "annoyance",
  },
  {
    slug: "autoplay-media",
    title: "자동재생 미디어 / 자동 풀스크린",
    summary:
      "소리 있는 비디오를 자동재생하거나, requestFullscreen 으로 풀스크린을 점유한다. 풀스크린은 사용자 제스처가 필요하지만 일부 우회 패턴이 알려져 있다.",
    noSandbox: "partial",
    scriptsOnly: "partial",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "annoyance",
  },
  {
    slug: "notification-permission",
    title: "알림 권한 요청 / 푸시 hijack",
    summary:
      "Notification.requestPermission 으로 권한 프롬프트를 띄운다. 사용자가 허용하면 attacker.com 도메인에서 푸시를 보낼 수 있게 된다.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "annoyance",
  },
  {
    slug: "clipboard-hijack",
    title: "클립보드 hijack",
    summary:
      "사용자가 iframe 영역에서 무언가를 복사할 때 clipboard 이벤트를 가로채 다른 내용을 덮어쓴다.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "annoyance",
  },
  {
    slug: "fullscreen-overlay",
    title: "풀스크린 오버레이 위장",
    summary:
      "iframe 을 CSS 로 화면 전체를 덮게 만든 다음 부모 사이트와 똑같은 UI를 띄워 사용자를 속인다. iframe 자체는 자기 origin 에서 자유롭게 그릴 수 있다.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "partial",
    sopBlocks: false,
    category: "phishing",
  },
  {
    slug: "history-pollution",
    title: "history.pushState 오염",
    summary:
      "history.pushState / replaceState 로 자기 origin URL 을 마구 쌓아 부모의 뒤로가기 동작을 망가뜨린다. 자기 origin 안에서만 동작.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "annoyance",
  },
  {
    slug: "sop-probe",
    title: "Same-Origin Policy 프로브 (실패 확인용)",
    summary:
      "parent.document, parent.localStorage, 부모 쿠키 등을 시도해서 어떻게 차단되는지 보여준다. '안 되는 것' 을 직접 확인하는 페이지.",
    noSandbox: "blocked",
    scriptsOnly: "blocked",
    fullSandbox: "blocked",
    sopBlocks: true,
    category: "probe",
  },
  {
    slug: "form-auto-submit",
    title: "숨겨진 form 자동 submit (CSRF-like)",
    summary:
      "사용자 모르게 외부 도메인으로 form 을 submit 한다. cookie 가 자동 첨부되는 사이트라면 CSRF 가 된다. sandbox 의 allow-forms 로 제어 가능.",
    noSandbox: "works",
    scriptsOnly: "partial",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "communication",
  },
  {
    slug: "beacon-exfil",
    title: "navigator.sendBeacon / fetch exfiltration",
    summary:
      "iframe 자기 origin 안에서 수집한 정보(클릭 좌표, 키 입력, document.referrer 등)를 attacker 서버로 보낸다.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "communication",
  },
  {
    slug: "csrf-image",
    title: "img 태그 GET 요청 CSRF",
    summary:
      "img.src 에 외부 도메인의 상태변경 GET 엔드포인트를 넣어 쿠키와 함께 요청을 보낸다. 가장 오래된 CSRF 패턴.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "works",
    sopBlocks: false,
    category: "communication",
  },
  {
    slug: "parent-message-listener-probe",
    title: "부모의 message 리스너 fingerprinting",
    summary:
      "다양한 형태의 postMessage 페이로드를 부모에게 던지고, 부모에서 어떤 응답이 돌아오는지(또는 사이드 이펙트가 있는지) 관찰한다. 알렌 리스너 구조 탐색용.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "probe",
  },
];

export const findScenario = (slug: string) =>
  SCENARIOS.find((s) => s.slug === slug);

export const CATEGORY_LABEL: Record<IScenario["category"], string> = {
  navigation: "Navigation",
  communication: "Communication",
  phishing: "Phishing",
  annoyance: "Annoyance",
  probe: "Probe",
};
