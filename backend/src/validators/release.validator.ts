import { z } from "zod";

export const releaseScenarioSchema = z.enum([
  "safe",
  "warning",
  "blocked",
  "incident",
  "pr-storm",
]);

export const analyzeReleaseSchema = z.object({
  scenario: releaseScenarioSchema.optional(),
});

export const assistantChatSchema = z.object({
  message: z.string().trim().min(1),
  analysis: z.unknown().nullable(),
});
