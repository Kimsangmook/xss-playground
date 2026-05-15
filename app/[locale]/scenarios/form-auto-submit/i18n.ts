import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: { post: string; get: string; clearLog: string };
  log: {
    tryPost: string;
    postDone: string;
    tryGet: string;
    getNote: string;
    getDone: string;
  };
  explanation: string[];
}

const ko: IPageText = {
  title: "숨겨진 form 자동 submit (CSRF-like)",
  summary:
    "사용자 모르게 외부 도메인으로 form 을 submit 하며 sandbox allow-forms 와 CSRF 경계를 확인한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    post: "POST submit (외부)",
    get: "GET submit (외부)",
    clearLog: "로그 초기화",
  },
  log: {
    tryPost: "외부 도메인으로 hidden form submit",
    postDone:
      "submit 호출 완료. allow-forms 가 없으면 차단되고, 있으면 새 창에 응답이 뜸",
    tryGet: "GET form submit (CSRF-style)",
    getNote:
      "공격 가치: 타깃 사이트에 인증된 사용자 쿠키가 자동 첨부되면 CSRF 성립. SameSite=Lax 가 기본이라 대부분 차단됨.",
    getDone: "submit 호출 완료",
  },
  explanation: [
    "form submit 은 cross-origin 으로 자유롭게 보낼 수 있습니다. 문제는 타깃 사이트가 SameSite=Lax/Strict 쿠키를 쓰는지에 따라 CSRF 가능 여부가 결정됩니다.",
    "<code>sandbox</code> 에 <code>allow-forms</code> 가 없으면 submit 자체가 차단됩니다. 신뢰 호스트만 allowlist 로 받지 않는다면 이 키워드는 빼는 게 안전합니다.",
    '참고: 외부 도메인으로 보낸 응답을 iframe 안에서 읽을 수는 없습니다 (SOP). 하지만 "요청이 도달했다" 자체가 공격일 때가 많습니다.',
  ],
};

const en: IPageText = {
  title: "Hidden form auto-submit (CSRF-like)",
  summary:
    "Submit a hidden form to an external domain and compare sandbox allow-forms and CSRF boundaries.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    post: "POST submit (external)",
    get: "GET submit (external)",
    clearLog: "Clear log",
  },
  log: {
    tryPost: "hidden form submit to external domain",
    postDone:
      "submit called. Blocked without allow-forms; with it, the response opens in a new tab.",
    tryGet: "GET form submit (CSRF-style)",
    getNote:
      "Attack value: if the target site relies on cookies that follow GETs, this becomes CSRF. SameSite=Lax is the default and blocks most cases.",
    getDone: "submit called",
  },
  explanation: [
    "Form submit can cross origins freely. Whether it becomes CSRF depends on the target's cookie SameSite policy.",
    "Without <code>allow-forms</code> in <code>sandbox</code>, submit is blocked outright. Drop the keyword unless you also have a host allowlist.",
    'Note: SOP prevents the iframe from reading the response, but often "the request reached the target" is the attack.',
  ],
};

const ja: IPageText = {
  title: "隠し form 自動 submit (CSRF-like)",
  summary:
    "ユーザーに気づかれず外部 domain へ form を submit し、sandbox allow-forms と CSRF 境界を確認します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    post: "POST submit (外部)",
    get: "GET submit (外部)",
    clearLog: "ログをクリア",
  },
  log: {
    tryPost: "外部 domain へ hidden form submit",
    postDone:
      "submit を呼び出しました。allow-forms がなければブロックされ、ある場合は response が新しいタブで開きます。",
    tryGet: "GET form submit (CSRF-style)",
    getNote:
      "攻撃価値: target site の cookie が GET に付く場合 CSRF になります。SameSite=Lax がデフォルトなので多くはブロックされます。",
    getDone: "submit を呼び出しました",
  },
  explanation: [
    "form submit は cross-origin に送信できます。CSRF になるかは target の cookie SameSite policy に依存します。",
    "<code>sandbox</code> に <code>allow-forms</code> がない場合 submit 自体がブロックされます。host allowlist がないならこの keyword は外すのが安全です。",
    "外部 domain の response を iframe 内で読むことはできません (SOP)。しかし request が届くこと自体が攻撃になる場合があります。",
  ],
};

const zh: IPageText = {
  title: "隐藏 form 自动 submit（类似 CSRF）",
  summary:
    "在用户不知情的情况下向外部域提交 form，并比较 sandbox allow-forms 与 CSRF 边界。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    post: "POST submit（外部）",
    get: "GET submit（外部）",
    clearLog: "清空日志",
  },
  log: {
    tryPost: "向外部域 hidden form submit",
    postDone:
      "submit 已调用。没有 allow-forms 时会被阻止；有它时，响应会在新标签页打开。",
    tryGet: "GET form submit（CSRF-style）",
    getNote:
      "攻击价值：如果目标站 cookie 会随 GET 自动携带，就构成 CSRF。SameSite=Lax 是默认值，会阻止大多数情况。",
    getDone: "submit 已调用",
  },
  explanation: [
    "form submit 可以自由跨 origin 发送。是否形成 CSRF 取决于目标站 cookie 的 SameSite 策略。",
    "如果 <code>sandbox</code> 中没有 <code>allow-forms</code>，submit 会被直接阻止。没有 host allowlist 时，最好不要授予该关键字。",
    "iframe 无法读取外部域响应（SOP），但很多时候“请求到达目标”本身就是攻击。",
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
