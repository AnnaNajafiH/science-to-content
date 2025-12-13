"""R&D Document model."""
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON
from typing import Optional
from datetime import datetime


class RDDocument(SQLModel, table=True):
    """Research & Development document."""
    __tablename__ = "rd_documents"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    summary: str
    key_findings: list = Field(default_factory=list, sa_column=Column(JSON))
    ingredients: list = Field(default_factory=list, sa_column=Column(JSON))
    study_type: str
    efficacy: str
    citations: list = Field(default_factory=list, sa_column=Column(JSON))
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    
    # Metadata
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))
