from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlmodel import SQLModel
from contextlib import asynccontextmanager
from server.app.config import settings


# Async engine for PostgreSQL
engine = create_async_engine(
    settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"),
    echo=settings.DATABASE_ECHO,
    future=True,
    pool_pre_ping=True,
    pool_size=20,
    max_overflow=40,
)

# Async session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)


async def get_session() -> AsyncSession:
    """Dependency to get DB session for endpoints."""
    async with AsyncSessionLocal() as session:
        yield session


async def init_db():
    """Initialize database tables (for startup)."""
    if settings.ENVIRONMENT != "production":
        async with engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)


async def close_db():
    """Close database connection (for shutdown)."""
    await engine.dispose()
