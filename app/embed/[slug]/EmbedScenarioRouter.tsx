"use client";

import { SCENARIO_EMBEDS } from "./scenarios";

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
          이 시나리오의 임베드 컴포넌트가 아직 작성되지 않았습니다.
        </p>
      </div>
    );
  }

  return <Comp />;
};
