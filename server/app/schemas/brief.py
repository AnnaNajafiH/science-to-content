"""Internal Brief schemas."""
from pydantic import BaseModel
from typing import List
from datetime import datetime


class KeyProofPoint(BaseModel):
    """Schema for a key proof point in an internal brief."""
    point: str
    evidence: str
    citation: str


class InternalBriefCreate(BaseModel):
    """Schema for creating a new internal brief."""
    title: str
    rdDocumentId: str  # Frontend expects rdDocumentId
    headline: str  # Frontend expects headline
    keyProofPoints: List[KeyProofPoint] = []  # Frontend structure
    creativeHooks: List[str] = []  # Frontend expects creativeHooks
    sampleCaptions: List[str] = []  # Frontend expects sampleCaptions
    trainingSnippets: List[str] = []  # Frontend expects trainingSnippets
    targetAudience: str = "Marketing & Communications Teams"  # Frontend expects targetAudience


class InternalBriefResponse(BaseModel):
    """Schema for internal brief API response (camelCase for frontend)."""
    id: str  # Return as string for frontend
    title: str
    rdDocumentId: str  # Frontend expects rdDocumentId
    headline: str
    keyProofPoints: List[KeyProofPoint]  # Array of {point, evidence, citation}
    creativeHooks: List[str]
    sampleCaptions: List[str]
    trainingSnippets: List[str]
    targetAudience: str
    generatedAt: datetime  # Frontend expects generatedAt


class InternalBriefListResponse(BaseModel):
    """Schema for listing internal briefs."""
    total: int
    briefs: List[InternalBriefResponse]
