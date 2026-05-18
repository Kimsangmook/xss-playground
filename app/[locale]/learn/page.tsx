import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, LOCALES } from "@/i18n/types";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
  createLearnJsonLd,
  createLearnSeoMetadata,
} from "@/components/seo/Seo";
import { I18N } from "./i18n";

interface IProps {
  params: { locale: string };
}

export const generateMetadata = ({ params }: IProps): Metadata => {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  return createLearnSeoMetadata(params.locale as Locale);
};

const LearnPage = ({ params }: IProps) => {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const t = I18N[locale];

  return (
    <>
      <JsonLdScript data={createLearnJsonLd(locale)} />
      <h1>{t.title}</h1>
      <p className="summary">{t.summary}</p>

      <h2>{t.methodologyTitle}</h2>
      <ol>
        {t.methodology.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <h2>{t.surfacesTitle}</h2>
      <div className="threat-grid">
        {t.surfaces.map(surface => (
          <section className="threat-card" key={surface.title}>
            <strong>{surface.title}</strong>
            <p>{surface.body}</p>
          </section>
        ))}
      </div>

      <h2>{t.defensesTitle}</h2>
      <ul>
        {t.defenses.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{t.storiesTitle}</h2>
      {t.stories.map(story => (
        <section className="card" key={story.title}>
          <strong>{story.title}</strong>
          <p style={{ color: "var(--text-dim)", marginBottom: 0 }}>
            {story.body}
          </p>
        </section>
      ))}

      <div className="reference-links">
        <strong>{t.referencesTitle}</strong>
        {t.references.map(source => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noreferrer"
          >
            {source.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default LearnPage;
