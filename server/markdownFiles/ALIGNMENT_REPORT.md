# Backend Models & Schemas Alignment Report

## 🔍 Analysis Summary

After careful analysis of the frontend TypeScript interfaces and backend Python models, I identified **critical mismatches** between what the frontend expects and what the backend provides. This document details all changes made to align them.

---

## ❌ Critical Issues Found

### 1. **Trend Model Mismatch**

**Frontend expects:**

```typescript
interface Trend {
  id: string;
  name: string; // ❌ Backend had: title
  score: number; // ❌ Backend had: confidence_score
  velocity: "rising" | "hot" | "stable"; // ❌ Backend had: trending_up (boolean)
  keywords: string[]; // ❌ Backend didn't have this
  relatedPosts: SocialPost[]; // ❌ Backend had: mentions with different structure
  detectedAt: string; // ✅ Backend had: detected_at
}
```

**✅ Fixed:** Updated `Trend` model with correct field names and types

---

### 2. **GeneratedContent Model Mismatch**

**Frontend expects:**

```typescript
interface GeneratedContent {
  id: string;
  trendId: string; // ❌ Backend had: trend_id (int)
  type: "instagram-carousel" | "reel" | "story" | "video-script"; // ❌ Missing
  status: "pending" | "approved" | "rejected" | "published"; // ❌ Backend used: approval_status
  confidence: number; // ❌ Missing
  generatedAt: string; // ❌ Backend had: created_at
  slides?: ContentSlide[]; // ❌ Missing
  script?: string; // ❌ Backend had: video_script
  visualSuggestions?: string[]; // ❌ Missing
  rdReferences: string[]; // ❌ Missing
  reviewerNotes?: string; // ❌ Backend had: review_notes
  editedBy?: string; // ❌ Missing
  approvedAt?: string; // ❌ Missing
}
```

**✅ Fixed:** Added all missing fields and aliases for compatibility

---

### 3. **InternalBrief Model Mismatch**

**Frontend expects:**

```typescript
interface InternalBrief {
  id: string;
  title: string;
  rdDocumentId: string; // ❌ Missing in backend
  headline: string; // ❌ Missing
  keyProofPoints: Array<{
    // ❌ Missing
    point: string;
    evidence: string;
    citation: string;
  }>;
  creativeHooks: string[]; // ❌ Missing
  sampleCaptions: string[]; // ❌ Missing
  trainingSnippets: string[]; // ❌ Missing
  targetAudience: string; // ❌ Missing
  generatedAt: string; // ❌ Backend had: created_at
}
```

**✅ Fixed:** Complete restructure to match frontend interface

---

### 4. **RDDocument Model Missing**

**Frontend expects:**

```typescript
interface RDDocument {
  id: string;
  title: string;
  summary: string;
  keyFindings: string[];
  ingredients: string[];
  studyType: string;
  efficacy: string;
  citations: string[];
}
```

**❌ Backend had:** NOTHING - Model completely missing!

**✅ Fixed:** Created complete `RDDocument` model

---

### 5. **SocialPost (TrendMention) Mismatch**

**Frontend expects:**

```typescript
interface SocialPost {
  id: string;
  text: string;
  author: string; // ❌ Missing
  platform: "instagram" | "tiktok" | "twitter" | "reddit"; // ❌ Backend had generic 'source'
  timestamp: string; // ❌ Backend had: mentioned_at
  likes: number; // ❌ Backend had: engagement_count
  comments: number; // ❌ Missing
  hashtags: string[]; // ❌ Missing
}
```

**✅ Fixed:** Updated `TrendMention` to match `SocialPost` interface

---

## ✅ Changes Made

### 1. Added New Enums

```python
class TrendVelocity(str, Enum):
    RISING = "rising"
    HOT = "hot"
    STABLE = "stable"

class ContentType(str, Enum):
    INSTAGRAM_CAROUSEL = "instagram-carousel"
    REEL = "reel"
    STORY = "story"
    VIDEO_SCRIPT = "video-script"

class SocialPlatform(str, Enum):
    INSTAGRAM = "instagram"
    TIKTOK = "tiktok"
    TWITTER = "twitter"
    REDDIT = "reddit"
```

### 2. Created RDDocument Model

```python
class RDDocument(SQLModel, table=True):
    __tablename__ = "rd_documents"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    summary: str
    key_findings: list = Field(default_factory=list, sa_column=Column(JSON))
    ingredients: list = Field(default_factory=list, sa_column=Column(JSON))
    study_type: str
    efficacy: str
    citations: list = Field(default_factory=list, sa_column=Column(JSON))
    created_at: datetime
    updated_at: datetime
```

### 3. Updated Trend Model

**Key changes:**

- `title` → `name`
- `confidence_score` → `score`
- Added `velocity` field (TrendVelocity enum)
- Added `keywords` array
- Kept both old and new field names for compatibility

### 4. Updated TrendMention (SocialPost)

**Key changes:**

- Added `author` field
- `mentioned_at` → `timestamp`
- Added `likes` field (renamed from engagement_count)
- Added `comments` field
- Added `hashtags` array
- `source` → `platform` (SocialPlatform enum)

