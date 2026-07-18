import { Paper, Stack, Typography } from "@mui/material";

type Props = {
  signals: string[];
};

export default function CollaborationSignals({ signals }: Props) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>
        Collaboration Signals
      </Typography>
      <Stack spacing={1}>
        {signals.map((signal) => (
          <Typography key={signal} color="text.secondary">
            {signal}
          </Typography>
        ))}
      </Stack>
    </Paper>
  );
}
