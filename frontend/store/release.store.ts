import { create } from "zustand";

import {
  AssistantMessage,
  HistoricalRelease,
  ReleaseAnalysisResponse,
  ReportRange,
} from "@/types/release";

interface ReleaseStore {
  analysis: ReleaseAnalysisResponse | null;
  assistantHistory: AssistantMessage[];
  reportRange: ReportRange;
  historicalReleases: HistoricalRelease[];

  setAnalysis: (data: ReleaseAnalysisResponse) => void;
  addAssistantMessage: (message: AssistantMessage) => void;
  setReportRange: (range: ReportRange) => void;
  clearAnalysis: () => void;
}

export const useReleaseStore = create<ReleaseStore>((set) => ({
  analysis: null,
  assistantHistory: [],
  reportRange: "30d",
  historicalReleases: [
    {
      id: "rel-124",
      version: "v2.8.0",
      status: "BLOCKED",
      riskScore: 42,
      confidence: 84,
      analyzedAt: "2026-07-16T10:20:00.000Z",
    },
    {
      id: "rel-123",
      version: "v2.7.4",
      status: "WARNING",
      riskScore: 71,
      confidence: 88,
      analyzedAt: "2026-07-11T14:35:00.000Z",
    },
    {
      id: "rel-122",
      version: "v2.7.3",
      status: "SAFE",
      riskScore: 94,
      confidence: 96,
      analyzedAt: "2026-07-04T09:10:00.000Z",
    },
    {
      id: "rel-121",
      version: "v2.7.2",
      status: "WARNING",
      riskScore: 76,
      confidence: 90,
      analyzedAt: "2026-06-27T16:45:00.000Z",
    },
  ],

  setAnalysis: (analysis) =>
    set((state) => ({
      analysis,
      historicalReleases: [
        {
          ...analysis,
        },
        ...state.historicalReleases,
      ].slice(0, 12),
    })),

  addAssistantMessage: (message) =>
    set((state) => ({
      assistantHistory: [...state.assistantHistory, message],
    })),

  setReportRange: (reportRange) => set({ reportRange }),

  clearAnalysis: () => set({ analysis: null }),
}));
