"""Trend endpoints."""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlmodel import Session

from ..database import get_session
from ..models import Trend, TrendMention, TrendCategory
from ..schemas import TrendResponse, TrendListResponse, TrendCreate
from datetime import datetime, timedelta

router = APIRouter()


@router.get("", response_model=TrendListResponse)
async def list_trends(
    session: AsyncSession = Depends(get_session),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: str = Query(None),
    trending_only: bool = Query(False),
):
    """
    List all trends with pagination and filtering.

    - **skip**: Number of items to skip (pagination offset)
    - **limit**: Max items to return
    - **category**: Filter by category (e.g., skincare)
    - **trending_only**: Return only trending_up=True trends
    """
    query = select(Trend)

    if category and category in [c.value for c in TrendCategory]:
        query = query.where(Trend.category == category)

    if trending_only:
        query = query.where(Trend.trending_up == True)

    # Count total
    count_query = select(func.count()).select_from(Trend)
    if category and category in [c.value for c in TrendCategory]:
        count_query = count_query.where(Trend.category == category)
    if trending_only:
        count_query = count_query.where(Trend.trending_up == True)

    result = await session.execute(count_query)
    total = result.scalar() or 0

    # Get paginated results
    query = query.offset(skip).limit(limit).order_by(Trend.detected_at.desc())
    result = await session.execute(query)
    trends = result.scalars().all()

    return TrendListResponse(
        total=total,
        trends=[TrendResponse.model_validate(t) for t in trends],
    )


@router.get("/{trend_id}", response_model=TrendResponse)
async def get_trend(
    trend_id: int,
    session: AsyncSession = Depends(get_session),
):
    """Get a specific trend with its mentions."""
    query = select(Trend).where(Trend.id == trend_id)
    result = await session.execute(query)
    trend = result.scalar_one_or_none()

    if not trend:
        raise HTTPException(status_code=404, detail="Trend not found")

    return TrendResponse.model_validate(trend)


@router.post("", response_model=TrendResponse)
async def create_trend(
    trend: TrendCreate,
    session: AsyncSession = Depends(get_session),
):
    """
    Create a new trend (for manual ingestion or testing).

    This endpoint allows manual trend creation. In production,
    trends are typically auto-detected via social media ingestion workers.
    """
    new_trend = Trend(
        title=trend.title,
        description=trend.description,
        category=trend.category,
        confidence_score=trend.confidence_score,
        mention_count=trend.mention_count,
    )

    session.add(new_trend)
    await session.commit()
    await session.refresh(new_trend)

    return TrendResponse.model_validate(new_trend)


@router.get("/{trend_id}/mentions")
async def get_trend_mentions(
    trend_id: int,
    session: AsyncSession = Depends(get_session),
    limit: int = Query(20, ge=1, le=100),
):
    """Get recent mentions of a specific trend."""
    # Verify trend exists
    query = select(Trend).where(Trend.id == trend_id)
    result = await session.execute(query)
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Trend not found")

    # Get mentions
    mentions_query = (
        select(TrendMention)
        .where(TrendMention.trend_id == trend_id)
        .order_by(TrendMention.mentioned_at.desc())
        .limit(limit)
    )
    result = await session.execute(mentions_query)
    mentions = result.scalars().all()

    return {
        "trend_id": trend_id,
        "mentions": mentions,
    }
