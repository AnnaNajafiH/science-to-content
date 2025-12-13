"""LLM service for OpenAI integration."""
import json
import httpx
from app.config import settings


class LLMService:
    """Service for interacting with OpenAI API."""

    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.model = settings.OPENAI_MODEL
        self.embedding_model = settings.OPENAI_EMBEDDING_MODEL
        self.base_url = "https://api.openai.com/v1"

    async def generate_brief(self, title: str, context: str) -> str:
        """
        Generate an internal brief using ChatGPT.

        Args:
            title: Brief title/topic
            context: R&D document context or trend description

        Returns:
            Generated brief text
        """
        if settings.MOCK_LLM_RESPONSES:
            # Mock response for MVP
            return f"## {title}\n\n{context}\n\nThis is a mock internal brief generated for MVP testing."

        # Real OpenAI call
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a scientific communication expert for skincare R&D. Generate clear, concise internal briefs.",
                },
                {
                    "role": "user",
                    "content": f"Create an internal brief about: {title}\n\nContext: {context}",
                },
            ],
            "temperature": 0.7,
            "max_tokens": 1500,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30.0,
            )
            response.raise_for_status()
            result = response.json()

            return result["choices"][0]["message"]["content"]

    async def generate_social_content(self, trend_title: str, context: str) -> dict:
        """
        Generate Instagram content (caption, hashtags, visual ideas).

        Args:
            trend_title: Trending topic
            context: Scientific background / trend context

        Returns:
            Dict with caption, hashtags, visual_description
        """
        if settings.MOCK_LLM_RESPONSES:
            # Mock response for MVP
            return {
                "caption": f"🧪 Discover the science behind {trend_title}! "
                f"Our research shows... [This is a mock caption for MVP]",
                "hashtags": ["skincare", "science", "rdandblog", trend_title.lower().replace(" ", "")],
                "visual_description": f"Infographic showing the science of {trend_title}",
                "video_script": None,
            }

        # Real OpenAI call
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a social media expert for skincare science. Create engaging Instagram content that explains skincare science to Gen Z. Output as JSON with keys: caption, hashtags (list), visual_description.",
                },
                {
                    "role": "user",
                    "content": f"Create an Instagram post about: {trend_title}\n\nScientific context: {context}",
                },
            ],
            "temperature": 0.8,
            "max_tokens": 1000,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30.0,
            )
            response.raise_for_status()
            result = response.json()

            # Parse JSON response
            content = result["choices"][0]["message"]["content"]
            try:
                return json.loads(content)
            except json.JSONDecodeError:
                return {
                    "caption": content,
                    "hashtags": ["skincare", "science"],
                    "visual_description": "Post image",
                }

    async def get_embedding(self, text: str) -> list:
        """
        Get text embedding from OpenAI.

        Args:
            text: Text to embed

        Returns:
            Embedding vector (list of floats)
        """
        if settings.MOCK_LLM_RESPONSES:
            # Mock embedding
            return [0.1] * 1536  # Mock vector of standard embedding size

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": self.embedding_model,
            "input": text,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/embeddings",
                headers=headers,
                json=payload,
                timeout=30.0,
            )
            response.raise_for_status()
            result = response.json()

            return result["data"][0]["embedding"]


# Singleton
llm_service = LLMService()
