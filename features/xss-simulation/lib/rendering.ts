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
 * - 부모 시뮬레이터로 effect 발생을 알리기 위해 alert / form submit / window.open 시도를
 *   가로채 postMessage 로 보고한다. 격리는 iframe 측 sandbox 속성으로 처리한다.
 */
export const buildPreviewDocument = (rawHtml: string, origin: string) => `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<base href="${origin}/">
<style>
  html, body { margin: 0; padding: 0; background: #fff; color: #111; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; line-height: 1.5; }
  body { padding: 10px 12px; }
  iframe, img { max-width: 100%; }
</style>
<script>
(function () {
  var post = function (kind, detail) {
    try { parent.postMessage({ __xssSim: true, kind: kind, detail: detail }, "*"); } catch (e) {}
  };
  var origAlert = window.alert;
  window.alert = function (msg) {
    post("alert", String(msg));
    try { origAlert.call(window, msg); } catch (e) {}
  };
  var origOpen = window.open;
  window.open = function (url) {
    post("popup", String(url || ""));
    return origOpen.apply(window, arguments);
  };
  document.addEventListener("submit", function (e) {
    var f = e.target;
    post("form", { action: f && f.action, method: f && f.method });
  }, true);
  // top/parent.location 변경 시도 가로채기: allow-top-navigation 이 있어도
  // 시뮬레이터까지 효과를 한 번 보고해서 lastEvent 라벨로 보여준다.
  // 이후 실제 navigation 은 sandbox 가 처리.
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest("a[href]");
    if (a) post("navigate", { href: a.href, target: a.target || "_self" });
  }, true);
  window.addEventListener("error", function (e) { post("error", String(e.message || "")); });
  window.addEventListener("beforeunload", function () { post("unload", String(location.href || "")); });
})();
</script>
</head>
<body>${rawHtml}</body>
</html>`;

