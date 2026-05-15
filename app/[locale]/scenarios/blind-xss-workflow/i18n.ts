import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "same-origin callback probe",
    value:
      "<img src=x onerror=\"fetch('/redirected?from=blind-xss&surface=admin-log',{mode:'no-cors'})\">",
  },
  {
    label: "passive image beacon",
    value: '<img src="/redirected?from=blind-xss-image" alt="blind-xss-probe">',
  },
];

const ko: IScenarioPageI18n = {
  title: "Blind XSS 워크플로우",
  summary:
    "사용자 입력이 즉시 실행되지 않더라도 관리자 콘솔, 알림, 로그 뷰어, CRM 같은 나중의 렌더링 화면에서 실행되는지 추적한다.",
  checks: [
    "사용자 화면뿐 아니라 관리자/운영자/메일/로그 화면까지 같은 렌더링 정책을 쓰는지 확인",
    "콜백에는 민감정보를 담지 말고 실행 시점과 표면만 기록하는지 확인",
    "저장형 XSS 는 delayed surface 까지 테스트 케이스로 관리하는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "실제 테스트에서는 본인이 소유한 callback endpoint 로 교체해 지연 실행을 기록한다.",
    },
    {
      ...payloads[1],
      note: "script 없이도 나중에 렌더링된 화면에서 외부/내부 요청이 발생하는지 확인한다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "Blind XSS 는 입력한 사람의 화면에서는 아무 일도 안 일어나지만, 운영자 도구나 알림/메일/로그 화면에서 나중에 실행되는 저장형 XSS 입니다.",
    "테스트 callback 은 반드시 본인이 소유한 endpoint 를 쓰고, 쿠키/토큰 같은 민감정보를 보내지 말고 실행 위치와 시점만 기록하세요.",
    "방어는 사용자-facing 화면만 sanitize 하는 것으로 끝나지 않습니다. 운영자 콘솔, 에러 리포트, CRM, 이메일 템플릿까지 같은 출력 정책을 적용해야 합니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Blind XSS workflow",
  summary:
    "Track payloads that do not run immediately but execute later in admin consoles, notifications, log viewers, or CRMs.",
  checks: [
    "Apply the same rendering policy to user, admin, operator, mail, and log surfaces",
    "Do not include secrets in callbacks; record only execution time and surface",
    "Treat stored XSS as a delayed-surface test case",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Replace with a callback endpoint you own during authorized testing.",
    },
    {
      ...payloads[1],
      note: "Checks whether a later-rendered surface triggers a request even without script.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "Blind XSS may do nothing on the submitter's screen, then run later inside admin tools, notifications, email, or log views.",
    "Use only callback endpoints you control, and avoid sending cookies or tokens. Record execution location and timing instead.",
    "Defense is broader than user-facing sanitization. Operator consoles, error reports, CRMs, and email templates need the same output policy.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "Blind XSS workflow",
  summary:
    "入力直後は実行されず、管理者 console、通知、log viewer、CRM など後続画面で実行される payload を追跡します。",
  checks: [
    "user/admin/operator/mail/log surface に同じ rendering policy を適用するか確認",
    "callback に secret を含めず、実行時刻と surface のみ記録するか確認",
    "stored XSS を delayed surface の test case として扱うか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "許可されたテストでは自分が所有する callback endpoint に置き換えます。",
    },
    {
      ...payloads[1],
      note: "script なしでも後から描画される画面で request が発生するか確認します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "Blind XSS は入力者の画面では何も起きず、管理者 tool、通知、mail、log view で後から実行される stored XSS です。",
    "callback は自分が管理する endpoint のみを使い、cookie/token を送らず実行位置と時刻だけ記録します。",
    "防御は user-facing 画面の sanitize だけでは不十分です。operator console、error report、CRM、email template にも同じ出力 policy が必要です。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "Blind XSS 工作流",
  summary:
    "追踪不会立即执行、但稍后在管理员控制台、通知、日志查看器或 CRM 中执行的 payload。",
  checks: [
    "用户、管理员、运营、邮件、日志页面都应用同一渲染策略",
    "callback 不携带敏感信息，只记录执行时间和表面",
    "把存储型 XSS 当作 delayed surface 测试用例管理",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "授权测试时替换为你自己拥有的 callback endpoint。",
    },
    {
      ...payloads[1],
      note: "检查即使没有脚本，后续渲染页面是否也会触发请求。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "Blind XSS 在提交者页面可能没有任何反应，却会稍后在管理员工具、通知、邮件或日志视图中执行。",
    "只使用你控制的 callback endpoint，不发送 cookie/token，仅记录执行位置和时间。",
    "防护不能只覆盖用户页面。运营控制台、错误报告、CRM、邮件模板也需要相同输出策略。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
