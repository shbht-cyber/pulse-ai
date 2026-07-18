"use client";

import dynamic from "next/dynamic";

import { Grid, Paper, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";

import { HistoricalRelease, ReleaseStatus } from "@/types/release";
import { STATUS_COLORS } from "./reports.constants";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  releases: HistoricalRelease[];
};

export default function ReportCharts({ releases }: Props) {
  const riskTrendOptions: ApexOptions = {
    chart: { toolbar: { show: false }, foreColor: "#AAB4CF" },
    colors: ["#4F7CFF"],
    dataLabels: { enabled: false },
    grid: { borderColor: "rgba(255,255,255,0.08)" },
    stroke: { curve: "smooth", width: 3 },
    theme: { mode: "dark" },
    xaxis: {
      categories: releases.map((release) =>
        new Date(release.analyzedAt).toLocaleDateString(),
      ),
    },
    yaxis: { min: 0, max: 100 },
  };

  const statusCounts = releases.reduce(
    (acc, release) => {
      acc[release.status] += 1;
      return acc;
    },
    { SAFE: 0, WARNING: 0, BLOCKED: 0 } as Record<ReleaseStatus, number>,
  );

  const distributionOptions: ApexOptions = {
    chart: { foreColor: "#AAB4CF" },
    colors: Object.values(STATUS_COLORS),
    labels: Object.keys(statusCounts),
    legend: { position: "bottom" },
    theme: { mode: "dark" },
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Release Risk Trend
          </Typography>
          <Chart
            options={riskTrendOptions}
            series={[
              {
                name: "Risk score",
                data: releases.map((release) => release.riskScore),
              },
            ]}
            type="area"
            height={320}
          />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Deployment Verdict Distribution
          </Typography>
          <Chart
            options={distributionOptions}
            series={Object.values(statusCounts)}
            type="donut"
            height={320}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
