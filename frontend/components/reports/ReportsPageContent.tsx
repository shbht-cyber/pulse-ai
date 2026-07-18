"use client";

import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getReleaseHistory } from "@/services/api/release.service";
import { useReleaseStore } from "@/store/release.store";
import ReleaseAuditTrail from "./ReleaseAuditTrail";
import ReportCharts from "./ReportCharts";
import ReportsHeader from "./ReportsHeader";
import ReportRangeFilter from "./ReportRangeFilter";

export default function ReportsPage() {
  const localReleases = useReleaseStore((state) => state.historicalReleases);
  const reportRange = useReleaseStore((state) => state.reportRange);
  const setReportRange = useReleaseStore((state) => state.setReportRange);
  const { data: backendReleases = [] } = useQuery({
    queryKey: ["release-history"],
    queryFn: getReleaseHistory,
  });
  const releases = backendReleases.length > 0 ? backendReleases : localReleases;
  const rangeDays = Number(reportRange.replace("d", ""));
  const rangeStart = Date.now() - rangeDays * 24 * 60 * 60 * 1000;
  const filteredReleases = releases.filter(
    (release) => new Date(release.analyzedAt).getTime() >= rangeStart,
  );

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(filteredReleases, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pulse-ai-release-report.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Stack spacing={3}>
      <ReportsHeader onExportJson={exportJson} />
      <ReportRangeFilter value={reportRange} onChange={setReportRange} />
      <ReportCharts releases={filteredReleases} />
      <ReleaseAuditTrail releases={filteredReleases} />
    </Stack>
  );
}
