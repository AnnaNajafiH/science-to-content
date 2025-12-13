"""Generated Content schemas."""
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from ..models.enums import ContentType, ApprovalStatus


class ContentSlide(BaseModel):
    """Schema for a content slide in a carousel."""
    number: int
    text: str
    visualHint: str  # camelCase for frontend


class GeneratedContentCreate(BaseModel):
    """Schema for creating generated content."""
    trendId: str  # Frontend expects trendId as string
    type: ContentType  # Frontend expects type field
    caption: Optional[str] = None
    script: Optional[str] = None  # Frontend expects script
    visualSuggestions: List[str] = []  # Frontend expects visualSuggestions
    hashtags: List[str] = []
    slides: List[ContentSlide] = []  # Frontend expects slides array
    rdReferences: List[str] = []  # Frontend expects rdReferences


class GeneratedContentUpdate(BaseModel):
    """Schema for updating generated content."""
    status: Optional[ApprovalStatus] = None  # Frontend uses 'status'
    reviewerNotes: Optional[str] = None  # Frontend expects reviewerNotes
    editedBy: Optional[str] = None  # Frontend expects editedBy


class GeneratedContentResponse(BaseModel):
    """Schema for generated content API response (camelCase for frontend)."""
    id: str  # Return as string for frontend
    trendId: str  # Frontend expects trendId
    type: str  # Frontend expects type: "instagram-carousel" | "reel" | "story" | "video-script"
    status: str  # Frontend expects status: "pending" | "approved" | "rejected" | "published"
    confidence: float  # Frontend expects confidence score
    generatedAt: datetime  # Frontend expects generatedAt
    slides: Optional[List[ContentSlide]] = None
    caption: Optional[str] = None
    hashtags: List[str] = []
    visualSuggestions: List[str] = []  # Frontend expects visualSuggestions
    script: Optional[str] = None  # Frontend expects script
    rdReferences: List[str] = []  # Frontend expects rdReferences
    reviewerNotes: Optional[str] = None  # Frontend expects reviewerNotes
    editedBy: Optional[str] = None  # Frontend expects editedBy
    approvedAt: Optional[datetime] = None  # Frontend expects approvedAt


class GeneratedContentListResponse(BaseModel):
    """Schema for listing generated content with counts."""
    total: int
    contents: List[GeneratedContentResponse]
    pending_count: int
    approved_count: int
