"""GenerationJob model for background tasks."""
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON
from typing import Optional
from datetime import datetime

from .enums import GenerationJobStatus


class GenerationJob(SQLModel, table=True):
    """Background job for content generation."""
    __tablename__ = "generation_jobs"

    id: Optional[int] = Field(default=None, primary_key=True)
    job_type: str = Field(default="content_generation")
    status: GenerationJobStatus = Field(default=GenerationJobStatus.PENDING, index=True)
    
    # Job payload
    input_data: dict = Field(default_factory=dict, sa_column=Column(JSON))
    output_data: dict = Field(default_factory=dict, sa_column=Column(JSON))
    
    # Job tracking
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # Metadata
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))
