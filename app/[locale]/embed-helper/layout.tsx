import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/types";
import {
  createEmbedHelperJsonLd,
  createEmbedHelperSeoMetadata,
} from "@/components/seo/Seo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";

interface IEmbedHelperLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const generateMetadata = ({
  params,
}: {
  params: { locale: string };
}): Metadata => {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  return createEmbedHelperSeoMetadata(params.locale as Locale);
};

const EmbedHelperLayout = ({ children, params }: IEmbedHelperLayoutProps) => {
  if (!LOCALES.includes(params.locale as Locale)) return <>{children}</>;

  return (
    <>
      <JsonLdScript
        data={createEmbedHelperJsonLd(params.locale as Locale)}
      />
      {children}
    </>
  );
};

export default EmbedHelperLayout;
