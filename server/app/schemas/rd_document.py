"""R&D Document schemas."""
from pydantic import BaseModel
from typing import List


class RDDocumentCreate(BaseModel):
    """Schema for creating a new R&D document."""
    title: str
    summary: str
    key_findings: List[str] = []
    ingredients: List[str] = []
    study_type: str
    efficacy: str
    citations: List[str] = []


class RDDocumentResponse(BaseModel):
    """Schema for R&D document API response (camelCase for frontend)."""
    id: str  # Return as string to match frontend
    title: str
    summary: str
    keyFindings: List[str] = []  # camelCase for frontend
    ingredients: List[str] = []
    studyType: str  # camelCase for frontend
    efficacy: str
    citations: List[str] = []


class RDDocumentListResponse(BaseModel):
    """Schema for listing R&D documents."""
    total: int
    documents: List[RDDocumentResponse]
