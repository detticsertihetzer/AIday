// Fixed taxonomy for classifying knowledge items.
// Single source of truth for the Add dialog and browse filter pills.

export const TOPICS = [
  "UX Research",
  "Visual Design",
  "AI",
  "Product",
  "Accessibility",
  "Design Systems",
  "Tools",
  "Inspiration",
] as const;

export const INDUSTRIES = [
  "General",
  "Banking",
  "Finance",
  "Private Equity",
  "Retail",
  "Healthcare",
  "Telecom",
  "FMCG",
  "Automotive",
  "Public Sector",
] as const;

export type Topic = (typeof TOPICS)[number];
export type Industry = (typeof INDUSTRIES)[number];
