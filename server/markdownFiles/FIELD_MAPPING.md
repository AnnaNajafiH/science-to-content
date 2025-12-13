# Frontend-Backend Field Mapping Quick Reference

## 🔄 Field Name Conversions

### Trend

| Frontend       | Backend DB    | Notes                              |
| -------------- | ------------- | ---------------------------------- |
| `id` (string)  | `id` (int)    | Convert to string in response      |
| `name`         | `name`        | ✅ Changed from `title`            |
| `score`        | `score`       | ✅ Changed from `confidence_score` |
| `velocity`     | `velocity`    | ✅ New field (rising/hot/stable)   |
| `keywords`     | `keywords`    | ✅ New JSON array                  |
| `detectedAt`   | `detected_at` | camelCase conversion               |
| `relatedPosts` | `mentions`    | Relationship, map to SocialPost[]  |

### SocialPost (TrendMention)

| Frontend      | Backend DB  | Notes                              |
| ------------- | ----------- | ---------------------------------- |
| `id` (string) | `id` (int)  | Convert to string                  |
| `text`        | `text`      | ✅ Matches                         |
| `author`      | `author`    | ✅ New field                       |
| `platform`    | `platform`  | ✅ Changed from `source`, now enum |
| `timestamp`   | `timestamp` | ✅ Changed from `mentioned_at`     |
| `likes`       | `likes`     | ✅ Changed from `engagement_count` |
| `comments`    | `comments`  | ✅ New field                       |
| `hashtags`    | `hashtags`  | ✅ New JSON array                  |

### GeneratedContent

| Frontend            | Backend DB                        | Notes                        |
| ------------------- | --------------------------------- | ---------------------------- |
| `id` (string)       | `id` (int)                        | Convert to string            |
| `trendId` (string)  | `trend_id` (int)                  | Convert to string            |
| `type`              | `type`                            | ✅ New enum field            |
| `status`            | `status` / `approval_status`      | Both exist for compatibility |
| `confidence`        | `confidence`                      | ✅ New field                 |
| `generatedAt`       | `generated_at`                    | camelCase conversion         |
| `slides`            | `slides`                          | ✅ New JSON array            |
| `caption`           | `caption`                         | ✅ Matches                   |
| `script`            | `script` / `video_script`         | Both exist                   |
| `visualSuggestions` | `visual_suggestions`              | ✅ New JSON array            |
| `hashtags`          | `hashtags`                        | ✅ Matches                   |
| `rdReferences`      | `rd_references`                   | ✅ New JSON array            |
| `reviewerNotes`     | `reviewer_notes` / `review_notes` | Both exist                   |
| `editedBy`          | `edited_by`                       | ✅ New field                 |
| `approvedAt`        | `approved_at`                     | ✅ New field                 |

### InternalBrief

| Frontend                | Backend DB             | Notes                |
| ----------------------- | ---------------------- | -------------------- |
| `id` (string)           | `id` (int)             | Convert to string    |
| `title`                 | `title`                | ✅ Matches           |
| `rdDocumentId` (string) | `rd_document_id` (int) | Convert to string    |
| `headline`              | `headline`             | ✅ New field         |
| `keyProofPoints`        | `key_proof_points`     | ✅ New JSON array    |
| `creativeHooks`         | `creative_hooks`       | ✅ New JSON array    |
| `sampleCaptions`        | `sample_captions`      | ✅ New JSON array    |
| `trainingSnippets`      | `training_snippets`    | ✅ New JSON array    |
| `targetAudience`        | `target_audience`      | ✅ New field         |
| `generatedAt`           | `generated_at`         | camelCase conversion |

### RDDocument

| Frontend      | Backend DB     | Notes                 |
| ------------- | -------------- | --------------------- |
| `id` (string) | `id` (int)     | Convert to string     |
| `title`       | `title`        | ✅ New model          |
| `summary`     | `summary`      | ✅ New model          |
| `keyFindings` | `key_findings` | camelCase, JSON array |
| `ingredients` | `ingredients`  | JSON array            |
| `studyType`   | `study_type`   | camelCase             |
| `efficacy`    | `efficacy`     | ✅ Matches            |
| `citations`   | `citations`    | JSON array            |

---

## 📋 Example Response Transformations

### Trend Response

```python
# Database model
trend = Trend(
    id=1,
    name="Hyaluronic Acid",
    score=0.85,
    velocity="hot",
    keywords=["hydration", "plumping"],
    detected_at=datetime.now()
)

# API Response (what frontend expects)
{
    "id": "1",  # ← Convert int to string
    "name": "Hyaluronic Acid",
    "description": "...",
    "score": 0.85,
    "velocity": "hot",
    "detectedAt": "2025-12-13T...",  # ← camelCase
    "relatedPosts": [...],  # ← Map from mentions relationship
    "keywords": ["hydration", "plumping"],
    "category": "ingredients"
}
```

### GeneratedContent Response

