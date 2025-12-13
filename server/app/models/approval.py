"""Approval model for content review workflow."""
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON, Index
from typing import Optional
from datetime import datetime

from .enums import ApprovalStatus

if False:  # TYPE_CHECKING
    from .user import User
    from .content import GeneratedContent


class Approval(SQLModel, table=True):
    """Approval record for generated content."""
    __tablename__ = "approvals"
    __table_args__ = (
        Index("idx_approval_content_status", "content_id", "status"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    content_id: int = Field(foreign_key="generated_contents.id")
    reviewer_id: int = Field(foreign_key="users.id")
    
    status: ApprovalStatus = Field(default=ApprovalStatus.PENDING, index=True)
    comments: Optional[str] = None
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # Metadata
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Relationships
    content: "GeneratedContent" = Relationship(back_populates="approvals")
    reviewer: "User" = Relationship(back_populates="approvals")
