"use client";

import type { IScenarioPageI18n } from "./types";
import type { Locale } from "@/i18n/types";
import { PayloadLab } from "@/app/PayloadLab";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { findScenario } from "@/lib/scenarios";
import { usePageI18n } from "./usePageI18n";

interface IPayloadScenarioPageProps {
  slug: string;
  i18n: Record<Locale, IScenarioPageI18n>;
  previewMode?: "srcdoc" | "innerHTML";
}

export const PayloadScenarioPage = ({
  slug,
  i18n,
  previewMode = "srcdoc",
}: IPayloadScenarioPageProps) => {
  const scenario = findScenario(slug)!;
  const t = usePageI18n(i18n);

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <PayloadLab payloads={t.payloads ?? []} previewMode={previewMode} />

      <h2>{t.explanationHeading}</h2>
      <ul>
        {(t.explanation ?? []).map((html, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </ul>
    </>
  );
};
