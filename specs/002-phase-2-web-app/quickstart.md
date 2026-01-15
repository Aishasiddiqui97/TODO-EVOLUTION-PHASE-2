# Phase II Quickstart (Planned)

**Feature**: 002-phase-2-web-app

## Goal

Run the Phase II web application locally with:
- a backend service
- a frontend web UI
- authentication enabled
- persistent storage

## Developer prerequisites

- Node.js (LTS)
- Python 3.13+
- Access to environment variables for:
  - `DATABASE_URL`
  - `BETTER_AUTH_SECRET`

## Local run (high level)

1. Configure environment variables for backend and frontend.
2. Start backend.
3. Start frontend.
4. Visit the web UI, sign up, sign in, then manage todos.

## Smoke test checklist

- [ ] Sign up works
- [ ] Sign in works
- [ ] Creating a todo works
- [ ] Listing todos shows only my todos
- [ ] Updating a todo works
- [ ] Toggling completion works
- [ ] Deleting a todo works
- [ ] Signing out returns me to unauthenticated state
