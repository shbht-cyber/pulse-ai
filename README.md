# Pulse AI

Pulse AI is an AI-assisted release command center for engineering, release, and DevOps teams.

It answers one operational question:

> Is this release safe to deploy right now?

Pulse AI combines mocked GitHub, Jira, Slack, and monitoring signals with deterministic release policy rules. The policy engine produces the deployment decision, while AI generates an executive explanation from the agent outputs.

## Core Capabilities

- Multi-agent release analysis
- Deterministic risk scoring
- Deploy, hold, or escalate recommendation
- Agent evidence trace
- Release readiness checklist
- Owner action plan
- What-if risk simulator
- Rollback readiness score
- Confidence breakdown
- Source freshness indicators
- War-room summary for stakeholder updates
- Release history and audit reports
- Release Copilot for source-cited questions

## How It Works

```text
GitHub Agent
 -> Jira Agent
 -> Slack Agent
 -> Risk Agent
 -> Decision Agent
 -> OpenAI Reviewer Agent
 -> Executive Release Report
```

The deterministic agents calculate:

- risk score
- blockers
- warnings
- confidence
- rollback readiness
- deploy / hold / escalate decision

The OpenAI Reviewer Agent explains those results in human-readable language. It does not replace the deterministic release policy.

## User Flow

1. Open the Command Center.
2. Select a release scenario.
3. Run release analysis.
4. Review the deployment report.
5. Inspect agent evidence and deterministic rules.
6. Review the readiness checklist and owner action plan.
7. Use the what-if simulator to model risk reduction.
8. Ask the Release Copilot follow-up questions.
9. Review release history and export audit evidence.

## Application Pages

### Command Center

The starting page for release analysis.

Features:

- release scenario selector
- mocked source status cards
- animated agent pipeline
- architecture modal
- analyze release action

### Release Report

The main deployment report.

Shows:

- deployment verdict
- policy risk score
- confidence
- rollback readiness
- GitHub, Jira, and Slack signals
- agent evidence trace
- deterministic policy rules
- readiness checklist
- owner action plan
- what-if simulator
- agent consensus
- war-room summary
- AI executive interpretation

### Release Copilot

AI assistant for questions about the latest release analysis.

Example questions:

- Why should we hold this release?
- Which PR signals are driving risk?
- What must be fixed before deployment?
- Summarize this release for leadership.

### Audit Reports

Historical release reporting.

Includes:

- release risk trend
- verdict distribution
- release audit trail
- JSON export
- printable executive report

## Deterministic Policy And AI

Pulse AI separates release decisioning from AI explanation.

- Risk score is calculated by rules.
- Deployment verdict comes from the deterministic policy engine.
- AI generates an executive review from agent outputs.

This keeps the decision auditable while still making the result easy to communicate.

## Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Material UI
- Zustand
- TanStack React Query
- Axios
- ApexCharts
- Vitest

### Backend

- Express
- TypeScript
- OpenAI SDK
- Zod
- In-memory release history
- Mocked source integrations
- Node test runner with coverage

## Backend Agents

### GitHub Agent

Analyzes pull request and code-change signals:

- total PRs
- pending reviews
- risky PRs
- large PRs
- changed files
- merge conflicts
- review status

### Jira Agent

Analyzes delivery and quality signals:

- blocker tickets
- critical tickets
- high-priority issues
- open bugs
- sprint health

### Slack Agent

Analyzes operational signals:

- production incidents
- deployment alerts
- PagerDuty alerts
- hotfix discussions

### Risk Agent

Applies deterministic rules to calculate:

- risk score
- blockers
- warnings
- rollback readiness
- confidence breakdown

### Decision Agent

Converts deterministic risk into:

- `SAFE`
- `WARNING`
- `BLOCKED`
- `DEPLOY`
- `HOLD`
- `ESCALATE`

### OpenAI Reviewer Agent

Generates:

- executive summary
- top risks
- recommended actions
- verdict explanation
- source citations

## API Reference

Backend base URL:

```text
http://localhost:5000
```

### Health

```http
GET /health
```

### Get Scenarios

```http
GET /api/release/scenarios
```

### Analyze Release

```http
POST /api/release/analyze
```

Request:

```json
{
  "scenario": "warning"
}
```

Supported scenarios:

- `safe`
- `warning`
- `blocked`
- `incident`
- `pr-storm`

### Latest Release

```http
GET /api/release/latest
```

### Release History

```http
GET /api/release/history
```

### Assistant Chat

```http
POST /api/assistant/chat
```

Request:

```json
{
  "message": "What must be fixed before deployment?",
  "analysis": {}
}
```

## Local Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## Environment Variables

### Backend

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=http://localhost:3000
```

If `OPENAI_API_KEY` is missing, the app uses deterministic fallback summaries.

### Frontend

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Scripts

### Backend

```bash
npm run dev
npm run build
npm start
npm test
npm run test:coverage
```

### Frontend

```bash
npm run dev
npm run lint
npm run build
npm start
npm test -- --run
npm run test:coverage -- --run
```

## Deployment

### Backend On Render

Use `backend` as the root directory.

```text
Build Command: npm install && npm run build
Start Command: npm start
```

Render environment variables:

```env
NODE_ENV=production
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

After deployment, verify:

```text
https://your-render-service.onrender.com/health
```

### Frontend On Vercel

Use `frontend` as the root directory.

Vercel environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-render-service.onrender.com/api
```

## Mocked Connector Mode

The current implementation uses realistic mocked data for GitHub, Jira, Slack, and monitoring signals.

This keeps local and deployed demos reliable while preserving a connector-ready architecture. Real integrations can be added behind the existing agent interfaces.

## Roadmap

- GitHub repository connection
- Jira Cloud project connection
- Slack incident channel ingestion
- Monitoring and SLO integration
- Persistent database-backed release history
- Human approval records
- Polished PDF export
- Role-based access control
