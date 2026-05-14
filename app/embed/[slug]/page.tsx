import { notFound } from "next/navigation";
import { findScenario, SCENARIOS } from "@/lib/scenarios";
import { SCENARIO_EMBEDS } from "./scenarios";

export const generateStaticParams = () =>
  SCENARIOS.map((s) => ({ slug: s.slug }));

interface IProps {
  params: { slug: string };
}

const EmbedSlugPage = ({ params }: IProps) => {
  const scenario = findScenario(params.slug);
  if (!scenario) notFound();
  const Comp = SCENARIO_EMBEDS[params.slug];
  if (!Comp) {
    return (
      <div style={{ padding: 16 }}>
        <strong>{scenario!.title}</strong>
        <p style={{ color: "var(--text-dim)" }}>
          이 시나리오의 임베드 컴포넌트가 아직 작성되지 않았습니다.
        </p>
      </div>
    );
  }
  return <Comp />;
};

export default EmbedSlugPage;
