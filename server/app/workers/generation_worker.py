"""Worker for generating internal briefs and social content."""
from datetime import datetime
from sqlalchemy.orm import Session
from app.models import GenerationJob, GenerationJobStatus, InternalBrief, GeneratedContent
from app.services.llm_service import llm_service
from app.services.retrieval_service import retrieval_service
from app.services.email_service import email_service


async def generate_brief_worker(job_id: int, session: Session) -> bool:
    """
    RQ worker function to generate an internal brief.

    Enqueue with: queue.enqueue('app.workers.generation_worker.generate_brief_worker', job_id)
    """
    try:
        # Fetch job
        job = session.query(GenerationJob).filter(
            GenerationJob.id == job_id).first()
        if not job:
            return False

        # Mark as processing
        job.status = GenerationJobStatus.PROCESSING
        job.started_at = datetime.utcnow()
        session.commit()

        # Extract input data
        title = job.input_data.get("title", "Untitled Brief")
        trend_id = job.input_data.get("trend_id")
        rd_documents = job.input_data.get("rd_documents", [])

        # Retrieve relevant R&D context (RAG)
        context = await retrieval_service.retrieve_for_generation(title)

        # Generate brief using LLM
        brief_content = await llm_service.generate_brief(title, context)

        # Create brief in database
        brief = InternalBrief(
            title=title,
            content=brief_content,
            format_type="markdown",
            source_trend_id=trend_id,
            source_documents={"rd_docs": rd_documents},
            created_by_id=1,  # TODO: from job metadata
        )
        session.add(brief)
        session.commit()
        session.refresh(brief)

        # Update job with result
        job.status = GenerationJobStatus.COMPLETED
        job.completed_at = datetime.utcnow()
        job.result_brief_id = brief.id
        session.commit()

        # Send notification
        await email_service.send_brief_generated_notification(
            "reviewer@example.com", brief.id
        )

        return True
    except Exception as e:
        # Mark job as failed
        job.status = GenerationJobStatus.FAILED
        job.error_message = str(e)
        job.completed_at = datetime.utcnow()
        session.commit()
        print(f"[WORKER ERROR] Brief generation failed for job {job_id}: {e}")
        return False


async def generate_content_worker(job_id: int, session: Session) -> bool:
    """
    RQ worker function to generate social media content.

    Enqueue with: queue.enqueue('app.workers.generation_worker.generate_content_worker', job_id)
    """
    try:
        # Fetch job
        job = session.query(GenerationJob).filter(
            GenerationJob.id == job_id).first()
        if not job:
            return False

        # Mark as processing
        job.status = GenerationJobStatus.PROCESSING
        job.started_at = datetime.utcnow()
        session.commit()

        # Extract input data
        trend_id = job.input_data.get("trend_id")
        trend_title = job.input_data.get("trend_title", "Latest Trend")

        # Retrieve relevant R&D context
        context = await retrieval_service.retrieve_for_generation(trend_title)

        # Generate social content using LLM
        content_data = await llm_service.generate_social_content(trend_title, context)

        # Create content in database
        content = GeneratedContent(
            trend_id=trend_id,
            caption=content_data.get("caption", ""),
            video_script=content_data.get("video_script"),
            visual_description=content_data.get("visual_description"),
            hashtags=content_data.get("hashtags", []),
            source_documents={"context": context},
        )
        session.add(content)
        session.commit()
        session.refresh(content)

        # Update job with result
        job.status = GenerationJobStatus.COMPLETED
        job.completed_at = datetime.utcnow()
        job.result_content_id = content.id
        session.commit()

        # Send notification to reviewers
        await email_service.send_approval_notification(
            "reviewer@example.com", content.id
        )

        return True
    except Exception as e:
        # Mark job as failed
        job.status = GenerationJobStatus.FAILED
        job.error_message = str(e)
        job.completed_at = datetime.utcnow()
        session.commit()
        print(
            f"[WORKER ERROR] Content generation failed for job {job_id}: {e}")
        return False
