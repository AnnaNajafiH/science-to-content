# Science to Content Backend

AI-powered backend for transforming R&D science into Instagram content and internal briefs.

## Quick Start with Docker Compose

The easiest way to get the entire stack running locally:

```bash
# 1. Clone the repo and navigate to server directory
cd server

# 2. Copy environment template and adjust if needed
cp .env.example .env

# 3. Add your OpenAI API key to .env (optional for MVP mock mode)
# OPENAI_API_KEY=sk-your-key-here

# 4. Start all services (PostgreSQL, Redis, MinIO, FastAPI)
docker-compose up --build

# 5. The API will be available at http://localhost:8000
```

## Manual Setup (Without Docker)

### Prerequisites

- Python 3.10+
- PostgreSQL 14+
- Redis 7+
- MinIO (optional, for S3 storage)

### Installation

```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database, Redis, and OpenAI details

# 4. Initialize database
alembic upgrade head

# 5. Run the server
uvicorn app.main:app --reload
```

## Architecture

### Project Structure

```
server/
├── app/
│   ├── main.py              # FastAPI app definition
│   ├── config.py            # Settings and environment config
│   ├── models.py            # SQLModel database models
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── database.py          # SQLAlchemy async session setup
│   ├── api/                 # API route handlers
│   │   ├── trends.py        # Trend endpoints
│   │   ├── briefs.py        # Internal brief endpoints
│   │   ├── content.py       # Generated content endpoints
│   │   └── generation.py    # Generation job endpoints
│   ├── services/            # Business logic
│   │   ├── llm_service.py           # OpenAI integration
│   │   ├── retrieval_service.py     # RAG and semantic search
│   │   ├── trend_detection_service.py # Trend analysis
│   │   ├── email_service.py         # Email notifications
│   │   └── storage_service.py       # S3/MinIO file management
│   └── workers/             # Background job handlers
│       ├── generation_worker.py     # Brief/content generation jobs
│       └── ingestion_worker.py      # Social media trend ingestion
├── migrations/              # Alembic database migrations
├── tests/                   # Unit and integration tests
├── docker-compose.yml       # Local dev stack
├── Dockerfile               # Container definition
├── pyproject.toml          # Python project manifest
├── requirements.txt        # Pip dependencies
├── .env.example            # Environment template
└── README.md               # This file
```

### Technology Stack

- **Framework**: FastAPI with async/await
- **Database**: PostgreSQL + pgvector (for vector embeddings)
- **ORM**: SQLModel (Pydantic + SQLAlchemy)
- **Job Queue**: Redis + RQ (Python Rqueue)
- **LLM**: OpenAI APIs (Chat Completions, Embeddings)
- **Vector Store**: pgvector (built into PostgreSQL)
- **File Storage**: S3-compatible (MinIO for dev, AWS S3 for prod)
- **Containerization**: Docker + docker-compose
- **Database Migrations**: Alembic

## API Endpoints

### Health Check

```bash
GET /health
```

### Trends

```bash
# List all trends
GET /api/trends?skip=0&limit=20&trending_only=true

# Get trend details
GET /api/trends/{trend_id}

# Get mentions for a trend
GET /api/trends/{trend_id}/mentions

# Create trend (manual)
POST /api/trends
{
  "title": "Hyaluronic Acid",
  "description": "...",
  "category": "ingredients",
  "confidence_score": 0.85,
  "mention_count": 1250
}
```

### Internal Briefs

```bash
# List briefs
GET /api/briefs?skip=0&limit=20

# Get brief details
GET /api/briefs/{brief_id}

# Generate brief (async)
POST /api/briefs/generate
{
  "job_type": "internal_brief",
  "input_data": {
    "title": "Vitamin C Benefits",
    "trend_id": 1,
    "rd_documents": ["doc1", "doc2"]
  }
}

# Create brief directly
POST /api/briefs
{
  "title": "...",
  "content": "...",
  "summary": "..."
}
```

### Generated Content

```bash
# List content
GET /api/content?skip=0&limit=20&status=pending

# Get content details
GET /api/content/{content_id}

# Create content
POST /api/content
{
  "trend_id": 1,
  "caption": "...",
  "hashtags": ["skincare", "science"]
}

# Update content
PATCH /api/content/{content_id}
{
  "approval_status": "approved",
  "review_notes": "Great post!"
}

# Approve/reject content
POST /api/content/{content_id}/approve
{
  "decision": "approved",
  "notes": "Looks good!"
}

# Publish content
POST /api/content/{content_id}/publish
```

