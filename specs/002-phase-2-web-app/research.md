# Phase II Research

**Feature**: 002-phase-2-web-app
**Date**: 2026-01-09

## Decisions

### Decision 1: User identity source for API routing

- **Decision**: Derive the authenticated user identity from the JWT on the backend, and do **not** include `user_id` in REST paths.
- **Rationale**: Avoids a class of authorization bugs where path/user mismatch can accidentally expose cross-user data; simplifies client API usage.
- **Alternatives considered**:
  - Keep `user_id` in the path and validate it equals JWT subject (more complex, easier to mis-implement).

### Decision 2: REST resource shape

- **Decision**: Use resource-oriented routes under `/api/tasks`.
- **Rationale**: Matches standard REST conventions where the authenticated principal is implied and authorization is enforced server-side.
- **Alternatives considered**:
  - Nested routes under `/api/users/{user_id}/tasks`.

### Decision 3: Task completion toggle behavior

- **Decision**: Model completion as a boolean `completed` field and expose an endpoint that sets completion explicitly (or toggles via request body), rather than relying solely on "toggle" semantics.
- **Rationale**: Explicit state updates are easier to reason about, test, and make idempotent.
- **Alternatives considered**:
  - Pure toggle endpoint with no request body (non-idempotent; harder for clients to safely retry).

## Open Items (to be finalized in plan)

- Better Auth integration details for a FastAPI backend and Next.js frontend (exact flow, token storage approach).
- Local development workflow specifics (docker-compose vs direct env vars), while respecting Neon serverless usage.
