import type { IGitHubIssue } from "@/lib/types/github";
import axios from "axios";

/**
 * GitHub REST API base URL.
 * 인증 없이 public repo 의 이슈를 조회한다 (rate limit 60/hr per IP).
 */
const GITHUB_API_BASE = "https://api.github.com";

interface IFetchRepositoryIssuesParams {
  owner: string;
  repo: string;
  /** 필터링할 라벨. 미지정 시 전체 이슈를 가져온다. */
  label?: string;
  /** 이슈 상태. 기본값은 "open". */
  state?: "open" | "closed" | "all";
  /** 페이지당 개수. GitHub 기본 30, 최대 100. */
  perPage?: number;
}

/**
 * 레포지토리의 이슈를 조회한다.
 * GitHub Issues API 는 PR 도 함께 반환하므로 pull_request 필드를 가진 항목은 제외한다.
 */
export const fetchRepositoryIssues = async ({
  owner,
  repo,
  label,
  state = "open",
  perPage = 30,
}: IFetchRepositoryIssuesParams): Promise<IGitHubIssue[]> => {
  const { data } = await axios.get<IGitHubIssue[]>(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues`,
    {
      params: {
        state,
        per_page: perPage,
        ...(label ? { labels: label } : {}),
      },
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      timeout: 10_000,
    }
  );

  return data.filter(issue => !issue.pull_request);
};

/**
 * https://github.com/{owner}/{repo} 형태의 URL 에서 owner, repo 를 추출한다.
 * 예: "https://github.com/Kimsangmook/xss-playground" → { owner: "Kimsangmook", repo: "xss-playground" }
 */
export const parseGithubRepoUrl = (
  url: string
): { owner: string; repo: string } | null => {
  const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
};
