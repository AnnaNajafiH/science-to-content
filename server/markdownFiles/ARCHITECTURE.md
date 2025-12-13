# Backend Architecture Overview

## System Design Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Frontend (Vite)                       │
│                     http://localhost:5173                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTP REST Requests
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FastAPI Backend                            │
│                    http://localhost:8000                         │
├─────────────────────────────────────────────────────────────────┤
│  /api/trends           /api/briefs         /api/content         │
│  - GET /               - GET /            - GET /               │
│  - GET /{id}           - GET /{id}        - GET /{id}           │
│  - GET /{id}/mentions  - POST /generate   - PATCH /{id}         │
│  - POST /              - POST /           - POST /{id}/approve  │
│                                           - POST /{id}/publish  │
│                                                                  │
│  /api/generation                                                │
│  - GET /{job_id}                                                │
│  - POST /{job_id}/cancel                                        │
├─────────────────────────────────────────────────────────────────┤
│               Dependency Injection (Pydantic)                   │
│         - Database Sessions (AsyncSession)                      │
│         - Request Validation (Pydantic models)                  │
│         - Type Hints (full static analysis)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │      Redis       │  │      MinIO       │
│  (Primary DB)    │  │  (Job Queue)     │  │  (File Storage)  │
│                  │  │                  │  │                  │
│ - Trends         │  │ - RQ Jobs        │  │ - Documents      │
│ - Briefs         │  │ - Generation     │  │ - Images         │
│ - Content        │  │   Tasks          │  │ - Videos         │
│ - Users          │  │ - Ingestion      │  │                  │
│ - Embeddings     │  │   Tasks          │  │                  │
│ - pgvector       │  │                  │  │                  │
│   (vectors)      │  │                  │  │                  │
└────────────────────┘  └────────────────────┘  └────────────────────┘
        ▲                        │                        │
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                            Services
                                 │
        ┌────────────┬──────────┬─────────┬─────────────┐
        │            │          │         │             │
        ▼            ▼          ▼         ▼             ▼
  ┌─────────┐  ┌─────────┐ ┌────────┐ ┌──────────┐ ┌─────────┐
  │   LLM   │  │Retrieval│ │ Trend  │ │  Email   │ │ Storage │
  │ Service │  │ Service │ │ Detect │ │ Service  │ │ Service │
  │         │  │  (RAG)  │ │Service │ │          │ │         │
  │ OpenAI │  │         │ │        │ │ SendGrid │ │   S3    │
  │  API   │  │ Vector  │ │        │ │  SMTP    │ │  AWS    │
  │        │  │ Search  │ │        │ │          │ │ MinIO   │
  └─────────┘  └─────────┘ └────────┘ └──────────┘ └─────────┘
```

## Request Flow Diagram

```
Frontend Request (e.g., "Generate Internal Brief")
        │
        │ POST /api/briefs/generate
        │ { job_type: "internal_brief", input_data: {...} }
        ▼
┌──────────────────────────────┐
│   FastAPI Endpoint Handler   │
│  (app/api/briefs.py)         │
└──────────────────────────────┘
        │
        ├─► Validate input (Pydantic schema)
        ├─► Create GenerationJob record (DB)
        ├─► Enqueue RQ worker task
        │
        └─► Return job_id to frontend
                │
                ▼
        Backend Process
    (Worker: generation_worker.py)
        │
        ├─► Fetch job and input_data
        ├─► Call RetrievalService
        │   └─► Retrieve relevant R&D docs
        │
        ├─► Call LLMService.generate_brief()
        │   └─► OpenAI API (or mock)
        │
        ├─► Create InternalBrief in DB
        ├─► Update GenerationJob status
        │
        └─► Send email notification
                (EmailService)
                │
                ▼
    Database Updated
    (Job complete, Brief saved)
        │
        ▼
    Frontend polls /api/generation/{job_id}
    Receives brief content
        │
        ▼
    Display to user ✅
```

## Data Model Relationships

```
User (1) ─────────────────────────────── (many) InternalBrief
 │                                                  │
 │                                                  │
 └──────── (many) Approval                          └─────────── (1) GenerationJob
                      │                                                 │
                      │                                                 │
                      └──────────── (1) GeneratedContent                │
                                           │                           │
                                           ├─────── (1) Trend          │
                                           │                           │
                                           └─────────────────────────┘
                                                (result_content)


Trend (1) ─────────────────── (many) TrendMention
  │
  ├─ (many) GeneratedContent
  │          │
  │          └─ (many) Approval
  │                    │
  │                    └─ (1) User
  │
  ├─ (1) Embedding
  │
  └─ metadata: {source_documents: {...}}


