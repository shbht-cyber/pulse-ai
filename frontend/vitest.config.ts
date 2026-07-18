// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "components/common/**/*.ts",
        "components/common/**/*.tsx",
        "components/dashboard/AIExplanationCard/AIExplanationCard.tsx",
        "components/dashboard/AnalyzeButton/AnalyzeButton.tsx",
        "components/dashboard/StatusBadge/StatusBadge.tsx",
        "components/layout/AppHeader.tsx",
        "components/layout/AppSidebar.tsx",
        "constants/**/*.ts",
        "services/api/**/*.ts",
        "store/**/*.ts",
      ],
      exclude: ["**/*.test.{ts,tsx}", "services/api/axios.ts"],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 80,
        statements: 90,
      },
    },
  },
});
