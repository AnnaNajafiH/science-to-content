"""GeneratedContent model."""
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON, Index
from typing import Optional
from datetime import datetime

from .enums import ContentType, ApprovalStatus

if False:  # TYPE_CHECKING
    from .trend import Trend
    from .brief import InternalBrief
    from .approval import Approval


class GeneratedContent(SQLModel, table=True):
    """Generated Instagram content (carousel, story, reel)."""
    __tablename__ = "generated_contents"
    __table_args__ = (
        Index("idx_content_status_type", "approval_status", "type"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Foreign keys
    brief_id: int = Field(foreign_key="internal_briefs.id")
    trend_id: Optional[int] = Field(foreign_key="trends.id", default=None)
    
    # Content metadata
    type: ContentType = Field(default=ContentType.CAROUSEL)
    title: str
    description: str
    
    # Content sections
    slides: list = Field(default_factory=list, sa_column=Column(JSON))
    script: str = Field(default="")
    video_script: str = Field(default="")  # Alias for compatibility
    hashtags: list = Field(default_factory=list, sa_column=Column(JSON))
    
    # R&D references
    rd_references: list = Field(default_factory=list, sa_column=Column(JSON))
    
    # Generation metadata
    generated_by: str = Field(default="llm")
    confidence: float = Field(ge=0.0, le=1.0, default=0.0)
    
    # Approval workflow
    approval_status: ApprovalStatus = Field(default=ApprovalStatus.PENDING, index=True)
    status: ApprovalStatus = Field(default=ApprovalStatus.PENDING)  # Alias for compatibility
    
    # Authorship
    created_by: Optional[str] = None
    edited_by: Optional[str] = None
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    approved_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    
    # Publishing
    published_url: Optional[str] = None

    # Metadata
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    brief: "InternalBrief" = Relationship(back_populates="contents")
    trend: Optional["Trend"] = Relationship(back_populates="contents")
    approvals: list["Approval"] = Relationship(
        back_populates="content", 
        cascade_delete=True
    )
