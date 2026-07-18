import { ReleaseAnalysisResponse } from "../../types/release.types";

const history: ReleaseAnalysisResponse[] = [];

export function addReleaseHistory(analysis: ReleaseAnalysisResponse) {
  history.unshift(analysis);
  history.splice(20);
}

export function getReleaseHistory() {
  return history;
}

export function getLatestRelease() {
  return history[0] ?? null;
}
