import { Card, CardContent, Stack, Typography } from "@mui/material";

import { ReactNode } from "react";

type Props = {
  title: string;
  value: ReactNode;
  subtitle?: string;
};

export default function MetricCard({ title, value, subtitle }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
