export interface Trend {
  id: string;
  name: string;
  description: string;
  score: number;
  velocity: "rising" | "hot" | "stable";
  detectedAt: string;
  relatedPosts: SocialPost[];
  keywords: string[];
  category: string;
}


export interface SocialPost {
  id: string;
  text: string;
  author: string;
  platform: "instagram" | "tiktok" | "twitter" | "reddit";
  timestamp: string;
  likes: number;
  comments: number;
  hashtags: string[];
}