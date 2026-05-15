"use client";

import { useState } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const CsrfImagePage = () => {
  const scenario = findScenario("csrf-image")!;
  const { lines, push, clear } = useLog();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const t = usePageI18n(I18N);

  const fireImage = () => {
    const url = `https://httpbin.org/image/png?fired=${Date.now()}`;
    push(fmt(t.log.firing, { url }));
    setImgSrc(url);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="csrf-image" />

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button className="danger" onClick={fireImage}>
          {t.buttons.fire}
        </button>
        <button onClick={clear}>{t.buttons.clearLog}</button>
      </div>
      {imgSrc && (
        <img
          alt=""
          src={imgSrc}
          onLoad={() => push(t.log.onload)}
          onError={() => push(t.log.onerror)}
          style={{ display: "block", margin: "10px 0", maxWidth: 200 }}
        />
      )}
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

export default CsrfImagePage;
