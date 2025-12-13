"""Retrieval-Augmented Generation (RAG) service for semantic search."""
from typing import List, Tuple
import json


class RetrievalService:
    """Service for semantic search and document retrieval."""

    def __init__(self):
        # In production, this would connect to pgvector or Pinecone
        self.documents = {}  # Mock document store

    async def store_embedding(self, doc_id: str, text: str, embedding: List[float]) -> None:
        """Store a document embedding."""
        self.documents[doc_id] = {
            "text": text,
            "embedding": embedding,
        }

    async def search_similar(
        self, query_embedding: List[float], limit: int = 5, threshold: float = 0.7
    ) -> List[Tuple[str, float]]:
        """
        Find similar documents using vector similarity (cosine).

        Returns list of (doc_id, similarity_score) tuples.
        """
        if not self.documents:
            return []

        similarities = []
        for doc_id, doc in self.documents.items():
            # Cosine similarity
            score = self._cosine_similarity(query_embedding, doc["embedding"])
            if score >= threshold:
                similarities.append((doc_id, score))

        # Sort by score descending and return top results
        return sorted(similarities, key=lambda x: x[1], reverse=True)[:limit]

    @staticmethod
    def _cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
        """Calculate cosine similarity between two vectors."""
        if not vec1 or not vec2:
            return 0.0

        dot_product = sum(a * b for a, b in zip(vec1, vec2))
        magnitude1 = sum(a * a for a in vec1) ** 0.5
        magnitude2 = sum(b * b for b in vec2) ** 0.5

        if magnitude1 == 0 or magnitude2 == 0:
            return 0.0

        return dot_product / (magnitude1 * magnitude2)

    async def retrieve_for_generation(self, trend_title: str, limit: int = 3) -> str:
        """
        Retrieve relevant R&D documents for content generation (RAG).

        In MVP, returns mock context. In production, would query pgvector.
        """
        # Mock context for MVP
        return f"""
        Key Research Findings on {trend_title}:
        - Our latest R&D shows significant progress in this area
        - Dermatological studies confirm effectiveness
        - Consumer feedback is overwhelmingly positive
        - Product performance exceeds industry benchmarks
        """


retrieval_service = RetrievalService()
