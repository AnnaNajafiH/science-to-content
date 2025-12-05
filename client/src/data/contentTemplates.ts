import type { GeneratedContent } from "../types/index";

type Template = {
  slides?: Array<{ number: number; text: string; visualHint: string }>;
  caption?: string;
  hashtags?: string[];
};

const contentTemplates: Record<string, Template> = {
  t1: {
    slides: [
      {
        number: 1,
        text: "Glass skin isn't magic—it's science ✨",
        visualHint: "Split-screen: glowing skin vs. microscopic view",
      },
      {
        number: 2,
        text: "Hyaluronic acid holds 1000x its weight in water 💧",
        visualHint: "Animated molecule with water droplets",
      },
      {
        number: 3,
        text: "Our study: 89% hydration boost in 12 weeks 📊",
        visualHint: "Clean bar chart showing results",
      },
      {
        number: 4,
        text: "TEWL reduced by 34% = moisture stays locked in 🔒",
        visualHint: "Before/after skin barrier illustration",
      },
      {
        number: 5,
        text: "Want that glow? Science has your back 🔬",
        visualHint: "Product shot with layering steps",
      },
    ],
    caption:
      "The real tea on glass skin ☕✨ It's not just hype—hyaluronic acid is backed by clinical trials. Swipe to see the science breakdown 🔬💙",
    hashtags: [
      "GlassSkin",
      "SkincareScience",
      "HyaluronicAcid",
      "BeiersdorfResearch",
      "Skincare",
    ],
  },
  t2: {
    slides: [
      {
        number: 1,
        text: "Why is niacinamide everywhere? Let's talk science 🧪",
        visualHint: "Bold typography on gradient background",
      },
      {
        number: 2,
        text: "Reduces sebum production by 52% in 8 weeks 📉",
        visualHint: "Simple infographic with percentage",
      },
      {
        number: 3,
        text: "Pore diameter: 18% smaller (yes, really!) 🔬",
        visualHint: "Close-up skin texture comparison",
      },
      {
        number: 4,
        text: "Texture improvement? Clinical studies say YES ✅",
        visualHint: "Smooth skin texture visual",
      },
    ],
    caption:
      "Niacinamide isn't a trend—it's proven science 💯 Our research shows real results: less oil, smaller-looking pores, smoother texture. That's the power of Vitamin B3 🔬✨",
    hashtags: [
      "Niacinamide",
      "PoreCare",
      "SkincareScience",
      "SkinTexture",
      "Beiersdorf",
    ],
  },
  t3: {
    slides: [
      {
        number: 1,
        text: "Slugging: weird name, solid science 🐌",
        visualHint: "Playful snail emoji on soft background",
      },
      {
        number: 2,
        text: "Occlusives block 98% of water loss 💧",
        visualHint: "Water droplet barrier visualization",
      },
      {
        number: 3,
        text: "Skin barrier heals 65% faster with occlusion 🛡️",
        visualHint: "Time-lapse healing graphic",
      },
      {
        number: 4,
        text: "Pro tip: Layer OVER your moisturizer 📝",
        visualHint: "Step-by-step product layering",
      },
    ],
    caption:
      "Slugging sounds weird but the science is SOLID 🐌🔬 Our studies prove occlusives lock in moisture and speed up barrier repair. Here's how it works 👇",
    hashtags: [
      "Slugging",
      "SkinBarrier",
      "Skincare101",
      "SkincareScience",
      "Beiersdorf",
    ],
  },
  t4: {
    slides: [
      {
        number: 1,
        text: "Retinol alternatives that actually work 🌿",
        visualHint: "Natural ingredients on clean background",
      },
      {
        number: 2,
        text: "Bakuchiol: 22% fine line reduction vs. 24% retinol 📊",
        visualHint: "Side-by-side comparison chart",
      },
      {
        number: 3,
        text: "The difference? 6% irritation vs. 43% with retinol 😌",
        visualHint: "Calm skin vs. irritated skin visual",
      },
      {
        number: 4,
        text: "Same anti-aging power, zero irritation ✨",
        visualHint: "Before/after aging signs",
      },
    ],
    caption:
      "Looking for gentle anti-aging? Science says bakuchiol delivers 💚 Our clinical trials show comparable results to retinol—with WAY less irritation. Your skin will thank you 🔬✨",
    hashtags: [
      "Bakuchiol",
      "RetinolAlternative",
      "GentleSkincare",
      "AntiAging",
      "Beiersdorf",
    ],
  },
};

export function createGeneratedContent(
  trendId: string,
  type: string
): GeneratedContent {
  const template = contentTemplates[trendId] || contentTemplates.t1;

  const content: GeneratedContent = {
    id: `gc${Date.now()}`,
    trendId,
    type: type as GeneratedContent['type'],
    status: "pending",
    confidence: 0.82 + Math.random() * 0.15,
    generatedAt: new Date().toISOString(),
    slides: type === "instagram-carousel" ? template.slides : undefined,
    caption: template.caption,
    hashtags: template.hashtags,
    script:
      type === "video-script"
        ? `Hook (0-3s): "${
            template.slides?.[0].text || ""
          }"\n\nBody (4-12s): "${template.slides?.[1].text || ""} ${
            template.slides?.[2].text || ""
          }"\n\nCTA (13-15s): "Trust the science. Try it yourself."`
        : undefined,
    visualSuggestions: [
      "Use gradient backgrounds (purple-to-blue) for science credibility",
      "Include animated elements to catch attention",
      "Keep text large and readable on mobile",
    ],
    rdReferences: ["rd1", "rd2"],
  };

  return content;
}
