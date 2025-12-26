from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime, timezone


# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting up science-to-content backend...")

    yield

    # Shutdown
    print("🛑 Shutting down...")


# Create FastAPI app
app = FastAPI(
    title="Science-to-Content Backend",
    version="1.0.0",
    description="AI-powered backend for transforming R&D science into Instagram content and internal briefs",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check
@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": "development",
    }


# API routes
@app.get("/")
async def root():
    return {
        "title": "Science-to-Content Backend",
        "version": "1.0.0",
        "endpoints": [
            "/docs (OpenAPI docs)",
            "/health (Health check)",
            "/api/trends (Trend endpoints)",
            "/api/briefs (Internal brief endpoints)",
            "/api/content (Generated content endpoints)",
            "/api/generation (Generation job endpoints)",
        ],
    }


# Include route modules


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
