import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, LOCALES } from "@/i18n/types";
import { createRedirectedSeoMetadata } from "@/components/seo/Seo";
import { I18N } from "./i18n";

interface IProps {
  params: { locale: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const generateMetadata = ({ params }: IProps): Metadata => {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  return createRedirectedSeoMetadata(params.locale as Locale);
};

const RedirectedPage = ({ params, searchParams = {} }: IProps) => {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const t = I18N[locale];
  const from = first(searchParams.from) ?? t.empty;
  const surface = first(searchParams.surface) ?? t.empty;

  return (
    <>
      <h1>{t.title}</h1>
      <p className="summary">{t.summary}</p>

      <section className="card">
        <strong>{t.reached}</strong>
        <div className="kv">
          <div className="k">{t.from}</div>
          <code>{from}</code>
          <div className="k">{t.surface}</div>
          <code>{surface}</code>
        </div>
        <div className="callout">{t.note}</div>
        <Link className="button-link" href={`/${locale}`}>
          {t.backHome}
        </Link>
      </section>
    </>
  );
};

export default RedirectedPage;
