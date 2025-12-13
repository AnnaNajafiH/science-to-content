"""Generation job endpoints."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..database import get_session
from ..models import GenerationJob, InternalBrief, GeneratedContent
from ..schemas import GenerationJobDetailResponse

router = APIRouter()


@router.get("/{job_id}", response_model=GenerationJobDetailResponse)
async def get_job_status(
    job_id: int,
    session: AsyncSession = Depends(get_session),
):
    """
    Check the status of a generation job.

    - **status**: pending, processing, completed, failed, cancelled
    - **result_brief**: Populated if job_type is "internal_brief" and completed
    - **result_content**: Populated if job_type is "social_content" and completed
    """
    query = select(GenerationJob).where(GenerationJob.id == job_id)
    result = await session.execute(query)
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Load related results if completed
    result_brief = None
    result_content = None

    if job.result_brief_id:
        brief_query = select(InternalBrief).where(
            InternalBrief.id == job.result_brief_id)
        brief_result = await session.execute(brief_query)
        result_brief = brief_result.scalar_one_or_none()

    if job.result_content_id:
        content_query = select(GeneratedContent).where(
            GeneratedContent.id == job.result_content_id
        )
        content_result = await session.execute(content_query)
        result_content = content_result.scalar_one_or_none()

    return GenerationJobDetailResponse(
        id=job.id,
        job_type=job.job_type,
        status=job.status,
        error_message=job.error_message,
        started_at=job.started_at,
        completed_at=job.completed_at,
        created_at=job.created_at,
        result_brief=result_brief,
        result_content=result_content,
    )


@router.post("/{job_id}/cancel")
async def cancel_job(
    job_id: int,
    session: AsyncSession = Depends(get_session),
):
    """Cancel a pending or processing job."""
    query = select(GenerationJob).where(GenerationJob.id == job_id)
    result = await session.execute(query)
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job.status not in ["pending", "processing"]:
        raise HTTPException(
            status_code=400, detail="Job cannot be cancelled in current state")

    job.status = "cancelled"
    session.add(job)
    await session.commit()

    return {
        "success": True,
        "message": "Job cancelled",
        "job_id": job.id,
    }
