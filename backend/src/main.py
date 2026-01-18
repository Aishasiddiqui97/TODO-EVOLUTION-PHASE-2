from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.tasks import router as tasks_router
from api.routes.auth import router as auth_router
import os

app = FastAPI(title="Evolution of Todo - Phase II API", version="1.0.0")

# Add CORS middleware to allow frontend to connect
# In production, set ALLOWED_ORIGINS environment variable to your Vercel domain
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*")
if allowed_origins == "*":
    origins = ["*"]
else:
    origins = allowed_origins.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the task routes
app.include_router(tasks_router, prefix="/api", tags=["tasks"])

# Include the auth routes
app.include_router(auth_router, prefix="/api", tags=["auth"])


@app.get("/")
def read_root():
    return {"message": "Evolution of Todo - Phase II API is running!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}