from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String, DateTime, JSON, Float, Boolean, Index
from datetime import datetime
from typing import Optional, List
from enum import Enum


# Enums
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


# Models
class User(SQLModel, table=True):
    """User account for authentication and authorization."""
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    full_name: str
    is_active: bool = Field(default=True)
    is_reviewer: bool = Field(default=False)  # Can approve content
    created_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False)

    # Relationships
    briefs: List["InternalBrief"] = Relationship(back_populates="created_by")
    approvals: List["Approval"] = Relationship(back_populates="user")


class Trend(SQLModel, table=True):
    """Detected skincare trend from social media."""
    __tablename__ = "trends"
    __table_args__ = (
        Index("idx_trend_category_date", "category", "detected_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: str
    category: TrendCategory = Field(default=TrendCategory.OTHER)
    confidence_score: float = Field(ge=0.0, le=1.0)  # 0-1
    mention_count: int = Field(ge=0)
    trending_up: bool = Field(default=False)

    # RAG & Embeddings
    # Vector stored as JSON string for pgvector
    embedding: Optional[str] = None
    source_documents: dict = Field(
        default_factory=dict, sa_column=Column(JSON))  # Refs to RD docs used

    # Metadata
    detected_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False, index=True)
    last_updated_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False)
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    mentions: List["TrendMention"] = Relationship(
        back_populates="trend", cascade_delete=True)
    contents: List["GeneratedContent"] = Relationship(back_populates="trend")


class TrendMention(SQLModel, table=True):
    """Individual mention of a trend on social media."""
    __tablename__ = "trend_mentions"
    __table_args__ = (
        Index("idx_mention_trend_date", "trend_id", "mentioned_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    trend_id: int = Field(foreign_key="trends.id")
    source: str = Field(index=True)  # "instagram", "tiktok", "twitter", etc.
    source_url: Optional[str] = None
    engagement_count: int = Field(default=0)
    # "positive", "negative", "neutral"
    sentiment: str = Field(default="neutral")
    text: str
    mentioned_at: datetime = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    trend: Trend = Relationship(back_populates="mentions")


class InternalBrief(SQLModel, table=True):
    """Internal communication brief generated from R&D docs."""
    __tablename__ = "internal_briefs"
    __table_args__ = (
        Index("idx_brief_user_date", "created_by_id", "created_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    content: str
    summary: Optional[str] = None
    format_type: str = Field(default="markdown")  # "markdown", "html", "plain"

    # Content source
    source_documents: dict = Field(
        default_factory=dict, sa_column=Column(JSON))  # RD doc refs
    source_trend_id: Optional[int] = Field(
        foreign_key="trends.id", default=None)

    # Author
    created_by_id: int = Field(foreign_key="users.id")
    created_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False, index=True)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False)

    # Metadata
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    created_by: User = Relationship(back_populates="briefs")
    job: Optional["GenerationJob"] = Relationship(
        back_populates="result_brief")


class GeneratedContent(SQLModel, table=True):
    """AI-generated social media content (requires review before publishing)."""
    __tablename__ = "generated_contents"
    __table_args__ = (
        Index("idx_content_status_date", "approval_status", "created_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    trend_id: int = Field(foreign_key="trends.id")

    # Content variants
    caption: str
    video_script: Optional[str] = None
    visual_description: Optional[str] = None
    hashtags: list = Field(default_factory=list, sa_column=Column(JSON))

    # Review & Approval
    approval_status: ApprovalStatus = Field(
        default=ApprovalStatus.PENDING, index=True)
    review_notes: Optional[str] = None

    # Publishing
    published_at: Optional[datetime] = None
    published_url: Optional[str] = None

    # Metadata
    engagement_prediction: Optional[float] = None
    source_documents: dict = Field(
        default_factory=dict, sa_column=Column(JSON))
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Timestamps
    created_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False, index=True)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False)

    # Relationships
    trend: Trend = Relationship(back_populates="contents")
    approvals: List["Approval"] = Relationship(
        back_populates="content", cascade_delete=True)


class GenerationJob(SQLModel, table=True):
    """Background job for generating briefs or content."""
    __tablename__ = "generation_jobs"
    __table_args__ = (
        Index("idx_job_status_date", "status", "created_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    # "internal_brief", "social_content", "trend_analysis"
    job_type: str = Field(index=True)
    status: GenerationJobStatus = Field(
        default=GenerationJobStatus.PENDING, index=True)

    # Job inputs (what to generate)
    input_data: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Job results
    result_brief_id: Optional[int] = Field(
        foreign_key="internal_briefs.id", default=None)
    result_content_id: Optional[int] = Field(
        foreign_key="generated_contents.id", default=None)
    error_message: Optional[str] = None

    # Worker tracking
    worker_id: Optional[str] = None  # RQ job ID
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    # Metadata
    created_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False, index=True)
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    result_brief: Optional[InternalBrief] = Relationship(back_populates="job")


class Approval(SQLModel, table=True):
    """Record of content approval/rejection."""
    __tablename__ = "approvals"
    __table_args__ = (
        Index("idx_approval_user_date", "user_id", "created_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    content_id: int = Field(foreign_key="generated_contents.id")
    user_id: int = Field(foreign_key="users.id")

    # Decision
    decision: str = Field(index=True)  # "approved", "rejected"
    notes: Optional[str] = None

    # Metadata
    created_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False, index=True)
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    content: GeneratedContent = Relationship(back_populates="approvals")
    user: User = Relationship(back_populates="approvals")


class Embedding(SQLModel, table=True):
    """Vector embeddings for RAG retrieval."""
    __tablename__ = "embeddings"
    __table_args__ = (
        Index("idx_embedding_source_type", "source_type", "source_id"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    source_type: str = Field(index=True)  # "rd_document", "trend", "brief"
    source_id: int = Field(index=True)

    # Vector (stored as JSON for compatibility, can be migrated to pgvector)
    embedding_vector: str  # JSON string of float array
    model: str = Field(default="text-embedding-3-small")

    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AuditLog(SQLModel, table=True):
    """Audit trail for compliance and debugging."""
    __tablename__ = "audit_logs"
    __table_args__ = (
        Index("idx_log_action_date", "action", "created_at"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    # "create_brief", "approve_content", "publish", etc.
    action: str = Field(index=True)
    entity_type: str  # "brief", "content", "trend", "user"
    entity_id: int
    user_id: Optional[int] = Field(foreign_key="users.id", default=None)

    # What changed
    changes: dict = Field(default_factory=dict, sa_column=Column(JSON))
    details: Optional[str] = None

    # Metadata
    created_at: datetime = Field(
        default_factory=datetime.utcnow, nullable=False, index=True)
    ip_address: Optional[str] = None
