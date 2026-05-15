import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: {
    self: string;
    external: string;
    flood: string;
    tabnab: string;
    clearLog: string;
  };
  log: {
    trySelf: string;
    tryExternal: string;
    returnWindow: string;
    returnBlocked: string;
    openerLinked: string;
    floodIntro: string;
    floodItem: string;
    tabnab1: string;
    tabnab2: string;
    popupBlocked: string;
    blocked: string;
  };
  explanation: string[];
}

const ko: IPageText = {
  title: "popup / window.open 스팸",
  summary:
    "window.open 으로 새 창을 열고 popup 차단, allow-popups, opener/tabnabbing 경계를 확인한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    self: "window.open(self)",
    external: "window.open(test target)",
    flood: "여러 개 동시 열기",
    tabnab: "opener tabnabbing 설명",
    clearLog: "로그 초기화",
  },
  log: {
    trySelf: "window.open(self) 시도",
    tryExternal: "window.open('/redirected?from=popup-spam') 시도",
    returnWindow: "반환: Window 객체",
    returnBlocked: "반환: null (팝업 차단됨)",
    openerLinked:
      "opener 관계로 부모와 연결됨. noopener 없으면 window.opener 접근 가능",
    floodIntro:
      "3번 연속 window.open 시도 (브라우저는 보통 첫 1개 외에는 차단)",
    floodItem: "[{n}] {result}",
    tabnab1:
      "공격 시나리오: 새 창 띄운 후 opener 가 noopener 없으면 opener.location 변경 가능 (tabnabbing)",
    tabnab2:
      "(opener tabnabbing 은 새 창 컨텍스트에서 동작. 여기서는 데모 불가)",
    popupBlocked: "팝업 차단됨",
    blocked: "차단: {message}",
  },
  explanation: [
    "브라우저는 사용자 제스처 없는 window.open 을 막아 주지만, 사용자가 iframe 영역을 한 번이라도 클릭한 직후라면 보통 통과합니다.",
    "<code>sandbox</code> 에 <code>allow-popups</code> 키워드가 없으면 차단됩니다. 임의 호스트 iframe 을 허용한다면 이 키워드는 빼는 게 맞습니다.",
    "새 창이 부모와 같은 origin 이면 opener 를 통한 tabnabbing 도 가능합니다. cross-origin 부모는 직접 영향이 적지만, <code>opener.location</code> 변경은 cross-origin 이어도 허용되는 점을 기억하세요.",
  ],
};

const en: IPageText = {
  title: "popup / window.open spam",
  summary:
    "Open new windows with window.open and inspect popup blocking, allow-popups, opener, and tabnabbing boundaries.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    self: "window.open(self)",
    external: "window.open(test target)",
    flood: "Open several at once",
    tabnab: "opener tabnabbing notes",
    clearLog: "Clear log",
  },
  log: {
    trySelf: "try window.open(self)",
    tryExternal: "try window.open('/redirected?from=popup-spam')",
    returnWindow: "returned: Window object",
    returnBlocked: "returned: null (popup blocked)",
    openerLinked:
      "opener linked to parent. Without noopener, window.opener is reachable.",
    floodIntro:
      "Try three window.open calls (browsers usually block all but the first)",
    floodItem: "[{n}] {result}",
    tabnab1:
      "Attack: open a new tab, then if it has no rel=noopener, opener.location can be replaced (tabnabbing)",
    tabnab2:
      "(Real tabnabbing happens inside the new tab; cannot be demoed from this page.)",
    popupBlocked: "popup blocked",
    blocked: "blocked: {message}",
  },
  explanation: [
    "Browsers block window.open without a user gesture, but right after the user clicks anything in the iframe it typically goes through.",
    "Without <code>allow-popups</code> in <code>sandbox</code>, popups are blocked. If you allow arbitrary-host iframes, drop this keyword.",
    "If the popup is same-origin with its opener, opener-based tabnabbing is possible. Cross-origin parents are largely safe — but <code>opener.location</code> writes are allowed even cross-origin.",
  ],
};

const ja: IPageText = {
  title: "popup / window.open スパム",
  summary:
    "window.open で新しい window を開き、popup blocking、allow-popups、opener/tabnabbing 境界を確認します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    self: "window.open(self)",
    external: "window.open(test target)",
    flood: "複数を同時に開く",
    tabnab: "opener tabnabbing の説明",
    clearLog: "ログをクリア",
  },
  log: {
    trySelf: "window.open(self) を試行",
    tryExternal: "window.open('/redirected?from=popup-spam') を試行",
    returnWindow: "戻り値: Window object",
    returnBlocked: "戻り値: null (popup blocked)",
    openerLinked:
      "opener で親と接続されています。noopener がないと window.opener に到達できます。",
    floodIntro:
      "window.open を 3 回連続で試行 (通常ブラウザは最初以外をブロック)",
    floodItem: "[{n}] {result}",
    tabnab1:
      "攻撃シナリオ: 新しいタブを開き、noopener がなければ opener.location を変更可能 (tabnabbing)",
    tabnab2:
      "(実際の tabnabbing は新しいタブ側で動作します。このページではデモできません。)",
    popupBlocked: "popup がブロックされました",
    blocked: "ブロック: {message}",
  },
  explanation: [
    "ブラウザはユーザー操作なしの window.open をブロックしますが、ユーザーが iframe 領域を一度クリックした直後なら通ることがあります。",
    "<code>sandbox</code> に <code>allow-popups</code> がなければ popup はブロックされます。任意ホスト iframe を許可するなら、この keyword は外すべきです。",
    "popup が opener と同一 origin なら opener 経由の tabnabbing も可能です。cross-origin 親への直接影響は少ないですが、<code>opener.location</code> 書き込みは cross-origin でも許可される点に注意してください。",
  ],
};

const zh: IPageText = {
  title: "popup / window.open 垃圾弹窗",
  summary:
    "通过 window.open 打开新窗口，检查 popup 阻止、allow-popups、opener 和 tabnabbing 边界。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    self: "window.open(self)",
    external: "window.open(test target)",
    flood: "同时打开多个",
    tabnab: "opener tabnabbing 说明",
    clearLog: "清空日志",
  },
  log: {
    trySelf: "尝试 window.open(self)",
    tryExternal: "尝试 window.open('/redirected?from=popup-spam')",
    returnWindow: "返回: Window 对象",
    returnBlocked: "返回: null（popup 被阻止）",
    openerLinked:
      "通过 opener 与父页面相连。没有 noopener 时可以访问 window.opener。",
    floodIntro: "连续 3 次 window.open（浏览器通常只允许第一个）",
    floodItem: "[{n}] {result}",
    tabnab1:
      "攻击场景：打开新标签页后，如果没有 noopener，可修改 opener.location（tabnabbing）",
    tabnab2: "（真实 tabnabbing 发生在新标签页上下文，本页面无法直接演示。）",
    popupBlocked: "popup 被阻止",
    blocked: "已阻止: {message}",
  },
  explanation: [
    "浏览器会阻止没有用户手势的 window.open，但用户刚点击过 iframe 区域后通常可能通过。",
    "如果 <code>sandbox</code> 中没有 <code>allow-popups</code>，popup 会被阻止。允许任意主机 iframe 时，应去掉该关键字。",
    "如果弹窗与 opener 同源，也可能发生 opener-based tabnabbing。cross-origin 父页面直接影响较小，但 <code>opener.location</code> 写入即使 cross-origin 也可能被允许。",
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
