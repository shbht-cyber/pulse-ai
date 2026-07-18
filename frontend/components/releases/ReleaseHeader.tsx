import { Button, Stack } from "@mui/material";

import PageHeader from "@/components/common/PageHeader/PageHeader";
import { ReleaseAnalysisResponse } from "@/types/release";

type Props = {
  release: ReleaseAnalysisResponse;
  onRunNewAnalysis: () => void;
};

export default function ReleaseHeader({ release, onRunNewAnalysis }: Props) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="space-between"
    >
      <PageHeader
        title={`${release.version} Deployment Report`}
        subtitle={`${release.scenarioLabel} • ${new Date(release.analyzedAt).toLocaleString()}`}
      />
      <Button
        variant="contained"
        sx={{ alignSelf: { xs: "stretch", md: "center" } }}
        onClick={onRunNewAnalysis}
      >
        Run New Analysis
      </Button>
    </Stack>
  );
}
