import { githubMock } from "../../mocks/github.mock";
import { GithubAnalysis } from "../../types/release.types";

export class GithubAgent {
  async analyze(input: GithubAnalysis = githubMock): Promise<GithubAnalysis> {
    // Future:
    // GitHub REST API
    // GitHub GraphQL API

    return input;
  }
}
