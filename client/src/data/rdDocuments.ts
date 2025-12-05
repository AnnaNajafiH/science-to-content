import type{ RDDocument } from "../types/index";

// Mock R&D Documents
export const mockRDDocuments: RDDocument[] = [
  {
    id: "rd1",
    title: "Clinical Efficacy of Hyaluronic Acid in Dermal Hydration",
    summary:
      "12-week double-blind study demonstrating 89% improvement in skin hydration with topical hyaluronic acid application",
    keyFindings: [
      "Transepidermal water loss (TEWL) reduced by 34% after 4 weeks",
      "Skin capacitance measurements increased by 89% at week 12",
      "Consumer-perceived hydration improved in 94% of subjects",
      "No adverse reactions reported in 150-subject cohort",
    ],
    ingredients: ["Hyaluronic Acid", "Sodium Hyaluronate", "Glycerin"],
    studyType: "Clinical Trial",
    efficacy: "High",
    citations: [
      "J. Dermatol. Sci. 2024;45(2):123-134",
      "Int. J. Cosmet. Sci. 2024;46(3):289-301",
    ],
  },
  {
    id: "rd2",
    title: "Niacinamide Effects on Sebum Production and Pore Appearance",
    summary:
      "8-week study on 5% niacinamide showing significant reduction in sebum excretion and visual pore size",
    keyFindings: [
      "Sebum excretion rate decreased by 52% in treatment group",
      "Pore diameter reduced by 18% on average (optical profilometry)",
      "Skin texture smoothness improved by clinical grading",
      "Well-tolerated with no irritation in sensitive skin subset",
    ],
    ingredients: ["Niacinamide", "Vitamin B3"],
    studyType: "Controlled Study",
    efficacy: "High",
    citations: [
      "Br. J. Dermatol. 2024;190(4):567-578",
      "Skin Res. Technol. 2024;30(2):45-56",
    ],
  },
  {
    id: "rd3",
    title: "Occlusive Agents and Transepidermal Water Loss Prevention",
    summary:
      "Comparative study of occlusive ingredients demonstrating barrier repair mechanisms and moisture retention",
    keyFindings: [
      "Petrolatum-based occlusives reduced TEWL by 98% within 6 hours",
      "Barrier function restoration accelerated by 65% vs. control",
      "Lipid bilayer organization improved via confocal microscopy",
      "Optimal application timing: over humectants for synergistic effect",
    ],
    ingredients: ["Petrolatum", "Dimethicone", "Lanolin"],
    studyType: "Mechanistic Study",
    efficacy: "Very High",
    citations: ["J. Invest. Dermatol. 2024;144(5):1023-1035"],
  },
  {
    id: "rd4",
    title:
      "Bakuchiol as Retinol Alternative: Efficacy and Tolerability Profile",
    summary:
      "Head-to-head comparison of bakuchiol vs. retinol showing comparable anti-aging benefits with superior tolerability",
    keyFindings: [
      "Fine line reduction: 22% (bakuchiol) vs. 24% (retinol) at 12 weeks",
      "Hyperpigmentation improvement: comparable efficacy",
      "Erythema incidence: 6% (bakuchiol) vs. 43% (retinol)",
      "Patient preference: 78% favored bakuchiol for comfort",
    ],
    ingredients: ["Bakuchiol", "Retinol (comparison)"],
    studyType: "Comparative Clinical Trial",
    efficacy: "High",
    citations: ["Dermatol. Ther. 2024;37(3):e15234", "JAAD 2024;90(4):892-903"],
  },
];
