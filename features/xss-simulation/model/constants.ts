import type { Locale } from "@/i18n/types";
import type {
  FilterMode,
  IFlowToggles,
  IScenarioPreset,
  ISimText,
  ISimWindow,
  RenderContext,
  WindowId,
} from "./types";

export const MIN_WINDOW_WIDTH = 260;
export const MIN_WINDOW_HEIGHT = 180;

const label = (ko: string, en: string, ja: string, zh: string) => ({
  ko,
  en,
  ja,
  zh,
});

const KO_TEXT: ISimText = {
  title: "XSS Simulation Board",
  subtitle: "stored, reflected, DOM 흐름을 한 화면에서 조합",
  run: "흐름 실행",
  reset: "배치 초기화",
  submit: "전송",
  back: "뒤로",
  openSidebar: "사이드바 열기",
  closeSidebar: "사이드바 닫기",
  payloadDeck: "Payload 모음",
  renderComposer: "렌더 조합",
  flowPresets: "흐름",
  toggles: "토글",
  renderContext: "템플릿",
  filterMode: "필터",
  lastEvent: "이벤트",
  idle: "idle",
  xssFired: "alert 실행",
  safeRender: "텍스트로 이스케이프",
  close: "닫기",
  alertTitle: "Simulated alert()",
  alertBody: "프런트 클라이언트까지 위험 payload가 도달했습니다.",
  attackInput: "공격자 input",
  database: "DB 서버",
  serverRender: "프런트 서버 render",
  frontClient: "프런트 클라이언트",
  rawPayload: "원본 payload",
  storedRecord: "저장된 값",
  serverOutput: "렌더 결과 HTML",
  clientDocument: "피해자 페이지",
  commentPreview: "댓글 미리보기",
  emptyDb: "DB 저장 생략",
  activePath: "흐름 실행 중",
};

const EN_TEXT: ISimText = {
  title: "XSS Simulation Board",
  subtitle: "Compose stored, reflected, and DOM flows in one surface",
  run: "Run flow",
  reset: "Reset layout",
  submit: "Submit",
  back: "Back",
  openSidebar: "Open sidebar",
  closeSidebar: "Close sidebar",
  payloadDeck: "Payload deck",
  renderComposer: "Render composer",
  flowPresets: "Flow",
  toggles: "Toggles",
  renderContext: "Template",
  filterMode: "Filter",
  lastEvent: "Event",
  idle: "idle",
  xssFired: "simulated alert fired",
  safeRender: "escaped as text",
  close: "Close",
  alertTitle: "Simulated alert()",
  alertBody: "A dangerous payload reached the front client.",
  attackInput: "Attacker input",
  database: "DB server",
  serverRender: "Front server render",
  frontClient: "Front client",
  rawPayload: "raw payload",
  storedRecord: "stored record",
  serverOutput: "rendered HTML",
  clientDocument: "victim page",
  commentPreview: "Comment preview",
  emptyDb: "DB bypassed",
  activePath: "active path",
};

const JA_TEXT: ISimText = {
  ...EN_TEXT,
  subtitle: "stored / reflected / DOM の流れを一画面で組み合わせる",
  run: "フロー実行",
  reset: "配置リセット",
  submit: "送信",
  back: "戻る",
  openSidebar: "サイドバーを開く",
  closeSidebar: "サイドバーを閉じる",
  flowPresets: "Flow",
  toggles: "Toggles",
  renderContext: "Template",
  filterMode: "Filter",
  lastEvent: "Event",
  close: "閉じる",
  attackInput: "攻撃者 input",
  database: "DB サーバー",
  serverRender: "フロントサーバー render",
  frontClient: "フロントクライアント",
  storedRecord: "保存された値",
  clientDocument: "被害者ページ",
  commentPreview: "コメントプレビュー",
  activePath: "フロー実行中",
};

