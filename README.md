# Evolution of Todo - Phase II

A full-stack web application for managing tasks with user authentication and persistent storage.

## Features

- **User Authentication**: Secure sign up and sign in with JWT tokens
- **Todo Management**: Create, read, update, delete, and toggle completion of tasks
- **User Isolation**: Users can only access their own tasks
- **Responsive UI**: Works on desktop and mobile devices
- **Persistent Storage**: Data stored in PostgreSQL database

## Tech Stack

- **Backend**: Python, FastAPI, SQLModel, PostgreSQL
- **Frontend**: Next.js 16+, TypeScript, Tailwind CSS
- **Authentication**: JWT-based authentication
- **Database**: PostgreSQL (with Neon for production)

## Prerequisites

- Python 3.13+
- Node.js 18+
- PostgreSQL (or Docker for local development)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy the environment example and configure your settings:
```bash
cp ../.env.example .env
# Edit .env with your specific configuration
```

5. Start the database with Docker:
```bash
docker-compose up -d
```

6. Run the backend server:
```bash
cd src
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example:
```bash
cp .env.example .env.local
# Edit .env.local with your specific configuration
```

4. Run the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks for the authenticated user
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/complete` - Update task completion status

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── main.py
│   │   ├── db.py
│   │   ├── models/
│   │   ├── api/
│   │   └── auth/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│   ├── package.json
│   └── tsconfig.json
├── specs/
│   └── 002-phase-2-web-app/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Development

For development, both the backend and frontend need to run simultaneously. The frontend expects the backend to be available at `http://localhost:8000`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
