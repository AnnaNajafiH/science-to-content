"""
SQLModel models for the Science-to-Content application.

This module provides a centralized import point for all database models.
Each model is defined in its own file for better maintainability and separation of concerns.
"""

# Base utilities
from .base import TimestampMixin, MetadataMixin

# Enums
from .enums import (
    GenerationJobStatus,
    ApprovalStatus,
    TrendCategory,
    TrendVelocity,
    ContentType,
    SocialPlatform,
)

# Models
from .user import User
from .rd_document import RDDocument
from .trend import Trend, TrendMention
from .brief import InternalBrief
from .content import GeneratedContent
from .generation_job import GenerationJob
from .approval import Approval
from .embedding import Embedding
from .audit_log import AuditLog

__all__ = [
    # Base
    "TimestampMixin",
    "MetadataMixin",
    # Enums
    "GenerationJobStatus",
    "ApprovalStatus",
    "TrendCategory",
    "TrendVelocity",
    "ContentType",
    "SocialPlatform",
    # Models
    "User",
    "RDDocument",
    "Trend",
    "TrendMention",
    "InternalBrief",
    "GeneratedContent",
    "GenerationJob",
    "Approval",
    "Embedding",
    "AuditLog",
]
