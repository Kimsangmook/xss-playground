"use client";

import { useRef } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const AutoplayMediaPage = () => {
  const scenario = findScenario("autoplay-media")!;
  const { lines, push, clear } = useLog();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = usePageI18n(I18N);

  const tryAutoplayVideo = async () => {
    if (!videoRef.current) return;
    push(t.log?.tryMuted ?? "");
    videoRef.current.muted = true;
    try {
      await videoRef.current.play();
      push(t.log?.mutedStarted ?? "");
    } catch (e) {
      push(fmt(t.log?.failed, { message: (e as Error).message }));
    }
  };

  const tryAutoplayWithSound = async () => {
    if (!videoRef.current) return;
    push(t.log?.trySound ?? "");
    videoRef.current.muted = false;
    try {
      await videoRef.current.play();
      push(t.log?.soundStarted ?? "");
    } catch (e) {
      push(fmt(t.log?.blocked, { message: (e as Error).message }));
    }
  };

  const tryAudio = async () => {
    if (!audioRef.current) return;
    push(t.log?.tryAudio ?? "");
    try {
      await audioRef.current.play();
      push(t.log?.audioStarted ?? "");
    } catch (e) {
      push(fmt(t.log?.blocked, { message: (e as Error).message }));
    }
  };

  const tryFullscreen = async () => {
    push(t.log?.tryFullscreen ?? "");
    try {
      await document.documentElement.requestFullscreen();
      push(t.log?.fullscreenStarted ?? "");
    } catch (e) {
      push(fmt(t.log?.fullscreenBlocked, { message: (e as Error).message }));
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="autoplay-media" />

      <h2>{t.actionsHeading}</h2>
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
        <button onClick={tryAutoplayVideo}>{t.buttons?.mutedVideo}</button>
        <button className="danger" onClick={tryAutoplayWithSound}>
          {t.buttons?.soundVideo}
        </button>
        <button className="danger" onClick={tryAudio}>
          {t.buttons?.audio}
        </button>
        <button className="danger" onClick={tryFullscreen}>
          {t.buttons?.fullscreen}
        </button>
        <button onClick={clear}>{t.buttons?.clearLog}</button>
      </div>
      <Log lines={lines} />

      <h2>{t.explanationHeading}</h2>
      <ul>
        {t.explanation?.map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default AutoplayMediaPage;
