import { Button, ButtonGroup } from "@mui/material";

import { ReportRange } from "@/types/release";
import { REPORT_FILTERS } from "./reports.constants";

type Props = {
  value: ReportRange;
  onChange: (range: ReportRange) => void;
};

export default function ReportRangeFilter({ value, onChange }: Props) {
  return (
    <ButtonGroup variant="outlined" sx={{ alignSelf: "flex-start" }}>
      {REPORT_FILTERS.map((filter) => (
        <Button
          key={filter.value}
          variant={value === filter.value ? "contained" : "outlined"}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
