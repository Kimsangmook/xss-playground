import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/types";
import {
  createSimulatorJsonLd,
  createSimulatorSeoMetadata,
} from "@/components/seo/Seo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";

interface ISimulatorLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const generateMetadata = ({
  params,
}: {
  params: { locale: string };
}): Metadata => {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  return createSimulatorSeoMetadata(params.locale as Locale);
};

const SimulatorLayout = ({ children, params }: ISimulatorLayoutProps) => {
  if (!LOCALES.includes(params.locale as Locale)) return <>{children}</>;

  return (
    <>
      <JsonLdScript data={createSimulatorJsonLd(params.locale as Locale)} />
      {children}
    </>
  );
};

export default SimulatorLayout;
