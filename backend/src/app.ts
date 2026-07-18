import cors from "cors";
import express from "express";

import assistantRoutes from "./routes/assistant.routes";
import releaseRoutes from "./routes/release.routes";

const app = express();
const assistantHits = new Map<string, { count: number; resetAt: number }>();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? true,
  }),
);
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

app.use("/api/assistant", (req, res, next) => {
  const key = req.ip ?? "unknown";
  const now = Date.now();
  const bucket = assistantHits.get(key) ?? {
    count: 0,
    resetAt: now + 60_000,
  };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + 60_000;
  }

  bucket.count += 1;
  assistantHits.set(key, bucket);

  if (bucket.count > 30) {
    res.status(429).json({ message: "Assistant rate limit exceeded." });
    return;
  }

  next();
});

app.use("/api/release", releaseRoutes);
app.use("/api/assistant", assistantRoutes);

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "PulseAI Backend",
  });
});

export default app;
