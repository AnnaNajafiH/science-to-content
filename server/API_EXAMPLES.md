# API Examples & Quick Reference

## Quick Test Commands

### Health Check

```bash
curl http://localhost:8000/health
```

### Swagger UI (Interactive Documentation)

Visit: `http://localhost:8000/docs`

Or ReDoc: `http://localhost:8000/redoc`

---

## Trends API

### List All Trends

```bash
curl -X GET "http://localhost:8000/api/trends?skip=0&limit=20"
```

**Response:**

```json
{
  "total": 5,
  "trends": [
    {
      "id": 1,
      "title": "Hyaluronic Acid Benefits",
      "description": "...",
      "category": "ingredients",
      "confidence_score": 0.85,
      "mention_count": 1250,
      "trending_up": true,
      "detected_at": "2024-01-15T10:30:00",
      "last_updated_at": "2024-01-15T10:30:00",
      "mentions": []
    }
  ]
}
```

### List Trending Trends Only

```bash
curl -X GET "http://localhost:8000/api/trends?trending_only=true"
```

### Filter by Category

```bash
curl -X GET "http://localhost:8000/api/trends?category=ingredients"
```

### Get Trend Details

```bash
curl -X GET "http://localhost:8000/api/trends/1"
```

### Get Trend Mentions

```bash
curl -X GET "http://localhost:8000/api/trends/1/mentions?limit=10"
```

### Create Trend (Manual)

```bash
curl -X POST "http://localhost:8000/api/trends" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Niacinamide in Skincare",
    "description": "Growing discussion about niacinamide benefits",
    "category": "ingredients",
    "confidence_score": 0.92,
    "mention_count": 3200
  }'
```

---

## Internal Briefs API

### List Briefs

```bash
curl -X GET "http://localhost:8000/api/briefs?skip=0&limit=20"
```

### Get Brief Details

```bash
curl -X GET "http://localhost:8000/api/briefs/1"
```

### Generate Brief (Async)

This creates a background job. You'll need to poll the job status.

```bash
curl -X POST "http://localhost:8000/api/briefs/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "job_type": "internal_brief",
    "input_data": {
      "title": "Vitamin C Antioxidant Properties",
      "trend_id": 1,
      "rd_documents": ["doc_vitamin_c_001", "doc_antioxidants_002"]
    }
  }'
```

**Response:**

```json
{
  "id": 42,
  "job_type": "internal_brief",
  "status": "pending",
  "error_message": null,
  "started_at": null,
  "completed_at": null,
  "created_at": "2024-01-15T10:35:00"
}
```

### Check Job Status

```bash
curl -X GET "http://localhost:8000/api/generation/42"
```

**Response (while processing):**

```json
{
  "id": 42,
  "job_type": "internal_brief",
  "status": "processing",
  "error_message": null,
  "started_at": "2024-01-15T10:35:05",
  "completed_at": null,
  "created_at": "2024-01-15T10:35:00",
  "result_brief": null,
  "result_content": null
}
```

**Response (when completed):**

```json
{
  "id": 42,
  "job_type": "internal_brief",
  "status": "completed",
  "error_message": null,
  "started_at": "2024-01-15T10:35:05",
  "completed_at": "2024-01-15T10:35:15",
  "created_at": "2024-01-15T10:35:00",
  "result_brief": {
    "id": 10,
    "title": "Vitamin C Antioxidant Properties",
    "content": "## Vitamin C...",
    "summary": null,
    "format_type": "markdown",
    "created_by": {
      "id": 1,
      "email": "admin@example.com",
      "full_name": "Admin User",
      "is_active": true,
      "is_reviewer": true,
      "created_at": "2024-01-15T10:00:00"
    },
    "created_at": "2024-01-15T10:35:10",
    "updated_at": "2024-01-15T10:35:10"
  },
  "result_content": null
}
```

### Create Brief Directly (No Job Queue)

```bash
curl -X POST "http://localhost:8000/api/briefs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Internal Brief Title",
    "content": "# Markdown Content\n\nBrief details here...",
    "summary": "Short summary",
    "format_type": "markdown",
    "source_trend_id": 1
  }'
```

---

## Generated Content API

### List Content (Review Queue)

```bash
curl -X GET "http://localhost:8000/api/content?status=pending"
```

### Get Content Details

```bash
curl -X GET "http://localhost:8000/api/content/5"
```

### Create Content

```bash
curl -X POST "http://localhost:8000/api/content" \
  -H "Content-Type: application/json" \
  -d '{
    "trend_id": 1,
    "caption": "🧪 Discover the power of Vitamin C! Our latest research shows...",
    "video_script": "Hey everyone, let's talk about Vitamin C...",
    "visual_description": "Infographic with bright colors showing vitamin C molecules",
    "hashtags": ["skincare", "science", "vitaminc", "antioxidants"]
  }'
```

**Response:**

