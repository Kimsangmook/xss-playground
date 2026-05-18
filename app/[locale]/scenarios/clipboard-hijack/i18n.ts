import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

interface IPageText extends IScenarioPageI18n {
  actionsHeading: string;
  explanationHeading: string;
  buttons: { writeText: string; clearLog: string };
  log: {
    hijacked: string;
    tryWrite: string;
    writeSuccess: string;
    failed: string;
  };
  text: {
    victim: string;
    hijackValue: string;
    writeValue: string;
  };
  explanation: string[];
}

const ko: IPageText = {
  title: "클립보드 hijack",
  summary:
    "사용자가 iframe 영역에서 복사할 때 copy 이벤트를 가로채 클립보드 값을 다른 내용으로 덮어쓴다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    writeText: "clipboard.writeText() 직접 쓰기",
    clearLog: "로그 초기화",
  },
  log: {
    hijacked: 'copy 이벤트 가로챔 → 덮어쓴 값: "{value}"',
    tryWrite: "navigator.clipboard.writeText() 시도 (사용자 제스처 필요)",
    writeSuccess: "쓰기 성공",
    failed: "실패: {message}",
  },
  text: {
    victim:
      "여기서 이 줄을 직접 선택해서 복사(Cmd/Ctrl+C) 해 보세요. 클립보드에 다른 내용이 들어갑니다.",
    hijackValue:
      "rm -rf /  ← 원래 복사하려던 내용이 이걸로 바뀌었습니다. (PoC: 클립보드 hijack 성공)",
    writeValue: "이건 iframe 이 직접 clipboard.writeText() 로 쓴 값입니다.",
  },
  explanation: [
    "<code>copy</code> 이벤트는 자기 origin 페이지 안에서 자유롭게 가로챌 수 있습니다. 사용자가 서비스 콘텐츠 안의 일부 텍스트를 복사한 줄 알았는데 실제 클립보드에는 다른 내용이 들어갈 수 있습니다.",
    "공격 가치 예시: 송금 주소를 비슷한 형태의 다른 주소로 갈아 끼우기, 쉘 명령어를 위험한 명령어로 바꾸기.",
    "<code>navigator.clipboard.writeText</code> 는 사용자 제스처 + 포커스 + permissions 가 필요해서 자동 호출은 보통 차단됩니다.",
    'sandbox 빈 값(<code>sandbox=""</code>) 이면 JS 가 막혀서 이 공격도 차단됩니다.',
  ],
};

const en: IPageText = {
  title: "Clipboard hijack",
  summary:
    "Intercept copy events inside the iframe and overwrite the user's clipboard with different content.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    writeText: "Try clipboard.writeText() directly",
    clearLog: "Clear log",
  },
  log: {
    hijacked: 'copy event hijacked → overwritten value: "{value}"',
    tryWrite: "try navigator.clipboard.writeText() (requires user gesture)",
    writeSuccess: "write succeeded",
    failed: "failed: {message}",
  },
  text: {
    victim:
      "Select and copy this line (Cmd/Ctrl+C). The clipboard ends up with something different.",
    hijackValue:
      "rm -rf /  ← the clipboard was rewritten. (PoC: clipboard hijack succeeded)",
    writeValue:
      "This value was written directly by iframe via clipboard.writeText().",
  },
  explanation: [
    "The <code>copy</code> event can be intercepted inside the iframe's own origin. The user thinks they copied something from the parent page but the clipboard ends up with attacker content.",
    "Real attack value: swap a wallet address for a similar-looking one, or replace a shell command with a destructive variant.",
    "<code>navigator.clipboard.writeText</code> requires a user gesture, focus, and permissions, so automatic calls are usually blocked.",
    'With <code>sandbox=""</code> (empty), JS is blocked entirely, so this attack stops too.',
  ],
};

const ja: IPageText = {
  title: "クリップボード hijack",
  summary:
    "iframe 領域でユーザーがコピーしたとき、copy イベントを横取りして別の内容で上書きします。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    writeText: "clipboard.writeText() を直接試す",
    clearLog: "ログをクリア",
  },
  log: {
    hijacked: 'copy event を横取り → 上書き値: "{value}"',
    tryWrite: "navigator.clipboard.writeText() を試行 (ユーザー操作が必要)",
    writeSuccess: "書き込み成功",
    failed: "失敗: {message}",
  },
  text: {
    victim:
      "この行を選択してコピー(Cmd/Ctrl+C)してください。クリップボードには別の内容が入ります。",
    hijackValue:
      "rm -rf /  ← コピーしようとした内容がこれに置き換わりました。(PoC: clipboard hijack 成功)",
    writeValue:
      "これは iframe が clipboard.writeText() で直接書き込んだ値です。",
  },
  explanation: [
    "<code>copy</code> イベントは iframe 自身の origin 内で自由に横取りできます。ユーザーがサービス内のテキストをコピーしたつもりでも、実際のクリップボードは攻撃者の内容になります。",
    "実攻撃の価値: 送金先アドレスを似た別アドレスに差し替える、シェルコマンドを危険なコマンドに置き換えるなど。",
    "<code>navigator.clipboard.writeText</code> はユーザー操作、フォーカス、権限が必要なため、自動呼び出しは通常ブロックされます。",
    '<code>sandbox=""</code> なら JS 自体がブロックされ、この攻撃も止まります。',
  ],
};

const zh: IPageText = {
  title: "剪贴板劫持",
  summary: "用户在 iframe 区域复制时拦截 copy 事件，并用其他内容覆盖剪贴板。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    writeText: "直接尝试 clipboard.writeText()",
    clearLog: "清空日志",
  },
  log: {
    hijacked: 'copy 事件已劫持 → 覆盖值: "{value}"',
    tryWrite: "尝试 navigator.clipboard.writeText()（需要用户手势）",
    writeSuccess: "写入成功",
    failed: "失败: {message}",
  },
  text: {
    victim: "请选择并复制这一行（Cmd/Ctrl+C）。剪贴板中会变成其他内容。",
    hijackValue:
      "rm -rf /  ← 原本要复制的内容被替换成了这个。（PoC: clipboard hijack 成功）",
    writeValue: "这是 iframe 通过 clipboard.writeText() 直接写入的值。",
  },
  explanation: [
    "<code>copy</code> 事件可以在 iframe 自身 origin 内被自由拦截。用户以为复制了服务内容，实际剪贴板可能变成攻击者内容。",
    "真实攻击价值包括：把转账地址换成相似地址，或把 shell 命令替换成危险命令。",
    "<code>navigator.clipboard.writeText</code> 需要用户手势、焦点和权限，因此自动调用通常会被阻止。",
    '使用 <code>sandbox=""</code> 时 JS 被完全阻止，此攻击也会停止。',
  ],
};

export const I18N: Record<Locale, IPageText> = { ko, en, ja, zh };
