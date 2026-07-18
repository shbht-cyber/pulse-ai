import { slackMock } from "../../mocks/slack.mock";
import { SlackAnalysis } from "../../types/release.types";

export class SlackAgent {
  async analyze(input: SlackAnalysis = slackMock): Promise<SlackAnalysis> {
    // Future:
    // Slack Conversations API
    // Slack Search API

    return input;
  }
}
