"""Base model configuration and shared utilities."""
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON
from datetime import datetime
from typing import Optional


class TimestampMixin(SQLModel):
    """Mixin for created_at and updated_at timestamps."""
    created_at: datetime = Field(
        default_factory=datetime.utcnow, 
        nullable=False,
        index=True
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow, 
        nullable=False
    )


class MetadataMixin(SQLModel):
    """Mixin for metadata JSON field."""
    metadata: dict = Field(
        default_factory=dict, 
        sa_column=Column(JSON)
    )
