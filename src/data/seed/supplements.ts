import type { SupplementSchedule } from "@/types/supplement";

export const SUPPLEMENT_SCHEDULE: SupplementSchedule = [
  // ═══════════════════════════════════════════════
  // MORNING — 5:25 AM
  // ═══════════════════════════════════════════════
  {
    time: "5:25 AM",
    label: "Morning",
    description:
      "Pre-workout drink + breakfast supplements. Front-loads the majority of daily nutrients to align with circadian biology.",
    blueprintProducts: [
      {
        id: "longevity-mix",
        name: "Blueprint Longevity Mix",
        servingSize: "1 scoop (14.8g) in water",
        servingsPerDay: 1,
        description:
          "Powder drink for muscle, cognition, and longevity pathways. Blood orange flavored.",
        ingredients: [
          { name: "Creatine Monohydrate", dosage: "2,500 mg", purpose: "Muscle strength, cognitive performance, ATP production" },
          { name: "CaAKG (Calcium Alpha-Ketoglutarate)", dosage: "2,000 mg", purpose: "TCA cycle support, biological age reduction" },
          { name: "Glucosamine Sulfate Potassium", dosage: "1,500 mg", purpose: "Joint cartilage health, anti-inflammatory" },
          { name: "Taurine", dosage: "1,500 mg", purpose: "Cell hydration, heart function, longevity" },
          { name: "Glycine", dosage: "1,200 mg", purpose: "Collagen synthesis, sleep quality, glutathione production" },
          { name: "L-Lysine", dosage: "1,000 mg", purpose: "Collagen formation, calcium absorption" },
          { name: "Ashwagandha Root Extract", dosage: "600 mg", purpose: "Adaptogenic stress relief, cortisol reduction" },
          { name: "Calcium (Citrate)", dosage: "350 mg", purpose: "Bone density maintenance" },
          { name: "Vitamin C (Ascorbic Acid)", dosage: "250 mg", purpose: "Immune function, collagen synthesis" },
          { name: "Reduced Glutathione", dosage: "250 mg", purpose: "Master antioxidant — detox, immune defense" },
          { name: "L-Theanine", dosage: "200 mg", purpose: "Calm focus, anxiety reduction" },
          { name: "Magnesium (Citrate)", dosage: "150 mg", purpose: "Muscle/nerve function, sleep, 300+ enzyme reactions" },
          { name: "Sodium Hyaluronate", dosage: "120 mg", purpose: "Skin hydration, joint lubrication" },
        ],
      },
      {
        id: "essential-capsules",
        name: "Blueprint Essential Capsules",
        servingSize: "2 veggie capsules",
        servingsPerDay: 1,
        description:
          "24 precision-dosed nutrients — the core multivitamin for energy, cognition, bone health, and cell defense.",
        ingredients: [
          { name: "Nicotinamide Riboside (NR)", dosage: "300 mg", purpose: "NAD+ booster — cellular energy & DNA repair" },
          { name: "Broccoli Seed Extract (Glucoraphanin 20mg)", dosage: "200 mg", purpose: "NRF2 activation — detox, anti-cancer pathways" },
          { name: "Fisetin (Smoketree Extract)", dosage: "100 mg", purpose: "Senolytic — clears senescent 'zombie' cells" },
          { name: "Luteolin (S. japonica)", dosage: "100 mg", purpose: "Anti-inflammatory, neuroprotective" },
          { name: "Vitamin E (d-alpha-Tocopherol)", dosage: "67 mg", purpose: "Antioxidant, cell membrane protection", dailyValuePercent: "447%" },
          { name: "Vitamin D3 (Cholecalciferol)", dosage: "50 mcg (2,000 IU)", purpose: "Bone health, immune function, mood", dailyValuePercent: "250%" },
          { name: "Ubiquinol (Reduced CoQ10)", dosage: "50 mg", purpose: "Mitochondrial energy, heart health" },
          { name: "Calcium (Carbonate/Phosphate)", dosage: "50 mg", purpose: "Bone density", dailyValuePercent: "4%" },
          { name: "Selenium (L-Selenomethionine)", dosage: "28 mcg", purpose: "Antioxidant enzyme cofactor", dailyValuePercent: "51%" },
          { name: "Spermidine (Trihydrochloride)", dosage: "20 mg", purpose: "Autophagy inducer — cellular recycling" },
          { name: "Niacin (Niacinamide)", dosage: "15 mg", purpose: "NAD+ precursor, metabolism", dailyValuePercent: "94%" },
          { name: "Zinc (Bisglycinate)", dosage: "15 mg", purpose: "Immune defense, wound healing", dailyValuePercent: "136%" },
          { name: "Boron (Glycinate)", dosage: "10 mg", purpose: "Bone metabolism, hormone balance" },
          { name: "Pantothenic Acid (B5)", dosage: "6 mg", purpose: "Hormone synthesis, energy", dailyValuePercent: "120%" },
          { name: "Lactobacillus acidophilus", dosage: "4 Billion CFU", purpose: "Gut microbiome balance" },
          { name: "Lithium (Orotate)", dosage: "3 mg", purpose: "Neuroprotection, mood stabilization" },
          { name: "Iodine (Potassium Iodide)", dosage: "200 mcg", purpose: "Thyroid function", dailyValuePercent: "133%" },
          { name: "Folate (L-5-MTHF)", dosage: "200 mcg DFE", purpose: "DNA synthesis, methylation", dailyValuePercent: "50%" },
          { name: "Vitamin B12 (Methylcobalamin)", dosage: "125 mcg", purpose: "Nerve health, red blood cells", dailyValuePercent: "5,208%" },
          { name: "Biotin", dosage: "50 mcg", purpose: "Hair, skin, nails, metabolism", dailyValuePercent: "167%" },
          { name: "Riboflavin (B2)", dosage: "1.4 mg", purpose: "Cellular energy production", dailyValuePercent: "108%" },
          { name: "Vitamin B6 (Pyridoxine)", dosage: "1.4 mg", purpose: "Neurotransmitter synthesis, mood", dailyValuePercent: "82%" },
          { name: "Thiamin (B1)", dosage: "1.1 mg", purpose: "Energy metabolism, nerve function", dailyValuePercent: "92%" },
          { name: "Manganese (Citrate)", dosage: "1 mg", purpose: "Bone formation, metabolism", dailyValuePercent: "43%" },
        ],
      },
      {
        id: "advanced-antioxidants",
        name: "Blueprint Advanced Antioxidants (Soft Gel)",
        servingSize: "1 capsule",
        servingsPerDay: 1,
        description:
          "7 fat-soluble nutrients for vision, bone health, and cellular defense.",
        ingredients: [
          { name: "Lutein (Marigold Extract)", dosage: "15 mg", purpose: "Macular/eye health, blue light protection" },
          { name: "Lycopene", dosage: "15 mg", purpose: "Prostate health, cardiovascular antioxidant" },
          { name: "Astaxanthin (H. pluvialis algae)", dosage: "12 mg", purpose: "'King of antioxidants' — 6,000x vitamin C potency" },
          { name: "Vitamin K2-MK4 (Menaquinone-4)", dosage: "5 mg", purpose: "Directs calcium to bones, not arteries" },
          { name: "Zeaxanthin (Marigold Extract)", dosage: "3 mg", purpose: "Retinal protection, visual acuity" },
          { name: "Vitamin K1 (Phytonadione)", dosage: "1.5 mg", purpose: "Blood clotting, calcium regulation" },
          { name: "Vitamin K2-MK7 (Menaquinone-7)", dosage: "0.6 mg", purpose: "Long-acting arterial calcification prevention" },
        ],
      },
      {
        id: "nac-ginger-curcumin",
        name: "Blueprint NAC + Ginger + Curcumin",
        servingSize: "3 capsules",
        servingsPerDay: 1,
        description:
          "Triple antioxidant stack for cellular detox and inflammation control.",
        ingredients: [
          { name: "N-Acetyl-L-Cysteine (NAC)", dosage: "1,200 mg", purpose: "Glutathione precursor — master antioxidant, liver detox" },
          { name: "Ginger Extract (high gingerol)", dosage: "400 mg", purpose: "Anti-inflammatory, digestion, nausea relief" },
          { name: "Curcuminoids (advanced form)", dosage: "220 mg", purpose: "Anti-inflammatory, joint health, cognitive protection" },
        ],
      },
      {
        id: "red-yeast-rice-garlic",
        name: "Blueprint Red Yeast Rice + Garlic",
        servingSize: "1 capsule",
        servingsPerDay: 1,
        description:
          "Cardiovascular lipid support — natural statin alternative.",
        ingredients: [
          { name: "Red Yeast Rice (2% Monacolin K)", dosage: "500 mg", purpose: "Natural statin — LDL cholesterol reduction" },
          { name: "Odorless Garlic Extract", dosage: "100 mg", purpose: "Blood pressure, arterial flexibility" },
        ],
      },
      {
        id: "collagen-am",
        name: "Blueprint Collagen Peptides",
        servingSize: "11g",
        servingsPerDay: 1,
        description: "First of two daily doses for connective tissue support.",
        ingredients: [
          { name: "Hydrolyzed Collagen Peptides", dosage: "11g", purpose: "Skin elasticity, joint health, hair/nail growth, gut lining" },
        ],
      },
    ],
    supplements: [
      { name: "Extra Virgin Olive Oil (Snake Oil)", dosage: "1 Tbsp (15 mL)", purpose: "Heart health, anti-inflammatory polyphenols", type: "supplement", brand: "Blueprint" },
      { name: "EPA/DHA/DPA (Omega-3)", dosage: "800 mg", purpose: "Brain health, anti-inflammatory, cardiovascular", type: "supplement", brand: "Vegetology" },
      { name: "Aged Garlic Extract", dosage: "1.2g", purpose: "Blood pressure regulation", type: "supplement", brand: "Kyolic" },
      { name: "ProButyrate", dosage: "600 mg", purpose: "GI health, gut microbiome support", type: "supplement", brand: "Tesseract" },
      { name: "Heme Iron Polypeptide", dosage: "10.5 mg", purpose: "Maintains healthy iron levels", type: "supplement", brand: "Proferrin" },
      { name: "Prebiotic Galactooligosaccharides", dosage: "1/2 tsp", purpose: "Gut microbiome health, immune support", type: "supplement", brand: "Klaire Labs" },
      { name: "Inulin", dosage: "1 tsp", purpose: "Prebiotic fiber for gut health", type: "supplement" },
      { name: "Arabinogalactan Powder", dosage: "1 tsp", purpose: "Immune modulation, gut lining support", type: "supplement" },
      { name: "Acarbose", dosage: "200 mg", purpose: "Slows carbohydrate absorption, blunts glucose spikes", type: "medication", frequency: "with meal" },
      { name: "Metformin", dosage: "500 mg", purpose: "Insulin sensitivity, glucose reduction, longevity marker", type: "medication", frequency: "1st of 2 daily doses" },
    ],
  },

  // ═══════════════════════════════════════════════
  // NOON — 11:00 AM (Final Meal)
  // ═══════════════════════════════════════════════
  {
    time: "11:00 AM",
    label: "Noon",
    description:
      "Taken with the final meal of the day. Doubles up on some morning supplements for sustained levels. Includes most prescription medications.",
    blueprintProducts: [
      {
        id: "collagen-pm",
        name: "Blueprint Collagen Peptides",
        servingSize: "11g",
        servingsPerDay: 1,
        description: "Second daily dose for continued collagen synthesis.",
        ingredients: [
          { name: "Hydrolyzed Collagen Peptides", dosage: "11g", purpose: "Skin elasticity, joint health, hair/nail growth, gut lining" },
        ],
      },
    ],
    supplements: [
      { name: "Extra Virgin Olive Oil (Snake Oil)", dosage: "1 Tbsp (15 mL)", purpose: "Polyphenol-rich anti-inflammatory fat", type: "supplement", brand: "Blueprint" },
      { name: "EPA/DHA/DPA (Omega-3)", dosage: "800 mg", purpose: "Sustained omega-3 levels (2nd dose)", type: "supplement", brand: "Vegetology" },
      { name: "Aged Garlic Extract", dosage: "1.2g", purpose: "Continued blood pressure support (2nd dose)", type: "supplement", brand: "Kyolic" },
      { name: "N-Acetyl-L-Cysteine (NAC)", dosage: "1,800 mg", purpose: "Glutathione precursor, cellular detox", type: "supplement" },
      { name: "Heme Iron Polypeptide", dosage: "10.5 mg", purpose: "Iron maintenance (2nd dose)", type: "supplement", brand: "Proferrin" },
      { name: "Acarbose", dosage: "400 mg", purpose: "Carb absorption control with final meal", type: "medication", frequency: "with meal" },
      { name: "Metformin", dosage: "500 mg", purpose: "Blood sugar regulation (2nd dose)", type: "medication", frequency: "2nd daily dose" },
      { name: "Levothyroxine", dosage: "100-112 mcg", purpose: "Thyroid hormone replacement", type: "medication" },
      { name: "Armour Thyroid", dosage: "60 mg", purpose: "Natural T3/T4 thyroid support", type: "medication" },
      { name: "Jardiance (Empagliflozin)", dosage: "10 mg", purpose: "Cardiovascular risk reduction, glucose excretion", type: "medication" },
      { name: "Candesartan", dosage: "8 mg", purpose: "Blood pressure management (ARB)", type: "medication" },
      { name: "Oral Minoxidil", dosage: "3.75 mg", purpose: "Hair regrowth", type: "medication" },
      { name: "Tadalafil", dosage: "2.5 mg", purpose: "Vascular health, blood flow", type: "medication" },
      { name: "Repatha (Evolocumab)", dosage: "140 mg", purpose: "LDL cholesterol reduction", type: "medication", frequency: "every 2 weeks" },
    ],
  },

  // ═══════════════════════════════════════════════
  // EVENING — Bedtime (~8:30 PM)
  // ═══════════════════════════════════════════════
  {
    time: "8:30 PM",
    label: "Evening",
    description:
      "Fasting window begins after noon meal. Evening focuses on topical protocols and sleep optimization — no oral supplements.",
    blueprintProducts: [],
    supplements: [
      { name: "Topical Hair Serum", dosage: "Applied topically", purpose: "Hair growth and maintenance protocol", type: "supplement" },
      { name: "Sleep Optimization", dosage: "Bed by 8:30 PM", purpose: "Recovery, HGH release, circadian alignment", type: "supplement" },
    ],
  },
];

/** Summary statistics for the protocol overview */
export const PROTOCOL_STATS = {
  totalDailyPills: "50+",
  blueprintStackCost: "$361/month",
  dailyCost: "~$12/day",
  eatingWindow: "5:30 AM - 11:00 AM",
  fastingHours: "18+",
  blueprintProducts: 7,
} as const;
