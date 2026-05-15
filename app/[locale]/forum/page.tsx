import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/i18n/types";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
  createForumJsonLd,
  createForumSeoMetadata,
} from "@/components/seo/Seo";
import IssueList from "@/components/forum/IssueList";
import { parseGithubRepoUrl } from "@/lib/api/github";
import { SOCIAL } from "@/lib/site";
import { I18N } from "./i18n";

interface IProps {
  params: { locale: string };
}

/** 포럼으로 노출할 라벨. 이 라벨이 붙은 GitHub 이슈만 가져온다. */
const FORUM_ISSUE_LABEL = "discussion";

export const generateMetadata = ({ params }: IProps): Metadata => {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  return createForumSeoMetadata(params.locale as Locale);
};

const ForumPage = ({ params }: IProps) => {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const t = I18N[locale];
  const repoInfo = parseGithubRepoUrl(SOCIAL.githubRepo);

  return (
    <>
      <JsonLdScript data={createForumJsonLd(locale)} />
      <h1>{t.title}</h1>
      <p className="summary">{t.summary}</p>

      <div className="actions">
        <a
          className="button-link"
          href={`${SOCIAL.githubRepo}/issues/new/choose`}
          target="_blank"
          rel="noreferrer"
        >
          {t.actions.newDiscussion}
        </a>
        <a
          className="button-link"
          href={`${SOCIAL.githubRepo}/issues?q=is%3Aissue+label%3Abest-practice`}
          target="_blank"
          rel="noreferrer"
        >
          {t.actions.bestPractices}
        </a>
        <a
          className="button-link"
          href={`${SOCIAL.githubRepo}/issues?q=is%3Aissue+is%3Aopen+label%3A${FORUM_ISSUE_LABEL}`}
          target="_blank"
          rel="noreferrer"
        >
          {t.actions.openIssues}
        </a>
      </div>

      <h2>{t.howTitle}</h2>
      <ol>
        {t.how.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <h2>{t.discussionsTitle}</h2>
      {repoInfo ? (
        <IssueList
          owner={repoInfo.owner}
          repo={repoInfo.repo}
          label={FORUM_ISSUE_LABEL}
          state="open"
          labels={{
            loading: t.issues.loading,
            error: t.issues.error,
            empty: t.issues.empty,
            comments: t.issues.comments,
            joinDiscussion: t.actions.joinDiscussion,
          }}
        />
      ) : (
        <p style={{ color: "var(--text-dim)" }}>{t.issues.error}</p>
      )}

      <h2>{t.guidelinesTitle}</h2>
      <ul>
        {t.guidelines.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default ForumPage;
