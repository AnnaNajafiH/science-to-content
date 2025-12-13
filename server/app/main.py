"""Main FastAPI application."""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime

from .database import init_db, close_db, get_session
from .config import settings
from .api import trends, briefs, content, generation


# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    # Startup
    print("🚀 Starting up science-to-content backend...")
    await init_db()
    print("✅ Database initialized")

    yield

    # Shutdown
    print("🛑 Shutting down...")
    await close_db()
    print("✅ Database closed")


# Create FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description="AI-powered backend for transforming R&D science into Instagram content and internal briefs",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://localhost:3000"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check
@app.get("/health")
async def health_check():
    """Simple health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": settings.ENVIRONMENT,
    }


# API routes
@app.get("/")
async def root():
    """Root endpoint with API info."""
    return {
        "title": settings.API_TITLE,
        "version": settings.API_VERSION,
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
app.include_router(trends.router, prefix="/api/trends", tags=["Trends"])
app.include_router(briefs.router, prefix="/api/briefs",
                   tags=["Internal Briefs"])
app.include_router(content.router, prefix="/api/content",
                   tags=["Generated Content"])
app.include_router(generation.router, prefix="/api/generation",
                   tags=["Generation Jobs"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
    )
