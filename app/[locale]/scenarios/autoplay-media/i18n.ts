import type { Locale } from "@/i18n/types";
import type { IScenarioPageI18n } from "../types";

const ko: IScenarioPageI18n = {
  title: "자동재생 미디어 / 자동 풀스크린",
  summary:
    "소리 있는 비디오를 자동재생하거나 requestFullscreen 으로 풀스크린 점유를 시도한다.",
  actionsHeading: "실행",
  explanationHeading: "해설",
  buttons: {
    mutedVideo: "video 자동재생 (muted)",
    soundVideo: "video 자동재생 (소리)",
    audio: "audio 자동재생",
    fullscreen: "풀스크린 강제",
    clearLog: "로그 초기화",
  },
  log: {
    tryMuted: "video.play() 시도 (muted)",
    mutedStarted: "재생 시작 (muted 라 보통 통과)",
    failed: "실패: {message}",
    trySound: "video.play() 시도 (muted=false)",
    soundStarted: "재생 시작 (사용자 제스처 없으면 보통 NotAllowedError)",
    blocked: "차단됨: {message}",
    tryAudio: "audio.play() 시도",
    audioStarted: "재생 시작",
    tryFullscreen: "document.documentElement.requestFullscreen() 시도",
    fullscreenStarted: "풀스크린 진입 성공",
    fullscreenBlocked: "차단됨: {message} (사용자 제스처 필요)",
  },
  explanation: [
    "최신 브라우저는 muted 자동재생만 기본 허용합니다. 소리 있는 자동재생은 사용자 제스처(클릭/탭) 가 필요합니다.",
    '풀스크린도 사용자 제스처가 필요합니다. iframe 이라면 추가로 <code>allow="fullscreen"</code> 또는 sandbox 정책이 맞아야 동작합니다.',
    "공격 가치는 낮지만, 풀스크린 + 가짜 로그인 폼 조합은 사용자를 깊게 속일 수 있는 패턴입니다.",
  ],
};

const en: IScenarioPageI18n = {
  title: "Autoplay media / automatic fullscreen",
  summary:
    "Try autoplaying media with sound or taking fullscreen with requestFullscreen.",
  actionsHeading: "Run",
  explanationHeading: "Explanation",
  buttons: {
    mutedVideo: "Autoplay video (muted)",
    soundVideo: "Autoplay video (sound)",
    audio: "Autoplay audio",
    fullscreen: "Force fullscreen",
    clearLog: "Clear log",
  },
  log: {
    tryMuted: "try video.play() (muted)",
    mutedStarted: "playback started (muted usually passes)",
    failed: "failed: {message}",
    trySound: "try video.play() (muted=false)",
    soundStarted: "playback started (usually NotAllowedError without gesture)",
    blocked: "blocked: {message}",
    tryAudio: "try audio.play()",
    audioStarted: "playback started",
    tryFullscreen: "try document.documentElement.requestFullscreen()",
    fullscreenStarted: "entered fullscreen",
    fullscreenBlocked: "blocked: {message} (user gesture required)",
  },
  explanation: [
    "Modern browsers generally allow only muted autoplay. Autoplay with sound requires a user gesture such as a click or tap.",
    'Fullscreen also requires a user gesture. Inside an iframe it may additionally require <code>allow="fullscreen"</code> and compatible sandbox policy.',
    "The standalone risk is low, but fullscreen combined with a fake login form can become a convincing deception flow.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "自動再生メディア / 自動フルスクリーン",
  summary:
    "音声付きメディアの自動再生や requestFullscreen によるフルスクリーン占有を試します。",
  actionsHeading: "実行",
  explanationHeading: "解説",
  buttons: {
    mutedVideo: "video 自動再生 (muted)",
    soundVideo: "video 自動再生 (音あり)",
    audio: "audio 自動再生",
    fullscreen: "フルスクリーン強制",
    clearLog: "ログをクリア",
  },
  log: {
    tryMuted: "video.play() を試行 (muted)",
    mutedStarted: "再生開始 (muted は通常通る)",
    failed: "失敗: {message}",
    trySound: "video.play() を試行 (muted=false)",
    soundStarted: "再生開始 (ジェスチャなしでは通常 NotAllowedError)",
    blocked: "ブロック: {message}",
    tryAudio: "audio.play() を試行",
    audioStarted: "再生開始",
    tryFullscreen: "document.documentElement.requestFullscreen() を試行",
    fullscreenStarted: "フルスクリーンに入りました",
    fullscreenBlocked: "ブロック: {message} (ユーザー操作が必要)",
  },
  explanation: [
    "現在のブラウザは基本的に muted 自動再生だけを許可します。音声付き自動再生にはクリックやタップなどのユーザー操作が必要です。",
    'フルスクリーンにもユーザー操作が必要です。iframe 内ではさらに <code>allow="fullscreen"</code> や sandbox ポリシーが関係します。',
    "単体の危険度は高くありませんが、フルスクリーンと偽ログインフォームを組み合わせると強い偽装フローになります。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "自动播放媒体 / 自动全屏",
  summary: "尝试自动播放带声音的媒体，或通过 requestFullscreen 占用全屏。",
  actionsHeading: "执行",
  explanationHeading: "说明",
  buttons: {
    mutedVideo: "video 自动播放 (muted)",
    soundVideo: "video 自动播放 (有声)",
    audio: "audio 自动播放",
    fullscreen: "强制全屏",
    clearLog: "清空日志",
  },
  log: {
    tryMuted: "尝试 video.play() (muted)",
    mutedStarted: "已开始播放 (muted 通常会通过)",
    failed: "失败: {message}",
    trySound: "尝试 video.play() (muted=false)",
    soundStarted: "已开始播放 (没有用户手势时通常是 NotAllowedError)",
    blocked: "已阻止: {message}",
    tryAudio: "尝试 audio.play()",
    audioStarted: "已开始播放",
    tryFullscreen: "尝试 document.documentElement.requestFullscreen()",
    fullscreenStarted: "已进入全屏",
    fullscreenBlocked: "已阻止: {message} (需要用户手势)",
  },
  explanation: [
    "现代浏览器通常只允许静音自动播放。有声自动播放需要点击或触摸等用户手势。",
    '全屏同样需要用户手势。在 iframe 中还可能需要 <code>allow="fullscreen"</code> 以及匹配的 sandbox 策略。',
    "单独看风险不高，但与假登录表单结合时，可能形成很有欺骗性的流程。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };
