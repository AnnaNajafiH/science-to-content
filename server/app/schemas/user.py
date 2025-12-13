"""User-related schemas."""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    """Schema for creating a new user."""
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str


class UserUpdate(BaseModel):
    """Schema for updating user information."""
    full_name: Optional[str] = None
    password: Optional[str] = None


class UserResponse(BaseModel):
    """Schema for user API response."""
    id: int
    email: str
    full_name: str
    is_active: bool
    is_reviewer: bool
    created_at: datetime
