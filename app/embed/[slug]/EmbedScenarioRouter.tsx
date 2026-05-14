"use client";

import { SCENARIO_EMBEDS } from "./scenarios";
import { EmbedContextProvider } from "./EmbedContext";

interface IEmbedScenarioRouterProps {
  slug: string;
  title: string;
}

export const EmbedScenarioRouter = ({
  slug,
  title,
}: IEmbedScenarioRouterProps) => {
  const Comp = SCENARIO_EMBEDS[slug];

  if (!Comp) {
    return (
      <div style={{ padding: 16 }}>
        <strong>{title}</strong>
        <p style={{ color: "var(--text-dim)" }}>
          Scenario embed not implemented yet.
        </p>
      </div>
    );
  }

  return (
    <EmbedContextProvider slug={slug}>
      <Comp />
    </EmbedContextProvider>
  );
};
