import type { Trend } from "../types";
import { mockSocialPosts } from "./socialPost";

// Mock Trends
export const mockTrends: Trend[] = [
  {
    id: "t5",
    name: "Daily SPF Protection",
    description:
      "Year-round sunscreen movement emphasizing UV protection as essential daily skincare, not just summer routine",
    score: 96,
    velocity: "hot",
    detectedAt: "2025-11-21T12:00:00Z",
    relatedPosts: [mockSocialPosts[4]],
    keywords: [
      "SPF daily",
      "sunscreen",
      "GenZ",
      "UV protection",
      "skin protection",
      "photoaging",
    ],
    category: "Sun Protection",
  },
  {
    id: "t1",
    name: "Glass Skin Hydration",
    description:
      "Gen Z obsession with dewy, translucent skin achieved through hyaluronic acid and layering techniques",
    score: 94,
    velocity: "hot",
    detectedAt: "2025-11-20T09:00:00Z",
    relatedPosts: [mockSocialPosts[0]],
    keywords: [
      "glass skin",
      "hyaluronic acid",
      "hydration",
      "dewy",
      "translucent",
    ],
    category: "Hydration",
  },
  {
    id: "t2",
    name: "Niacinamide Pore Minimizing",
    description:
      "Rising interest in niacinamide for pore appearance and skin texture improvement",
    score: 87,
    velocity: "rising",
    detectedAt: "2025-11-20T10:30:00Z",
    relatedPosts: [mockSocialPosts[1]],
    keywords: ["niacinamide", "pores", "texture", "vitamin b3"],
    category: "Treatment",
  },
  {
    id: "t4",
    name: "Gentle Retinol Alternatives",
    description:
      "Search for effective anti-aging ingredients with less irritation than traditional retinol",
    score: 82,
    velocity: "rising",
    detectedAt: "2025-11-20T09:15:00Z",
    relatedPosts: [mockSocialPosts[3]],
    keywords: ["retinol alternatives", "bakuchiol", "anti-aging", "gentle"],
    category: "Anti-Aging",
  },
  {
    id: "t3",
    name: "Slugging for Barrier",
    description:
      "Occlusive skincare method using petroleum jelly to lock in moisture and repair skin barrier",
    score: 78,
    velocity: "stable",
    detectedAt: "2025-11-19T22:00:00Z",
    relatedPosts: [mockSocialPosts[2]],
    keywords: ["slugging", "skin barrier", "occlusive", "moisture"],
    category: "Barrier Repair",
  },
];
