"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { usePageI18n } from "../usePageI18n";

const AutoDownloadPage = () => {
  const scenario = findScenario("auto-download")!;
  const { lines, push, clear } = useLog();
  const t = usePageI18n(I18N);

  const tryBlobDownload = () => {
    push(t.log.tryBlob);
    const blob = new Blob(
      [
        "This file was downloaded without user click.\nIf you see this, the iframe controlled your browser to download a file.",
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "definitely-not-malware.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    push(t.log.blobDone);
  };

  const tryDataUrl = () => {
    push(t.log.tryData);
    const a = document.createElement("a");
    a.href = "data:text/plain;base64,VGhpcyBmaWxlIHdhcyBhdXRvLWRvd25sb2FkZWQu";
    a.download = "auto.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    push(t.log.dataDone);
  };

  const tryLocationDownload = () => {
    push(t.log.tryLocation);
    push(t.log.locationNote);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="auto-download" />

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button className="danger" onClick={tryBlobDownload}>
          {t.buttons.blob}
        </button>
        <button className="danger" onClick={tryDataUrl}>
          {t.buttons.dataUrl}
        </button>
        <button onClick={tryLocationDownload}>{t.buttons.locationInfo}</button>
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

export default AutoDownloadPage;
