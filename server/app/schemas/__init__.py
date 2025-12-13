"""
Pydantic schemas for API request/response validation.

This module provides a centralized import point for all schemas.
Each domain's schemas are defined in separate files for better maintainability.
"""

# Base response wrappers
from .base import SuccessResponse, ErrorResponse

# User schemas
from .user import UserCreate, UserUpdate, UserResponse

# R&D Document schemas
from .rd_document import (
    RDDocumentCreate,
    RDDocumentResponse,
    RDDocumentListResponse,
)

# Trend schemas
from .trend import (
    SocialPostResponse,
    TrendCreate,
    TrendUpdate,
    TrendResponse,
    TrendListResponse,
)

# Internal Brief schemas
from .brief import (
    KeyProofPoint,
    InternalBriefCreate,
    InternalBriefResponse,
    InternalBriefListResponse,
)

# Generated Content schemas
from .content import (
    ContentSlide,
    GeneratedContentCreate,
    GeneratedContentUpdate,
    GeneratedContentResponse,
    GeneratedContentListResponse,
)

# Generation Job schemas
from .generation import (
    GenerationJobCreate,
    GenerationJobResponse,
    GenerationJobDetailResponse,
)

# Approval schemas
from .approval import ApprovalCreate, ApprovalResponse

__all__ = [
    # Base
    "SuccessResponse",
    "ErrorResponse",
    # User
    "UserCreate",
    "UserUpdate",
    "UserResponse",
    # R&D Document
    "RDDocumentCreate",
    "RDDocumentResponse",
    "RDDocumentListResponse",
    # Trend
    "SocialPostResponse",
    "TrendCreate",
    "TrendUpdate",
    "TrendResponse",
    "TrendListResponse",
    # Brief
    "KeyProofPoint",
    "InternalBriefCreate",
    "InternalBriefResponse",
    "InternalBriefListResponse",
    # Content
    "ContentSlide",
    "GeneratedContentCreate",
    "GeneratedContentUpdate",
    "GeneratedContentResponse",
    "GeneratedContentListResponse",
    # Generation
    "GenerationJobCreate",
    "GenerationJobResponse",
    "GenerationJobDetailResponse",
    # Approval
    "ApprovalCreate",
    "ApprovalResponse",
]
