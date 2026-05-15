import type { Locale } from "@/i18n/types";

export interface IRedirectedI18n {
  title: string;
  summary: string;
  reached: string;
  from: string;
  surface: string;
  empty: string;
  backHome: string;
  note: string;
}

export const I18N: Record<Locale, IRedirectedI18n> = {
  ko: {
    title: "리다이렉트 테스트 도착 페이지",
    summary:
      "top.location, delayed attack, chained attack 시나리오가 외부 example.com 대신 도착하는 안전한 내부 테스트 페이지입니다.",
    reached: "도착 확인",
    from: "시나리오",
    surface: "표면",
    empty: "(없음)",
    backHome: "홈으로 돌아가기",
    note: "이 페이지에 도착했다면 테스트한 리다이렉트 동작이 브라우저에서 허용된 것입니다. sandbox 또는 allow-top-navigation 정책을 다시 확인하세요.",
  },
  en: {
    title: "Redirect Test Target",
    summary:
      "A safe internal target for top.location, delayed attack, and chained attack scenarios instead of external example.com.",
    reached: "Target reached",
    from: "Scenario",
    surface: "Surface",
    empty: "(empty)",
    backHome: "Back home",
    note: "If you reached this page, the redirect behavior you tested was allowed by the browser. Recheck sandbox and allow-top-navigation policy.",
  },
  ja: {
    title: "Redirect Test Target",
    summary:
      "top.location、delayed attack、chained attack が外部 example.com の代わりに到達する安全な内部ページです。",
    reached: "到達確認",
    from: "Scenario",
    surface: "Surface",
    empty: "(なし)",
    backHome: "ホームへ戻る",
    note: "このページに到達した場合、テストした redirect が browser で許可されています。sandbox と allow-top-navigation policy を確認してください。",
  },
  zh: {
    title: "Redirect Test Target",
    summary:
      "top.location、delayed attack、chained attack 场景会到达此安全内部页面，而不是外部 example.com。",
    reached: "已到达",
    from: "场景",
    surface: "表面",
    empty: "(空)",
    backHome: "返回首页",
    note: "如果到达此页面，说明被测试的重定向行为已被浏览器允许。请重新检查 sandbox 与 allow-top-navigation 策略。",
  },
};
