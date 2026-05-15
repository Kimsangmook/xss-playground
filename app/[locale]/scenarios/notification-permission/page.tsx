"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const NotificationPermissionPage = () => {
  const scenario = findScenario("notification-permission")!;
  const { lines, push, clear } = useLog();
  const t = usePageI18n(I18N);

  const tryRequest = async () => {
    push(fmt(t.log.current, { value: Notification.permission }));
    try {
      const result = await Notification.requestPermission();
      push(fmt(t.log.result, { value: result }));
    } catch (e) {
      push(fmt(t.log.failed, { message: (e as Error).message }));
    }
  };

  const tryShow = () => {
    push(fmt(t.log.permission, { value: Notification.permission }));
    if (Notification.permission !== "granted") {
      push(t.log.noPermission);
      return;
    }
    new Notification(t.notification.title, {
      body: t.notification.body,
      icon: "/favicon.ico",
    });
    push(t.log.fired);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="notification-permission" />

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button className="danger" onClick={tryRequest}>
          {t.buttons.request}
        </button>
        <button className="danger" onClick={tryShow}>
          {t.buttons.show}
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

export default NotificationPermissionPage;
