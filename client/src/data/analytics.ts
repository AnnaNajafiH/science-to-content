// Mock analytics data
export const stats = {
  trendsDetected: 47,
  contentGenerated: 124,
  contentApproved: 98,
  avgConfidence: 87,
  avgApprovalTime: "4.2 mins",
  reviewerEditRate: 23,
};

export const trendingTopics = [
  { name: "Glass Skin", posts: 12400, growth: "+245%" },
  { name: "Niacinamide", posts: 8900, growth: "+189%" },
  { name: "Slugging", posts: 6700, growth: "+156%" },
  { name: "Retinol Alternatives", posts: 5400, growth: "+143%" },
  { name: "Ceramides", posts: 4200, growth: "+98%" },
];

export const contentPerformance = [
  {
    type: "Instagram Carousel",
    generated: 45,
    approved: 38,
    avgConfidence: 88,
  },
  { type: "Reels", generated: 52, approved: 42, avgConfidence: 85 },
  { type: "Video Scripts", generated: 27, approved: 18, avgConfidence: 79 },
];

// Mock posted content history
export const postedHistory = [
  {
    id: "post1",
    date: "2025-11-20",
    platform: "Instagram",
    type: "Carousel",
    topic: "Glass Skin",
    slides: 5,
    likes: 2847,
    comments: 156,
    url: "https://instagram.com/p/example1",
  },
  {
    id: "post2",
    date: "2025-11-19",
    platform: "Instagram",
    type: "Reel",
    topic: "Niacinamide Benefits",
    slides: 1,
    likes: 4521,
    comments: 289,
    url: "https://instagram.com/p/example2",
  },
  {
    id: "post3",
    date: "2025-11-18",
    platform: "Instagram",
    type: "Carousel",
    topic: "Slugging Routine",
    slides: 4,
    likes: 1923,
    comments: 94,
    url: "https://instagram.com/p/example3",
  },
  {
    id: "post4",
    date: "2025-11-17",
    platform: "Instagram",
    type: "Carousel",
    topic: "Retinol Alternatives",
    slides: 5,
    likes: 3156,
    comments: 201,
    url: "https://instagram.com/p/example4",
  },
  {
    id: "post5",
    date: "2025-11-16",
    platform: "Instagram",
    type: "Carousel",
    topic: "Ceramides Explained",
    slides: 5,
    likes: 2634,
    comments: 142,
    url: "https://instagram.com/p/example5",
  },
];