```json
{
  "id": 15,
  "trend_id": 1,
  "caption": "🧪 Discover the power of Vitamin C! Our latest research shows...",
  "video_script": "Hey everyone, let's talk about Vitamin C...",
  "visual_description": "Infographic with bright colors showing vitamin C molecules",
  "hashtags": ["skincare", "science", "vitaminc", "antioxidants"],
  "approval_status": "pending",
  "review_notes": null,
  "created_at": "2024-01-15T10:40:00",
  "updated_at": "2024-01-15T10:40:00"
}
```

### Update Content

```bash
curl -X PATCH "http://localhost:8000/api/content/15" \
  -H "Content-Type: application/json" \
  -d '{
    "approval_status": "pending",
    "review_notes": "Minor edits needed"
  }'
```

### Approve Content

```bash
curl -X POST "http://localhost:8000/api/content/15/approve" \
  -H "Content-Type: application/json" \
  -d '{
    "decision": "approved",
    "notes": "Looks great! Ready for posting."
  }'
```

### Reject Content

```bash
curl -X POST "http://localhost:8000/api/content/15/approve" \
  -H "Content-Type: application/json" \
  -d '{
    "decision": "rejected",
    "notes": "Please revise the scientific claims"
  }'
```

### Publish Content

```bash
curl -X POST "http://localhost:8000/api/content/15/publish"
```

**Response:**

```json
{
  "success": true,
  "message": "Content published successfully",
  "content_id": 15,
  "published_at": "2024-01-15T10:45:00"
}
```

---

## Generation Jobs API

### Cancel Job

```bash
curl -X POST "http://localhost:8000/api/generation/42/cancel"
```

---

## Frontend Integration Examples

### React Hooks Pattern

```javascript
// Fetch trends
async function fetchTrends() {
  const response = await fetch("http://localhost:8000/api/trends");
  const data = await response.json();
  return data.trends;
}

// Generate brief (async)
async function generateBrief(title, documents) {
  const response = await fetch("http://localhost:8000/api/briefs/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job_type: "internal_brief",
      input_data: {
        title,
        rd_documents: documents,
      },
    }),
  });
  const job = await response.json();
  return job.id; // Return job ID for polling
}

// Poll job status
async function pollJobStatus(jobId) {
  let job = null;
  while (!job || job.status === "pending" || job.status === "processing") {
    const response = await fetch(
      `http://localhost:8000/api/generation/${jobId}`
    );
    job = await response.json();
    if (job.status === "completed" || job.status === "failed") {
      return job;
    }
    // Wait 1 second before next poll
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return job;
}

// Usage in component
const jobId = await generateBrief("Vitamin C", ["doc1", "doc2"]);
const result = await pollJobStatus(jobId);
console.log(result.result_brief); // The generated brief
```

---

## Status Codes Reference

| Code | Meaning                        |
| ---- | ------------------------------ |
| 200  | Success                        |
| 201  | Created                        |
| 400  | Bad request (validation error) |
| 404  | Not found                      |
| 422  | Unprocessable entity           |
| 500  | Server error                   |

---

## Testing with Postman

1. **Import OpenAPI**: `http://localhost:8000/openapi.json`
2. **Create collection** from the swagger spec
3. **Set environment variable**: `base_url = http://localhost:8000`
4. **Test endpoints** with pre-built requests

---

## Debugging Tips

### Check API Logs

```bash
docker-compose logs api
```

### Check Database

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U postgres -d science_content_db

# List tables
\dt

# Query trends
SELECT * FROM trend;
```

### Check Redis Jobs

```bash
# Connect to Redis
docker-compose exec redis redis-cli

# List jobs
KEYS "*"

# Get job details
HGETALL rq:job:jid
```

### Enable Debug Mode

```bash
# In .env
DEBUG=True
LOG_LEVEL=DEBUG

# Restart API
docker-compose restart api
```

---

## Common Workflows

### Workflow 1: Create Content from Scratch

1. `POST /api/trends` - Create/get trend
2. `POST /api/briefs/generate` - Generate internal brief
3. `GET /api/generation/{job_id}` - Wait for completion
4. `POST /api/content` - Create content based on brief
5. `POST /api/content/{id}/approve` - Human review
6. `POST /api/content/{id}/publish` - Publish to social

### Workflow 2: Review Queue

1. `GET /api/content?status=pending` - Get pending items
2. `GET /api/content/{id}` - View details
3. `POST /api/content/{id}/approve` - Approve or reject
4. `POST /api/content/{id}/publish` - Publish if approved

### Workflow 3: Trend Analysis

1. `GET /api/trends?trending_only=true` - Get hot trends
2. `GET /api/trends/{id}/mentions` - Get mentions
3. Generate content/brief based on trending topics

---

## Rate Limiting & Performance

Currently no rate limiting. In production, add:

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.get("/api/trends")
@limiter.limit("100/minute")
async def list_trends(...):
    ...
```

---

For more details, visit **`http://localhost:8000/docs`** for interactive API documentation.
