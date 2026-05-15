/**
 * GitHub REST API v3 응답 타입.
 * 포럼 용도로 필요한 필드만 좁혀서 정의한다.
 * 전체 스펙: https://docs.github.com/en/rest/issues/issues
 */

export interface IGitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface IGitHubLabel {
  id: number;
  name: string;
  color: string;
  description: string | null;
}

export interface IGitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  html_url: string;
  user: IGitHubUser | null;
  labels: IGitHubLabel[];
  comments: number;
  created_at: string;
  updated_at: string;
  /**
   * GitHub Issues API 는 PR 도 함께 돌려준다.
   * pull_request 필드가 존재하면 issue 가 아닌 PR 이므로 필터링한다.
   */
  pull_request?: unknown;
}
