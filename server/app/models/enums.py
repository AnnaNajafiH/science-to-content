"""Enums used across models."""
from enum import Enum


class GenerationJobStatus(str, Enum):
    """Status of background generation jobs."""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class ApprovalStatus(str, Enum):
    """Content approval status."""
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    PUBLISHED = "published"


class TrendCategory(str, Enum):
    """Category of skincare trends."""
    SKINCARE = "skincare"
    INGREDIENTS = "ingredients"
    ROUTINE = "routine"
    WELLNESS = "wellness"
    OTHER = "other"


class TrendVelocity(str, Enum):
    """Velocity of trend growth."""
    RISING = "rising"
    HOT = "hot"
    STABLE = "stable"


class ContentType(str, Enum):
    """Type of generated content."""
    INSTAGRAM_CAROUSEL = "instagram-carousel"
    REEL = "reel"
    STORY = "story"
    VIDEO_SCRIPT = "video-script"


class SocialPlatform(str, Enum):
    """Social media platform."""
    INSTAGRAM = "instagram"
    TIKTOK = "tiktok"
    TWITTER = "twitter"
    REDDIT = "reddit"
