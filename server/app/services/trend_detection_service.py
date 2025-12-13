"""Trend detection and analysis service."""
from typing import List
from app.models import Trend, TrendMention
import numpy as np


class TrendDetectionService:
    """Service for detecting and ranking trends."""

    @staticmethod
    def calculate_trend_score(mentions: List[TrendMention], time_window_days: int = 7) -> float:
        """
        Calculate confidence score for a trend using mention count and engagement.

        Simple z-score based ranking for MVP.
        """
        if not mentions:
            return 0.0

        # Count recent mentions
        recent_mentions = [m for m in mentions if m.mentioned_at]
        mention_count = len(recent_mentions)

        # Calculate average engagement
        total_engagement = sum(m.engagement_count for m in recent_mentions)
        avg_engagement = total_engagement / mention_count if mention_count > 0 else 0

        # Simple score: normalize to 0-1
        # This is a placeholder; real implementation would use ML models
        normalized_score = min(1.0, (mention_count + avg_engagement) / 1000.0)
        return max(0.0, min(1.0, normalized_score))

    @staticmethod
    def detect_trending_up(current_mentions: int, previous_mentions: int) -> bool:
        """
        Detect if a trend is growing.

        Simple rule: if mentions increased by >20%, trend is up.
        """
        if previous_mentions == 0:
            return current_mentions > 0

        growth_rate = (current_mentions - previous_mentions) / \
            previous_mentions
        return growth_rate > 0.2

    @staticmethod
    def rank_trends(trends: List[Trend]) -> List[Trend]:
        """
        Rank trends by confidence score and trending status.

        Returns sorted list (highest confidence first).
        """
        return sorted(
            trends,
            key=lambda t: (t.trending_up, t.confidence_score),
            reverse=True,
        )


trend_detection_service = TrendDetectionService()
