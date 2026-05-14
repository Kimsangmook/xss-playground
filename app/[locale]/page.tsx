import Link from "next/link";
import { notFound } from "next/navigation";
import { SCENARIOS, ALL_CATEGORIES } from "@/lib/scenarios";
import { getDictionary } from "@/i18n";
import { LOCALES, type Locale } from "@/i18n/types";
import { SITE_AUTHOR, SOCIAL, SITE_URL } from "@/lib/site";
import { AdSlot } from "@/app/AdSlot";

interface IProps {
  params: { locale: string };
}

const HomePage = ({ params }: IProps) => {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.site.name,
    url: `${SITE_URL}/${locale}`,
    description: dict.site.description,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR.name,
      jobTitle: SITE_AUTHOR.role,
      url: `https://github.com/${SITE_AUTHOR.github}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <a href={SOCIAL.githubRepo} target="_blank" rel="noopener noreferrer">
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

      <h2>{dict.home.howToUseHeading}</h2>
      <ol>
        {dict.home.howToUseSteps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      <AdSlot slot="home-mid" />

      <h2>{dict.home.scenariosHeading}</h2>
      <p className="summary">{dict.home.scenariosIntro}</p>

      {ALL_CATEGORIES.map((cat) => {
        const items = SCENARIOS.filter((s) => s.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat}>
            <h3 style={{ margin: "18px 0 8px", fontSize: 14 }}>
              {dict.categories[cat] ?? cat}
            </h3>
            {items.map((s) => {
              const meta = dict.scenarios[s.slug];
              return (
                <div key={s.slug} className="card">
                  <Link href={`/${locale}/scenarios/${s.slug}`}>
                    <strong>{meta?.title ?? s.title}</strong>
                  </Link>
                  <p style={{ margin: "6px 0 0", color: "var(--text-dim)" }}>
                    {meta?.summary ?? s.summary}
                  </p>
                </div>
              );
            })}
          </section>
        );
      })}

      <AdSlot slot="home-bottom" />
    </>
  );
};

export default HomePage;
