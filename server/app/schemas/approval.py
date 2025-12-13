"""Approval schemas."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ApprovalCreate(BaseModel):
    """Schema for creating an approval decision."""
    content_id: int
    decision: str  # "approved", "rejected"
    notes: Optional[str] = None


class ApprovalResponse(BaseModel):
    """Schema for approval API response."""
    id: int
    content_id: int
    user_id: int
    decision: str
    notes: Optional[str]
    created_at: datetime
