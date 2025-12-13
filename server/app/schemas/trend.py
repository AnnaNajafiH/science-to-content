"""Trend and SocialPost (TrendMention) schemas."""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

from ..models.enums import TrendCategory, TrendVelocity


class SocialPostResponse(BaseModel):
    """Schema for social media post (TrendMention) response."""
    id: str  # Return as string for frontend
    text: str
    author: str
    platform: str  # "instagram", "tiktok", "twitter", "reddit"
    timestamp: datetime
    likes: int
    comments: int
    hashtags: List[str]


class TrendCreate(BaseModel):
    """Schema for creating a new trend."""
    name: str  # Frontend expects 'name'
    description: str
    category: TrendCategory = TrendCategory.OTHER
    score: float = Field(ge=0.0, le=1.0, default=0.0)  # Frontend expects 'score'
    velocity: TrendVelocity = TrendVelocity.STABLE  # Frontend expects 'velocity'
    keywords: List[str] = []  # Frontend expects keywords


class TrendUpdate(BaseModel):
    """Schema for updating trend information."""
    score: Optional[float] = None
    velocity: Optional[TrendVelocity] = None
    mention_count: Optional[int] = None
    trending_up: Optional[bool] = None


class TrendResponse(BaseModel):
    """Schema for trend API response (camelCase for frontend)."""
    id: str  # Return as string for frontend
    name: str  # Frontend expects 'name'
    description: str
    category: str
    score: float  # Frontend expects 'score'
    velocity: str  # Frontend expects 'velocity': "rising" | "hot" | "stable"
    detectedAt: datetime  # camelCase for frontend
    relatedPosts: List[SocialPostResponse] = []  # Frontend expects relatedPosts (mentions)
    keywords: List[str]  # Frontend expects keywords


class TrendListResponse(BaseModel):
    """Schema for listing trends."""
    total: int
    trends: List[TrendResponse]
