import type { Trend } from "../types";

// Minimal contentService mock used by TrendContext while a real backend
// integration is not available. Returns a small set of sample trends.
export const contentService = {
  async getTrends(): Promise<Trend[]> {
    // Example static data — replace with a fetch to your API when ready.
    return [
      {
        id: "t1",
        name: "AI-generated video",
        description: "Short-form AI-generated video content is rising on platforms.",
        score: 92,
        velocity: "rising",
        detectedAt: new Date().toISOString(),
        relatedPosts: [],
        keywords: ["ai", "video", "shorts"],
        category: "technology",
      },
      {
        id: "t2",
        name: "Micro-learning",
        description: "Bite-sized educational content for busy learners.",
        score: 78,
        velocity: "hot",
        detectedAt: new Date().toISOString(),
        relatedPosts: [],
        keywords: ["learning", "education", "microlearning"],
        category: "education",
      },
    ];
  },
};
