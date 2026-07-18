"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { analyzeRelease } from "@/services/api/release.service";
import { ReleaseAnalysisResponse, ReleaseScenario } from "@/types/release";

export function useAnalyzeRelease(
  options?: UseMutationOptions<
    ReleaseAnalysisResponse,
    Error,
    ReleaseScenario | undefined,
    unknown
  >
) {
  return useMutation({
    mutationFn: analyzeRelease,
    ...options,
  });
}
