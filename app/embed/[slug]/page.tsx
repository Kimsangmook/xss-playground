import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findScenario, SCENARIOS } from "@/lib/scenarios";
import { EmbedScenarioRouter } from "./EmbedScenarioRouter";
import { createEmbedSeoMetadata } from "@/components/seo/Seo";

export const generateStaticParams = () =>
  SCENARIOS.filter(s => (s.surface ?? "iframe") === "iframe").map(s => ({
    slug: s.slug,
  }));

interface IProps {
  params: { slug: string };
}

export const generateMetadata = ({ params }: IProps): Metadata =>
  createEmbedSeoMetadata(params.slug);

const EmbedSlugPage = ({ params }: IProps) => {
  const scenario = findScenario(params.slug);
  if (!scenario) notFound();
  return <EmbedScenarioRouter slug={params.slug} title={scenario.title} />;
};

export default EmbedSlugPage;
