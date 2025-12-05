import type { GeneratedContent } from "../types/index";

// Mock Generated Content
export const mockGeneratedContent: GeneratedContent[] = [
  {
    id: "gc1",
    trendId: "t1",
    type: "instagram-carousel",
    status: "pending",
    confidence: 0.92,
    generatedAt: "2025-11-20T10:00:00Z",
    slides: [
      {
        number: 1,
        text: "Glass skin = science, not magic ✨",
        visualHint: "Split-screen: glowing skin vs. microscopic view",
      },
      {
        number: 2,
        text: "Hyaluronic acid holds 1000x its weight in water 💧",
        visualHint: "Animated molecule with water droplets",
      },
      {
        number: 3,
        text: "Clinical proof: 89% hydration boost in 12 weeks",
        visualHint: "Simple bar chart graphic",
      },
      {
        number: 4,
        text: "TEWL ⬇️ 34% = moisture stays locked in",
        visualHint: "Before/after skin barrier illustration",
      },
      {
        number: 5,
        text: "Want that glow? Layer + lock 🔬",
        visualHint: "Product layering steps visual",
      },
    ],
    caption:
      "The real tea on glass skin ☕✨ It's not just hype—hyaluronic acid is backed by science. Swipe for the breakdown 🔬💙",
    hashtags: [
      "GlassSkin",
      "SkincareScience",
      "HyaluronicAcid",
      "BeiersdorfResearch",
      "SkincareFacts",
    ],
    visualSuggestions: [
      "Use gradient blue-to-white backgrounds for science credibility",
      "Include micro-animations of water molecules for engagement",
    ],
    rdReferences: ["rd1"],
  },
  {
    id: "gc2",
    trendId: "t2",
    type: "reel",
    status: "approved",
    confidence: 0.88,
    generatedAt: "2025-11-20T11:15:00Z",
    caption:
      "Niacinamide isn't just a trend—it's science 🧪 Reduces sebum by 52% and visibly minimizes pores. The glow-up is real 💫",
    hashtags: [
      "Niacinamide",
      "PoreCare",
      "SkincareScience",
      "GlowUp",
      "SkinTexture",
    ],
    script:
      'Hook (0-3s): "Why does everyone love niacinamide?" [Close-up of smooth skin]\n\nBody (4-12s): "Science says: it cuts sebum by 52% and shrinks pores by 18%. Not magic—just Vitamin B3 doing its thing." [Quick cuts with graphics]\n\nCTA (13-15s): "Try it. Trust the science." [Product reveal]',
    visualSuggestions: [
      "Fast-paced editing with text overlays",
      "Before/after split-screen at 8-second mark",
      "Upbeat trending audio",
    ],
    rdReferences: ["rd2"],
    editedBy: "reviewer@beiersdorf.com",
    approvedAt: "2025-11-20T12:00:00Z",
  },
  {
    id: "gc3",
    trendId: "t3",
    type: "instagram-carousel",
    status: "pending",
    confidence: 0.85,
    generatedAt: "2025-11-20T11:30:00Z",
    slides: [
      {
        number: 1,
        text: "Slugging: weird name, real science 🐌",
        visualHint: "Playful snail illustration",
      },
      {
        number: 2,
        text: "Occlusives seal in moisture—98% less water loss",
        visualHint: "Barrier lock visualization",
      },
      {
        number: 3,
        text: "Studies show: barrier heals 65% faster",
        visualHint: "Time-lapse healing graphic",
      },
      {
        number: 4,
        text: "Pro tip: slug OVER your moisturizer",
        visualHint: "Layering steps illustration",
      },
    ],
    caption:
      "Slugging sounds weird but the science is solid 🔬🐌 Lock in that moisture and let your barrier heal. Here's how it works 👇",
    hashtags: [
      "Slugging",
      "SkinBarrier",
      "Skincare101",
      "SkincareScience",
      "MoistureBarrier",
    ],
    visualSuggestions: [
      "Use soft, nighttime aesthetic (dark blue/purple tones)",
      "Show product texture close-ups",
    ],
    rdReferences: ["rd3"],
  },
  {
    id: "gc4",
    trendId: "t1",
    type: "instagram-carousel",
    status: "rejected",
    confidence: 0.68,
    generatedAt: "2025-11-19T14:20:00Z",
    slides: [
      {
        number: 1,
        text: "🚨 This serum will SHOCK you!",
        visualHint: "Clickbait-style text with emoji overload",
      },
      {
        number: 2,
        text: "Removes wrinkles INSTANTLY! 100% guaranteed!",
        visualHint: "Exaggerated before/after comparison",
      },
      {
        number: 3,
        text: "Doctors HATE this one simple trick!!!",
        visualHint: "Dramatic text with multiple exclamation marks",
      },
    ],
    caption:
      "OMG you won't believe what this does to your skin!!! 😱😱😱 Click link in bio NOW!!!",
    hashtags: [
      "MiracleCure",
      "InstantResults",
      "AntiAgingSecret",
      "SkincareHack",
    ],
    visualSuggestions: [
      "Use bright red and yellow colors for urgency",
      "Add flashing elements and countdown timers",
    ],
    rdReferences: ["rd1"],
    reviewerNotes:
      "REJECTED: Content uses misleading claims and sensationalist language not supported by clinical data. Violates brand guidelines for scientific accuracy and trustworthiness. Claims like 'instant results' and '100% guaranteed' are unsubstantiated and could mislead consumers. Tone does not align with Beiersdorf's professional, evidence-based approach.",
    editedBy: "reviewer@beiersdorf.com",
  },
  {
    id: "gc5",
    trendId: "t2",
    type: "reel",
    status: "rejected",
    confidence: 0.71,
    generatedAt: "2025-11-18T16:45:00Z",
    caption:
      "This ingredient is literally MAGIC ✨🪄 No science needed, just trust us! #SkincareWizardry",
    hashtags: ["Magic", "NoScience", "JustBelieve", "Miracle"],
    script:
      'Hook (0-3s): "Forget science, this is pure magic!" [Mystical sparkles]\n\nBody (4-12s): "Who needs studies when you have results like these?" [Vague claims without data]\n\nCTA (13-15s): "Buy now before it disappears!" [Urgency without substance]',
    visualSuggestions: [
      "Add magical effects and sparkles throughout",
      "Use mystical music and fantasy elements",
      "Avoid showing any scientific references",
    ],
    rdReferences: [],
    reviewerNotes:
      "REJECTED: Content completely contradicts our science-first brand positioning. Uses 'magic' framing that undermines credibility. No R&D references provided. Creates false urgency. This approach is antithetical to Beiersdorf's commitment to transparent, evidence-based skincare education.",
    editedBy: "senior.reviewer@beiersdorf.com",
  },
];
