# Phase II Data Model

**Feature**: 002-phase-2-web-app
**Date**: 2026-01-09

## Entities

### User

**Source of truth**: Managed by the authentication system.

**Notes**:
- Backend authorization decisions MUST derive the current user from the verified access token.

### Task

**Represents**: A single todo item owned by exactly one user.

**Fields**:
- `id`: Unique identifier
- `user_id`: Owner user identifier (from auth system)
- `description`: Non-empty text
- `completed`: Boolean completion state
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Validation rules**:
- `description` MUST be non-empty and not whitespace-only.

**Authorization rules**:
- A task MUST only be visible/modifiable by its owning user.

## Indexing (database)

- Index on `(user_id)` to support listing tasks for a user.
- Index on `(user_id, completed)` to support filtering by status.
