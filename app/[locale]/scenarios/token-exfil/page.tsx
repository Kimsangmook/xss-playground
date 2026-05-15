"use client";

import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { fmt, usePageI18n } from "../usePageI18n";

const TokenExfilPage = () => {
  const scenario = findScenario("token-exfil")!;
  const { lines, push, clear } = useLog();
  const t = usePageI18n(I18N);

  const probeReferrer = () => {
    push(fmt(t.log?.referrer, { value: document.referrer || t.log?.empty }));
    if (document.referrer) {
      const u = new URL(document.referrer);
      push(fmt(t.log?.parentOrigin, { origin: u.origin, pathname: u.pathname }));
    }
  };

  const probeAncestorOrigins = () => {
    const ao = (location as Location & { ancestorOrigins?: DOMStringList })
      .ancestorOrigins;
    if (!ao) return push(t.log?.ancestorUnsupported ?? "");
    const arr = Array.from(ao);
    push(fmt(t.log?.ancestor, { value: JSON.stringify(arr) }));
  };

  const probeMyStorage = () => {
    push(t.log?.ownStorage ?? "");
    push(fmt(t.log?.localKeys, { value: JSON.stringify(Object.keys(localStorage)) }));
    push(
      fmt(t.log?.sessionKeys, {
        value: JSON.stringify(Object.keys(sessionStorage)),
      }),
    );
    push(t.log?.storageNote ?? "");
  };

  const askParentForToken = () => {
    const PAYLOADS = [
      { type: "GET_TOKEN" },
      { type: "GET_AUTH_TOKEN" },
      { type: "AUTH_REQUEST" },
      { type: "REQUEST_USER", fields: ["token", "refreshToken", "email"] },
      "GET_TOKEN",
    ];
    push(fmt(t.log?.askParent, { count: PAYLOADS.length }));
    PAYLOADS.forEach((p, i) => {
      setTimeout(() => {
        window.parent.postMessage(p, "*");
        push(fmt(t.log?.sent, { payload: JSON.stringify(p) }));
      }, i * 200);
    });
  };

  const wrapXHR = () => {
    push(t.log?.hookInstall ?? "");
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
      isAsync?: boolean,
      username?: string | null,
      password?: string | null
    ) {
      push(`[XHR] ${method} ${String(url)}`);
      return origOpen.call(
        this,
        method,
        url,
        isAsync ?? true,
        username,
        password
      );
    };
    const origFetch = window.fetch;
    window.fetch = function (...args: Parameters<typeof fetch>) {
      const url =
        typeof args[0] === "string"
          ? args[0]
          : args[0] instanceof URL
            ? args[0].toString()
            : "(Request)";
      push(`[fetch] ${url}`);
      return origFetch.apply(this, args);
    };
    push(t.log?.hookDone ?? "");
  };

  const tryParentLocalStorage = () => {
    push(t.log?.tryParentStorage ?? "");
    try {
      const keys = Object.keys(window.parent.localStorage);
      push(fmt(t.log?.parentStorageSuccess, { keys: JSON.stringify(keys) }));
    } catch (e) {
      push(fmt(t.log?.sopBlocked, { message: (e as Error).message }));
    }
  };

  const fetchTokenFromOurOrigin = async () => {
    push(t.log?.ownFetch ?? "");
    try {
      const r = await fetch("/api/dummy");
      push(fmt(t.log?.status, { status: r.status }));
    } catch (e) {
      push(fmt(t.log?.failed, { message: (e as Error).message }));
    }
  };

  const runAll = () => {
    push(t.log?.runAll ?? "");
    probeReferrer();
    probeAncestorOrigins();
    probeMyStorage();
    setTimeout(askParentForToken, 200);
    setTimeout(tryParentLocalStorage, 2000);
    setTimeout(wrapXHR, 2300);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="token-exfil" />

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button className="danger" onClick={runAll}>
          {t.buttons?.runAll}
        </button>
        <button onClick={probeReferrer}>{t.buttons?.referrer}</button>
        <button onClick={probeAncestorOrigins}>{t.buttons?.ancestorOrigins}</button>
        <button onClick={probeMyStorage}>{t.buttons?.myStorage}</button>
        <button onClick={tryParentLocalStorage}>{t.buttons?.parentStorage}</button>
        <button className="danger" onClick={askParentForToken}>
          {t.buttons?.askParent}
        </button>
        <button onClick={wrapXHR}>{t.buttons?.hookXhr}</button>
        <button onClick={fetchTokenFromOurOrigin}>{t.buttons?.ownFetch}</button>
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

export default TokenExfilPage;
