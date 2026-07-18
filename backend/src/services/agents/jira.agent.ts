import { jiraMock } from "../../mocks/jira.mock";
import { JiraAnalysis } from "../../types/release.types";

export class JiraAgent {
  async analyze(input: JiraAnalysis = jiraMock): Promise<JiraAnalysis> {
    // Future:
    // Atlassian Cloud REST API

    return input;
  }
}
