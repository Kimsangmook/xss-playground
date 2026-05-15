"use client";

import { useParams } from "next/navigation";
import { findScenario } from "@/lib/scenarios";
import { buildRedirectTarget } from "@/lib/redirectTarget";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

const PopupSpamPage = () => {
  const scenario = findScenario("popup-spam")!;
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const { lines, push, clear } = useLog();
  const t = usePageI18n(I18N);

  const openSelf = () => {
    push(t.log.trySelf);
    const w = window.open(location.href, "_blank");
    push(w ? t.log.returnWindow : t.log.returnBlocked);
  };

  const openExternal = () => {
    push(t.log.tryExternal);
    const w = window.open(
      buildRedirectTarget(window.location.origin, locale, "popup-spam", {
        surface: "popup",
      }),
      "_blank",
    );
    push(w ? t.log.returnWindow : t.log.returnBlocked);
    if (w) {
      push(t.log.openerLinked);
    }
  };

  const tryFlood = () => {
    push(t.log.floodIntro);
    for (let i = 0; i < 3; i++) {
      const w = window.open("about:blank", "_blank");
      push(
        fmt(t.log.floodItem, { n: i + 1, result: w ? "opened" : "blocked" }),
      );
    }
  };

  const tryOpenerTakeover = () => {
    push(t.log.tabnab1);
    const w = window.open("about:blank", "_blank");
    if (!w) return push(t.log.popupBlocked);
    try {
      // This page opens a same-origin popup; real tabnabbing runs inside the new tab.
      push(t.log.tabnab2);
    } catch (e) {
      push(fmt(t.log.blocked, { message: (e as Error).message }));
    }
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="popup-spam" />

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button className="danger" onClick={openSelf}>
          {t.buttons.self}
        </button>
        <button className="danger" onClick={openExternal}>
          {t.buttons.external}
        </button>
        <button className="danger" onClick={tryFlood}>
          {t.buttons.flood}
        </button>
        <button onClick={tryOpenerTakeover}>{t.buttons.tabnab}</button>
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

export default PopupSpamPage;
