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
    | "protocol"
    | "context"
    | "file"
    | "content";
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
        value: "<img src=x onerror=\"alert('xss-playground')\">",
        note: "이미지 로드 실패 이벤트를 이용하는 대표적인 HTML attribute XSS.",
      },
      {
        label: "details ontoggle",
        value:
          "<details open ontoggle=\"alert('xss-playground')\"><summary>open</summary></details>",
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
        value: "<a href=\"javascript:alert('xss-playground')\">click me</a>",
        note: "사용자 클릭 후 실행되는 URL 프로토콜 기반 XSS.",
      },
      {
        label: "form action javascript",
        value:
          "<form action=\"javascript:alert('xss-playground')\"><button>submit</button></form>",
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
        value: "<img src=x onerror=\"alert('dom-xss')\">",
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
    slug: "js-context-breakout",
    title: "JavaScript 문자열 컨텍스트 탈출",
    summary:
      "사용자 입력이 script 블록 안의 문자열, JSON 초기 상태, inline 이벤트 코드에 들어갈 때 따옴표와 script 종료 토큰으로 컨텍스트를 탈출하는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "quoted string breakout",
        value: '";alert("xss-playground");//',
        note: "값이 JavaScript 문자열 리터럴 안에 삽입되는 경우를 검증한다.",
      },
      {
        label: "script close breakout",
        value:
          "</script><img src=x onerror=\"alert('xss-playground')\"><script>",
        note: "</script> 종료 토큰이 JSON/script 초기 상태를 깨는지 확인한다.",
      },
    ],
    checks: [
      "사용자 입력을 script 블록에 직접 넣지 않는지 확인",
      "JSON.stringify / 안전한 JSON 직렬화가 </script> 같은 종료 토큰까지 처리하는지 확인",
      "HTML 인코딩만으로 JavaScript 문자열 컨텍스트를 보호하려 하지 않는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "context",
  },
  {
    slug: "css-context-injection",
    title: "CSS / style 컨텍스트 삽입",
    summary:
      "사용자 입력이 style 태그, style 속성, CSS URL 토큰으로 들어갈 때 parser 탈출이나 위험 URL 이 남는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "style tag breakout",
        value:
          "</style><img src=x onerror=\"alert('css-context-xss')\"><style>",
        note: "사용자 값이 style 태그 내부에 들어가는 경우 태그 탈출 여부를 확인한다.",
      },
      {
        label: "style url token",
        value:
          "<div style=\"background-image:url(javascript:alert('css-url-xss'))\">css url probe</div>",
        note: "현대 브라우저에서 대부분 차단되지만, sanitizer 가 CSS URL 스킴을 정규화하는지 확인할 수 있다.",
      },
    ],
    checks: [
      "사용자 입력을 style 태그 내부에 직접 삽입하지 않는지 확인",
      "style 속성을 허용한다면 CSS 프로퍼티와 url() 스킴을 allowlist 로 제한하는지 확인",
      "HTML sanitizer 가 CSS parser 경계까지 안전하게 처리하는지 확인",
    ],
    noSandbox: "partial",
    scriptsOnly: "partial",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "context",
  },
  {
    slug: "encoded-protocol-bypass",
    title: "인코딩된 javascript: 프로토콜 우회",
    summary:
      "HTML entity, 제어문자, 대소문자 변형으로 javascript: URL 검증을 우회할 수 있는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "HTML entity protocol",
        value:
          "<a href=\"jav&#x61;script:alert('xss-playground')\">encoded protocol</a>",
        note: "속성값을 디코딩한 뒤 프로토콜을 검증하는지 확인한다.",
      },
      {
        label: "newline protocol",
        value:
          "<a href=\"java&#x0A;script:alert('xss-playground')\">newline protocol</a>",
        note: "공백/제어문자 정규화 없이 문자열 prefix 만 검사하는 필터를 찾기 위한 payload.",
      },
    ],
    checks: [
      "URL 속성 검증 전에 entity decoding 과 제어문자 제거가 수행되는지 확인",
      "프로토콜 allowlist(http, https, mailto 등) 기반으로 검증하는지 확인",
      "렌더러와 sanitizer 가 서로 다른 정규화 규칙을 쓰지 않는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "protocol",
  },
  {
    slug: "data-url-wrapper",
    title: "data: URL wrapper",
    summary:
      "iframe, object, embed, link preview 같은 wrapper URL 속성에서 data:text/html 이 허용되어 별도 HTML 문서가 실행되는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "iframe data document",
        value:
          "<iframe src=\"data:text/html,<script>parent.postMessage({type:'DATA_URL_XSS'},'*')</script>\"></iframe>",
        note: "data: URL 로 생성된 하위 문서가 script 를 실행하고 부모와 통신할 수 있는지 확인한다.",
      },
      {
        label: "object data document",
        value:
          "<object data=\"data:text/html,<script>alert('data-url-xss')</script>\"></object>",
        note: "iframe 외 wrapper 태그에서도 data: URL 이 살아남는지 확인한다.",
      },
    ],
    checks: [
      "src/data/href 같은 URL 속성에서 data: 스킴을 기본 차단하는지 확인",
      "허용이 필요하다면 MIME type 을 이미지 등으로 좁히는지 확인",
      "wrapper 태그가 sandbox 없이 HTML 문서를 만들 수 있는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "protocol",
  },
  {
    slug: "markdown-link-xss",
    title: "Markdown 링크 XSS",
    summary:
      "Markdown/MDX/에디터 렌더러가 링크 URL, raw HTML, 이미지 URL 을 안전하게 정규화하고 sanitize 하는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "markdown source",
        value: "[click me](javascript:alert('markdown-xss'))",
        note: "Markdown 소스를 저장하는 에디터에 붙여 넣고 렌더러 결과의 href 를 확인한다.",
      },
      {
        label: "rendered anchor",
        value:
          "<a href=\"javascript:alert('markdown-xss')\">markdown-rendered link</a>",
        note: "Markdown 렌더러가 만든 최종 HTML 을 sanitizer 가 다시 검증하는지 확인한다.",
      },
    ],
    checks: [
      "Markdown 렌더링 후 최종 HTML 을 다시 sanitize 하는지 확인",
      "링크 URL 은 프로토콜 allowlist 로 검증하는지 확인",
      "raw HTML 허용 옵션이 켜져 있는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "content",
  },
  {
    slug: "file-upload-preview-xss",
    title: "파일 업로드 미리보기 XSS",
    summary:
      "SVG, XML, HTML 파일을 업로드 후 미리보기로 렌더링할 때 active content 가 실행되는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "SVG file body",
        value:
          '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(\'svg-file-xss\')"></svg>',
        note: "업로드된 SVG 를 img 로만 쓰는지, inline/object/embed 로 렌더링하는지 확인한다.",
      },
      {
        label: "HTML file body",
        value:
          '<!doctype html><meta charset="utf-8"><script>alert("html-upload-xss")</script>',
        note: "첨부파일 미리보기, 문서 변환, 관리자 검수 화면에서 HTML 이 실행되는지 확인한다.",
      },
    ],
    checks: [
      "업로드 파일을 같은 origin 에서 HTML 로 열지 않는지 확인",
      "SVG 는 이미지로만 제공하거나 별도 다운로드 도메인/첨부 헤더를 사용하는지 확인",
      "MIME sniffing 방지를 위해 Content-Type 과 X-Content-Type-Options 를 설정하는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "file",
  },
  {
    slug: "profile-rendering-xss",
    title: "프로필 닉네임 / 아이콘 렌더링 XSS",
    summary:
      "닉네임, 상태 메시지, 아이콘 URL 처럼 사소해 보이는 프로필 필드가 속성/HTML 컨텍스트에서 실행 가능한 코드가 되는지 확인한다.",
    surface: "html",
    payloads: [
      {
        label: "nickname attribute breakout",
        value: '" autofocus onfocus="alert(\'nickname-xss\')" x="',
        note: "닉네임이 title, aria-label, value 같은 속성에 들어갈 때 따옴표 탈출을 확인한다.",
      },
      {
        label: "icon renderer HTML",
        value: "<img src=x onerror=\"alert('profile-icon-xss')\">",
        note: "아이콘/배지/프로필 꾸미기 필드를 dangerouslySetInnerHTML 로 그리는지 확인한다.",
      },
    ],
    checks: [
      "닉네임은 textContent 로만 렌더링되는지 확인",
      "속성에 넣는 값은 attribute context 에 맞게 인코딩되는지 확인",
      "아이콘 URL 은 URL 객체와 host/protocol allowlist 로 검증하는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "content",
  },
  {
    slug: "blind-xss-workflow",
    title: "Blind XSS 워크플로우",
    summary:
      "사용자 입력이 즉시 실행되지 않더라도 관리자 콘솔, 알림, 로그 뷰어, CRM 같은 나중의 렌더링 화면에서 실행되는지 추적한다.",
    surface: "html",
    payloads: [
      {
        label: "same-origin callback probe",
        value:
          "<img src=x onerror=\"fetch('/redirected?from=blind-xss&surface=admin-log',{mode:'no-cors'})\">",
        note: "실제 테스트에서는 본인이 소유한 callback endpoint 로 교체해 지연 실행을 기록한다.",
      },
      {
        label: "passive image beacon",
        value:
          '<img src="/redirected?from=blind-xss-image" alt="blind-xss-probe">',
        note: "script 없이도 나중에 렌더링된 화면에서 외부/내부 요청이 발생하는지 확인한다.",
      },
    ],
    checks: [
      "사용자 화면뿐 아니라 관리자/운영자/메일/로그 화면까지 같은 렌더링 정책을 쓰는지 확인",
      "콜백에는 민감정보를 담지 말고 실행 시점과 표면만 기록하는지 확인",
      "저장형 XSS 는 delayed surface 까지 테스트 케이스로 관리하는지 확인",
    ],
    noSandbox: "works",
    scriptsOnly: "works",
    fullSandbox: "blocked",
    sopBlocks: false,
    category: "delayed",
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
};

export const ALL_CATEGORIES: IScenario["category"][] = [
  "html",
  "dom",
  "protocol",
  "context",
  "file",
  "content",
  "navigation",
  "communication",
  "exfil",
  "phishing",
  "delayed",
  "annoyance",
  "probe",
];
