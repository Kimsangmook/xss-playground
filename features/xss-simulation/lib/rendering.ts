import type { FilterMode, PayloadEffect, RenderContext } from "../model/types";

export const makeRank = (value: number) =>
  `m:${value.toString(36).padStart(6, "0")}`;

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const applyFilter = (input: string, mode: FilterMode) => {
  if (mode === "escapeHtml") return escapeHtml(input);
  if (mode === "stripScript") return input.replace(/<\/?script[^>]*>/gi, "");
  if (mode === "stripParens") return input.replace(/[()]/g, "");
  return input;
};

export const renderHtml = (
  input: string,
  context: RenderContext,
  filter: FilterMode,
) => {
  const value = applyFilter(input, filter);
  if (context === "input") return `<input type="name" value="${value}">`;
  if (context === "textarea") return `<textarea>${value}</textarea>`;
  if (context === "script") {
    return `<script>\n  window.profile = ${value}\n</script>`;
  }
  return `<div class="comment">${value}</div>`;
};

export const buildRenderCode = (
  context: RenderContext,
  filter: FilterMode,
) => {
  const filterLine =
    filter === "escapeHtml"
      ? "  input = escapeHtml(input)"
      : filter === "stripScript"
        ? "  input = input.replace(/<\\/?script[^>]*>/gi, '')"
        : filter === "stripParens"
          ? "  input = input.replace(/[()]/g, '')"
          : "  // no output encoding";

  const returnLine =
    context === "input"
      ? '  return \'<input type="name" value="\' + input + \'">\''
      : context === "textarea"
        ? "  return '<textarea>' + input + '</textarea>'"
        : context === "script"
          ? "  return '<script>window.profile = ' + input + '</script>'"
          : "  return '<div class=\"comment\">' + input + '</div>'";

  return `function render(input) {\n${filterLine}\n${returnLine}\n}`;
};

export const hasExecutablePayload = (html: string, unsafeSink: boolean) => {
  if (!unsafeSink) return false;
  const normalized = html.toLowerCase();
  return (
    /<script[\s>]/i.test(html) ||
    /\son[a-z]+\s*=/i.test(html) ||
    /javascript\s*:/i.test(html) ||
    /<iframe\b[^>]*\bsrcdoc\s*=/i.test(html) ||
    /<iframe\b[^>]*\bsrc\s*=\s*(["'])[^"']*\/embed\/[^"']+\1/i.test(html) ||
    /alert\s*(\(|`|&#40;|&lpar;)/i.test(html) ||
    /postmessage\s*\(/i.test(html) ||
    normalized.includes("</textarea><") ||
    normalized.includes("<svg")
  );
};

const embedEffectBySlug: Record<string, PayloadEffect> = {
  "top-redirect": "navigation",
  "post-message": "message",
  "parent-message-listener-probe": "message",
  "form-auto-submit": "form",
  "beacon-exfil": "network",
  "csrf-image": "network",
  "token-exfil": "probe",
  "phishing-form": "phishing",
  "fullscreen-overlay": "phishing",
  "delayed-attack": "delayed",
  "chained-attack": "delayed",
};

const getEmbedSlug = (html: string) => {
  const src = html.match(/<iframe\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
  return src?.split("/embed/")[1]?.split(/[?#'"]/)[0] ?? null;
};

export const inferPayloadEffect = (
  html: string,
  unsafeSink: boolean,
): PayloadEffect | null => {
  if (!unsafeSink) return null;

  const normalized = html.toLowerCase();
  const embedSlug = getEmbedSlug(html);
  if (embedSlug) return embedEffectBySlug[embedSlug] ?? "iframe";
  if (normalized.includes("postmessage(")) return "message";
  if (normalized.includes("sendbeacon(") || normalized.includes("fetch(")) {
    return "network";
  }
  if (/<form\b/i.test(html)) return "form";
  if (/javascript\s*:/i.test(html)) return "interaction";
  if (/alert\s*(\(|`|&#40;|&lpar;)/i.test(html)) return "alert";
  if (/<iframe\b/i.test(html)) return "iframe";
  if (/<script[\s>]/i.test(html) || /\son[a-z]+\s*=/i.test(html)) {
    return "probe";
  }

  return null;
};

export const absolutizeEmbedUrls = (html: string, origin: string) =>
  html.replace(
    /(<iframe\b[^>]*\bsrc\s*=\s*)(["'])\/embed\//gi,
    `$1$2${origin}/embed/`,
  );

/**
 * sandbox iframe srcDoc 으로 들어갈 라이브 프리뷰 HTML 문서를 만든다.
 *
 * - rawHtml 은 가공/escape 하지 않고 그대로 body 에 주입한다 (취약 sink 시뮬레이션 목적).
 * - <base href="{origin}/"> 로 상대 경로(/embed/...) 가 사이트 origin 으로 해석되게 한다.
 * - parent 시뮬레이터로 effect 발생을 알리기 위해 alert / postMessage / form submit /
 *   window.open / top navigation 시도를 가로채서 message 로 보낸다 (event.origin === "null").
 *
 * 격리는 iframe 측 sandbox 속성 (allow-scripts allow-modals ...)로 처리하며,
 * 이 함수가 만드는 문서 자체는 평범한 HTML 문서다.
 */
export const buildPreviewDocument = (rawHtml: string, origin: string) => `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<base href="${origin}/">
<style>
  html, body { margin: 0; padding: 0; background: transparent; color: #111; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; line-height: 1.5; }
  body { padding: 8px 10px; }
  iframe { max-width: 100%; }
  img { max-width: 100%; }
</style>
<script>
(function () {
  var post = function (kind, detail) {
    try { parent.postMessage({ __xssSim: true, kind: kind, detail: detail }, "*"); } catch (e) {}
  };
  var origAlert = window.alert;
  window.alert = function (msg) { post("alert", String(msg)); try { origAlert.call(window, msg); } catch (e) {} };
  var origOpen = window.open;
  window.open = function (url) { post("popup", String(url || "")); return origOpen.apply(window, arguments); };
  document.addEventListener("submit", function (e) {
    var f = e.target;
    post("form", { action: f && f.action, method: f && f.method });
  }, true);
  // top navigation 시도 감지: sandbox 가 막더라도 시도 자체는 보고
  try {
    var topProxy = new Proxy({}, { set: function (_t, k, v) { post("topNav", { key: String(k), value: String(v) }); return true; } });
    Object.defineProperty(window, "__topProbe", { value: topProxy });
  } catch (e) {}
  window.addEventListener("error", function (e) { post("error", String(e.message || "")); });
})();
</script>
</head>
<body>${rawHtml}</body>
</html>`;

const describeIframe = (attributes: string) => {
  const src = attributes.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
  if (/srcdoc\s*=/i.test(attributes)) return "[iframe srcdoc]";
  if (src?.startsWith("data:")) return "[iframe data URL]";
  if (src?.includes("/embed/")) {
    const slug = src.split("/embed/")[1]?.split(/[?#'"]/)[0];
    return slug ? `[iframe: ${slug}]` : "[iframe embed]";
  }
  return "[iframe]";
};

export const stripTagsForPreview = (html: string) =>
  html
    .replace(/<iframe\b([^>]*)>\s*<\/iframe>/gi, (_match, attributes: string) =>
      describeIframe(attributes)
    )
    .replace(/<iframe\b([^>]*)>/gi, (_match, attributes: string) =>
      describeIframe(attributes)
    )
    .replace(/<script[\s\S]*?<\/script>/gi, "[script]")
    .replace(/<[^>]+>/g, "");
