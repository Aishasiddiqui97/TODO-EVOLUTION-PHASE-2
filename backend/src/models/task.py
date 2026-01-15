from sqlmodel import SQLModel, Field, Column, DateTime
from typing import Optional
from datetime import datetime
import uuid


class TaskBase(SQLModel):
    description: str = Field(min_length=1)
    completed: bool = False
    user_id: str = Field(index=True)  # Assuming user_id comes from JWT


class Task(TaskBase, table=True):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    created_at: datetime = Field(sa_column=Column(DateTime(timezone=True), default=datetime.utcnow))
    updated_at: datetime = Field(sa_column=Column(DateTime(timezone=True), default=datetime.utcnow))


class TaskRead(TaskBase):
    id: str
    created_at: datetime
    updated_at: datetime


class TaskUpdate(SQLModel):
    description: Optional[str] = Field(default=None, min_length=1)
    completed: Optional[bool] = None


class TaskCreate(TaskBase):
    pass