import { DEFAULT_LOCALE, type Locale } from "@/i18n/types";
import { findScenario } from "@/lib/scenarios";
import type { IScenarioPageI18n } from "./types";

import { I18N as autoDownload } from "./auto-download/i18n";
import { I18N as autoplayMedia } from "./autoplay-media/i18n";
import { I18N as beaconExfil } from "./beacon-exfil/i18n";
import { I18N as blindXssWorkflow } from "./blind-xss-workflow/i18n";
import { I18N as chainedAttack } from "./chained-attack/i18n";
import { I18N as clipboardHijack } from "./clipboard-hijack/i18n";
import { I18N as cssContextInjection } from "./css-context-injection/i18n";
import { I18N as csrfImage } from "./csrf-image/i18n";
import { I18N as dataUrlWrapper } from "./data-url-wrapper/i18n";
import { I18N as delayedAttack } from "./delayed-attack/i18n";
import { I18N as domInnerhtmlSink } from "./dom-innerhtml-sink/i18n";
import { I18N as encodedProtocolBypass } from "./encoded-protocol-bypass/i18n";
import { I18N as eventHandlerAttribute } from "./event-handler-attribute/i18n";
import { I18N as fileUploadPreviewXss } from "./file-upload-preview-xss/i18n";
import { I18N as formAutoSubmit } from "./form-auto-submit/i18n";
import { I18N as fullscreenOverlay } from "./fullscreen-overlay/i18n";
import { I18N as historyPollution } from "./history-pollution/i18n";
import { I18N as javascriptUrl } from "./javascript-url/i18n";
import { I18N as jsContextBreakout } from "./js-context-breakout/i18n";
import { I18N as markdownLinkXss } from "./markdown-link-xss/i18n";
import { I18N as notificationPermission } from "./notification-permission/i18n";
import { I18N as parentMessageListenerProbe } from "./parent-message-listener-probe/i18n";
import { I18N as phishingForm } from "./phishing-form/i18n";
import { I18N as popupSpam } from "./popup-spam/i18n";
import { I18N as postMessage } from "./post-message/i18n";
import { I18N as profileRenderingXss } from "./profile-rendering-xss/i18n";
import { I18N as scriptTagInjection } from "./script-tag-injection/i18n";
import { I18N as sopProbe } from "./sop-probe/i18n";
import { I18N as svgOnload } from "./svg-onload/i18n";
import { I18N as tokenExfil } from "./token-exfil/i18n";
import { I18N as topRedirect } from "./top-redirect/i18n";

export const SCENARIO_I18N: Record<
  string,
  Record<Locale, IScenarioPageI18n>
> = {
  "script-tag-injection": scriptTagInjection,
  "event-handler-attribute": eventHandlerAttribute,
  "javascript-url": javascriptUrl,
  "svg-onload": svgOnload,
  "dom-innerhtml-sink": domInnerhtmlSink,
  "js-context-breakout": jsContextBreakout,
  "css-context-injection": cssContextInjection,
  "encoded-protocol-bypass": encodedProtocolBypass,
  "data-url-wrapper": dataUrlWrapper,
  "markdown-link-xss": markdownLinkXss,
  "file-upload-preview-xss": fileUploadPreviewXss,
  "profile-rendering-xss": profileRenderingXss,
  "blind-xss-workflow": blindXssWorkflow,
  "top-redirect": topRedirect,
  "post-message": postMessage,
  "phishing-form": phishingForm,
  "auto-download": autoDownload,
  "popup-spam": popupSpam,
  "autoplay-media": autoplayMedia,
  "notification-permission": notificationPermission,
  "clipboard-hijack": clipboardHijack,
  "fullscreen-overlay": fullscreenOverlay,
  "history-pollution": historyPollution,
  "sop-probe": sopProbe,
  "form-auto-submit": formAutoSubmit,
  "beacon-exfil": beaconExfil,
  "csrf-image": csrfImage,
  "token-exfil": tokenExfil,
  "parent-message-listener-probe": parentMessageListenerProbe,
  "delayed-attack": delayedAttack,
  "chained-attack": chainedAttack,
};

export const getScenarioI18n = (
  locale: Locale,
  slug: string
): IScenarioPageI18n | null => {
  const scenario = findScenario(slug);
  const localized = SCENARIO_I18N[slug]?.[locale];
  const fallback = SCENARIO_I18N[slug]?.[DEFAULT_LOCALE];
  const source = localized ?? fallback;

  if (!source && !scenario) return null;

  return {
    title: source?.title ?? scenario?.title ?? slug,
    summary: source?.summary ?? scenario?.summary ?? "",
    checks: source?.checks ?? scenario?.checks,
    payloads: source?.payloads ?? scenario?.payloads,
    actionsHeading: source?.actionsHeading,
    explanationHeading: source?.explanationHeading,
    buttons: source?.buttons,
    actionLabels: source?.actionLabels,
    log: source?.log,
    logMessages: source?.logMessages,
    text: source?.text,
    notification: source?.notification,
    explanation: source?.explanation,
  };
};
