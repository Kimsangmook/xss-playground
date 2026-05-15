import useSWR, { type KeyedMutator } from "swr";
import { fetchRepositoryIssues } from "@/lib/api/github";
import type { IGitHubIssue } from "@/lib/types/github";

interface IUseRepositoryIssuesParams {
  owner: string | null;
  repo: string | null;
  label?: string;
  state?: "open" | "closed" | "all";
}

interface IUseRepositoryIssuesResponse {
  issues: IGitHubIssue[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: KeyedMutator<IGitHubIssue[]>;
}

/**
 * 레포지토리의 이슈를 SWR 로 조회한다.
 * owner / repo 가 null 이면 요청을 스킵한다 (allen-web fetcher 패턴).
 */
const useRepositoryIssues = ({
  owner,
  repo,
  label,
  state = "open",
}: IUseRepositoryIssuesParams): IUseRepositoryIssuesResponse => {
  const swrKey =
    owner && repo ? ["github-issues", owner, repo, label ?? null, state] : null;

  const { data, error, mutate, isValidating } = useSWR<IGitHubIssue[]>(
    swrKey,
    () =>
      fetchRepositoryIssues({
        owner: owner as string,
        repo: repo as string,
        label,
        state,
      }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );

  return {
    issues: data,
    isLoading: !data && !error && isValidating,
    isError: error,
    mutate,
  };
};

export default useRepositoryIssues;
