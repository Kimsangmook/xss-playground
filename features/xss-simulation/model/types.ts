import type { Locale } from "@/i18n/types";

export type WindowId = "attacker" | "database" | "server" | "client";
export type RenderContext = "div" | "input" | "textarea" | "script";
export type FilterMode = "none" | "escapeHtml" | "stripScript" | "stripParens";
export type LocalizedText = Record<Locale, string>;
export type PayloadEffect =
  | "alert"
  | "interaction"
  | "message"
  | "navigation"
  | "form"
  | "network"
  | "phishing"
  | "probe"
  | "delayed"
  | "iframe";

export interface ISimWindow {
  id: WindowId;
  title: string;
  caption: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rank: string;
}

export interface IFlowToggles {
  dbSave: boolean;
  serverRender: boolean;
  unsafeSink: boolean;
}

export interface IFlowEdge {
  from: WindowId;
  to: WindowId;
  label: string;
}

export interface IPayloadPreset {
  label: LocalizedText;
  hotkey: string;
  payload: string;
  toggles: IFlowToggles;
  context: RenderContext;
  filter: FilterMode;
  effect: PayloadEffect;
  result: LocalizedText;
}

export interface IScenarioPreset {
  label: LocalizedText;
  toggles: IFlowToggles;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface ISimText {
  title: string;
  subtitle: string;
  run: string;
  reset: string;
  submit: string;
  back: string;
  openSidebar: string;
  closeSidebar: string;
  payloadDeck: string;
  renderComposer: string;
  flowPresets: string;
  toggles: string;
  renderContext: string;
  filterMode: string;
  lastEvent: string;
  idle: string;
  xssFired: string;
  safeRender: string;
  close: string;
  alertTitle: string;
  alertBody: string;
  attackInput: string;
  database: string;
  serverRender: string;
  frontClient: string;
  rawPayload: string;
  storedRecord: string;
  serverOutput: string;
  clientDocument: string;
  commentPreview: string;
  emptyDb: string;
  activePath: string;
}
