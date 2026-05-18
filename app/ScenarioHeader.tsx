"use client";

import { useParams } from "next/navigation";
import { IScenario } from "@/lib/scenarios";
import { getDictionary } from "@/i18n";
import { getScenarioI18n } from "@/app/[locale]/scenarios/i18nRegistry";
import {
  DEFAULT_LOCALE,
  type IDictionary,
  type Locale,
  LOCALES,
} from "@/i18n/types";

interface IScenarioHeaderProps {
  scenario: IScenario;
}

const pickLocale = (raw: unknown): Locale => {
  if (typeof raw === "string" && LOCALES.includes(raw as Locale)) {
    return raw as Locale;
  }
  return DEFAULT_LOCALE;
};

const badgeLabel = (
  v: IScenario["noSandbox"],
  d: IDictionary["scenarioPage"]
) => {
  switch (v) {
    case "works":
      return d.works;
    case "blocked":
      return d.blocked;
    case "partial":
      return d.partial;
  }
};

export const ScenarioHeader = ({ scenario }: IScenarioHeaderProps) => {
  const params = useParams<{ locale?: string }>();
  const locale = pickLocale(params?.locale);
  const dict = getDictionary(locale);
  const sp = dict.scenarioPage;
  const meta = getScenarioI18n(locale, scenario.slug);
  const surface = scenario.surface ?? "iframe";
  const checks = meta?.checks ?? scenario.checks;

  return (
    <>
      <h1>
        {meta?.title ?? scenario.title}
        <span className="embed-badge">{sp.embeddedBadge}</span>
      </h1>
      <p className="summary">{meta?.summary ?? scenario.summary}</p>

      {surface === "iframe" ? (
        <div className="card" data-only-standalone>
          <strong>{sp.sandboxMatrix}</strong>
          <table className="matrix">
            <thead>
              <tr>
                <th>{sp.policy}</th>
                <th>{sp.expectedResult}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{sp.noSandbox}</td>
                <td>
                  <span className={`badge ${scenario.noSandbox}`}>
                    {badgeLabel(scenario.noSandbox, sp)}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <code>{sp.scriptsOnly}</code>
                </td>
                <td>
                  <span className={`badge ${scenario.scriptsOnly}`}>
                    {badgeLabel(scenario.scriptsOnly, sp)}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <code>{sp.fullSandbox}</code>
                </td>
                <td>
                  <span className={`badge ${scenario.fullSandbox}`}>
                    {badgeLabel(scenario.fullSandbox, sp)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {scenario.sopBlocks && <div className="callout">{sp.sopBlocks}</div>}
        </div>
      ) : (
        <div className="card" data-only-standalone>
          <strong>
            {surface === "dom" ? sp.domSurfaceTitle : sp.htmlSurfaceTitle}
          </strong>
          <p style={{ color: "var(--text-dim)", margin: "6px 0 0" }}>
            {sp.surfaceDescription}
          </p>
          {checks && (
            <ul style={{ marginBottom: 0 }}>
              {checks.map(check => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};
