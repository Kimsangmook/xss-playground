"use client";

import { useEffect, useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { SITE_URL } from "@/lib/site";

interface IEmbedSnippetProps {
  slug: string;
}

const SANDBOX_OPTIONS = [
  { label: "sandbox 없음 (기본 동작 확인)", value: null },
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
  const [origin, setOrigin] = useState<string>(SITE_URL);
  const [sandboxIdx, setSandboxIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const scenario = findScenario(slug);

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const sandbox = SANDBOX_OPTIONS[sandboxIdx]?.value ?? null;
  const url = `${origin}/embed/${slug}`;
  const sandboxAttr =
    sandbox === null ? "" : sandbox === "" ? " sandbox" : ` sandbox="${sandbox}"`;
  const snippet = `<iframe src="${url}" title="XSS Playground - ${scenario?.title ?? slug}"${sandboxAttr} width="600" height="420" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card" data-only-standalone>
      <strong>임베드 스니펫</strong>
      <p style={{ color: "var(--text-dim)", margin: "6px 0 0" }}>
        이 코드는 임베드 전용 페이지(<code>/embed/{slug}</code>)를 사용합니다.
        본인 서비스에 그대로 붙여 넣고 렌더링/차단 여부를 확인하세요.
      </p>
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
