"""InternalBrief model."""
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON, Index
from typing import Optional
from datetime import datetime

from .enums import TrendCategory

if False:  # TYPE_CHECKING
    from .user import User
    from .content import GeneratedContent


class InternalBrief(SQLModel, table=True):
    """Internal brief generated from trends and R&D documents."""
    __tablename__ = "internal_briefs"
    __table_args__ = (
        Index("idx_brief_author_status", "author_id", "status"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    
    # Related trends
    trends: list = Field(default_factory=list, sa_column=Column(JSON))
    trend_category: Optional[TrendCategory] = None
    
    # R&D evidence
    rd_references: list = Field(default_factory=list, sa_column=Column(JSON))
    
    # Brief sections
    sections: dict = Field(default_factory=dict, sa_column=Column(JSON))
    
    # Generation metadata
    generated_by: str = Field(default="llm")
    confidence: float = Field(ge=0.0, le=1.0, default=0.0)
    status: str = Field(default="draft", index=True)
    
    # Authorship
    author_id: int = Field(foreign_key="users.id")
    created_by: Optional[str] = None
    edited_by: Optional[str] = None
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    approved_at: Optional[datetime] = None

    # Metadata
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    author: "User" = Relationship(back_populates="briefs")
    contents: list["GeneratedContent"] = Relationship(back_populates="brief")
