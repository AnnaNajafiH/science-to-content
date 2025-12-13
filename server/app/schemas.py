from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum


# Enums (mirror of models)
class GenerationJobStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class ApprovalStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    PUBLISHED = "published"


class TrendCategory(str, Enum):
    SKINCARE = "skincare"
    INGREDIENTS = "ingredients"
    ROUTINE = "routine"
    WELLNESS = "wellness"
    OTHER = "other"


# User schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    is_active: bool
    is_reviewer: bool
    created_at: datetime


# Trend schemas
class TrendCreate(BaseModel):
    title: str
    description: str
    category: TrendCategory = TrendCategory.OTHER
    confidence_score: float = Field(ge=0.0, le=1.0)
    mention_count: int = Field(ge=0)


class TrendUpdate(BaseModel):
    confidence_score: Optional[float] = None
    mention_count: Optional[int] = None
    trending_up: Optional[bool] = None


class TrendMentionResponse(BaseModel):
    id: int
    source: str
    engagement_count: int
    sentiment: str
    mentioned_at: datetime


class TrendResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    confidence_score: float
    mention_count: int
    trending_up: bool
    detected_at: datetime
    last_updated_at: datetime
    mentions: List[TrendMentionResponse] = []


class TrendListResponse(BaseModel):
    total: int
    trends: List[TrendResponse]


# Internal Brief schemas
class InternalBriefCreate(BaseModel):
    title: str
    content: str
    summary: Optional[str] = None
    format_type: str = "markdown"
    source_trend_id: Optional[int] = None


class InternalBriefResponse(BaseModel):
    id: int
    title: str
    content: str
    summary: Optional[str] = None
    format_type: str
    created_by: UserResponse
    created_at: datetime
    updated_at: datetime


class InternalBriefListResponse(BaseModel):
    total: int
    briefs: List[InternalBriefResponse]


# Generated Content schemas
class GeneratedContentCreate(BaseModel):
    trend_id: int
    caption: str
    video_script: Optional[str] = None
    visual_description: Optional[str] = None
    hashtags: List[str] = []


class GeneratedContentUpdate(BaseModel):
    approval_status: Optional[ApprovalStatus] = None
    review_notes: Optional[str] = None


class GeneratedContentResponse(BaseModel):
    id: int
    trend_id: int
    caption: str
    video_script: Optional[str]
    visual_description: Optional[str]
    hashtags: List[str]
    approval_status: str
    review_notes: Optional[str]
    created_at: datetime
    updated_at: datetime


class GeneratedContentListResponse(BaseModel):
    total: int
    contents: List[GeneratedContentResponse]
    pending_count: int
    approved_count: int


# Generation Job schemas
class GenerationJobCreate(BaseModel):
    job_type: str  # "internal_brief", "social_content"
    input_data: dict


class GenerationJobResponse(BaseModel):
    id: int
    job_type: str
    status: str
    error_message: Optional[str]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    created_at: datetime


class GenerationJobDetailResponse(GenerationJobResponse):
    result_brief: Optional[InternalBriefResponse] = None
    result_content: Optional[GeneratedContentResponse] = None


# Approval schemas
class ApprovalCreate(BaseModel):
    content_id: int
    decision: str  # "approved", "rejected"
    notes: Optional[str] = None


class ApprovalResponse(BaseModel):
    id: int
    content_id: int
    user_id: int
    decision: str
    notes: Optional[str]
    created_at: datetime


# Response wrappers
class SuccessResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    detail: Optional[str] = None
