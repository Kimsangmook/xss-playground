import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "Same-Origin Policy 프로브 (실패 확인용)",
  summary:
    "부모 DOM, storage, cookie 접근 시도를 통해 SOP 가 실제로 막는 영역과 허용하는 영역을 확인한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    parentDocument: "parent.document 읽기",
    parentLocation: "parent.location 읽기",
    parentLocationWrite: "parent.location 쓰기 (안내)",
    parentCookie: "parent.document.cookie",
    localStorage: "localStorage 비교",
    fetchSelf: "fetch (자기 origin)",
    fetchParent: "fetch (부모 origin)",
    clearLog: "로그 초기화",
  },
  text: {
    callout:
      '이 페이지는 "안 되는 것" 을 확인하는 페이지입니다. 모든 시도가 차단되어야 정상입니다. 부모와 같은 origin 에서 임베드한 경우에는 일부가 성공할 수 있습니다.',
  },
  log: {
    tryDocument: "시도: parent.document 접근",
    documentSuccess: "성공 (cross-origin 아님): {html}...",
    sopBlocked: "차단됨 (SOP): {message}",
    tryLocation: "시도: parent.location.href 읽기",
    locationSuccess: "성공 (same-origin): {href}",
    tryLocationWrite: "시도: parent.location.href = ... (쓰기)",
    locationWriteNote:
      "참고: location 쓰기는 cross-origin 이어도 허용됨 (top-redirect 시나리오 참고)",
    tryCookie:
      "시도: parent.document.cookie 읽기 → 위 parent.document 와 동일하게 차단",
    tryOwnStorage: "시도: 자기 origin localStorage",
    ownStorage: "자기 origin storage: {value}",
    failed: "실패: {message}",
    storageNote:
      "참고: 부모 origin 의 localStorage 는 SOP 로 접근 불가. cookie/sessionStorage 도 동일.",
    tryFetchSelf: "시도: fetch('/') 자기 origin",
    fetchStatus: "결과: status={status}",
    tryFetchParent:
      "시도: fetch(parent origin) → CORS 헤더 없으면 응답 읽기 차단",
    fetchParentNote:
      "참고: 요청 자체는 나가지만 응답 read 가 막힘. cookie 는 SameSite 정책 따름.",
  },
  explanation: [
    "cross-origin iframe 은 부모의 DOM, storage, cookie 를 직접 읽지 못합니다. 이것이 SOP 가 실제로 보호해 주는 영역입니다.",
    "반면 <code>parent.location</code> 쓰기, <code>parent.postMessage</code>, form submit, fetch 송신 자체는 cross-origin 이어도 허용될 수 있습니다.",
    "cross-origin iframe 의 위험 표면은 직접적인 부모 데이터 탈취보다 사용자 기만, 메시지 핸들러 오용, 자동 요청 쪽에 가까울 때가 많습니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Same-Origin Policy probe (expected failures)",
  summary:
    "Attempt parent DOM, storage, and cookie access to see exactly what SOP blocks and what it still allows.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    parentDocument: "Read parent.document",
    parentLocation: "Read parent.location",
    parentLocationWrite: "Write parent.location (note)",
    parentCookie: "parent.document.cookie",
    localStorage: "Compare localStorage",
    fetchSelf: "fetch (own origin)",
    fetchParent: "fetch (parent origin)",
    clearLog: "Clear log",
  },
  text: {
    callout:
      "This page verifies the things that should fail. Every direct parent access should be blocked. Some probes can succeed if embedded same-origin.",
  },
  log: {
    tryDocument: "try: access parent.document",
    documentSuccess: "success (not cross-origin): {html}...",
    sopBlocked: "blocked (SOP): {message}",
    tryLocation: "try: read parent.location.href",
    locationSuccess: "success (same-origin): {href}",
    tryLocationWrite: "try: parent.location.href = ... (write)",
    locationWriteNote:
      "note: location writes can be allowed cross-origin (see top-redirect)",
    tryCookie:
      "try: read parent.document.cookie → blocked like parent.document",
    tryOwnStorage: "try: own-origin localStorage",
    ownStorage: "own-origin storage: {value}",
    failed: "failed: {message}",
    storageNote:
      "note: parent-origin localStorage is inaccessible by SOP. cookie/sessionStorage are the same.",
    tryFetchSelf: "try: fetch('/') own origin",
    fetchStatus: "result: status={status}",
    tryFetchParent:
      "try: fetch(parent origin) → response read blocked without CORS",
    fetchParentNote:
      "note: the request may leave, but response reading is blocked. Cookies follow SameSite policy.",
  },
  explanation: [
    "A cross-origin iframe cannot directly read the parent's DOM, storage, or cookies. This is the area SOP truly protects.",
    "By contrast, <code>parent.location</code> writes, <code>parent.postMessage</code>, form submit, and sending fetch requests may still be allowed cross-origin.",
    "The risk surface of cross-origin iframes is often user deception, message-handler abuse, and automatic requests rather than direct parent-data theft.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "Same-Origin Policy プローブ (失敗確認用)",
  summary:
    "親 DOM、storage、cookie へのアクセスを試し、SOP が何を止め何を許すかを確認します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    parentDocument: "parent.document を読む",
    parentLocation: "parent.location を読む",
    parentLocationWrite: "parent.location 書き込み (メモ)",
    parentCookie: "parent.document.cookie",
    localStorage: "localStorage 比較",
    fetchSelf: "fetch (自分の origin)",
    fetchParent: "fetch (親 origin)",
    clearLog: "ログをクリア",
  },
  text: {
    callout:
      "このページは失敗すべき操作を確認するページです。親への直接アクセスはすべてブロックされるのが正常です。同一 origin で埋め込んだ場合は一部成功することがあります。",
  },
  log: {
    tryDocument: "試行: parent.document へアクセス",
    documentSuccess: "成功 (cross-origin ではない): {html}...",
    sopBlocked: "ブロック (SOP): {message}",
    tryLocation: "試行: parent.location.href を読む",
    locationSuccess: "成功 (same-origin): {href}",
    tryLocationWrite: "試行: parent.location.href = ... (書き込み)",
    locationWriteNote:
      "メモ: location 書き込みは cross-origin でも許可されることがあります (top-redirect 参照)",
    tryCookie:
      "試行: parent.document.cookie を読む → parent.document と同様にブロック",
    tryOwnStorage: "試行: 自分の origin の localStorage",
    ownStorage: "自分の origin storage: {value}",
    failed: "失敗: {message}",
    storageNote:
      "メモ: 親 origin の localStorage は SOP でアクセス不可。cookie/sessionStorage も同じです。",
    tryFetchSelf: "試行: fetch('/') 自分の origin",
    fetchStatus: "結果: status={status}",
    tryFetchParent:
      "試行: fetch(parent origin) → CORS なしでは response read がブロック",
    fetchParentNote:
      "メモ: request 自体は送られることがありますが、response read はブロックされます。cookie は SameSite に従います。",
  },
  explanation: [
    "cross-origin iframe は親の DOM、storage、cookie を直接読めません。ここが SOP が本当に保護する領域です。",
    "一方で <code>parent.location</code> 書き込み、<code>parent.postMessage</code>、form submit、fetch 送信自体は cross-origin でも許可されることがあります。",
    "cross-origin iframe の危険面は、直接的な親データ窃取よりも、ユーザー欺瞞、message handler の誤用、自動リクエストに近いことが多いです。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "Same-Origin Policy 探测（预期失败）",
  summary:
    "尝试访问父页面 DOM、storage 与 cookie，确认 SOP 具体阻止什么、仍允许什么。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    parentDocument: "读取 parent.document",
    parentLocation: "读取 parent.location",
    parentLocationWrite: "写 parent.location（说明）",
    parentCookie: "parent.document.cookie",
    localStorage: "比较 localStorage",
    fetchSelf: "fetch（自己 origin）",
    fetchParent: "fetch（父 origin）",
    clearLog: "清空日志",
  },
  text: {
    callout:
      "此页面用于确认应该失败的操作。所有直接访问父页面的尝试都应该被阻止。如果以同源方式嵌入，部分探测可能成功。",
  },
  log: {
    tryDocument: "尝试访问 parent.document",
    documentSuccess: "成功（非 cross-origin）: {html}...",
    sopBlocked: "已阻止 (SOP): {message}",
    tryLocation: "尝试读取 parent.location.href",
    locationSuccess: "成功（same-origin）: {href}",
    tryLocationWrite: "尝试 parent.location.href = ...（写入）",
    locationWriteNote:
      "说明：location 写入在 cross-origin 下也可能被允许（见 top-redirect）",
    tryCookie:
      "尝试读取 parent.document.cookie → 与 parent.document 一样被阻止",
    tryOwnStorage: "尝试自己 origin 的 localStorage",
    ownStorage: "自己 origin storage: {value}",
    failed: "失败: {message}",
    storageNote:
      "说明：父 origin 的 localStorage 受 SOP 保护不可访问。cookie/sessionStorage 也一样。",
    tryFetchSelf: "尝试 fetch('/') 自己 origin",
    fetchStatus: "结果: status={status}",
    tryFetchParent: "尝试 fetch(parent origin) → 无 CORS 时响应读取被阻止",
    fetchParentNote:
      "说明：请求本身可能发出，但响应读取会被阻止。cookie 遵循 SameSite 策略。",
  },
  explanation: [
    "cross-origin iframe 不能直接读取父页面 DOM、storage 或 cookie。这是 SOP 真正保护的区域。",
    "相反，<code>parent.location</code> 写入、<code>parent.postMessage</code>、form submit 和发送 fetch 请求本身仍可能在 cross-origin 下被允许。",
    "cross-origin iframe 的风险表面通常更接近用户欺骗、message handler 误用和自动请求，而不是直接窃取父页面数据。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
