"use client";

import { useEffect, useRef, useState } from "react";

export interface IEmbedAction {
  label: string;
  danger?: boolean;
  run: (push: (s: string) => void) => void | Promise<void>;
}

interface IEmbedShellProps {
  title: string;
  /** 액션 버튼 목록 */
  actions: IEmbedAction[];
  /** URL 의 ?auto=1 일 때 자동으로 호출할 액션 인덱스 (기본 0) */
  autoIndex?: number;
  /** 추가 UI (폼, 비디오 등) */
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

export const EmbedShell = ({
  title,
  actions,
  autoIndex = 0,
  children,
}: IEmbedShellProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const logRef = useRef<HTMLPreElement>(null);
  const params = useSearchParams();

  const push = (msg: string) => {
    const t = new Date().toISOString().slice(11, 19);
    setLines((p) => [...p, `[${t}] ${msg}`]);
  };
  const clear = () => setLines([]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  // ?auto=1 자동 실행, ?delay=N 지연
  useEffect(() => {
    const auto = params.get("auto");
    if (!auto) return;
    const idx = /^\d+$/.test(auto) ? Number(auto) : autoIndex;
    const delay = Number(params.get("delay") ?? 0);

    push(`auto=${auto} delay=${delay}s — 자동 실행 예약`);
    if (delay <= 0) {
      void actions[idx]?.run(push);
      return;
    }
    setRemaining(delay);
    const id = setInterval(() => {
      setRemaining((r) => {
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
        <strong>{title}</strong>
        <span className="embed-badge">EMBEDDED</span>
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
        <button onClick={clear}>clear</button>
      </div>

      {children && <div className="embed-extra">{children}</div>}

      <pre ref={logRef} className="log embed-log">
        {lines.length === 0 ? "// 로그 없음" : lines.join("\n")}
      </pre>
    </div>
  );
};
