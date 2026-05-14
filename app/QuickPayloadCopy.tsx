"use client";

import { useState } from "react";

interface IQuickPayloadCopyProps {
  payload: string;
  title: string;
}

export const QuickPayloadCopy = ({ payload, title }: IQuickPayloadCopyProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="quick-copy">
      <pre aria-label={`${title} payload snippet`}>{payload}</pre>
      <button onClick={copy}>{copied ? "복사됨!" : "페이로드 복사"}</button>
    </div>
  );
};
