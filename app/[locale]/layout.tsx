import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/i18n/types";
import { getDictionary } from "@/i18n";
import { SITE_URL } from "@/lib/site";
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
  const dict = getDictionary(params.locale as Locale);
  const path = `/${params.locale}`;
  return {
    title: { default: dict.site.name, template: `%s · ${dict.site.name}` },
    description: dict.site.description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
    openGraph: {
      title: dict.site.name,
      description: dict.site.description,
      url: `${SITE_URL}${path}`,
      siteName: dict.site.name,
      locale: params.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.name,
      description: dict.site.description,
    },
  };
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
