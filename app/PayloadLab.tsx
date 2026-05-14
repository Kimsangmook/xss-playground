"use client";

import { useMemo, useState } from "react";
import type { IPayloadExample } from "@/lib/scenarios";
import { Log, useLog } from "@/app/Log";

interface IPayloadLabProps {
  payloads: IPayloadExample[];
  previewMode?: "srcdoc" | "innerHTML";
}

const buildSrcDoc = (payload: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: system-ui, sans-serif; padding: 16px; color: #111; }
      a, button { font: inherit; }
    </style>
  </head>
  <body>
    <p style="color:#555;font-size:12px">isolated preview</p>
    ${payload}
  </body>
</html>`;

export const PayloadLab = ({
  payloads,
  previewMode = "srcdoc",
}: IPayloadLabProps) => {
  const { lines, push, clear } = useLog();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [customPayload, setCustomPayload] = useState(payloads[0]?.value ?? "");
  const [previewPayload, setPreviewPayload] = useState("");
  const [renderKey, setRenderKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const selected = payloads[selectedIdx];
  const srcDoc = useMemo(() => buildSrcDoc(previewPayload), [previewPayload]);

  const selectPayload = (idx: number) => {
    setSelectedIdx(idx);
    setCustomPayload(payloads[idx]?.value ?? "");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(customPayload);
    setCopied(true);
    push("payload copied");
    window.setTimeout(() => setCopied(false), 1400);
  };

  const render = () => {
    setPreviewPayload(customPayload);
    setRenderKey((v) => v + 1);
    push(
      previewMode === "srcdoc"
        ? "isolated iframe preview rendered"
        : "dangerouslySetInnerHTML preview rendered"
    );
  };

  return (
    <>
      <h2>페이로드</h2>
      <div className="card">
        <strong>복사할 payload</strong>
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
          onChange={(e) => setCustomPayload(e.target.value)}
          spellCheck={false}
        />
        <div className="actions">
          <button onClick={copy}>{copied ? "복사됨!" : "페이로드 복사"}</button>
          <button className="danger" onClick={render}>
            격리 미리보기 실행
          </button>
          <button onClick={clear}>로그 초기화</button>
        </div>
      </div>

      <h2>미리보기</h2>
      <div className="callout danger">
        미리보기는 학습용으로 의도적으로 unsafe 렌더링을 수행합니다. 실제
        서비스에서는 이 payload 가 텍스트로 이스케이프되거나 제거되어야 합니다.
      </div>
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

      <h2>로그</h2>
      <Log lines={lines} />
    </>
  );
};
