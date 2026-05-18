import { SCENARIOS } from "@/lib/scenarios";
import type {
  FilterMode,
  IFlowToggles,
  IPayloadPreset,
  LocalizedText,
  PayloadEffect,
  RenderContext,
} from "./types";

const text = (ko: string, en = ko, ja = en, zh = en): LocalizedText => ({
  ko,
  en,
  ja,
  zh,
});

const defaultFlow: IFlowToggles = {
  dbSave: true,
  serverRender: true,
  unsafeSink: true,
};

const domFlow: IFlowToggles = {
  dbSave: false,
  serverRender: false,
  unsafeSink: true,
};

const effectResults: Record<PayloadEffect, LocalizedText> = {
  alert: text("alert 실행", "alert fired", "alert 実行", "alert 已执行"),
  interaction: text(
    "사용자 액션 필요",
    "user action required",
    "ユーザー操作が必要",
    "需要用户操作"
  ),
  message: text(
    "postMessage 전송",
    "postMessage sent",
    "postMessage 送信",
    "postMessage 已发送"
  ),
  navigation: text(
    "top navigation 시도",
    "top navigation attempted",
    "top navigation 試行",
    "已尝试 top navigation"
  ),
  form: text(
    "form submit 시도",
    "form submit attempted",
    "form submit 試行",
    "已尝试 form submit"
  ),
  network: text(
    "네트워크 요청 시도",
    "network request attempted",
    "network request 試行",
    "已尝试网络请求"
  ),
  phishing: text(
    "피싱 UI 렌더",
    "phishing UI rendered",
    "phishing UI 表示",
    "已渲染钓鱼 UI"
  ),
  probe: text(
    "권한/토큰 probe 시도",
    "probe attempted",
    "probe 試行",
    "已尝试 probe"
  ),
  delayed: text(
    "지연/체인 흐름 준비",
    "delayed chain staged",
    "遅延/chain 準備",
    "已准备延迟/链式流程"
  ),
  iframe: text(
    "iframe 문서 로드",
    "iframe document loaded",
    "iframe document 読み込み",
    "iframe 文档已加载"
  ),
};

const findScenario = (slug: string) => {
  const scenario = SCENARIOS.find(item => item.slug === slug);
  if (!scenario) {
    throw new Error(`Unknown scenario slug: ${slug}`);
  }
  return scenario;
};

const scenarioPayloadPreset = ({
  slug,
  hotkey,
  payloadIndex = 0,
  toggles = defaultFlow,
  context = "div",
  filter = "none",
  effect = "alert",
}: {
  slug: string;
  hotkey: string;
  payloadIndex?: number;
  toggles?: IFlowToggles;
  context?: RenderContext;
  filter?: FilterMode;
  effect?: PayloadEffect;
}): IPayloadPreset => {
  const scenario = findScenario(slug);
  const payload = scenario.payloads?.[payloadIndex];
  if (!payload) {
    throw new Error(`Scenario has no payload: ${slug}`);
  }

  return {
    label: text(payload.label, scenario.slug),
    hotkey,
    payload: payload.value,
    toggles,
    context,
    filter,
    effect,
    result: effectResults[effect],
  };
};

const embedEffectBySlug: Record<string, PayloadEffect> = {
  "top-redirect": "navigation",
  "post-message": "message",
  "form-auto-submit": "form",
  "beacon-exfil": "network",
  "csrf-image": "network",
  "token-exfil": "probe",
  "phishing-form": "phishing",
  "delayed-attack": "delayed",
  "chained-attack": "delayed",
};

const embedScenarioPreset = (slug: string, hotkey: string): IPayloadPreset => {
  const scenario = findScenario(slug);

  return {
    label: text(`iframe ${scenario.title}`, `iframe ${scenario.slug}`),
    hotkey,
    payload: `<iframe src="/embed/${scenario.slug}"></iframe>`,
    toggles: defaultFlow,
    context: "div",
    filter: "none",
    effect: embedEffectBySlug[slug] ?? "iframe",
    result: effectResults[embedEffectBySlug[slug] ?? "iframe"],
  };
};

export const PAYLOAD_PRESETS: IPayloadPreset[] = [
  scenarioPayloadPreset({
    slug: "script-tag-injection",
    hotkey: "1",
  }),
  scenarioPayloadPreset({
    slug: "event-handler-attribute",
    hotkey: "2",
  }),
  scenarioPayloadPreset({
    slug: "svg-onload",
    hotkey: "3",
  }),
  scenarioPayloadPreset({
    slug: "dom-innerhtml-sink",
    hotkey: "4",
    toggles: domFlow,
  }),
  scenarioPayloadPreset({
    slug: "javascript-url",
    hotkey: "5",
    effect: "interaction",
  }),
  scenarioPayloadPreset({
    slug: "data-url-wrapper",
    hotkey: "6",
    effect: "message",
  }),
  embedScenarioPreset("top-redirect", "q"),
  embedScenarioPreset("post-message", "w"),
  embedScenarioPreset("form-auto-submit", "e"),
  embedScenarioPreset("beacon-exfil", "r"),
  embedScenarioPreset("csrf-image", "t"),
  embedScenarioPreset("token-exfil", "y"),
  embedScenarioPreset("phishing-form", "u"),
  embedScenarioPreset("delayed-attack", "i"),
  embedScenarioPreset("chained-attack", "o"),
];
