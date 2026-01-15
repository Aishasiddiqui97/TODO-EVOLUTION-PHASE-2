# API Contracts (Phase II)

**Feature**: 002-phase-2-web-app
**Date**: 2026-01-09

> Note: Concrete OpenAPI will be generated from the backend framework; this document defines the contract surface.

## Authentication

All task endpoints require a valid access token. The backend derives the current user from the token.

### Errors

- **401 Unauthorized**: missing/invalid/expired token

## Tasks

### List tasks

- **Method**: GET
- **Path**: `/api/tasks`
- **Auth**: required
- **Query params (optional)**:
  - `completed`: boolean

**Response 200**:
```json
{
  "items": [
    {
      "id": "string-or-int",
      "description": "string",
      "completed": true,
      "created_at": "ISO-8601",
      "updated_at": "ISO-8601"
    }
  ]
}
```

### Create task

- **Method**: POST
- **Path**: `/api/tasks`
- **Auth**: required

**Request**:
```json
{
  "description": "string"
}
```

**Response 201**: Task representation

**Errors**:
- **400 Invalid Input**: empty/invalid description

### Get task details

- **Method**: GET
- **Path**: `/api/tasks/{id}`
- **Auth**: required

**Response 200**: Task representation

**Errors**:
- **404 Not Found**: task does not exist OR does not belong to user

### Update task

- **Method**: PUT
- **Path**: `/api/tasks/{id}`
- **Auth**: required

**Request**:
```json
{
  "description": "string"
}
```

**Response 200**: Task representation

**Errors**:
- **400 Invalid Input**
- **404 Not Found**

### Delete task

- **Method**: DELETE
- **Path**: `/api/tasks/{id}`
- **Auth**: required

**Response 204**: no body

**Errors**:
- **404 Not Found**

### Set completion state

- **Method**: PATCH
- **Path**: `/api/tasks/{id}/complete`
- **Auth**: required

**Request**:
```json
{
  "completed": true
}
```

**Response 200**: Task representation

**Errors**:
- **400 Invalid Input**
- **404 Not Found**
