"""Generated content endpoints."""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_session
from app.models import GeneratedContent, ApprovalStatus, Approval
from app.schemas import (
    GeneratedContentResponse,
    GeneratedContentListResponse,
    GeneratedContentCreate,
    GeneratedContentUpdate,
    ApprovalCreate,
    ApprovalResponse,
)

router = APIRouter()


@router.get("", response_model=GeneratedContentListResponse)
async def list_content(
    session: AsyncSession = Depends(get_session),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status: str = Query(None),
):
    """List generated content with status filtering."""
    # Count total
    count_query = select(func.count()).select_from(GeneratedContent)
    result = await session.execute(count_query)
    total = result.scalar() or 0

    # Get status counts
    pending_query = select(func.count()).select_from(GeneratedContent).where(
        GeneratedContent.approval_status == ApprovalStatus.PENDING
    )
    result = await session.execute(pending_query)
    pending_count = result.scalar() or 0

    approved_query = select(func.count()).select_from(GeneratedContent).where(
        GeneratedContent.approval_status == ApprovalStatus.APPROVED
    )
    result = await session.execute(approved_query)
    approved_count = result.scalar() or 0

    # Get paginated results
    query = select(GeneratedContent)

    if status and status in [s.value for s in ApprovalStatus]:
        query = query.where(GeneratedContent.approval_status == status)

    query = query.offset(skip).limit(limit).order_by(
        GeneratedContent.created_at.desc())
    result = await session.execute(query)
    contents = result.scalars().all()

    return GeneratedContentListResponse(
        total=total,
        pending_count=pending_count,
        approved_count=approved_count,
        contents=[GeneratedContentResponse.model_validate(
            c) for c in contents],
    )


@router.get("/{content_id}", response_model=GeneratedContentResponse)
async def get_content(
    content_id: int,
    session: AsyncSession = Depends(get_session),
):
    """Get a specific generated content item."""
    query = select(GeneratedContent).where(GeneratedContent.id == content_id)
    result = await session.execute(query)
    content = result.scalar_one_or_none()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    return GeneratedContentResponse.model_validate(content)


@router.post("", response_model=GeneratedContentResponse)
async def create_content(
    content: GeneratedContentCreate,
    session: AsyncSession = Depends(get_session),
):
    """Create new generated content (typically via LLM generation worker)."""
    new_content = GeneratedContent(
        trend_id=content.trend_id,
        caption=content.caption,
        video_script=content.video_script,
        visual_description=content.visual_description,
        hashtags=content.hashtags,
    )

    session.add(new_content)
    await session.commit()
    await session.refresh(new_content)

    return GeneratedContentResponse.model_validate(new_content)


@router.patch("/{content_id}", response_model=GeneratedContentResponse)
async def update_content(
    content_id: int,
    update: GeneratedContentUpdate,
    session: AsyncSession = Depends(get_session),
):
    """Update content status and review notes."""
    query = select(GeneratedContent).where(GeneratedContent.id == content_id)
    result = await session.execute(query)
    content = result.scalar_one_or_none()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    if update.approval_status:
        content.approval_status = update.approval_status
    if update.review_notes:
        content.review_notes = update.review_notes

    session.add(content)
    await session.commit()
    await session.refresh(content)

    return GeneratedContentResponse.model_validate(content)


@router.post("/{content_id}/approve", response_model=ApprovalResponse)
async def approve_content(
    content_id: int,
    approval: ApprovalCreate,
    session: AsyncSession = Depends(get_session),
):
    """
    Approve content for publishing.

    - **decision**: "approved" or "rejected"
    - **notes**: Optional review comments
    """
    # Verify content exists
    query = select(GeneratedContent).where(GeneratedContent.id == content_id)
    result = await session.execute(query)
    content = result.scalar_one_or_none()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    # Create approval record
    new_approval = Approval(
        content_id=content_id,
        user_id=1,  # TODO: Get from auth context
        decision=approval.decision,
        notes=approval.notes,
    )

    # Update content status
    if approval.decision == "approved":
        content.approval_status = ApprovalStatus.APPROVED
    elif approval.decision == "rejected":
        content.approval_status = ApprovalStatus.REJECTED

    session.add(new_approval)
    session.add(content)
    await session.commit()
    await session.refresh(new_approval)

    return ApprovalResponse.model_validate(new_approval)


@router.post("/{content_id}/publish")
async def publish_content(
    content_id: int,
    session: AsyncSession = Depends(get_session),
):
    """Publish approved content to social media."""
    query = select(GeneratedContent).where(GeneratedContent.id == content_id)
    result = await session.execute(query)
    content = result.scalar_one_or_none()

    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    if content.approval_status != ApprovalStatus.APPROVED:
        raise HTTPException(
            status_code=400, detail="Content must be approved before publishing")

    # TODO: Publish to social media (enqueue worker)
    content.approval_status = ApprovalStatus.PUBLISHED
    content.published_at = content.published_at or __import__(
        'datetime').datetime.utcnow()

    session.add(content)
    await session.commit()
    await session.refresh(content)

    return {
        "success": True,
        "message": "Content published successfully",
        "content_id": content.id,
        "published_at": content.published_at,
    }
