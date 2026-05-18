"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { IPayloadExample } from "@/lib/scenarios";
import { Log, useLog } from "@/app/Log";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";

interface IPayloadLabProps {
  payloads: IPayloadExample[];
  previewMode?: "srcdoc" | "innerHTML";
}

const buildSrcDoc = (payload: string, previewLabel: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: system-ui, sans-serif; padding: 16px; color: #111; }
      a, button { font: inherit; }
    </style>
  </head>
  <body>
    <p style="color:#555;font-size:12px">${previewLabel}</p>
    ${payload}
  </body>
</html>`;

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

const TEXT: Record<
  Locale,
  {
    payloadHeading: string;
    payloadLabel: string;
    copied: string;
    copy: string;
    render: string;
    clearLog: string;
    previewHeading: string;
    previewWarning: string;
    isolatedPreviewLabel: string;
    logHeading: string;
    copiedLog: string;
    srcdocLog: string;
    innerHtmlLog: string;
  }
> = {
  ko: {
    payloadHeading: "페이로드",
    payloadLabel: "복사할 payload",
    copied: "복사됨!",
    copy: "페이로드 복사",
    render: "격리 미리보기 실행",
    clearLog: "로그 초기화",
    previewHeading: "미리보기",
    previewWarning:
      "미리보기는 학습용으로 의도적으로 unsafe 렌더링을 수행합니다. 실제 서비스에서는 이 payload 가 텍스트로 이스케이프되거나 제거되어야 합니다.",
    isolatedPreviewLabel: "격리 미리보기",
    logHeading: "로그",
    copiedLog: "payload copied",
    srcdocLog: "isolated iframe preview rendered",
    innerHtmlLog: "dangerouslySetInnerHTML preview rendered",
  },
  en: {
    payloadHeading: "Payload",
    payloadLabel: "Payload to copy",
    copied: "Copied!",
    copy: "Copy payload",
    render: "Run isolated preview",
    clearLog: "Clear log",
    previewHeading: "Preview",
    previewWarning:
      "The preview intentionally performs unsafe rendering for learning. In a real service, this payload should be escaped as text or removed.",
    isolatedPreviewLabel: "isolated preview",
    logHeading: "Log",
    copiedLog: "payload copied",
    srcdocLog: "isolated iframe preview rendered",
    innerHtmlLog: "dangerouslySetInnerHTML preview rendered",
  },
  ja: {
    payloadHeading: "Payload",
    payloadLabel: "コピーする payload",
    copied: "コピー済み!",
    copy: "Payload をコピー",
    render: "隔離プレビューを実行",
    clearLog: "ログをクリア",
    previewHeading: "プレビュー",
    previewWarning:
      "このプレビューは学習用に意図的に unsafe rendering を行います。実サービスでは payload はテキストとしてエスケープされるか除去されるべきです。",
    isolatedPreviewLabel: "隔離プレビュー",
    logHeading: "ログ",
    copiedLog: "payload をコピーしました",
    srcdocLog: "隔離 iframe preview を描画しました",
    innerHtmlLog: "dangerouslySetInnerHTML preview を描画しました",
  },
  zh: {
    payloadHeading: "Payload",
    payloadLabel: "要复制的 payload",
    copied: "已复制!",
    copy: "复制 payload",
    render: "运行隔离预览",
    clearLog: "清空日志",
    previewHeading: "预览",
    previewWarning:
      "此预览为了学习目的故意执行 unsafe rendering。真实服务中，该 payload 应被转义为文本或移除。",
    isolatedPreviewLabel: "隔离预览",
    logHeading: "日志",
    copiedLog: "payload 已复制",
    srcdocLog: "隔离 iframe 预览已渲染",
    innerHtmlLog: "dangerouslySetInnerHTML 预览已渲染",
  },
};

export const PayloadLab = ({
  payloads,
  previewMode = "srcdoc",
}: IPayloadLabProps) => {
  const params = useParams<{ locale?: string }>();
  const t = TEXT[pickLocale(params?.locale)];
  const { lines, push, clear } = useLog();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [customPayload, setCustomPayload] = useState(payloads[0]?.value ?? "");
  const [previewPayload, setPreviewPayload] = useState("");
  const [renderKey, setRenderKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const selected = payloads[selectedIdx];
  const srcDoc = useMemo(
    () => buildSrcDoc(previewPayload, t.isolatedPreviewLabel),
    [previewPayload, t.isolatedPreviewLabel]
  );

  const selectPayload = (idx: number) => {
    setSelectedIdx(idx);
    setCustomPayload(payloads[idx]?.value ?? "");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(customPayload);
    setCopied(true);
    push(t.copiedLog);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const render = () => {
    setPreviewPayload(customPayload);
    setRenderKey(v => v + 1);
    push(previewMode === "srcdoc" ? t.srcdocLog : t.innerHtmlLog);
  };

  return (
    <>
      <h2>{t.payloadHeading}</h2>
      <div className="card">
        <strong>{t.payloadLabel}</strong>
        <div className="actions">
          {payloads.map((payload, idx) => (
            <button
              key={payload.label}
              onClick={() => selectPayload(idx)}
              style={
                selectedIdx === idx
                  ? { borderColor: "var(--accent)", color: "var(--accent)" }
                  : undefined
              }
            >
              {payload.label}
            </button>
          ))}
        </div>
        {selected?.note && (
          <p style={{ color: "var(--text-dim)", margin: "6px 0" }}>
            {selected.note}
          </p>
        )}
        <textarea
          className="payload-editor"
          value={customPayload}
          onChange={e => setCustomPayload(e.target.value)}
          spellCheck={false}
        />
        <div className="actions">
          <button onClick={copy}>{copied ? t.copied : t.copy}</button>
          <button className="danger" onClick={render}>
            {t.render}
          </button>
          <button onClick={clear}>{t.clearLog}</button>
        </div>
      </div>

      <h2>{t.previewHeading}</h2>
      <div className="callout danger">{t.previewWarning}</div>
      {previewMode === "srcdoc" ? (
        <iframe
          key={renderKey}
          title="isolated payload preview"
          sandbox="allow-scripts allow-modals allow-forms"
          srcDoc={srcDoc}
          width="100%"
          height="220"
          className="payload-frame"
        />
      ) : (
        <div
          key={renderKey}
          className="payload-preview"
          dangerouslySetInnerHTML={{ __html: previewPayload }}
        />
      )}

      <h2>{t.logHeading}</h2>
      <Log lines={lines} />
    </>
  );
};
