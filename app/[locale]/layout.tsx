import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/i18n/types";
import { getDictionary } from "@/i18n";
import { createLocaleBaseMetadata } from "@/components/seo/Seo";
import { LocaleSidebar } from "./LocaleSidebar";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

interface ILayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const generateMetadata = ({
  params,
}: {
  params: { locale: string };
}): Metadata => {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  return createLocaleBaseMetadata(params.locale as Locale);
};

const LocaleLayout = ({ children, params }: ILayoutProps) => {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="layout">
      <LocaleSidebar locale={locale} dict={dict} />
      <main className="main">{children}</main>
    </div>
  );
};

export default LocaleLayout;
