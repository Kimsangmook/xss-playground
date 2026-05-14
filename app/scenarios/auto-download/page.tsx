"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const AutoDownloadPage = () => {
  const scenario = findScenario("auto-download")!;
  const { lines, push, clear } = useLog();

  const tryBlobDownload = () => {
    push("시도: Blob URL + a.download 가짜 클릭");
    const blob = new Blob(
      ["This file was downloaded without user click.\nIf you see this, the iframe controlled your browser to download a file."],
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
    push("Blob 다운로드 트리거 완료");
  };

  const tryDataUrl = () => {
    push("시도: data: URL + a.download");
    const a = document.createElement("a");
    a.href =
      "data:text/plain;base64,VGhpcyBmaWxlIHdhcyBhdXRvLWRvd25sb2FkZWQu";
    a.download = "auto.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    push("data URL 다운로드 트리거 완료");
  };

  const tryLocationDownload = () => {
    push("시도: location.href = attachment URL (자기 origin 내)");
    push(
      "실제 공격에서는 서버가 Content-Disposition: attachment 헤더를 내려 다운로드를 강제. 이 PoC 에선 동작하지 않습니다."
    );
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="auto-download" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={tryBlobDownload}>
          Blob 자동 다운로드
        </button>
        <button className="danger" onClick={tryDataUrl}>
          data URL 자동 다운로드
        </button>
        <button onClick={tryLocationDownload}>
          location.href 다운로드 (안내만)
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          최신 브라우저는 사용자 제스처 없이 너무 잦은 다운로드를 차단하기는
          합니다만, 첫 다운로드는 보통 허용됩니다. 사용자가 알렌 페이지를 보다가
          영문 모를 파일이 받아지면 그 자체가 피싱의 trigger 가 됩니다.
        </li>
        <li>
          <code>sandbox=&quot;allow-scripts&quot;</code> 가 부착되면 a.click() 은
          되지만 <code>a.download</code> 속성에 의한 다운로드는 차단되는 경향이
          있습니다. <code>allow-downloads</code> 키워드가 필요합니다.
        </li>
      </ul>
    </>
  );
};

export default AutoDownloadPage;
