import { Card, CardContent, Typography } from "@mui/material";

import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;

export default function SectionCard({ title, children }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}
