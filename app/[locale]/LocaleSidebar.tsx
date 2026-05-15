"use client";

import { ALL_CATEGORIES, SCENARIOS } from "@/lib/scenarios";
import type { IDictionary, Locale } from "@/i18n/types";
import { LOCALES, LOCALE_LABEL } from "@/i18n/types";

import Link from "next/link";
import { getScenarioI18n } from "@/app/[locale]/scenarios/i18nRegistry";
import { usePathname } from "next/navigation";

interface IProps {
  locale: Locale;
  dict: IDictionary;
}

export const LocaleSidebar = ({ locale, dict }: IProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const linkBase = `/${locale}`;

  return (
    <aside className="sidebar">
      <Link href={linkBase} style={{ textDecoration: "none" }}>
        <h1 style={{ color: "var(--text)" }}>{dict.site.name}</h1>
      </Link>
      <p className="subtitle">{dict.site.tagline}</p>

      <Link href={linkBase} className={isActive(linkBase) ? "active" : ""}>
        {dict.nav.home}
      </Link>
      <Link
        href={`${linkBase}/embed-helper`}
        className={isActive(`${linkBase}/embed-helper`) ? "active" : ""}
      >
        {dict.nav.embedHelper}
      </Link>
      <Link
        href={`${linkBase}/learn`}
        className={isActive(`${linkBase}/learn`) ? "active" : ""}
      >
        {dict.nav.learn}
      </Link>
      <Link
        href={`${linkBase}/forum`}
        className={isActive(`${linkBase}/forum`) ? "active" : ""}
      >
        {dict.nav.forum}
      </Link>

      {ALL_CATEGORIES.map((cat) => {
        const items = SCENARIOS.filter((s) => s.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <div className="group-label">{dict.categories[cat] ?? cat}</div>
            {items.map((s) => {
              const href = `${linkBase}/scenarios/${s.slug}`;
              const title = getScenarioI18n(locale, s.slug)?.title ?? s.title;
              return (
                <Link
                  key={s.slug}
                  href={href}
                  className={isActive(href) ? "active" : ""}
                >
                  {title}
                </Link>
              );
            })}
          </div>
        );
      })}

      <div className="group-label">Language</div>
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "2px 8px",
          flexWrap: "wrap",
        }}
      >
        {LOCALES.map((l) => {
          const swapped = pathname.replace(/^\/[a-z]{2}/, `/${l}`);
          return (
            <Link
              key={l}
              href={swapped || `/${l}`}
              style={{
                fontSize: 11,
                padding: "2px 8px",
                border: "1px solid var(--border)",
                borderRadius: 4,
                color: l === locale ? "var(--accent)" : "var(--text-dim)",
                borderColor: l === locale ? "var(--accent)" : "var(--border)",
              }}
            >
              {LOCALE_LABEL[l]}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
