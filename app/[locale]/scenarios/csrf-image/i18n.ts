import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: { fire: string; clearLog: string };
  log: { firing: string; onload: string; onerror: string };
  explanation: string[];
}

const ko: IPageText = {
  title: "img 태그 GET 요청 CSRF",
  summary:
    "img.src 에 외부 상태변경 GET 엔드포인트를 넣어 쿠키와 함께 요청이 나가는지 확인한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: { fire: "img.src 로 GET 발사", clearLog: "로그 초기화" },
  log: {
    firing: "img.src 로 GET 요청: {url}",
    onload: "img onload 발생",
    onerror: "img onerror 발생",
  },
  explanation: [
    '가장 오래된 CSRF 형태. <code>&lt;img src="https://target/action?a=b"&gt;</code> 한 줄로 사용자 쿠키와 함께 GET 요청이 날아갑니다.',
    "sandbox 가 빈 값이어도 img 요청은 갑니다. 진짜 막으려면 CSP <code>img-src</code> 또는 HTML 렌더링 단계에서 img 태그 src 호스트 검증이 필요합니다.",
    "타깃이 SameSite=Lax 쿠키를 쓴다면 cross-site GET 으로는 쿠키가 안 붙어 CSRF 영향은 거의 없습니다. 다만 IP 노출, 트래킹 픽셀, internal-only 엔드포인트 핑 정도는 여전히 가능합니다.",
    "참고: 많은 에디터와 CMS 는 img 태그를 일반적으로 허용하므로, 이 공격면을 막으려면 host allowlist 또는 CSP 가 필요합니다.",
  ],
};

const en: IPageText = {
  title: "img-tag GET request CSRF",
  summary:
    "Check whether an external state-changing GET endpoint can be requested with cookies through img.src.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: { fire: "Fire img.src GET", clearLog: "Clear log" },
  log: {
    firing: "img.src GET request: {url}",
    onload: "img onload fired",
    onerror: "img onerror fired",
  },
  explanation: [
    'The oldest CSRF shape: <code>&lt;img src="https://target/action?a=b"&gt;</code> is enough to fire a GET request with the user\'s cookies.',
    'Even <code>sandbox=""</code> does not block img requests. Real defense is CSP <code>img-src</code> or host validation on img src during HTML rendering.',
    "If the target relies on SameSite=Lax cookies, cross-site GETs do not carry them, so CSRF impact is minimal. IP exposure, tracking pixels, and pings to internal-only endpoints are still possible.",
    "Note: most editors and CMSes allow img tags freely, so this surface needs a host allowlist or CSP to close.",
  ],
};

const ja: IPageText = {
  title: "img タグ GET リクエスト CSRF",
  summary:
    "img.src に外部の状態変更 GET endpoint を入れ、cookie 付きで request が送られるか確認します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: { fire: "img.src GET を発火", clearLog: "ログをクリア" },
  log: {
    firing: "img.src GET request: {url}",
    onload: "img onload が発生",
    onerror: "img onerror が発生",
  },
  explanation: [
    '最も古い CSRF 形態です。<code>&lt;img src="https://target/action?a=b"&gt;</code> だけでユーザーの cookie とともに GET request が送られます。',
    "sandbox が空でも img request は送られます。止めるには CSP <code>img-src</code>、または HTML 描画時の img src host 検証が必要です。",
    "ターゲットが SameSite=Lax cookie を使う場合、cross-site GET では cookie が付かず CSRF 影響は小さくなります。ただし IP 露出、tracking pixel、internal-only endpoint への ping は残ります。",
    "多くの editor / CMS は img タグを許可するため、この面を閉じるには host allowlist または CSP が必要です。",
  ],
};

const zh: IPageText = {
  title: "img 标签 GET 请求 CSRF",
  summary:
    "检查是否可通过 img.src 请求外部状态变更 GET endpoint，并自动携带 cookie。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: { fire: "触发 img.src GET", clearLog: "清空日志" },
  log: {
    firing: "img.src GET 请求: {url}",
    onload: "img onload 触发",
    onerror: "img onerror 触发",
  },
  explanation: [
    '最古老的 CSRF 形式：一行 <code>&lt;img src="https://target/action?a=b"&gt;</code> 就足以带着用户 cookie 发出 GET 请求。',
    '即使 <code>sandbox=""</code> 也不会阻止 img 请求。真正的防护需要 CSP <code>img-src</code>，或在 HTML 渲染阶段校验 img src host。',
    "如果目标使用 SameSite=Lax cookie，cross-site GET 通常不会携带 cookie，CSRF 影响较小。但 IP 暴露、tracking pixel、internal-only endpoint ping 仍然可能存在。",
    "许多编辑器和 CMS 默认允许 img 标签，因此需要 host allowlist 或 CSP 来关闭这个攻击面。",
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
