from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/science_content_db"
    DATABASE_ECHO: bool = False

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"


    # OpenAI
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"

    # S3
    S3_ENDPOINT_URL: str = "http://localhost:9000"
    S3_ACCESS_KEY: str = "minioadmin"
    S3_SECRET_KEY: str = "minioadmin"
    S3_BUCKET_NAME: str = "science-content"
    S3_REGION: str = "us-east-1"

    # Email
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 1025
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "noreply@example.com"

    # App
    DEBUG: bool = False
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ENVIRONMENT: str = "development"
    API_TITLE: str = "Science to Content API"
    API_VERSION: str = "0.1.0"

    # Auth
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"

    # Logging
    LOG_LEVEL: str = "INFO"

    # Feature flags
    ENABLE_LLM: bool = True
    ENABLE_TREND_INGESTION: bool = True
    MOCK_LLM_RESPONSES: bool = True  # Set to False to use real OpenAI

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()


if settings.ENABLE_LLM and not settings.OPENAI_API_KEY:
    raise RuntimeError(
        "OPENAI_API_KEY is required when ENABLE_LLM=True"
    )
