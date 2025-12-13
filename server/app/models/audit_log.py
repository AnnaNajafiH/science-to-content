"""AuditLog model for tracking system changes."""
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON, Index
from typing import Optional
from datetime import datetime


class AuditLog(SQLModel, table=True):
    """Audit log for tracking system changes."""
    __tablename__ = "audit_logs"
    __table_args__ = (
        Index("idx_audit_timestamp", "timestamp"),
        Index("idx_audit_action_entity", "action", "entity_type"),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Action details
    action: str = Field(index=True)  # "create", "update", "delete", "approve"
    entity_type: str = Field(index=True)  # "trend", "brief", "content"
    entity_id: int
    
    # User tracking
    user_id: Optional[int] = Field(foreign_key="users.id", default=None)
    user_email: Optional[str] = None
    
    # Change tracking
    changes: dict = Field(default_factory=dict, sa_column=Column(JSON))
    metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))
    
    # Timestamp
    timestamp: datetime = Field(default_factory=datetime.utcnow, nullable=False, index=True)
