"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/types";
import styles from "./XssSimulationBoard.module.css";

import type {
  FilterMode,
  IFlowToggles,
  IPayloadPreset,
  ISimWindow,
  PayloadEffect,
  RenderContext,
  WindowId,
} from "../model/types";
import {
  FILTER_LABELS,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  RENDER_CONTEXT_LABELS,
  SCENARIO_PRESETS,
  SIM_TEXT,
  initialWindows,
  toggleLabels,
  windowOrder,
} from "../model/constants";
import { PAYLOAD_PRESETS } from "../model/payloadPresets";
import {
  buildPath,
  getAnchor,
  getFlowEdges,
  getInactiveWindows,
  midpoint,
} from "../lib/flow";
import {
  absolutizeEmbedUrls,
  buildPreviewDocument,
  buildRenderCode,
  escapeHtml,
  inferPayloadEffect,
  makeRank,
  renderHtml,
  stripTagsForPreview,
} from "../lib/rendering";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes
    .filter(Boolean)
    .map((className) => styles[className as string] ?? className)
    .join(" ");

const effectLabels: Record<PayloadEffect, Record<Locale, string>> = {
  alert: {
    ko: "alert 실행",
    en: "alert fired",
    ja: "alert 実行",
    zh: "alert 已执行",
  },
  interaction: {
    ko: "사용자 클릭/submit 필요",
    en: "user click or submit required",
    ja: "ユーザーの click/submit が必要",
    zh: "需要用户 click/submit",
  },
  message: {
    ko: "postMessage 전송",
    en: "postMessage sent",
    ja: "postMessage 送信",
    zh: "postMessage 已发送",
  },
  navigation: {
    ko: "top navigation 시도",
    en: "top navigation attempted",
    ja: "top navigation 試行",
    zh: "已尝试 top navigation",
  },
  form: {
    ko: "form submit 시도",
    en: "form submit attempted",
    ja: "form submit 試行",
    zh: "已尝试 form submit",
  },
  network: {
    ko: "네트워크 요청 시도",
    en: "network request attempted",
    ja: "network request 試行",
    zh: "已尝试网络请求",
  },
  phishing: {
    ko: "피싱 UI 렌더",
    en: "phishing UI rendered",
    ja: "phishing UI 表示",
    zh: "已渲染钓鱼 UI",
  },
  probe: {
    ko: "권한/토큰 probe 시도",
    en: "probe attempted",
    ja: "probe 試行",
    zh: "已尝试 probe",
  },
  delayed: {
    ko: "지연/체인 흐름 준비",
    en: "delayed chain staged",
    ja: "遅延/chain 準備",
    zh: "已准备延迟/链式流程",
  },
  iframe: {
    ko: "iframe 문서 로드",
    en: "iframe document loaded",
    ja: "iframe document 読み込み",
    zh: "iframe 文档已加载",
  },
};

interface IXssSimulationBoardProps {
  locale: Locale;
}

