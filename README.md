# Pulse AI

AI-powered Release Command Center for engineering managers, release managers, and DevOps teams.

Pulse AI answers one urgent question:

> Is this release safe to deploy right now?

Instead of manually checking GitHub, Jira, Slack, incident channels, and monitoring tools, Pulse AI runs a multi-agent release analysis and produces a single executive deployment recommendation.

## Why This Matters

Release decisions are usually fragmented:

- GitHub has pending reviews and risky pull requests.
- Jira has blockers, critical tickets, and sprint-health signals.
- Slack has incident chatter, hotfix threads, and deployment warnings.
- Monitoring tools may show active production instability.
- Executives need a clear decision, not five disconnected dashboards.

Pulse AI turns those signals into a command-center experience with deterministic risk scoring and AI-generated executive explanation.

## Hackathon Differentiator

Pulse AI is not a chatbot pasted onto a dashboard.

The product demonstrates specialized agents collaborating:

```text
GitHub Agent
  -> Jira Agent
  -> Slack Agent
  -> Risk Agent
  -> Decision Agent
  -> OpenAI Reviewer Agent
  -> Executive Deployment Report
```

The deterministic Risk Agent calculates score, blockers, warnings, rollback readiness, and confidence. The OpenAI Reviewer Agent explains those outputs for humans; it does not replace the business logic.

## Demo Flow

1. Open the Dashboard.
2. Pick a demo scenario:
   - Safe release
   - Warning release
   - Blocked release
   - Production incident active
   - High-risk PR storm
3. Click **Analyze Release**.
4. Watch the animated agent pipeline run.
5. Review the executive release report:
   - deploy / hold / escalate recommendation
   - agent trace
   - deterministic rules
   - readiness checklist
   - fix plan
   - risk simulator
   - agent debate mode
   - Slack-ready war-room summary
6. Ask the AI Assistant release-specific questions.
7. View historical trends in Reports.

## Core Features

- Multi-agent release analysis
- Scenario selector for dramatic hackathon demos
- Agent trace with evidence from each system
- Deterministic policy engine
- OpenAI executive review generated from agent outputs
- Release readiness checklist
- Fix plan with owner, priority, source, and expected impact
- Risk simulator for what-if release decisions
- Agent debate mode
- Rollback readiness score
- Confidence breakdown
- Source freshness indicators
- Slack-ready war-room summary
- Human approval workflow actions
- Seeded mocked history for reports and refresh-safe demos
- Historical reports with charts
- JSON export and print-friendly report path

## Deterministic vs AI

Pulse AI makes this separation explicit:

- **Risk score calculated by rules**
- **Decision source: deterministic policy engine**
- **AI executive review generated from agent outputs**

This makes the system safer, easier to explain, and more believable for release governance.

## Architecture

```text
pulse-ai/
  frontend/
    Next.js 15 App Router
    React 19
    TypeScript
    Material UI v7
    Zustand
    TanStack React Query
    Axios
    ApexCharts

  backend/
    Express.js
    TypeScript
    OpenAI SDK v6
    Zod validation
    Mock integrations
    In-memory release history
```

## Backend Agents

### GitHub Agent

Analyzes:

- total pull requests
- pending reviews
- risky PRs
- large PRs
- files changed
- merge conflicts
- review status

### Jira Agent

Analyzes:

- blocker tickets
- critical tickets
- high-priority issues
- open bugs
- sprint health

### Slack Agent

Analyzes:

- production incidents
- deployment alerts
- PagerDuty alerts
- hotfix discussions
- mock Slack signal messages

### Risk Agent

Pure deterministic business logic.

Calculates:

- risk score
- rollback readiness score
- warnings
- blockers
- deterministic rules applied
- confidence breakdown

### Decision Agent

Produces:

- SAFE
- WARNING
- BLOCKED
- DEPLOY / HOLD / ESCALATE

### OpenAI Reviewer Agent

Receives agent outputs and returns:

- executive summary
- top risks
- recommended actions
- verdict explanation
- source citations

## API

### Analyze Release

```http
POST /api/release/analyze
```

Body:

```json
{
  "scenario": "warning"
}
```

### Scenarios

```http
GET /api/release/scenarios
```

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

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend usually runs at:

```text
http://localhost:3000
```

If port 3000 is busy, Next.js will choose another port such as `3001`.

### Environment

Frontend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

Backend:

```env
OPENAI_API_KEY=your_api_key_here
```

If no OpenAI key is configured, Pulse AI uses deterministic fallback executive summaries so the demo still works.

Copy the example files before local setup:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

## Scripts

Backend:

```bash
cd backend
npm run dev
npm run build
npm run test
npm run test:coverage
```

Frontend:

```bash
cd frontend
npm run dev
npm run lint
npm run build
npm run test -- --run
npm run test:coverage -- --run
```

## Deployment

Recommended:

- Frontend: Vercel
- Backend: Render

Included deployment helpers:

- `frontend/vercel.json`

Backend deployment is configured manually in Render using the backend build and start commands.

Configure the deployed frontend with:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-render-backend.onrender.com/api
```

## Screenshots

Add screenshots or a short GIF before final submission:

- Dashboard scenario selector
- Agent pipeline animation
- Executive release report
- Risk simulator
- AI Assistant with source-cited answer
- Reports page

Suggested folder:

```text
docs/screenshots/
```

## Current Mock Integrations

The hackathon demo intentionally uses realistic mock data for:

- GitHub
- Jira
- Slack
- Monitoring freshness

This keeps the demo reliable and avoids requiring judge/workspace OAuth access while still showing the integration architecture. The Dashboard scenario selector lets judges trigger SAFE, WARNING, BLOCKED, incident, and high-risk PR-storm outcomes without external accounts.

## Real Integration Roadmap

### GitHub

- repo URL input
- open PR count
- review status
- changed files
- mergeability
- risky file detection

### Jira

- Jira Cloud project connection
- release version mapping
- blockers and critical issues
- sprint health

### Slack

- incident channel search
- deployment alert parsing
- hotfix discussion detection
- Slack-ready release summary posting

### Monitoring

- active incident count
- SLO burn
- rollback health
- canary error rate

## Why Pulse AI Can Stand Out

Pulse AI is unique because it combines:

- deterministic governance
- visible multi-agent collaboration
- executive-grade recommendations
- AI-generated explanations with citations
- risk simulation
- release war-room output

It is practical enough for engineering teams and theatrical enough for a hackathon demo.
