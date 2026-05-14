"use client";

import { useEffect, useRef, useState } from "react";
import { SCENARIOS } from "@/lib/scenarios";

const EMBEDDABLE_SCENARIOS = SCENARIOS.filter(
  (scenario) => (scenario.surface ?? "iframe") === "iframe"
);

const SANDBOX_PRESETS = [
  { label: "sandbox 없음", value: null },
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

const EmbedHelperPage = () => {
  const [scenarioSlug, setScenarioSlug] = useState(EMBEDDABLE_SCENARIOS[0].slug);
  const [sandboxIdx, setSandboxIdx] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const msg = `[message] origin=${e.origin} data=${JSON.stringify(e.data).slice(0, 200)}`;
      setMessages((prev) => [...prev, msg]);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const sandbox = SANDBOX_PRESETS[sandboxIdx]?.value ?? null;
  const src = `/embed/${scenarioSlug}`;

  const sandboxProps =
    sandbox === null ? {} : sandbox === "" ? { sandbox: "" } : { sandbox };

  return (
    <>
      <h1>부모 페이지 임베드 헬퍼</h1>
      <p className="summary">
        이 페이지가 테스트 대상 서비스의 부모 페이지 역할을 합니다. 시나리오와
        sandbox 조합을 바꿔가며 실제 어떤 차이가 나는지 한 페이지에서 비교할 수
        있습니다.
      </p>

      <div className="callout">
        실제 서비스의 대응을 검증하려면 이 헬퍼가 아니라 해당 서비스의 에디터,
        위키, CMS, 댓글 영역처럼 HTML 이 렌더링되는 위치에 시나리오 iframe 을
        직접 붙여 넣으세요. 이 헬퍼는 sandbox 옵션 자체의 효과를 빠르게 비교하는
        용도입니다.
      </div>

      <h2>설정</h2>
      <div className="kv">
        <div className="k">시나리오</div>
        <div>
          <select
            value={scenarioSlug}
            onChange={(e) => setScenarioSlug(e.target.value)}
            style={{
              background: "var(--bg-elev-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              padding: "8px 10px",
              borderRadius: 6,
              width: "100%",
            }}
          >
            {EMBEDDABLE_SCENARIOS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="k">sandbox</div>
        <div>
          <div className="actions" style={{ margin: 0 }}>
            {SANDBOX_PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => setSandboxIdx(i)}
                style={
                  sandboxIdx === i
                    ? { borderColor: "var(--accent)", color: "var(--accent)" }
                    : undefined
                }
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <h2>iframe</h2>
      <iframe
        ref={iframeRef}
        key={`${scenarioSlug}-${sandboxIdx}`}
        src={src}
        width="100%"
        height="420"
        style={{ border: "1px solid var(--border)", borderRadius: 6 }}
        {...sandboxProps}
      />

      <h2>부모 message 리스너 로그</h2>
      <button onClick={() => setMessages([])}>로그 초기화</button>
      <pre style={{ marginTop: 10 }}>
        {messages.length === 0 ? "// 메시지 없음" : messages.join("\n")}
      </pre>
    </>
  );
};

export default EmbedHelperPage;
