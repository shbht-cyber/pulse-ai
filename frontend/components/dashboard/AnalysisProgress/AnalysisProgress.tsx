"use client";

import { useEffect, useMemo, useState } from "react";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import { ANALYSIS_STEPS } from "./analysis-progress.steps";

type Props = {
  active: boolean;
  onComplete: () => void;
};

export default function AnalysisProgress({ active, onComplete }: Props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!active) {
      setActiveStep(0);
      setIsComplete(false);
      return;
    }

    setActiveStep(0);
    setIsComplete(false);
  }, [active]);

  useEffect(() => {
    if (!active || isComplete) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveStep((step) => {
        if (step >= ANALYSIS_STEPS.length - 1) {
          setIsComplete(true);
          return step;
        }

        return step + 1;
      });
    }, 760);

    return () => window.clearTimeout(timer);
  }, [active, activeStep, isComplete]);

  useEffect(() => {
    if (!isComplete) {
      return;
    }

    const timer = window.setTimeout(onComplete, 550);

    return () => window.clearTimeout(timer);
  }, [isComplete, onComplete]);

  const progress = useMemo(() => {
    if (isComplete) {
      return 100;
    }

    return Math.round(((activeStep + 1) / ANALYSIS_STEPS.length) * 100);
  }, [activeStep, isComplete]);

  if (!active) {
    return null;
  }

  const CurrentIcon = isComplete
    ? CheckCircleRoundedIcon
    : ANALYSIS_STEPS[activeStep].icon;

  return (
    <Paper
      component={motion.section}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        overflow: "hidden",
        p: { xs: 2.5, md: 3 },
        position: "relative",
      }}
    >
      <Box
        component={motion.div}
        animate={{ x: ["-25%", "125%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.12),
          filter: "blur(18px)",
          height: 120,
          left: 0,
          position: "absolute",
          top: -30,
          width: "45%",
        }}
      />

      <Stack spacing={3} position="relative">
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component={motion.div}
            animate={{
              boxShadow: [
                `0 0 0 0 ${alpha(theme.palette.primary.main, 0.42)}`,
                `0 0 0 14px ${alpha(theme.palette.primary.main, 0)}`,
              ],
              scale: isComplete ? 1 : [1, 1.05, 1],
            }}
            transition={{ duration: 1.4, repeat: isComplete ? 0 : Infinity }}
            sx={{
              alignItems: "center",
              bgcolor: isComplete ? "success.main" : "primary.main",
              borderRadius: 2,
              display: "flex",
              height: 52,
              justifyContent: "center",
              width: 52,
            }}
          >
            <CurrentIcon />
          </Box>

          <Box minWidth={0}>
            <Typography variant="overline" color="text.secondary">
              Multi-agent release analysis
            </Typography>
            <AnimatePresence mode="wait">
              <Typography
                key={isComplete ? "complete" : ANALYSIS_STEPS[activeStep].title}
                component={motion.h2}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                variant="h6"
              >
                {isComplete
                  ? "Report generated"
                  : ANALYSIS_STEPS[activeStep].title}
              </Typography>
            </AnimatePresence>
            <Typography color="text.secondary" variant="body2">
              {isComplete
                ? "Opening the executive deployment report now."
                : ANALYSIS_STEPS[activeStep].detail}
            </Typography>
          </Box>
        </Stack>

        <Box>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Release governance progress
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {progress}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              borderRadius: 999,
              height: 8,
            }}
          />
        </Box>

        <Stack spacing={1.25}>
          {ANALYSIS_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const done = isComplete || index < activeStep;
            const current = !isComplete && index === activeStep;

            return (
              <Stack
                key={step.title}
                component={motion.div}
                animate={{
                  opacity: done || current ? 1 : 0.48,
                  x: current ? [0, 4, 0] : 0,
                }}
                transition={{ duration: 0.45 }}
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                  bgcolor: current
                    ? alpha(theme.palette.primary.main, 0.12)
                    : "transparent",
                  border: "1px solid",
                  borderColor: current ? "primary.main" : "divider",
                  borderRadius: 2,
                  minHeight: 52,
                  px: 1.5,
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    color: done
                      ? "success.main"
                      : current
                        ? "primary.main"
                        : "text.secondary",
                    display: "flex",
                    width: 28,
                  }}
                >
                  {done ? (
                    <CheckCircleRoundedIcon fontSize="small" />
                  ) : (
                    <StepIcon fontSize="small" />
                  )}
                </Box>
                <Box minWidth={0}>
                  <Typography variant="body2" fontWeight={700}>
                    {step.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.detail}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
