import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { Button, Stack } from "@mui/material";

import PageHeader from "@/components/common/PageHeader/PageHeader";

type Props = {
  onExportJson: () => void;
};

export default function ReportsHeader({ onExportJson }: Props) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="space-between"
    >
      <PageHeader
        title="Audit Reports"
        subtitle="Release history, governance trends, and deployment posture over time"
      />

      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfRoundedIcon />}
          onClick={() => window.print()}
        >
          Print Executive Report
        </Button>
        <Button
          variant="contained"
          startIcon={<DownloadRoundedIcon />}
          onClick={onExportJson}
        >
          Export Evidence JSON
        </Button>
      </Stack>
    </Stack>
  );
}
