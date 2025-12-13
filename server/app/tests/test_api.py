"""Test API endpoints."""
import pytest
from httpx import AsyncClient
from app.main import app


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    """Test health check endpoint."""
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


@pytest.mark.asyncio
async def test_root(client: AsyncClient):
    """Test root endpoint."""
    response = await client.get("/")
    assert response.status_code == 200
    assert response.json()["title"]


@pytest.mark.asyncio
async def test_list_trends(client: AsyncClient):
    """Test list trends endpoint."""
    response = await client.get("/api/trends")
    assert response.status_code == 200
    assert "trends" in response.json()
    assert "total" in response.json()


@pytest.mark.asyncio
async def test_create_trend(client: AsyncClient):
    """Test create trend endpoint."""
    trend_data = {
        "title": "Hyaluronic Acid",
        "description": "Trending ingredient discussion",
        "category": "ingredients",
        "confidence_score": 0.85,
        "mention_count": 1000,
    }
    response = await client.post("/api/trends", json=trend_data)
    assert response.status_code == 200
    assert response.json()["title"] == "Hyaluronic Acid"


@pytest.mark.asyncio
async def test_list_briefs(client: AsyncClient):
    """Test list briefs endpoint."""
    response = await client.get("/api/briefs")
    assert response.status_code == 200
    assert "briefs" in response.json()


@pytest.mark.asyncio
async def test_list_content(client: AsyncClient):
    """Test list content endpoint."""
    response = await client.get("/api/content")
    assert response.status_code == 200
    assert "contents" in response.json()
