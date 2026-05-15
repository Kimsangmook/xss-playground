"use client";

import type { IGitHubIssue } from "@/lib/types/github";
import useRepositoryIssues from "@/lib/hooks/useRepositoryIssues";

interface IIssueListLabels {
  loading: string;
  error: string;
  empty: string;
  /**
   * 댓글 수 라벨 패턴. {count} 자리에 숫자가 치환된다.
   * Server → Client 경계는 함수 직렬화가 불가하므로 패턴 객체로 받는다.
   */
  comments: { one: string; other: string };
  joinDiscussion: string;
}

const formatComments = (
  count: number,
  pattern: { one: string; other: string }
) => (count === 1 ? pattern.one : pattern.other).replace("{count}", String(count));

interface IIssueListProps {
  owner: string;
  repo: string;
  label?: string;
  state?: "open" | "closed" | "all";
  /** Server Component 에서 locale 결정 후 내려주는 i18n 메시지 묶음. */
  labels: IIssueListLabels;
}

const IssueList = ({
  owner,
  repo,
  label,
  state = "open",
  labels,
}: IIssueListProps) => {
  const { issues, isLoading, isError } = useRepositoryIssues({
    owner,
    repo,
    label,
    state,
  });

  if (isLoading) {
    return <p style={{ color: "var(--text-dim)" }}>{labels.loading}</p>;
  }

  if (isError) {
    return <p style={{ color: "var(--text-dim)" }}>{labels.error}</p>;
  }

  if (!issues || issues.length === 0) {
    return <p style={{ color: "var(--text-dim)" }}>{labels.empty}</p>;
  }

  return (
    <>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} labels={labels} />
      ))}
    </>
  );
};

interface IIssueCardProps {
  issue: IGitHubIssue;
  labels: IIssueListLabels;
}

const IssueCard = ({ issue, labels }: IIssueCardProps) => (
  <section className="card">
    <strong>
      #{issue.number} {issue.title}
    </strong>
    {issue.body ? (
      <p style={{ color: "var(--text-dim)" }}>{truncate(issue.body, 280)}</p>
    ) : null}
    <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
      {formatComments(issue.comments, labels.comments)}
      {issue.labels.length > 0 ? (
        <>
          {" · "}
          {issue.labels.map((l) => l.name).join(", ")}
        </>
      ) : null}
    </p>
    <a
      className="button-link"
      href={issue.html_url}
      target="_blank"
      rel="noreferrer"
    >
      {labels.joinDiscussion}
    </a>
  </section>
);

const truncate = (text: string, max: number) => {
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
};

export default IssueList;
