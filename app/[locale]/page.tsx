import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_CATEGORIES, SCENARIOS } from "@/lib/scenarios";
import { getDictionary } from "@/i18n";
import { type Locale, LOCALES } from "@/i18n/types";
import { SITE_AUTHOR, SOCIAL } from "@/lib/site";
import { AdSlot } from "@/app/AdSlot";
import { QuickEmbedCopy } from "@/app/QuickEmbedCopy";
import { QuickPayloadCopy } from "@/app/QuickPayloadCopy";
import { getScenarioI18n } from "@/app/[locale]/scenarios/i18nRegistry";
import { createHomeJsonLd, createHomeSeoMetadata } from "@/components/seo/Seo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";

interface IProps {
  params: { locale: string };
}

export const generateMetadata = ({ params }: IProps): Metadata => {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  return createHomeSeoMetadata(params.locale as Locale);
};

const HomePage = ({ params }: IProps) => {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLdScript data={createHomeJsonLd(locale)} />

      <h1>{dict.site.name}</h1>
      <p className="summary">{dict.site.tagline}</p>

      <section
        className="card"
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SITE_AUTHOR.profileImage}
          alt={SITE_AUTHOR.name}
          width={96}
          height={96}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            background: "var(--bg-elev-2)",
            border: "1px solid var(--border)",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 style={{ marginTop: 0, border: "none", paddingBottom: 0 }}>
            {dict.home.aboutHeading} — {SITE_AUTHOR.name}
          </h2>
          <p style={{ color: "var(--text-dim)", margin: "4px 0 12px" }}>
            {SITE_AUTHOR.role}
          </p>
          {dict.home.aboutBody.map((p, i) => (
            <p key={i} style={{ margin: "8px 0" }}>
              {p}
            </p>
          ))}
          <p style={{ marginTop: 12, fontSize: 13 }}>
            <a
              href={SOCIAL.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.nav.github}
            </a>
            {SITE_AUTHOR.email && (
              <>
                {" · "}
                <a href={`mailto:${SITE_AUTHOR.email}`}>{dict.home.contact}</a>
              </>
            )}
          </p>
        </div>
      </section>

      <div className="callout">
        <strong>{dict.home.warningTitle}.</strong> {dict.home.warningBody}
      </div>

      <h2>{dict.home.intentHeading}</h2>
      <section className="intent-panel">
        {dict.home.intentBody.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <h2>{dict.home.howToUseHeading}</h2>
      <ol>
        {dict.home.howToUseSteps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      <h2>{dict.home.sanitizationHeading}</h2>
      <p className="summary">{dict.home.sanitizationIntro}</p>
      <div className="threat-grid">
        {dict.home.sanitizationCards.map(item => (
          <section key={item.title} className="threat-card">
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </section>
        ))}
      </div>
      <div className="reference-links">
        <strong>{dict.home.sanitizationLinksHeading}</strong>
        {dict.home.sanitizationLinks.map(source => (
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

      <h2>{dict.home.threatsHeading}</h2>
      <p className="summary">{dict.home.threatsIntro}</p>
      <div className="threat-grid">
        {dict.home.threats.map(item => (
          <section key={item.title} className="threat-card">
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </section>
        ))}
      </div>
      <div className="reference-links">
        <strong>{dict.home.referencesHeading}</strong>
        {dict.home.references.map(source => (
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

      <AdSlot slot="home-mid" />

      <h2>{dict.home.scenariosHeading}</h2>
      <p className="summary">{dict.home.scenariosIntro}</p>

      {ALL_CATEGORIES.map(cat => {
        const items = SCENARIOS.filter(s => s.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat}>
            <h3 style={{ margin: "18px 0 8px", fontSize: 14 }}>
              {dict.categories[cat] ?? cat}
            </h3>
            {items.map(s => {
              const meta = getScenarioI18n(locale, s.slug);
              return (
                <div key={s.slug} className="card">
                  <Link href={`/${locale}/scenarios/${s.slug}`}>
                    <strong>{meta?.title ?? s.title}</strong>
                  </Link>
                  <p style={{ margin: "6px 0 0", color: "var(--text-dim)" }}>
                    {meta?.summary ?? s.summary}
                  </p>
                  {(s.surface ?? "iframe") === "iframe" ? (
                    <QuickEmbedCopy
                      slug={s.slug}
                      title={meta?.title ?? s.title}
                    />
                  ) : (
                    <QuickPayloadCopy
                      payload={(meta?.payloads ?? s.payloads)?.[0]?.value ?? ""}
                      title={meta?.title ?? s.title}
                    />
                  )}
                </div>
              );
            })}
          </section>
        );
      })}

      <AdSlot slot="home-bottom" />

      <h2>{dict.home.contributingHeading}</h2>
      <section className="contributing-panel">
        {dict.home.contributingBody.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="contributing-links">
          {dict.home.contributingLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
