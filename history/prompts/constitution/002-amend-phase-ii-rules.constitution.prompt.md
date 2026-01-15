---
id: 002
title: Amend constitution for Phase II
stage: constitution
date: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-phase-1-todo-crud
user: hp
command: /sp.constitution
labels: ["constitution","phase-2","fastapi","nextjs","neon","jwt","monorepo"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
  - .claude/commands/sp.constitution.md
  - README.md
tests:
  - (not run)
---

## Prompt

```text
/sp.constitution
Amend the global "Evolution of Todo" constitution for Phase II: Full-Stack Web Application.

Phase II Rules:
- Backend: Python FastAPI with SQLModel ORM
- Frontend: Next.js 16+ (App Router, TypeScript, Tailwind CSS)
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT)
- All 5 Basic Level todo features must be implemented
- RESTful API endpoints required for user-specific CRUD
- UI must be responsive and visually attractive
- JWT tokens used for secure user isolation
- No AI, agents, or future-phase features allowed

Phase I remains:
- In-memory console application only

Phase III and later:
- Advanced AI, agents, cloud orchestration

Rules:
- Each phase isolated
- Phase II allows web frontend and auth
- Phase II must use monorepo structure: /frontend, /backend, /specs, /CLAUDE.md
- Specs and CLAUDE.md guide all development
- Attractive UI + UX required

Bottom line: This constitution is authoritative for Phase II and ensures clean separation from Phase I and future phases.
```

## Response snapshot

Updated `.specify/memory/constitution.md` to add authoritative Phase II rules and phase-specific
technology standards while keeping Phase I constrained to a single-user, in-memory CLI.

Key changes:
- Added “Phase II Delivery Rules”: FastAPI + SQLModel backend, Next.js 16+ (App Router) + TS + Tailwind frontend,
  Neon Postgres, Better Auth (JWT), RESTful user-scoped CRUD, responsive/attractive UI, strict prohibition on
  AI/agents/future-phase features.
- Added Phase II monorepo structure requirement: `frontend/`, `backend/`, `specs/`, `CLAUDE.md`.
- Clarified that “No AI/agents in Phase II” applies to shipped runtime product features/dependencies.
- Propagated minor reference fixes to templates/commands and updated README header to reflect multi-phase repo.

## Outcome

- ✅ Impact: Constitution amended for Phase II governance + stack locks.
- 🧪 Tests: (not run)
- 📁 Files: Updated constitution + minimal template/doc reference sync.
- 🔁 Next prompts: Run `/sp.specify` for a Phase II feature (e.g., "Phase II full-stack web app"), then `/sp.plan`.
- 🧠 Reflection: Keep Phase II scope strict to avoid Phase III feature creep.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
