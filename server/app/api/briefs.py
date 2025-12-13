"""Internal brief endpoints."""
from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from rq import Queue
from redis import Redis

from ..database import get_session
from ..config import settings
from ..models import InternalBrief, GenerationJob, GenerationJobStatus
from ..schemas import (
    InternalBriefCreate,
    InternalBriefResponse,
    InternalBriefListResponse,
    GenerationJobCreate,
    GenerationJobResponse,
)

router = APIRouter()

# Redis connection for job queue
redis_client = Redis.from_url(settings.REDIS_URL)
queue = Queue(connection=redis_client)


@router.get("", response_model=InternalBriefListResponse)
async def list_briefs(
    session: AsyncSession = Depends(get_session),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    """List all internal briefs."""
    # Count total
    count_query = select(func.count()).select_from(InternalBrief)
    result = await session.execute(count_query)
    total = result.scalar() or 0

    # Get paginated results
    query = (
        select(InternalBrief)
        .offset(skip)
        .limit(limit)
        .order_by(InternalBrief.created_at.desc())
    )
    result = await session.execute(query)
    briefs = result.scalars().all()

    return InternalBriefListResponse(
        total=total,
        briefs=[InternalBriefResponse.model_validate(b) for b in briefs],
    )


@router.get("/{brief_id}", response_model=InternalBriefResponse)
async def get_brief(
    brief_id: int,
    session: AsyncSession = Depends(get_session),
):
    """Get a specific internal brief."""
    query = select(InternalBrief).where(InternalBrief.id == brief_id)
    result = await session.execute(query)
    brief = result.scalar_one_or_none()

    if not brief:
        raise HTTPException(status_code=404, detail="Brief not found")

    return InternalBriefResponse.model_validate(brief)


@router.post("/generate", response_model=GenerationJobResponse)
async def generate_brief(
    request: GenerationJobCreate,
    session: AsyncSession = Depends(get_session),
    background_tasks: BackgroundTasks = BackgroundTasks(),
):
    """
    Generate an internal brief (async via job queue).

    Request body should contain:
    - job_type: "internal_brief"
    - input_data: {
        "title": "Brief Title",
        "rd_documents": ["doc1_id", "doc2_id"],
        "trend_id": 1  (optional)
    }

    Returns a job ID for polling. Use GET /api/generation/{job_id} to check status.
    """
    if request.job_type != "internal_brief":
        raise HTTPException(
            status_code=400, detail="Invalid job_type for this endpoint")

    # Create job record
    job = GenerationJob(
        job_type="internal_brief",
        status=GenerationJobStatus.PENDING,
        input_data=request.input_data,
    )

    session.add(job)
    await session.commit()
    await session.refresh(job)

    # Enqueue worker (for real backend, this calls RQ)
    # For MVP, we'll mock the response
    # TODO: Enqueue actual RQ job
    # job.worker_id = queue.enqueue("app.workers.generation_worker.generate_brief", job.id).id

    return GenerationJobResponse.model_validate(job)


@router.post("", response_model=InternalBriefResponse)
async def create_brief(
    brief: InternalBriefCreate,
    session: AsyncSession = Depends(get_session),
):
    """Create a brief directly (without async generation)."""
    new_brief = InternalBrief(
        title=brief.title,
        content=brief.content,
        summary=brief.summary,
        format_type=brief.format_type,
        source_trend_id=brief.source_trend_id,
        created_by_id=1,  # TODO: Get from auth context
    )

    session.add(new_brief)
    await session.commit()
    await session.refresh(new_brief)

    return InternalBriefResponse.model_validate(new_brief)
