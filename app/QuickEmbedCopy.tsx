"use client";

import { useEffect, useState } from "react";
import { SITE_URL } from "@/lib/site";

interface IQuickEmbedCopyProps {
  slug: string;
  title: string;
}

const escapeAttribute = (value: string) => value.replace(/"/g, "&quot;");

export const QuickEmbedCopy = ({ slug, title }: IQuickEmbedCopyProps) => {
  const [origin, setOrigin] = useState(SITE_URL);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = `${origin}/embed/${slug}`;
  const snippet = `<iframe src="${url}" title="XSS Playground - ${escapeAttribute(title)}" width="600" height="420" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

  const copy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="quick-copy">
      <pre aria-label={`${title} embed snippet`}>{snippet}</pre>
      <button onClick={copy}>{copied ? "복사됨!" : "임베드 복사"}</button>
    </div>
  );
};
