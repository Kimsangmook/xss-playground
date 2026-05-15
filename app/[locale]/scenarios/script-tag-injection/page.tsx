"use client";

import { I18N } from "./i18n";
import { PayloadLab } from "@/app/PayloadLab";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { findScenario } from "@/lib/scenarios";
import { usePageI18n } from "../usePageI18n";

const ScriptTagInjectionPage = () => {
  const scenario = findScenario("script-tag-injection")!;
  const t = usePageI18n(I18N);

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <PayloadLab payloads={t.payloads ?? []} previewMode="srcdoc" />

      <h2>{t.explanationHeading}</h2>
      <ul>
        {(t.explanation ?? []).map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};

export default ScriptTagInjectionPage;
