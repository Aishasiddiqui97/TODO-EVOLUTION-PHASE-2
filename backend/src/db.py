from sqlmodel import create_engine, Session
from typing import Generator
import os

# Get database URL from environment, with a default for development
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/todo_db")

# Create the database engine
engine = create_engine(DATABASE_URL, echo=True)


def get_session() -> Generator[Session, None, None]:
    """
    Get a database session for dependency injection in FastAPI routes.
    """
    with Session(engine) as session:
        yield session