import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: {
    blob: string;
    dataUrl: string;
    locationInfo: string;
    clearLog: string;
  };
  log: {
    tryBlob: string;
    blobDone: string;
    tryData: string;
    dataDone: string;
    tryLocation: string;
    locationNote: string;
  };
  explanation: string[];
}

const ko: IPageText = {
  title: "자동 다운로드 트리거",
  summary:
    "사용자 클릭 없이 파일 다운로드를 시작할 수 있는지 download 속성, Blob URL, data URL 로 확인한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    blob: "Blob 자동 다운로드",
    dataUrl: "data URL 자동 다운로드",
    locationInfo: "location.href 다운로드 (안내만)",
    clearLog: "로그 초기화",
  },
  log: {
    tryBlob: "시도: Blob URL + a.download 가짜 클릭",
    blobDone: "Blob 다운로드 트리거 완료",
    tryData: "시도: data: URL + a.download",
    dataDone: "data URL 다운로드 트리거 완료",
    tryLocation: "시도: location.href = attachment URL (자기 origin 내)",
    locationNote:
      "실제 공격에서는 서버가 Content-Disposition: attachment 헤더를 내려 다운로드를 강제. 이 PoC 에선 동작하지 않습니다.",
  },
  explanation: [
    "최신 브라우저는 사용자 제스처 없이 너무 잦은 다운로드를 차단하기는 합니다만, 첫 다운로드는 보통 허용됩니다. 사용자가 신뢰하는 서비스 화면에서 영문 모를 파일이 받아지면 그 자체가 피싱의 trigger 가 됩니다.",
    '<code>sandbox="allow-scripts"</code> 가 부착되면 a.click() 은 되지만 <code>a.download</code> 속성에 의한 다운로드는 차단되는 경향이 있습니다. <code>allow-downloads</code> 키워드가 필요합니다.',
  ],
};

const en: IPageText = {
  title: "Auto-download trigger",
  summary:
    "Check whether file downloads can start without an explicit user click via download attributes, Blob URLs, or data URLs.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    blob: "Blob auto-download",
    dataUrl: "data URL auto-download",
    locationInfo: "location.href download (info only)",
    clearLog: "Clear log",
  },
  log: {
    tryBlob: "try: Blob URL + a.download synthetic click",
    blobDone: "Blob download triggered",
    tryData: "try: data: URL + a.download",
    dataDone: "data URL download triggered",
    tryLocation: "try: location.href = attachment URL (same-origin only)",
    locationNote:
      "Real attacks rely on the server sending Content-Disposition: attachment. This PoC does not reproduce that.",
  },
  explanation: [
    "Modern browsers limit repeated downloads without a user gesture, but the first one usually passes. A surprise file dropping inside a trusted-looking page is enough to start a phishing flow.",
    'With <code>sandbox="allow-scripts"</code>, a.click() works but <code>a.download</code>-driven downloads tend to be blocked unless <code>allow-downloads</code> is also granted.',
  ],
};

const ja: IPageText = {
  title: "自動ダウンロードトリガー",
  summary:
    "download 属性、Blob URL、data URL により、明示的なクリックなしでファイルダウンロードが始まるか確認します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    blob: "Blob 自動ダウンロード",
    dataUrl: "data URL 自動ダウンロード",
    locationInfo: "location.href ダウンロード (説明のみ)",
    clearLog: "ログをクリア",
  },
  log: {
    tryBlob: "試行: Blob URL + a.download 偽クリック",
    blobDone: "Blob ダウンロードをトリガーしました",
    tryData: "試行: data: URL + a.download",
    dataDone: "data URL ダウンロードをトリガーしました",
    tryLocation: "試行: location.href = attachment URL (同一 origin 内)",
    locationNote:
      "実攻撃ではサーバーが Content-Disposition: attachment ヘッダーでダウンロードを強制します。この PoC では再現しません。",
  },
  explanation: [
    "現在のブラウザはユーザー操作なしの連続ダウンロードを制限しますが、最初の 1 回は通ることがよくあります。信頼された画面で見覚えのないファイルが落ちるだけでもフィッシングのきっかけになります。",
    '<code>sandbox="allow-scripts"</code> では a.click() は動いても、<code>a.download</code> によるダウンロードは <code>allow-downloads</code> がないとブロックされる傾向があります。',
  ],
};

const zh: IPageText = {
  title: "自动下载触发",
  summary:
    "检查是否可通过 download 属性、Blob URL 或 data URL 在没有明确用户点击的情况下开始文件下载。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    blob: "Blob 自动下载",
    dataUrl: "data URL 自动下载",
    locationInfo: "location.href 下载（仅说明）",
    clearLog: "清空日志",
  },
  log: {
    tryBlob: "尝试: Blob URL + a.download 假点击",
    blobDone: "Blob 下载已触发",
    tryData: "尝试: data: URL + a.download",
    dataDone: "data URL 下载已触发",
    tryLocation: "尝试: location.href = attachment URL（同源内）",
    locationNote:
      "真实攻击依赖服务器返回 Content-Disposition: attachment 来强制下载。本 PoC 不复现这一点。",
  },
  explanation: [
    "现代浏览器会限制没有用户手势的重复下载，但第一次通常可能通过。在可信页面中突然下载陌生文件，本身就可能成为钓鱼流程的触发点。",
    '使用 <code>sandbox="allow-scripts"</code> 时 a.click() 可能可用，但由 <code>a.download</code> 驱动的下载通常需要 <code>allow-downloads</code> 才能通过。',
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
