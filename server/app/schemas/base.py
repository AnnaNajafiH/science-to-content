"""Base schema utilities and response wrappers."""
from pydantic import BaseModel
from typing import Optional


class SuccessResponse(BaseModel):
    """Standard success response wrapper."""
    success: bool
    message: str
    data: Optional[dict] = None


class ErrorResponse(BaseModel):
    """Standard error response wrapper."""
    success: bool = False
    error: str
    detail: Optional[str] = None
