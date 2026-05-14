export interface IScenario {
  slug: string;
  title: string;
  summary: string;
  /** 시나리오가 검증하는 주요 표면 */
  surface?: "iframe" | "html" | "dom";
  /** iframe 이 아닌 HTML/DOM 시나리오에서 복사할 예시 payload */
  payloads?: IPayloadExample[];
  /** iframe 이 아닌 HTML/DOM 시나리오의 점검 포인트 */
  checks?: string[];
  /** sandbox 미부착 상황에서 동작하는가 */
  noSandbox: "works" | "blocked" | "partial";
  /** sandbox="allow-scripts" 만 부착했을 때 */
  scriptsOnly: "works" | "blocked" | "partial";
  /** sandbox="" (빈 값, 가장 엄격) */
  fullSandbox: "works" | "blocked" | "partial";
  /** SOP 가 직접 막아주는 시나리오인가 */
  sopBlocks: boolean;
  category:
    | "navigation"
    | "communication"
    | "phishing"
    | "annoyance"
    | "probe"
    | "exfil"
    | "delayed"
    | "html"
    | "dom"
    | "protocol";
}

export interface IPayloadExample {
  label: string;
  value: string;
  note?: string;
}

export const SCENARIOS: IScenario[] = [
  {
    slug: "script-tag-injection",
    title: "script 태그 삽입",
    summary:
      "사용자 입력이 HTML 문서로 그대로 파싱될 때 <script> 태그가 실행 가능한지 확인한다. 출력 인코딩, 태그 제거, CSP script-src 의 기본 검증 시나리오.",
    surface: "html",
    payloads: [
      {
        label: "inline script alert",
        value: '<script>alert("xss-playground")</script>',
        note: "서버가 입력을 그대로 HTML 문서에 반영하는지 확인하는 가장 기본적인 payload.",
      },
      {
        label: "script side effect",
        value:
          '<script>document.body.dataset.xssPlayground="script-fired"</script>',
        note: "alert 없이 DOM 변경으로 실행 여부를 확인할 때 사용.",
      },
    ],
    checks: [
      "입력값이 텍스트로 이스케이프되는지, 실제 script 태그로 파싱되는지 확인",
      "HTML 필터가 script 태그와 위험 속성을 제거하는지 확인",
      "CSP script-src 가 inline script 실행을 막는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "html",
  },
  {
    slug: "event-handler-attribute",
    title: "이벤트 핸들러 속성 삽입",
    summary:
      "img onerror, details ontoggle 같은 이벤트 핸들러 속성이 HTML 렌더링 과정에서 살아남아 실행되는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "img onerror",
        value: '<img src=x onerror="alert(\'xss-playground\')">',
        note: "이미지 로드 실패 이벤트를 이용하는 대표적인 HTML attribute XSS.",
      },
      {
        label: "details ontoggle",
        value:
          '<details open ontoggle="alert(\'xss-playground\')"><summary>open</summary></details>',
        note: "script 태그를 막아도 이벤트 속성이 남으면 실행될 수 있다.",
      },
    ],
    checks: [
      "onerror, onclick, onload 등 on* 속성이 제거되는지 확인",
      "태그 allowlist 는 있어도 속성 allowlist 가 느슨하지 않은지 확인",
      "CSP 가 inline event handler 를 차단하는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "html",
  },
  {
    slug: "javascript-url",
    title: "javascript: URL 프로토콜",
    summary:
      "a href, form action 같은 URL 속성에 javascript: 프로토콜이 남아 클릭 또는 submit 시 실행되는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "anchor href javascript",
        value:
          '<a href="javascript:alert(\'xss-playground\')">click me</a>',
        note: "사용자 클릭 후 실행되는 URL 프로토콜 기반 XSS.",
      },
      {
        label: "form action javascript",
        value:
          '<form action="javascript:alert(\'xss-playground\')"><button>submit</button></form>',
        note: "href 뿐 아니라 action 같은 URL 속성도 함께 검증.",
      },
    ],
    checks: [
      "href/action/src 같은 URL 속성에서 javascript: 가 제거되는지 확인",
      "대소문자, 공백, entity encoding 을 정규화한 뒤 검증하는지 확인",
      "사용자 클릭이 필요한 지연 실행 payload 도 차단되는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "protocol",
  },
  {
    slug: "svg-onload",
    title: "SVG / MathML onload payload",
    summary:
      "SVG, MathML 같은 비 HTML 네임스페이스 태그의 이벤트 속성과 중첩 HTML 이 필터를 우회하는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "svg onload",
        value:
          '<svg onload="alert(\'xss-playground\')" xmlns="http://www.w3.org/2000/svg"></svg>',
        note: "script 태그 없이 onload 이벤트만으로 실행되는 대표적인 SVG payload.",
      },
      {
        label: "math annotation-xml",
        value:
          '<math><annotation-xml encoding="text/html"><svg onload="alert(\'xss-playground\')"></svg></annotation-xml></math>',
        note: "HTML parser 경계와 namespace 처리가 느슨한 필터를 확인할 때 사용.",
      },
    ],
    checks: [
      "svg/math 태그를 허용할 필요가 있는지 확인",
      "namespace 안의 이벤트 속성과 중첩 HTML 이 제거되는지 확인",
      "태그 이름만 보는 블랙리스트가 아닌 구조적 HTML 필터를 쓰는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "html",
  },
  {
    slug: "dom-innerhtml-sink",
    title: "DOM innerHTML sink",
    summary:
      "location, hash, postMessage 등에서 온 문자열을 innerHTML 같은 unsafe sink 에 넣을 때 DOM 기반 XSS 가 발생하는지 확인한다.",
    surface: "dom",
    payloads: [
      {
        label: "img onerror DOM sink",
        value: '<img src=x onerror="alert(\'dom-xss\')">',
        note: "innerHTML 에 들어갔을 때 이벤트 핸들러가 실행되는지 확인.",
      },
      {
        label: "autofocus onfocus",
        value:
          '<input autofocus onfocus="alert(\'dom-xss\')" value="focus payload">',
        note: "자동 focus 이벤트 기반 DOM XSS 확인.",
      },
    ],
    checks: [
      "untrusted source 가 innerHTML, outerHTML, insertAdjacentHTML 로 들어가는지 확인",
      "textContent / DOM API 기반 렌더링으로 대체 가능한지 확인",
      "클라이언트 라우터, hash, postMessage payload 를 sink 에 넣기 전 검증하는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "dom",
  },
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
    slug: "token-exfil",
    title: "부모 토큰 / 네트워크 탈취 시도",
    summary:
      "부모 페이지의 JWT, storage, 진행 중 네트워크 요청을 iframe 에서 빼낼 수 있는지 여러 각도로 시도한다. SOP 가 무엇을 막고 무엇이 통과하는지 확인한다.",
    noSandbox: "partial",
    scriptsOnly: "partial",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "exfil",
  },
  {
    slug: "parent-message-listener-probe",
    title: "부모의 message 리스너 fingerprinting",
    summary:
      "다양한 형태의 postMessage 페이로드를 부모에게 던지고, 부모에서 어떤 응답이 돌아오는지 또는 사이드 이펙트가 있는지 관찰한다.",
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "probe",
  },
  {
    slug: "delayed-attack",
    title: "지연 / 자동 실행 페이로드",
    summary:
      "URL 파라미터(?action=&delay=)로 N초 뒤 자동 액션. 카운트다운 후 top-redirect, postMessage, form submit 등을 자동 발사. 사용자가 잠시 노트를 본 직후 발사하는 시나리오 재현용.",
    noSandbox: "works",
    scriptsOnly: "partial",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "delayed",
  },
  {
    slug: "chained-attack",
    title: "체인 공격 (피싱 + 풀스크린 + redirect)",
    summary:
      "여러 시나리오를 묶은 실전 공격 흐름. iframe 임베드 후 (1) 풀스크린 가짜 로그인 UI 띄우기 → (2) 비밀번호 수집 → (3) 원래 페이지로 redirect 해 의심 회피.",
    noSandbox: "works",
    scriptsOnly: "partial",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "delayed",
  },
];

export const findScenario = (slug: string) =>
  SCENARIOS.find((s) => s.slug === slug);

export const CATEGORY_LABEL: Record<IScenario["category"], string> = {
  html: "HTML Injection",
  dom: "DOM XSS",
  protocol: "URL / Protocol",
  navigation: "Navigation",
  communication: "Communication",
  exfil: "Exfiltration",
  phishing: "Phishing",
  delayed: "Delayed / Chained",
  annoyance: "Annoyance",
  probe: "Probe",
};

export const ALL_CATEGORIES: IScenario["category"][] = [
  "html",
  "dom",
  "protocol",
  "navigation",
  "communication",
  "exfil",
  "phishing",
  "delayed",
  "annoyance",
  "probe",
];
