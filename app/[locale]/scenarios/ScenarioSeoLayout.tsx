import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/types";
import {
  createScenarioJsonLd,
  createScenarioSeoMetadata,
} from "@/components/seo/Seo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";

interface IScenarioSeoLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const createScenarioMetadata =
  (slug: string) =>
  ({ params }: { params: { locale: string } }): Metadata => {
    if (!LOCALES.includes(params.locale as Locale)) return {};
    return createScenarioSeoMetadata(params.locale as Locale, slug);
  };

export const createScenarioLayout = (slug: string) => {
  const ScenarioSeoLayout = ({ children, params }: IScenarioSeoLayoutProps) => {
    if (!LOCALES.includes(params.locale as Locale)) return <>{children}</>;
    const locale = params.locale as Locale;

    return (
      <>
        <JsonLdScript data={createScenarioJsonLd(locale, slug)} />
        {children}
      </>
    );
  };

  return ScenarioSeoLayout;
};
