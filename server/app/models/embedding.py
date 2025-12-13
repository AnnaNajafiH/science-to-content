"""Embedding model for vector storage."""
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Embedding(SQLModel, table=True):
    """Vector embeddings for semantic search."""
    __tablename__ = "embeddings"

    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Source reference
    source_type: str = Field(index=True)  # "trend", "rd_document", "content"
    source_id: int
    
    # Vector data
    vector: str  # JSON serialized vector for pgvector
    text: str
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
