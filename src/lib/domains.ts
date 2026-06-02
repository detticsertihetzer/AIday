// The fixed set of knowledge "domains" a teammate can file an item under.
// Single source of truth for both the Add picker and the browse filter.

export const DOMAINS = [
  "UX Research",
  "Visual Design",
  "Interaction",
  "Product",
  "Accessibility",
  "Design Systems",
  "Tools",
  "Inspiration",
] as const;

/** @public — shared type for typing domain values across both branches. */
export type Domain = (typeof DOMAINS)[number];
