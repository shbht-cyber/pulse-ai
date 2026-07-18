"use client";

import { useState } from "react";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import PageHeader from "@/components/common/PageHeader/PageHeader";
import {
  chatWithAssistant,
  getLatestRelease,
} from "@/services/api/release.service";
import { useReleaseStore } from "@/store/release.store";
import { AssistantMessage } from "@/types/release";

const PROMPTS = [
  "Why should we hold this release?",
  "Which PR signals are driving risk?",
  "Summarize this release for leadership.",
  "What must be fixed before deployment?",
];

function createMessage(role: AssistantMessage["role"], content: string) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export default function AssistantPage() {
  const [message, setMessage] = useState("");

  const analysis = useReleaseStore((state) => state.analysis);
  const setAnalysis = useReleaseStore((state) => state.setAnalysis);

  const history = useReleaseStore((state) => state.assistantHistory);
  const addAssistantMessage = useReleaseStore(
    (state) => state.addAssistantMessage,
  );

  const { data: latestAnalysis } = useQuery({
    queryKey: ["assistant-latest-release"],
    queryFn: getLatestRelease,
    enabled: !analysis,
  });

  const currentAnalysis = analysis ?? latestAnalysis ?? null;

  const { mutate, isPending, error } = useMutation({
    mutationFn: chatWithAssistant,
    onSuccess: ({ reply }) => {
      addAssistantMessage(createMessage("assistant", reply));
    },
  });

  const sendMessage = (content: string) => {
    const trimmed = content.trim();

    if (!trimmed) {
      return;
    }

    addAssistantMessage(createMessage("user", trimmed));
    if (!analysis && latestAnalysis) {
      setAnalysis(latestAnalysis);
    }

    mutate({ message: trimmed, analysis: currentAnalysis });
    setMessage("");
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Release Copilot"
        subtitle="Ask source-cited questions against the latest agent analysis"
      />

      {!currentAnalysis && (
        <Alert severity="info">
          Run a release analysis first so the copilot can answer with current
          agent evidence.
        </Alert>
      )}

      {currentAnalysis && !analysis && (
        <Alert severity="success">
          Loaded the latest mocked release analysis from the backend history.
        </Alert>
      )}

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {PROMPTS.map((prompt) => (
              <Chip
                key={prompt}
                label={prompt}
                onClick={() => sendMessage(prompt)}
                variant="outlined"
                disabled={isPending}
              />
            ))}
          </Stack>

          <Divider />

          <Stack spacing={2} sx={{ minHeight: 360 }}>
            {history.length === 0 ? (
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  minHeight: 260,
                }}
              >
                <Typography color="text.secondary">
                  Ask about release blockers, risk drivers, owners, or executive
                  messaging.
                </Typography>
              </Box>
            ) : (
              history.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    alignSelf: item.role === "user" ? "flex-end" : "flex-start",
                    bgcolor:
                      item.role === "user"
                        ? "primary.main"
                        : "background.default",
                    border: "1px solid",
                    borderColor:
                      item.role === "user" ? "primary.main" : "divider",
                    borderRadius: 2,
                    maxWidth: { xs: "100%", md: "72%" },
                    p: 2,
                  }}
                >
                  <Typography variant="body2">{item.content}</Typography>
                </Box>
              ))
            )}
          </Stack>

          {error && (
            <Alert severity="error">Assistant request failed. Try again.</Alert>
          )}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              fullWidth
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about blockers, risk drivers, owners, or stakeholder updates"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage(message);
                }
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendRoundedIcon />}
              disabled={isPending || !message.trim()}
              onClick={() => sendMessage(message)}
              sx={{ minWidth: 120 }}
            >
              Ask Copilot
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