export const XssSimulationBoard = ({ locale }: IXssSimulationBoardProps) => {
  const t = SIM_TEXT[locale];

  const [windows, setWindows] = useState<Record<WindowId, ISimWindow>>(
    initialWindows
  );
  const [rankSeed, setRankSeed] = useState(5);
  const [activeWindow, setActiveWindow] = useState<WindowId>("client");
  const [payload, setPayload] = useState(PAYLOAD_PRESETS[0].payload);
  /**
   * Submit 버튼을 눌러야 draft payload 가 흐름으로 commit 된다.
   * dbValue / serverOutput / clientHtml 등 모든 derived 값은 committedPayload 기준으로 계산.
   * 초기에는 빈 문자열이라 db/server/client 창이 비어있다가 첫 Submit 후부터 흘러간다.
   */
  const [committedPayload, setCommittedPayload] = useState("");
  const [activePreset, setActivePreset] = useState<IPayloadPreset | null>(
    PAYLOAD_PRESETS[0]
  );
  const [toggles, setToggles] = useState<IFlowToggles>(
    PAYLOAD_PRESETS[0].toggles
  );
  const [renderContext, setRenderContext] = useState<RenderContext>("div");
  const [filterMode, setFilterMode] = useState<FilterMode>("none");
  const [pulseEdge, setPulseEdge] = useState<number | null>(null);
  const [lastEvent, setLastEvent] = useState(t.idle);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    document.body.classList.add("simulation-route");
    return () => {
      document.body.classList.remove("simulation-route");
      document.body.classList.remove("simulation-sidebar-open");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("simulation-sidebar-open", isSidebarOpen);
  }, [isSidebarOpen]);

  const routeEdges = useMemo(() => getFlowEdges(toggles), [toggles]);
  const inactiveWindows = useMemo(() => getInactiveWindows(toggles), [toggles]);

  const sortedWindows = useMemo(
    () =>
      [...windowOrder].sort((a, b) =>
        windows[a].rank.localeCompare(windows[b].rank)
      ),
    [windows]
  );

  const zIndexById = useMemo(() => {
    const result = {} as Record<WindowId, number>;
    sortedWindows.forEach((id, index) => {
      result[id] = 20 + index;
    });
    return result;
  }, [sortedWindows]);

  // 모든 흐름은 committedPayload(=Submit 시점 스냅샷)에서만 derive.
  // payload(=draft)는 attacker textarea 표시 용도로만 쓰인다.
  const dbValue = toggles.dbSave ? committedPayload : "";
  const renderInput = toggles.dbSave ? dbValue : committedPayload;
  const serverOutput = toggles.serverRender
    ? renderHtml(renderInput, renderContext, filterMode)
    : renderInput;
  const clientSource = toggles.serverRender
    ? serverOutput
    : toggles.dbSave
      ? dbValue
      : committedPayload;
  const clientHtml = toggles.unsafeSink ? clientSource : escapeHtml(clientSource);
  const inferredEffect = useMemo(
    () => inferPayloadEffect(clientHtml, toggles.unsafeSink),
    [clientHtml, toggles.unsafeSink]
  );
  const resultEffect = inferredEffect;
  const attackDetected = resultEffect !== null;
  const serverCode = buildRenderCode(renderContext, filterMode);
  const windowTitles: Record<WindowId, string> = {
    attacker: t.attackInput,
    database: t.database,
    server: t.serverRender,
    client: t.frontClient,
  };

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const bringToFront = useCallback((id: WindowId) => {
    setActiveWindow(id);
    setRankSeed((seed) => {
      const next = seed + 1;
      setWindows((current) => ({
        ...current,
        [id]: { ...current[id], rank: makeRank(next) },
      }));
      return next;
    });
  }, []);

  const moveWindow = useCallback(
    (id: WindowId, nextX: number, nextY: number) => {
      setWindows((current) => ({
        ...current,
        [id]: {
          ...current[id],
          x: Math.max(16, Math.round(nextX)),
          y: Math.max(16, Math.round(nextY)),
        },
      }));
    },
    []
  );

  const resizeWindow = useCallback(
    (id: WindowId, width: number, height: number) => {
      setWindows((current) => ({
        ...current,
        [id]: {
          ...current[id],
          width: Math.max(MIN_WINDOW_WIDTH, Math.round(width)),
          height: Math.max(MIN_WINDOW_HEIGHT, Math.round(height)),
        },
      }));
    },
    []
  );

  const startDrag = (event: React.PointerEvent, id: WindowId) => {
    event.preventDefault();
    bringToFront(id);
    const startX = event.clientX;
    const startY = event.clientY;
    const startWindow = windows[id];

    const onMove = (moveEvent: PointerEvent) => {
      moveWindow(
        id,
        startWindow.x + moveEvent.clientX - startX,
        startWindow.y + moveEvent.clientY - startY
      );
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const startResize = (event: React.PointerEvent, id: WindowId) => {
    event.preventDefault();
    event.stopPropagation();
    bringToFront(id);
    const startX = event.clientX;
    const startY = event.clientY;
    const startWindow = windows[id];

    const onMove = (moveEvent: PointerEvent) => {
      resizeWindow(
        id,
        startWindow.width + moveEvent.clientX - startX,
        startWindow.height + moveEvent.clientY - startY
      );
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const startFlow = useCallback(() => {
    // Submit 시점에 draft → committed 로 commit. 이때 비로소 db/server/client 흐름이 갱신.
    setCommittedPayload(payload);

    // setCommittedPayload 는 다음 렌더에서야 반영되므로, 결과 effect 라벨은
    // 새 payload 기준으로 inline 재계산해서 setTimeout closure 에 고정한다.
    const newDbValue = toggles.dbSave ? payload : "";
    const newRenderInput = toggles.dbSave ? newDbValue : payload;
    const newServerOutput = toggles.serverRender
      ? renderHtml(newRenderInput, renderContext, filterMode)
      : newRenderInput;
    const newClientSource = toggles.serverRender
      ? newServerOutput
      : toggles.dbSave
        ? newDbValue
        : payload;
    const newClientHtml = toggles.unsafeSink
      ? newClientSource
      : escapeHtml(newClientSource);
    const newEffect = inferPayloadEffect(newClientHtml, toggles.unsafeSink);

    clearTimers();
    setLastEvent(t.activePath);
    setPulseEdge(null);

    routeEdges.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setPulseEdge(index);
      }, index * 560);
      timersRef.current.push(timer);
    });

    const doneTimer = window.setTimeout(
      () => {
        setPulseEdge(null);
        if (newEffect) {
          const resultLabel =
            activePreset?.effect === newEffect
              ? activePreset.result[locale]
              : effectLabels[newEffect][locale];
          setLastEvent(resultLabel);
          // 강제 alert 호출 금지: 진짜 페이로드가 sandbox iframe 안에서 alert 을 띄운다.
        } else {
          setLastEvent(t.safeRender);
        }
      },
      Math.max(1, routeEdges.length) * 560 + 260
    );
    timersRef.current.push(doneTimer);
  }, [
    activePreset,
    clearTimers,
    filterMode,
    locale,
    payload,
    renderContext,
    routeEdges,
    t.activePath,
    t.safeRender,
    toggles,
  ]);

  const applyPayloadPreset = useCallback((preset: IPayloadPreset) => {
    // 프리셋 클릭/단축키: textarea·toggles·context·filter 만 prefill.
    // 흐름은 사용자가 Submit 버튼을 직접 눌러야 시작 (db/server/client 보드에 반영됨).
    setActivePreset(preset);
    setPayload(absolutizeEmbedUrls(preset.payload, window.location.origin));
    setToggles(preset.toggles);
    setRenderContext(preset.context);
    setFilterMode(preset.filter);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const preset = PAYLOAD_PRESETS.find((item) => item.hotkey === event.key);
      if (!preset) return;
      event.preventDefault();
      applyPayloadPreset(preset);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [applyPayloadPreset]);

  useEffect(() => clearTimers, [clearTimers]);

  // sandbox iframe(srcDoc) 내부에서 보낸 effect 알림을 수신해 lastEvent 에 반영.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as
        | { __xssSim?: boolean; kind?: string; detail?: unknown }
        | null;
      if (!data || !data.__xssSim || !data.kind) return;
      const detailText =
        typeof data.detail === "string"
          ? data.detail
          : data.detail
            ? JSON.stringify(data.detail).slice(0, 80)
            : "";
      setLastEvent(`victim · ${data.kind}${detailText ? ` :: ${detailText}` : ""}`);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const resetLayout = () => {
    clearTimers();
    setWindows(initialWindows());
    setRankSeed(5);
    setActiveWindow("client");
    setPulseEdge(null);
  };

  const updateToggle = (key: keyof IFlowToggles) => {
    setToggles((current) => ({ ...current, [key]: !current[key] }));
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = `/${locale}`;
  };

  const renderWindowBody = (id: WindowId) => {
    if (id === "attacker") {
      return (
        <div className={cx("sim-panel-body", "sim-attacker-body")}>
          <div className={cx("sim-field-label")}>{t.rawPayload}</div>
          <textarea
            className={cx("sim-code-editor", "sim-payload-editor")}
            value={payload}
            onChange={(event) => {
              setActivePreset(null);
              setPayload(event.target.value);
            }}
            spellCheck={false}
          />
          <button className={cx("sim-submit-button")} onClick={startFlow}>
            {t.submit}
          </button>
          <div className={cx("sim-mini-status")}>
            {routeEdges.map((edge) => (
              <span key={`${edge.from}-${edge.to}`}>{edge.label}</span>
            ))}
          </div>
        </div>
      );
    }

    if (id === "database") {
      return (
        <div className={cx("sim-panel-body", "sim-db-body")}>
          <div className={cx("sim-db-record")} aria-label={t.storedRecord}>
            <div className={cx("sim-db-record-label")}>{t.storedRecord}</div>
            <pre>{toggles.dbSave ? dbValue : t.emptyDb}</pre>
          </div>
        </div>
      );
    }

    if (id === "server") {
      return (
        <div className={cx("sim-panel-body", "sim-server-body")}>
          <textarea
            className={cx("sim-code-editor", "sim-render-editor")}
            value={serverCode}
            readOnly
            spellCheck={false}
          />
          <div className={cx("sim-field-label")}>{t.serverOutput}</div>
          <pre className={cx("sim-html-output")}>{serverOutput}</pre>
        </div>
      );
    }

    return (
      <div className={cx("sim-panel-body", "sim-client-body")}>
        <div className={cx("sim-browser-chrome")}>
          <span />
          <span />
          <span />
          <div>https://victim.example/view</div>
        </div>
        <div
          className={cx(
            "sim-browser-page",
            attackDetected && "sim-browser-page-danger"
          )}
        >
          <div className={cx("sim-browser-title")}>{t.clientDocument}</div>
          <div className={cx("sim-page-card")}>
            <div className={cx("sim-page-avatar")}>SM</div>
            <div>
              <strong>Sangmook Kim</strong>
              {/* nickname surface: React 가 자동 escape — 항상 textContent 로 안전. */}
              <p>{toggles.unsafeSink ? stripTagsForPreview(clientHtml) : clientHtml}</p>
            </div>
          </div>
          <div className={cx("sim-comment-area")}>
            <strong>{t.commentPreview}</strong>
            {toggles.unsafeSink ? (
              // 취약 sink: sandbox iframe srcDoc 으로 진짜 렌더링.
              // sandbox 가 allow-same-origin 을 빼므로 부모 origin 의 storage/cookie 는 안전.
              <iframe
                key={clientHtml}
                className={cx("sim-live-preview")}
                title="vulnerable comment preview"
                sandbox="allow-scripts allow-modals allow-popups allow-popups-to-escape-sandbox allow-forms"
                srcDoc={buildPreviewDocument(
                  clientHtml,
                  typeof window === "undefined"
                    ? ""
                    : window.location.origin
                )}
                referrerPolicy="no-referrer"
              />
            ) : (
              <p>{clientHtml}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("xss-simulation-page")}>
      <div className={cx("simulation-grid-bg")} aria-hidden="true" />

      <header className={cx("simulation-topbar")}>
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className={cx("simulation-top-actions")}>
          <button onClick={goBack}>{t.back}</button>
          <button onClick={() => setIsSidebarOpen((open) => !open)}>
            {isSidebarOpen ? t.closeSidebar : t.openSidebar}
          </button>
          <span
            className={cx("simulation-event", attackDetected && "danger")}
          >
            {t.lastEvent}: {lastEvent}
          </span>
          <button onClick={startFlow}>{t.run}</button>
          <button onClick={resetLayout}>{t.reset}</button>
        </div>
      </header>

      <aside className={cx("payload-gear-panel")} aria-label={t.payloadDeck}>
        <div className={cx("floating-panel-title")}>{t.payloadDeck}</div>
        {PAYLOAD_PRESETS.map((preset) => (
          <button
            key={preset.hotkey}
            className={cx("payload-gear-button")}
            onClick={() => applyPayloadPreset(preset)}
          >
            <span>{preset.hotkey}</span>
            {preset.label[locale]}
          </button>
        ))}
      </aside>

      <aside className={cx("render-composer-panel")} aria-label={t.renderComposer}>
        <div className={cx("floating-panel-title")}>{t.renderComposer}</div>

        <div className={cx("composer-section")}>
          <div className={cx("composer-label")}>{t.flowPresets}</div>
          <div className={cx("composer-button-grid")}>
            {SCENARIO_PRESETS.map((preset) => (
              <button
                key={preset.label.en}
                className={cx(
                  JSON.stringify(preset.toggles) === JSON.stringify(toggles)
                    && "active"
                )}
                onClick={() => setToggles(preset.toggles)}
              >
                {preset.label[locale]}
              </button>
            ))}
          </div>
        </div>

        <div className={cx("composer-section")}>
          <div className={cx("composer-label")}>{t.toggles}</div>
          {toggleLabels.map(([key, label]) => (
            <button
              key={key}
              className={cx("composer-toggle", toggles[key] && "active")}
              onClick={() => updateToggle(key)}
              aria-pressed={toggles[key]}
            >
              <span />
              {label[locale]}
            </button>
          ))}
        </div>

        <div className={cx("composer-section")}>
          <div className={cx("composer-label")}>{t.renderContext}</div>
          <div className={cx("composer-button-grid")}>
            {(Object.keys(RENDER_CONTEXT_LABELS) as RenderContext[]).map(
              (context) => (
                <button
                  key={context}
                  className={cx(renderContext === context && "active")}
                  onClick={() => setRenderContext(context)}
                >
                  {RENDER_CONTEXT_LABELS[context][locale]}
                </button>
              )
            )}
          </div>
        </div>

        <div className={cx("composer-section")}>
          <div className={cx("composer-label")}>{t.filterMode}</div>
          <div className={cx("composer-button-grid")}>
            {(Object.keys(FILTER_LABELS) as FilterMode[]).map((mode) => (
              <button
                key={mode}
                className={cx(filterMode === mode && "active")}
                onClick={() => setFilterMode(mode)}
              >
                {FILTER_LABELS[mode][locale]}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className={cx("simulation-stage")}>
        <svg
          className={cx("simulation-arrows")}
          viewBox="0 0 1260 820"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="sim-arrow-active"
              markerWidth="12"
              markerHeight="12"
              refX="10"
              refY="6"
              orient="auto"
            >
              <path d="M 0 0 L 12 6 L 0 12 z" />
            </marker>
            <marker
              id="sim-arrow-muted"
              markerWidth="12"
              markerHeight="12"
              refX="10"
              refY="6"
              orient="auto"
            >
              <path d="M 0 0 L 12 6 L 0 12 z" />
            </marker>
          </defs>
          {routeEdges.map((edge, index) => {
            const from = getAnchor(windows[edge.from], windows[edge.to]);
            const to = getAnchor(windows[edge.to], windows[edge.from]);
            const pulse = midpoint(from, to);
            return (
              <g key={`${edge.from}-${edge.to}-${edge.label}`}>
                <path
                  className={cx(
                    "simulation-arrow",
                    "active",
                    pulseEdge === index && "pulse"
                  )}
                  d={buildPath(from, to)}
                  markerEnd="url(#sim-arrow-active)"
                />
                <text
                  x={pulse.x}
                  y={pulse.y - 10}
                  className={cx("simulation-edge-label")}
                >
                  {edge.label}
                </text>
                {pulseEdge === index && (
                  <circle
                    className={cx("simulation-flow-dot")}
                    cx={pulse.x}
                    cy={pulse.y}
                    r="7"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {windowOrder.map((id) => {
          const win = windows[id];
          return (
            <section
              key={id}
              className={cx(
                "simulation-window",
                `simulation-window-${id}`,
                activeWindow === id && "active",
                inactiveWindows.has(id) && "inactive"
              )}
              style={{
                transform: `translate(${win.x}px, ${win.y}px)`,
                width: win.width,
                height: win.height,
                zIndex: zIndexById[id],
              }}
              onPointerDown={() => bringToFront(id)}
            >
              <div
                className={cx("simulation-window-header")}
                onPointerDown={(event) => startDrag(event, id)}
              >
                <span
                  className={cx("sim-role-icon", `sim-role-icon-${id}`)}
                  aria-hidden="true"
                >
                  <span />
                </span>
                <div>
                  <strong>{windowTitles[id]}</strong>
                  <small>{win.caption}</small>
                </div>
              </div>
              {renderWindowBody(id)}
              <button
                className={cx("simulation-resize-handle")}
                aria-label="Resize window"
                onPointerDown={(event) => startResize(event, id)}
              />
            </section>
          );
        })}
      </main>

    </div>
  );
};
