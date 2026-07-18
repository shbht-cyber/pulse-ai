import { api } from "./axios";
import {
  ReleaseAnalysisResponse,
  ReleaseScenario,
  ScenarioOption,
} from "@/types/release";

export async function analyzeRelease(scenario?: ReleaseScenario) {
  const { data } = await api.post<ReleaseAnalysisResponse>("/release/analyze", {
    scenario,
  });

  return data;
}

export async function getReleaseScenarios() {
  const { data } = await api.get<ScenarioOption[]>("/release/scenarios");

  return data;
}

export async function getLatestRelease() {
  const { data } = await api.get<ReleaseAnalysisResponse | null>(
    "/release/latest"
  );

  return data;
}

export async function getReleaseHistory() {
  const { data } = await api.get<ReleaseAnalysisResponse[]>("/release/history");

  return data;
}

export async function chatWithAssistant(input: {
  message: string;
  analysis: ReleaseAnalysisResponse | null;
}) {
  const { data } = await api.post<{ reply: string }>("/assistant/chat", input);

  return data;
}
