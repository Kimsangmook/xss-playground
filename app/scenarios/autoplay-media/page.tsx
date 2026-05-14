"use client";

import { useRef } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const AutoplayMediaPage = () => {
  const scenario = findScenario("autoplay-media")!;
  const { lines, push, clear } = useLog();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tryAutoplayVideo = async () => {
    if (!videoRef.current) return;
    push("video.play() 시도 (muted)");
    videoRef.current.muted = true;
    try {
      await videoRef.current.play();
      push("재생 시작 (muted 라 보통 통과)");
    } catch (e) {
      push(`실패: ${(e as Error).message}`);
    }
  };

  const tryAutoplayWithSound = async () => {
    if (!videoRef.current) return;
    push("video.play() 시도 (muted=false)");
    videoRef.current.muted = false;
    try {
      await videoRef.current.play();
      push("재생 시작 (사용자 제스처 없으면 보통 NotAllowedError)");
    } catch (e) {
      push(`차단됨: ${(e as Error).message}`);
    }
  };

  const tryAudio = async () => {
    if (!audioRef.current) return;
    push("audio.play() 시도");
    try {
      await audioRef.current.play();
      push("재생 시작");
    } catch (e) {
      push(`차단됨: ${(e as Error).message}`);
    }
  };

  const tryFullscreen = async () => {
    push("document.documentElement.requestFullscreen() 시도");
    try {
      await document.documentElement.requestFullscreen();
      push("풀스크린 진입 성공");
    } catch (e) {
      push(`차단됨: ${(e as Error).message} (사용자 제스처 필요)`);
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="autoplay-media" />

      <h2>실행</h2>
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        playsInline
        style={{ width: 320, marginBottom: 8 }}
      />
      <audio
        ref={audioRef}
        src="https://www.w3schools.com/html/horse.mp3"
        controls
      />
      <div className="actions">
        <button onClick={tryAutoplayVideo}>video 자동재생 (muted)</button>
        <button className="danger" onClick={tryAutoplayWithSound}>
          video 자동재생 (소리)
        </button>
        <button className="danger" onClick={tryAudio}>
          audio 자동재생
        </button>
        <button className="danger" onClick={tryFullscreen}>
          풀스크린 강제
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <h2>해설</h2>
      <ul>
        <li>
          최신 브라우저는 muted 자동재생만 기본 허용합니다. 소리 있는 자동재생은
          사용자 제스처(클릭/탭) 가 필요합니다.
        </li>
        <li>
          풀스크린도 사용자 제스처가 필요합니다. iframe 이라면 추가로{" "}
          <code>allow=&quot;fullscreen&quot;</code> 또는{" "}
          <code>sandbox</code> 가 없어야 동작합니다.
        </li>
        <li>
          공격 가치는 낮지만, 풀스크린 + 가짜 로그인 폼 조합은 사용자를 깊게
          속일 수 있는 패턴입니다.
        </li>
      </ul>
    </>
  );
};

export default AutoplayMediaPage;
