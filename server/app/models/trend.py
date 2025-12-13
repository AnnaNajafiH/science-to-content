"""Trend and TrendMention models."""
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON, Index
from typing import Optional, List
from datetime import datetime

from .enums import TrendCategory, TrendVelocity, SocialPlatform

if False:  # TYPE_CHECKING
    from .content import GeneratedContent


class Trend(SQLModel, table=True):
    """Detected skincare trend from social media."""
    __tablename__ = "trends"
    __table_args__ = (
        Index("idx_trend_category_date", "category", "detected_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str
    category: TrendCategory = Field(default=TrendCategory.OTHER)
    score: float = Field(ge=0.0, le=1.0, default=0.0)
    velocity: TrendVelocity = Field(default=TrendVelocity.STABLE)
    mention_count: int = Field(ge=0, default=0)
    trending_up: bool = Field(default=False)
    keywords: list = Field(default_factory=list, sa_column=Column(JSON))

    # RAG & Embeddings
    embedding: Optional[str] = None
    source_documents: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Timestamps
    detected_at: datetime = Field(
        default_factory=datetime.utcnow, 
        nullable=False, 
        index=True
    )
    last_updated_at: datetime = Field(
        default_factory=datetime.utcnow, 
        nullable=False
    )
    
    # Metadata
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    mentions: List["TrendMention"] = Relationship(
        back_populates="trend", 
        cascade_delete=True
    )
    contents: List["GeneratedContent"] = Relationship(back_populates="trend")


class TrendMention(SQLModel, table=True):
    """Individual mention of a trend on social media (Social Post)."""
    __tablename__ = "trend_mentions"
    __table_args__ = (
        Index("idx_mention_trend_date", "trend_id", "timestamp"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    trend_id: int = Field(foreign_key="trends.id")
    
    # Social Post fields
    text: str
    author: str
    platform: SocialPlatform = Field(default=SocialPlatform.INSTAGRAM)
    timestamp: datetime = Field(index=True)
    likes: int = Field(default=0)
    comments: int = Field(default=0)
    hashtags: list = Field(default_factory=list, sa_column=Column(JSON))
    
    # Additional fields
    source_url: Optional[str] = None
    sentiment: str = Field(default="neutral")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    trend: Trend = Relationship(back_populates="mentions")
