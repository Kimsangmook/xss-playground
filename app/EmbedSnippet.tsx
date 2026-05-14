"use client";

import { useEffect, useState } from "react";

interface IEmbedSnippetProps {
  slug: string;
}

const SANDBOX_OPTIONS = [
  { label: "sandbox 없음 (현재 알렌 정책에 해당)", value: null },
  { label: 'sandbox=""', value: "" },
  { label: 'sandbox="allow-scripts"', value: "allow-scripts" },
  {
    label: 'sandbox="allow-scripts allow-same-origin"',
    value: "allow-scripts allow-same-origin",
  },
  {
    label: 'sandbox="allow-scripts allow-top-navigation"',
    value: "allow-scripts allow-top-navigation",
  },
  {
    label: 'sandbox="allow-scripts allow-forms allow-popups"',
    value: "allow-scripts allow-forms allow-popups",
  },
];

export const EmbedSnippet = ({ slug }: IEmbedSnippetProps) => {
  const [origin, setOrigin] = useState<string>("");
  const [sandboxIdx, setSandboxIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const sandbox = SANDBOX_OPTIONS[sandboxIdx]?.value ?? null;
  const url = `${origin || "https://YOUR-VERCEL-URL"}/scenarios/${slug}`;
  const sandboxAttr =
    sandbox === null ? "" : sandbox === "" ? " sandbox" : ` sandbox="${sandbox}"`;
  const snippet = `<iframe src="${url}"${sandboxAttr} width="600" height="400"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card">
      <strong>임베드 스니펫</strong>
      <div className="actions" style={{ marginTop: 10 }}>
        {SANDBOX_OPTIONS.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSandboxIdx(i)}
            style={
              sandboxIdx === i
                ? { borderColor: "var(--accent)", color: "var(--accent)" }
                : undefined
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
      <pre>{snippet}</pre>
      <div className="actions">
        <button onClick={handleCopy}>
          {copied ? "복사됨!" : "스니펫 복사"}
        </button>
      </div>
    </div>
  );
};