### Generation Jobs

```bash
# Check job status
GET /api/generation/{job_id}

# Cancel job
POST /api/generation/{job_id}/cancel
```

## Data Models

### User

- Email, hashed password, full name
- Roles: reviewer (can approve content)
- Relations: briefs, approvals

### Trend

- Title, description, category (skincare, ingredients, routine, wellness)
- Confidence score (0-1), mention count, trending indicator
- Vector embedding for semantic search
- Relations: mentions, generated content

### TrendMention

- Source (Instagram, TikTok, Twitter, etc.)
- Engagement count, sentiment (positive/negative/neutral)
- Text snippet, timestamp

### InternalBrief

- Title, content (markdown/html/plain), summary
- Source documents and associated trend
- Creator and timestamp
- Relations: generation job

### GeneratedContent

- Caption, video script, visual description
- Hashtags list
- Approval status (pending, approved, rejected, published)
- Review notes, publish timestamp
- Relations: trend, approvals

### GenerationJob

- Job type (internal_brief, social_content)
- Status (pending, processing, completed, failed, cancelled)
- Input data (JSON), result references
- Worker ID, timestamps

### Approval

- Content + user + decision (approved/rejected) + notes
- Audit trail for compliance

## MVP Features (Current)

✅ **Implemented:**

- FastAPI app with all main endpoints
- SQLModel data models with relationships
- Async database (PostgreSQL + pgvector ready)
- Mock LLM responses (enable `MOCK_LLM_RESPONSES=True`)
- Job queue skeleton (RQ integration ready)
- Service layer (LLM, RAG, trend detection, email, storage)
- Worker stubs for generation and ingestion
- Docker Compose setup with all services
- Swagger/OpenAPI docs at `/docs`

⚠️ **To Implement:**

- Database migrations (Alembic setup)
- Authentication & authorization (JWT)
- Real OpenAI integration (replace mocks)
- Real social media ingestion (Instagram/TikTok/Twitter APIs)
- Embeddings storage and vector search
- Email notifications
- S3 file uploads
- Tests and CI/CD

## Configuration

Copy `.env.example` to `.env` and customize:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/science_content_db

# Redis
REDIS_URL=redis://localhost:6379/0

# OpenAI
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# S3
S3_ENDPOINT_URL=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin

# Email (SMTP)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_FROM_EMAIL=noreply@example.com

# App
DEBUG=True
SECRET_KEY=change-this-in-production
ENVIRONMENT=development

# Feature Flags
MOCK_LLM_RESPONSES=True  # Set False to use real OpenAI
```

## Running Async Generators

To process generation jobs in the background:

```bash
# In one terminal, run the API
uvicorn app.main:app --reload

# In another terminal, start RQ worker
rq worker -c app.config
```

## Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=app
```

## Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Add new field"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Troubleshooting

### Database connection errors

```bash
# Check PostgreSQL is running
docker-compose ps

# Verify DATABASE_URL in .env
# Format: postgresql://user:password@host:port/database
```

### Redis connection errors

```bash
# Check Redis is running
redis-cli ping  # Should return PONG
```

### OpenAI API errors

- Verify OPENAI_API_KEY is set correctly
- Check API key has billing enabled
- For MVP, set MOCK_LLM_RESPONSES=True

### Permission errors

```bash
# If using MinIO locally, ensure bucket exists
aws s3 mb s3://science-content --endpoint-url http://localhost:9000 \
  --region us-east-1 \
  --profile minio
```

## Next Steps (Phase 2)

1. **Authentication**: Implement JWT login/signup
2. **Real LLM Integration**: Replace mocks with actual OpenAI calls
3. **Vector Embeddings**: Store and search document embeddings
4. **Social Media Ingestion**: Connect to Instagram/TikTok/Twitter APIs
5. **Email Service**: Integrate SendGrid or similar
6. **S3 Uploads**: Implement actual file storage
7. **Tests**: Add unit and integration tests
8. **Monitoring**: Add Sentry, Prometheus, logging
9. **API Auth**: Add JWT token validation to protected endpoints
10. **Frontend Integration**: Wire up React frontend to backend APIs

## Support

For issues or questions, refer to the main README.md in the root of the repository.
