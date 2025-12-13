"""User model."""
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

if False:  # TYPE_CHECKING
    from .brief import InternalBrief
    from .approval import Approval


class User(SQLModel, table=True):
    """User account for authentication and authorization."""
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    full_name: str
    is_active: bool = Field(default=True)
    is_reviewer: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # Relationships
    briefs: List["InternalBrief"] = Relationship(back_populates="created_by")
    approvals: List["Approval"] = Relationship(back_populates="user")