GenerationJob
  ├─ status: pending/processing/completed/failed
  ├─ input_data: {title, rd_documents, trend_id, ...}
  ├─ result_brief_id → (1) InternalBrief
  ├─ result_content_id → (1) GeneratedContent
  └─ worker_id: RQ job ID for tracking
```

## Service Layer Architecture

```
API Routes                   Services                   External
──────────                   ────────                   ────────

/api/briefs/generate ──────► LLMService ──────────────► OpenAI
                              ├─ generate_brief()          │
                              ├─ generate_social_content() │
                              └─ get_embedding()           │

                            RetrievalService ─────────► PostgreSQL
                              ├─ store_embedding()         (pgvector)
                              ├─ search_similar()
                              └─ retrieve_for_generation()

/api/content/{id}/approve ─► EmailService ────────────► SMTP
                              └─ send_approval_notification()

/api/trends ─────────────────► TrendDetectionService ─► Analytics
                              ├─ calculate_trend_score()
                              ├─ detect_trending_up()
                              └─ rank_trends()

/api/content/{id}/publish ──► StorageService ─────────► S3/MinIO
                              ├─ upload_file()
                              ├─ download_file()
                              └─ delete_file()
```

## Technology Stack Matrix

```
Layer              Technology        Purpose
─────              ──────────        ─────────
Framework          FastAPI           Web framework, async, OpenAPI
Async             asyncio             Concurrent I/O operations
Database          PostgreSQL          Relational data store
  ORM             SQLModel            Type-safe ORM with Pydantic
  Migrations      Alembic             Schema versioning
  Vector Search   pgvector            Semantic search (PostgreSQL ext.)
Job Queue         Redis + RQ          Background job processing
Validation        Pydantic            Input/output type checking
LLM               OpenAI API          ChatGPT, embeddings
Storage           S3/MinIO            File management
Email             SMTP/SendGrid       Notifications
Testing           pytest              Unit tests
Containerization  Docker              Environment isolation
Orchestration     docker-compose      Local dev stack
```

## Deployment Options

```
Development                Production
──────────                ──────────
docker-compose up         ├─ AWS ECS/Fargate
  ├─ PostgreSQL             ├─ RDS (PostgreSQL)
  ├─ Redis                  ├─ ElastiCache (Redis)
  ├─ MinIO                  ├─ S3 (file storage)
  └─ FastAPI                ├─ SQS + Lambda (jobs)
                            └─ ALB + FastAPI service

                         Or Kubernetes
                           ├─ PostgreSQL (CloudSQL)
                           ├─ Redis (Memorystore)
                           ├─ S3 (GCS)
                           ├─ FastAPI Deployment
                           ├─ RQ Worker Deployment
                           └─ Ingestion Job CronJob
```

## Integration Points

```
Frontend (React)
    │
    ├─ Fetch /api/trends
    │   └─ Display trending topics
    │
    ├─ POST /api/briefs/generate
    │   ├─ Wait for job_id
    │   └─ Poll /api/generation/{job_id}
    │
    ├─ GET /api/content?status=pending
    │   └─ Display review queue
    │
    ├─ POST /api/content/{id}/approve
    │   └─ Human review workflow
    │
    └─ POST /api/content/{id}/publish
        └─ Publish to social media (future)

Backend (Python/FastAPI)
    │
    ├─ OpenAI API
    │   ├─ ChatCompletion (brief generation)
    │   └─ Embeddings (semantic search)
    │
    ├─ Instagram/TikTok/Twitter APIs
    │   └─ Trend ingestion (workers)
    │
    ├─ SendGrid/SMTP
    │   └─ Email notifications
    │
    └─ AWS S3/MinIO
        └─ File uploads
```

## MVP vs Production Checklist

```
MVP (Current)              Production Ready
─────────────              ────────────────
✅ API scaffold            ❌ Authentication (JWT)
✅ Data models             ❌ Rate limiting
✅ Mock LLM responses      ❌ Caching (Redis)
✅ Job queue setup         ❌ Real social media APIs
✅ Docker Compose          ❌ Kubernetes deployment
✅ Basic tests             ❌ Full test coverage
✅ Error handling          ❌ Observability (APM)
✅ CORS setup              ❌ API versioning
✅ Environment config      ❌ Multi-region
                           ❌ Backup strategy
                           ❌ Security hardening
```

---

**Note**: This architecture is designed to scale from MVP to production with minimal changes. The modular service layer and job queue allow for easy upgrades and feature additions.
