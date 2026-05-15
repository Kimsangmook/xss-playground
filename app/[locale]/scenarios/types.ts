import type { IPayloadExample } from "@/lib/scenarios";

export type IScenarioTextMap = Record<string, string>;

export interface IScenarioPageI18n {
  title: string;
  summary: string;
  checks?: string[];
  payloads?: IPayloadExample[];
  actionsHeading?: string;
  explanationHeading?: string;
  buttons?: IScenarioTextMap;
  actionLabels?: IScenarioTextMap;
  log?: IScenarioTextMap;
  logMessages?: IScenarioTextMap;
  text?: IScenarioTextMap;
  notification?: {
    title: string;
    body: string;
  };
  explanation?: string[];
}

