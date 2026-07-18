import { Box, Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={1}
      mb={4}
    >
      <Box>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{ fontSize: { xs: "2rem", md: "3rem" }, lineHeight: 1.08 }}
        >
          {title}
        </Typography>

        <Typography color="text.secondary" mt={1}>
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}
