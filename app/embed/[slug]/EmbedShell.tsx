"use client";

import { useEffect, useRef, useState } from "react";
import { getDictionary } from "@/i18n";
import { getScenarioI18n } from "@/app/[locale]/scenarios/i18nRegistry";
import { useEmbedContext } from "./EmbedContext";

export interface IEmbedAction {
  label: string;
  danger?: boolean;
  run: (push: (s: string) => void) => void | Promise<void>;
}

interface IEmbedShellProps {
  title: string;
  actions: IEmbedAction[];
  autoIndex?: number;
  children?: React.ReactNode;
}

const useSearchParams = () => {
  const [params, setParams] = useState<URLSearchParams>(
    () => new URLSearchParams()
  );
  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, []);
  return params;
};

const TEXT = {
  ko: {
    clear: "지우기",
    empty: "// 로그 없음",
    autoScheduled: "자동 실행 예약",
  },
  en: {
    clear: "clear",
    empty: "// no logs",
    autoScheduled: "auto-fire scheduled",
  },
  ja: {
    clear: "クリア",
    empty: "// ログなし",
    autoScheduled: "自動実行を予約",
  },
  zh: { clear: "清除", empty: "// 无日志", autoScheduled: "已安排自动执行" },
} as const;

export const EmbedShell = ({
  title,
  actions,
  autoIndex = 0,
  children,
}: IEmbedShellProps) => {
  const { slug, locale } = useEmbedContext();
  const dict = getDictionary(locale);
  const localizedTitle =
    (slug && getScenarioI18n(locale, slug)?.title) ?? title;
  const t = TEXT[locale];
  const badge = dict.scenarioPage.embeddedBadge;

  const [lines, setLines] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const logRef = useRef<HTMLPreElement>(null);
  const params = useSearchParams();

  const push = (msg: string) => {
    const ts = new Date().toISOString().slice(11, 19);
    setLines(p => [...p, `[${ts}] ${msg}`]);
  };
  const clear = () => setLines([]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const auto = params.get("auto");
    if (!auto) return;
    const idx = /^\d+$/.test(auto) ? Number(auto) : autoIndex;
    const delay = Number(params.get("delay") ?? 0);

    push(`auto=${auto} delay=${delay}s — ${t.autoScheduled}`);
    if (delay <= 0) {
      void actions[idx]?.run(push);
      return;
    }
    setRemaining(delay);
    const id = setInterval(() => {
      setRemaining(r => {
        if (r === null) return null;
        if (r <= 1) {
          clearInterval(id);
          void actions[idx]?.run(push);
          return null;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="embed-page">
      <div className="embed-header">
        <strong>{localizedTitle}</strong>
        <span className="embed-badge">{badge}</span>
        {remaining !== null && (
          <span className="embed-countdown">{remaining}s</span>
        )}
      </div>

      <div className="embed-actions">
        {actions.map((a, i) => (
          <button
            key={i}
            className={a.danger ? "danger" : ""}
            onClick={() => void a.run(push)}
          >
            {a.label}
          </button>
        ))}
        <button onClick={clear}>{t.clear}</button>
      </div>

      {children && <div className="embed-extra">{children}</div>}

      <pre ref={logRef} className="log embed-log">
        {lines.length === 0 ? t.empty : lines.join("\n")}
      </pre>
    </div>
  );
};
