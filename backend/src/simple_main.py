from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Evolution of Todo - Phase II API", version="1.0.0")

# Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Evolution of Todo - Phase II API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/tasks")
def get_tasks():
    return {"tasks": []}

@app.post("/api/tasks")
def create_task():
    return {"message": "Task created"}