const ZH_TEXT: ISimText = {
  ...EN_TEXT,
  subtitle: "在一个界面组合 stored、reflected、DOM 流程",
  run: "运行流程",
  reset: "重置布局",
  submit: "提交",
  back: "返回",
  openSidebar: "打开侧边栏",
  closeSidebar: "关闭侧边栏",
  close: "关闭",
  attackInput: "攻击者 input",
  database: "DB 服务器",
  serverRender: "前端服务器 render",
  frontClient: "前端客户端",
  storedRecord: "已保存的值",
  clientDocument: "受害者页面",
  commentPreview: "评论预览",
  activePath: "流程运行中",
};

export const SIM_TEXT: Record<Locale, ISimText> = {
  ko: KO_TEXT,
  en: EN_TEXT,
  ja: JA_TEXT,
  zh: ZH_TEXT,
};

export const SCENARIO_PRESETS: IScenarioPreset[] = [
  {
    label: label("저장형 XSS", "Stored XSS", "Stored XSS", "存储型 XSS"),
    toggles: { dbSave: true, serverRender: true, unsafeSink: true },
  },
  {
    label: label("반사형 XSS", "Reflected XSS", "Reflected XSS", "反射型 XSS"),
    toggles: { dbSave: false, serverRender: true, unsafeSink: true },
  },
  {
    label: label("DOM XSS", "DOM XSS", "DOM XSS", "DOM XSS"),
    toggles: { dbSave: false, serverRender: false, unsafeSink: true },
  },
  {
    label: label("안전 렌더", "Safe Render", "安全 render", "安全渲染"),
    toggles: { dbSave: true, serverRender: true, unsafeSink: false },
  },
];

export const RENDER_CONTEXT_LABELS: Record<
  RenderContext,
  Record<Locale, string>
> = {
  div: label("<div>", "<div>", "<div>", "<div>"),
  input: label("input value", "input value", "input value", "input value"),
  textarea: label("textarea", "textarea", "textarea", "textarea"),
  script: label("script data", "script data", "script data", "script data"),
};

export const FILTER_LABELS: Record<FilterMode, Record<Locale, string>> = {
  none: label("없음", "none", "none", "无"),
  escapeHtml: label("HTML escape", "escapeHtml", "escapeHtml", "HTML 转义"),
  stripScript: label(
    "script 제거",
    "strip script",
    "script 除去",
    "移除 script"
  ),
  stripParens: label("괄호 제거", "strip parens", "括弧除去", "移除括号"),
};

export const initialWindows = (): Record<WindowId, ISimWindow> => ({
  attacker: {
    id: "attacker",
    title: KO_TEXT.attackInput,
    caption: "code editor",
    x: 142,
    y: 86,
    width: 340,
    height: 262,
    rank: "m:000001",
  },
  database: {
    id: "database",
    title: KO_TEXT.database,
    caption: "stored rows",
    x: 540,
    y: 92,
    width: 330,
    height: 236,
    rank: "m:000002",
  },
  server: {
    id: "server",
    title: KO_TEXT.serverRender,
    caption: "render(input)",
    x: 318,
    y: 410,
    width: 420,
    height: 324,
    rank: "m:000003",
  },
  client: {
    id: "client",
    title: KO_TEXT.frontClient,
    caption: "browser preview",
    x: 820,
    y: 336,
    width: 374,
    height: 336,
    rank: "m:000004",
  },
});

export const toggleLabels: Array<[keyof IFlowToggles, Record<Locale, string>]> =
  [
    ["dbSave", label("DB 저장", "DB save", "DB 保存", "DB 保存")],
    [
      "serverRender",
      label("서버 render", "server render", "server render", "服务器 render"),
    ],
    [
      "unsafeSink",
      label("unsafe sink", "unsafe sink", "unsafe sink", "unsafe sink"),
    ],
  ];

export const windowOrder: WindowId[] = [
  "attacker",
  "database",
  "server",
  "client",
];