### 5. Updated InternalBrief Model

**Key changes:**

- Added `rd_document_id` (foreign key)
- Added `headline` field
- Added `key_proof_points` JSON array
- Added `creative_hooks` JSON array
- Added `sample_captions` JSON array
- Added `training_snippets` JSON array
- Added `target_audience` field
- Added `generated_at` field
- Kept legacy `content` and `summary` for compatibility

### 6. Updated GeneratedContent Model

**Key changes:**

- Added `type` field (ContentType enum)
- `approval_status` → `status` (kept both)
- Added `confidence` field
- Added `slides` JSON array
- `video_script` → `script` (kept both)
- Added `visual_suggestions` JSON array
- Added `rd_references` JSON array
- `review_notes` → `reviewer_notes` (kept both)
- Added `edited_by` field
- Added `approved_at` field
- Added `generated_at` field

---

## 📋 Schema Updates

### Created Response Schemas with camelCase

All response schemas now use camelCase field names to match frontend:

- `TrendResponse`: Uses `detectedAt`, `relatedPosts`
- `SocialPostResponse`: Frontend-compatible field names
- `RDDocumentResponse`: Uses `keyFindings`, `studyType`
- `InternalBriefResponse`: Uses `rdDocumentId`, `keyProofPoints`, `creativeHooks`, etc.
- `GeneratedContentResponse`: Uses `trendId`, `generatedAt`, `rdReferences`, `visualSuggestions`, etc.

### ID Fields

All response schemas return `id` as **string** to match frontend expectations:

```python
id: str  # Return as string for frontend
```

---

## 🔄 Backward Compatibility

To ensure smooth migration, I kept dual field names where appropriate:

### GeneratedContent

```python
approval_status: ApprovalStatus  # For DB queries
status: ApprovalStatus  # For API responses

video_script: Optional[str]  # Legacy
script: Optional[str]  # Frontend

review_notes: Optional[str]  # Legacy
reviewer_notes: Optional[str]  # Frontend
```

### InternalBrief

```python
content: Optional[str]  # Legacy field
summary: Optional[str]  # Legacy field
# + all new frontend fields
```

---

## 📝 Next Steps

### 1. Update API Endpoints

The endpoint handlers need updates to:

- Convert integer IDs to strings in responses
- Map database field names to camelCase for frontend
- Handle both old and new field names in requests

### 2. Update Mock Data

Service mocks need to return data matching new schemas:

```python
# Example: trendService mock should return
{
    "id": "1",  # string
    "name": "Hyaluronic Acid",  # not "title"
    "score": 0.85,  # not "confidence_score"
    "velocity": "hot",  # not boolean
    "keywords": ["hydration", "plumping"],
    "relatedPosts": [...],  # not "mentions"
    "detectedAt": "2025-12-13T..."
}
```

### 3. Database Migration

Need Alembic migration to:

- Create `rd_documents` table
- Add new columns to existing tables
- Migrate data from old columns to new ones
- Add indexes for new fields

### 4. Update Workers

Generation workers need to populate new fields:

```python
# Brief generation should create:
brief = InternalBrief(
    headline="...",  # New
    key_proof_points=[...],  # New
    creative_hooks=[...],  # New
    sample_captions=[...],  # New
    training_snippets=[...],  # New
    target_audience="...",  # New
)
```

---

## 🎯 Summary

### Models Updated: 5

1. ✅ `Trend` - Field name changes, added velocity and keywords
2. ✅ `TrendMention` - Restructured to match SocialPost
3. ✅ `InternalBrief` - Complete restructure with new fields
4. ✅ `GeneratedContent` - Added 8+ new fields
5. ✅ `RDDocument` - **NEW MODEL** created from scratch

### Enums Added: 3

1. ✅ `TrendVelocity`
2. ✅ `ContentType`
3. ✅ `SocialPlatform`

### Schemas Updated: 6

1. ✅ `TrendResponse` - camelCase, relatedPosts
2. ✅ `SocialPostResponse` - **NEW** frontend-compatible
3. ✅ `RDDocumentResponse` - **NEW** camelCase fields
4. ✅ `InternalBriefResponse` - Complete restructure
5. ✅ `GeneratedContentResponse` - camelCase, all new fields
6. ✅ `KeyProofPoint` - **NEW** nested schema

---

## ⚠️ Breaking Changes

### For API Consumers

1. Trend field `title` is now `name`
2. Trend field `confidence_score` is now `score`
3. All IDs returned as strings instead of integers
4. Field names in responses are camelCase
5. InternalBrief structure completely changed

### Migration Path

1. Update frontend to use new API response structure
2. Run database migrations to add new columns
3. Update all mock services
4. Deploy backend changes
5. Deploy frontend changes

---

## ✨ Benefits

1. **Type Safety:** Frontend and backend now have matching contracts
2. **Consistency:** camelCase in JSON, snake_case in Python
3. **Future-Proof:** Extensible design with metadata fields
4. **Compatibility:** Dual field names allow gradual migration
5. **Standards:** Following REST API best practices

---

**Status:** ✅ Models and schemas updated  
**Next:** Update API endpoints and mock services  
**Priority:** HIGH - Frontend won't work without these changes
