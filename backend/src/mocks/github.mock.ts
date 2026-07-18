import { GithubAnalysis } from "../types/release.types";

export const githubMock: GithubAnalysis = {
  totalPRs: 11,
  pendingReviews: 2,
  riskyPRs: 1,
  largePRs: 2,
  filesChanged: 184,
  mergeConflicts: 0,
  reviewStatus: "2 PRs need approval before the release train closes",
};
