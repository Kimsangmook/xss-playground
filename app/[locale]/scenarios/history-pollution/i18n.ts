import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: {
    pollute10: string;
    pollute100: string;
    trap: string;
    clearLog: string;
  };
  log: {
    polluting: string;
    done: string;
    trapInstalled: string;
    intercepted: string;
    trapNote: string;
  };
  explanation: string[];
}

const ko: IPageText = {
  title: "history.pushState 오염",
  summary:
    "iframe 자기 origin 의 history 항목을 쌓아 부모 탭의 뒤로가기 흐름을 방해한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    pollute10: "history 10개 오염",
    pollute100: "history 100개 오염",
    trap: "뒤로가기 트랩 설치",
    clearLog: "로그 초기화",
  },
  log: {
    polluting: "pushState {count}회 시도",
    done: "완료. 부모 페이지의 뒤로가기가 이 iframe history 로 묶입니다.",
    trapInstalled: "popstate 가로채기 설치",
    intercepted: "popstate 가로챔 → 다시 pushState",
    trapNote:
      "이제 사용자가 뒤로가기를 눌러도 즉시 다시 앞으로 끌려옵니다 (history trap)",
  },
  explanation: [
    "iframe 의 pushState 는 자기 origin URL 만 변경하지만, 부모 탭의 뒤로가기 동작에 누적됩니다. 사용자가 서비스의 이전 화면으로 돌아가려고 뒤로가기를 눌러도 iframe history 만 돌아가게 될 수 있습니다.",
    "공격 가치는 annoyance / 사용자가 사이트를 떠나지 못하게 가두는 용도입니다.",
    'sandbox 빈 값(<code>sandbox=""</code>) 이면 JS 가 막혀 이 공격도 차단됩니다. <code>allow-scripts</code> 만 줘도 history API 자체는 자유롭게 호출됩니다.',
  ],
};

const en: IPageText = {
  title: "history.pushState pollution",
  summary:
    "Pile up iframe-owned history entries and interfere with the parent tab's back navigation.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    pollute10: "Pollute 10 history entries",
    pollute100: "Pollute 100 history entries",
    trap: "Install back-button trap",
    clearLog: "Clear log",
  },
  log: {
    polluting: "trying pushState {count} times",
    done: "done. The parent tab's back navigation now traverses this iframe's history.",
    trapInstalled: "popstate interceptor installed",
    intercepted: "popstate intercepted → pushState again",
    trapNote:
      "Now even when the user hits back, they get pulled forward immediately (history trap).",
  },
  explanation: [
    "iframe pushState only changes its own URL, but those entries pile up on the parent tab's back stack. The user trying to return to a previous service page may only loop through iframe history.",
    "Attack value is mostly annoyance / trapping the user on the site.",
    'With <code>sandbox=""</code> (empty), JS is blocked and so is this attack. With just <code>allow-scripts</code>, the history API is freely callable.',
  ],
};

const ja: IPageText = {
  title: "history.pushState 汚染",
  summary:
    "iframe 自身の history entry を積み上げ、親タブの戻る操作を妨害します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    pollute10: "history を 10 件汚染",
    pollute100: "history を 100 件汚染",
    trap: "戻るボタントラップを設置",
    clearLog: "ログをクリア",
  },
  log: {
    polluting: "pushState を {count} 回試行",
    done: "完了。親タブの戻る操作がこの iframe history を通ります。",
    trapInstalled: "popstate interceptor を設置",
    intercepted: "popstate を横取り → 再度 pushState",
    trapNote:
      "ユーザーが戻るを押してもすぐ前へ戻されます (history trap)",
  },
  explanation: [
    "iframe の pushState は自分の origin URL だけを変えますが、その entry は親タブの back stack に積まれます。ユーザーが前のサービス画面へ戻ろうとしても iframe history を巡回することがあります。",
    "攻撃価値は主に annoyance / ユーザーをページに閉じ込める用途です。",
    '<code>sandbox=""</code> なら JS がブロックされ、この攻撃も止まります。<code>allow-scripts</code> だけでは history API は自由に呼べます。',
  ],
};

const zh: IPageText = {
  title: "history.pushState 污染",
  summary:
    "堆积 iframe 自身 origin 的 history 条目，干扰父标签页的后退导航。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    pollute10: "污染 10 条 history",
    pollute100: "污染 100 条 history",
    trap: "安装后退按钮陷阱",
    clearLog: "清空日志",
  },
  log: {
    polluting: "尝试 pushState {count} 次",
    done: "完成。父标签页的后退导航现在会经过此 iframe 的 history。",
    trapInstalled: "popstate 拦截器已安装",
    intercepted: "popstate 已拦截 → 再次 pushState",
    trapNote:
      "现在用户即使点击后退，也会立刻被拉回前进状态（history trap）。",
  },
  explanation: [
    "iframe pushState 只改变自己的 URL，但这些条目会堆积到父标签页的后退栈中。用户想回到服务上一页时，可能只是在 iframe history 中循环。",
    "攻击价值主要是 annoyance / 把用户困在页面上。",
    '使用 <code>sandbox=""</code> 时 JS 被阻止，此攻击也会停止。只有 <code>allow-scripts</code> 时 history API 仍可自由调用。',
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
