"""Generation Job schemas."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class GenerationJobCreate(BaseModel):
    """Schema for creating a background generation job."""
    job_type: str  # "internal_brief", "social_content"
    input_data: dict


class GenerationJobResponse(BaseModel):
    """Schema for generation job API response."""
    id: int
    job_type: str
    status: str
    error_message: Optional[str]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    created_at: datetime


class GenerationJobDetailResponse(GenerationJobResponse):
    """Detailed schema including result data for completed jobs."""
    result_brief: Optional[dict] = None  # InternalBriefResponse
    result_content: Optional[dict] = None  # GeneratedContentResponse