```python
# Database model
content = GeneratedContent(
    id=1,
    trend_id=5,
    type="instagram-carousel",
    status="pending",
    confidence=0.75,
    caption="Amazing science!",
    script="Intro: Did you know...",
    slides=[{"number": 1, "text": "...", "visualHint": "..."}],
    visual_suggestions=["Lab beaker", "Molecule"],
    hashtags=["skincare", "science"],
    rd_references=["doc_1", "doc_2"],
    generated_at=datetime.now()
)

# API Response
{
    "id": "1",  # ← string
    "trendId": "5",  # ← string
    "type": "instagram-carousel",
    "status": "pending",
    "confidence": 0.75,
    "generatedAt": "2025-12-13T...",
    "slides": [{"number": 1, "text": "...", "visualHint": "..."}],
    "caption": "Amazing science!",
    "script": "Intro: Did you know...",
    "visualSuggestions": ["Lab beaker", "Molecule"],  # ← camelCase
    "hashtags": ["skincare", "science"],
    "rdReferences": ["doc_1", "doc_2"],  # ← camelCase
    "reviewerNotes": null,
    "editedBy": null,
    "approvedAt": null
}
```

### InternalBrief Response

```python
# Database model
brief = InternalBrief(
    id=1,
    title="Vitamin C Benefits",
    rd_document_id=3,
    headline="The Power of Vitamin C in Skincare",
    key_proof_points=[
        {
            "point": "Boosts collagen",
            "evidence": "Clinical study shows 40% increase",
            "citation": "Journal XYZ, 2024"
        }
    ],
    creative_hooks=["Science meets glow", "Your skin's best friend"],
    sample_captions=["Unlock radiant skin with..."],
    training_snippets=["Vitamin C is an antioxidant..."],
    target_audience="Marketing Teams",
    generated_at=datetime.now()
)

# API Response
{
    "id": "1",
    "title": "Vitamin C Benefits",
    "rdDocumentId": "3",  # ← string, camelCase
    "headline": "The Power of Vitamin C in Skincare",
    "keyProofPoints": [  # ← camelCase
        {
            "point": "Boosts collagen",
            "evidence": "Clinical study shows 40% increase",
            "citation": "Journal XYZ, 2024"
        }
    ],
    "creativeHooks": ["Science meets glow", "Your skin's best friend"],
    "sampleCaptions": ["Unlock radiant skin with..."],
    "trainingSnippets": ["Vitamin C is an antioxidant..."],
    "targetAudience": "Marketing Teams",
    "generatedAt": "2025-12-13T..."
}
```

---

## 🛠️ Helper Functions Needed

### 1. ID Conversion

```python
def to_frontend_id(db_id: int) -> str:
    """Convert database integer ID to frontend string ID."""
    return str(db_id)

def from_frontend_id(frontend_id: str) -> int:
    """Convert frontend string ID to database integer ID."""
    return int(frontend_id)
```

### 2. camelCase Conversion

```python
def snake_to_camel(snake_str: str) -> str:
    """Convert snake_case to camelCase."""
    components = snake_str.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

def camel_to_snake(camel_str: str) -> str:
    """Convert camelCase to snake_case."""
    import re
    return re.sub(r'(?<!^)(?=[A-Z])', '_', camel_str).lower()
```

### 3. Model to Response Converter

```python
def trend_to_response(trend: Trend) -> dict:
    """Convert Trend model to frontend response."""
    return {
        "id": str(trend.id),
        "name": trend.name,
        "description": trend.description,
        "score": trend.score,
        "velocity": trend.velocity,
        "detectedAt": trend.detected_at.isoformat(),
        "relatedPosts": [mention_to_social_post(m) for m in trend.mentions],
        "keywords": trend.keywords,
        "category": trend.category
    }

def mention_to_social_post(mention: TrendMention) -> dict:
    """Convert TrendMention to SocialPost response."""
    return {
        "id": str(mention.id),
        "text": mention.text,
        "author": mention.author,
        "platform": mention.platform,
        "timestamp": mention.timestamp.isoformat(),
        "likes": mention.likes,
        "comments": mention.comments,
        "hashtags": mention.hashtags
    }
```

---

## 🎯 Implementation Checklist

### API Endpoints to Update

- [ ] `GET /api/trends` - Map fields, convert IDs
- [ ] `GET /api/trends/{id}` - Include relatedPosts
- [ ] `POST /api/trends` - Accept frontend field names
- [ ] `GET /api/content` - Map all new fields
- [ ] `GET /api/content/{id}` - Convert response
- [ ] `POST /api/content` - Accept camelCase
- [ ] `PATCH /api/content/{id}` - Accept frontend fields
- [ ] `GET /api/briefs` - Map to new structure
- [ ] `POST /api/briefs/generate` - Create with new fields
- [ ] `GET /api/rd-documents` - **NEW endpoint needed**

### Mock Services to Update

- [ ] `trendService.ts` - Use new field names
- [ ] `generationService.ts` - Update GeneratedContent structure
- [ ] `briefService.ts` - Update InternalBrief structure
- [ ] `rdService.ts` - Ensure matches backend

### Database

- [ ] Create Alembic migration
- [ ] Add `rd_documents` table
- [ ] Add new columns to existing tables
- [ ] Migrate existing data

---

## 📝 Notes

1. **ID Conversion:** Always convert integer IDs to strings in API responses
2. **camelCase:** API responses use camelCase, database uses snake_case
3. **Compatibility:** Keep both old and new field names during migration
4. **Relationships:** `relatedPosts` needs eager loading of `mentions` relationship
5. **Enums:** Ensure enum values match frontend expectations exactly

---

**Last Updated:** 2025-12-13  
**Status:** Models and schemas updated, endpoints need implementation
