import prisma from "@/lib/prisma/prisma";

type SeedItem = {
  title: string;
  summary: string;
  content?: string;
  type: "note" | "link";
  url?: string;
  domain: string;
  author: string;
  tags: string[];
};

const ITEMS: SeedItem[] = [
  {
    title: "10 Usability Heuristics for User Interface Design",
    summary:
      "Jakob Nielsen's ten general principles for interaction design — still the most-cited checklist for spotting UX problems in a quick heuristic review.",
    type: "link",
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    domain: "UX Research",
    author: "Zandra",
    tags: ["heuristics", "usability", "fundamentals"],
  },
  {
    title: "The Definition of User Experience (UX)",
    summary:
      "Clear, short framing of what UX actually covers — useful when aligning stakeholders who conflate UX with UI.",
    type: "link",
    url: "https://www.nngroup.com/articles/definition-user-experience/",
    domain: "UX Research",
    author: "Liam",
    tags: ["ux", "fundamentals"],
  },
  {
    title: "Laws of UX",
    summary:
      "A visual collection of psychology principles (Hick's Law, Fitts's Law, etc.) designers can use to justify decisions with research.",
    type: "link",
    url: "https://lawsofux.com/",
    domain: "UX Research",
    author: "Priya",
    tags: ["psychology", "principles"],
  },
  {
    title: "UX Writing Study Guide",
    summary:
      "A curated path through NN/g's content-design research — microcopy, voice & tone, and writing for interfaces.",
    type: "link",
    url: "https://www.nngroup.com/articles/ux-writing-study-guide/",
    domain: "Product",
    author: "Sofia",
    tags: ["ux-writing", "content", "microcopy"],
  },
  {
    title: "Refactoring UI",
    summary:
      "Practical, opinionated tactics for making interfaces look designed — spacing, hierarchy, color, and typography rules you can apply immediately.",
    type: "link",
    url: "https://www.refactoringui.com/",
    domain: "Visual Design",
    author: "Mara",
    tags: ["ui", "typography", "spacing"],
  },
  {
    title: "Color Theory for Designers: The Meaning of Color",
    summary:
      "Foundational guide to how colors are perceived and what they communicate — a good primer before building a palette.",
    type: "link",
    url: "https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/",
    domain: "Visual Design",
    author: "Tom",
    tags: ["color", "theory"],
  },
  {
    title: "Designing Better Error Messages",
    summary:
      "How to write and place error messages so users recover quickly — patterns, anti-patterns, and inline validation guidance.",
    type: "link",
    url: "https://www.smashingmagazine.com/2022/08/error-messages-ux-design/",
    domain: "Interaction",
    author: "Zandra",
    tags: ["forms", "errors", "microcopy"],
  },
  {
    title: "Material Design 3",
    summary:
      "Google's current design system spec — tokens, components, and adaptive layout guidance. Good reference for Android-facing work.",
    type: "link",
    url: "https://m3.material.io/",
    domain: "Design Systems",
    author: "Liam",
    tags: ["design-system", "google", "components"],
  },
  {
    title: "Apple Human Interface Guidelines",
    summary:
      "Apple's platform design guidance — the canonical reference for iOS/macOS patterns, gestures, and platform conventions.",
    type: "link",
    url: "https://developer.apple.com/design/human-interface-guidelines",
    domain: "Design Systems",
    author: "Priya",
    tags: ["ios", "guidelines"],
  },
  {
    title: "Atomic Design",
    summary:
      "Brad Frost's methodology for building design systems from atoms → molecules → organisms. The mental model behind most component libraries.",
    type: "link",
    url: "https://atomicdesign.bradfrost.com/",
    domain: "Design Systems",
    author: "Mara",
    tags: ["components", "methodology"],
  },
  {
    title: "WCAG 2.1 Quick Reference",
    summary:
      "Filterable list of accessibility success criteria with techniques. The go-to when you need to check a specific requirement.",
    type: "link",
    url: "https://www.w3.org/WAI/WCAG21/quickref/",
    domain: "Accessibility",
    author: "Sofia",
    tags: ["a11y", "wcag", "standards"],
  },
  {
    title: "Accessibility Annotations for Design Handoff",
    summary:
      "How to annotate designs for a11y (focus order, alt text, roles) so engineering builds it correctly the first time.",
    type: "link",
    url: "https://www.smashingmagazine.com/2021/07/accessibility-annotations-design-handoff/",
    domain: "Accessibility",
    author: "Tom",
    tags: ["a11y", "handoff"],
  },
  {
    title: "Figma Best Practices",
    summary:
      "Figma's own guidance on file structure, components, and collaboration — handy for keeping shared files from becoming chaos.",
    type: "link",
    url: "https://www.figma.com/best-practices/",
    domain: "Tools",
    author: "Zandra",
    tags: ["figma", "workflow"],
  },
  {
    title: "Awwwards — Web Design Inspiration",
    summary:
      "Daily showcase of award-winning sites. Good for a quick hit of interaction and visual inspiration before a kickoff.",
    type: "link",
    url: "https://www.awwwards.com/",
    domain: "Inspiration",
    author: "Liam",
    tags: ["inspiration", "web", "motion"],
  },
  {
    title: "Usability test recruiting checklist (internal)",
    summary:
      "Our team's checklist for screening and scheduling participants — screener questions, incentive amounts, and the consent template link.",
    content:
      "Steps: 1) Define 3–5 screener questions tied to the research goal. 2) Aim for 5 participants per round. 3) Use the shared consent form in Drive. 4) Schedule 45-min slots with a 15-min buffer. 5) Log no-shows so we can over-recruit next time.",
    type: "note",
    domain: "UX Research",
    author: "Priya",
    tags: ["research-ops", "testing"],
  },
  {
    title: "Figma layer naming convention (internal)",
    summary:
      "How we name layers and components so handoff stays clean: PascalCase for components, kebab-case for instances, no 'Frame 427'.",
    content:
      "Components: PascalCase (e.g. ButtonPrimary). Instances inherit but can be suffixed with state (ButtonPrimary/hover). Never ship 'Frame 427' or 'Group 12' — rename before handoff. Use slashes to build the component navigator tree.",
    type: "note",
    domain: "Design Systems",
    author: "Mara",
    tags: ["figma", "naming", "handoff"],
  },
];

async function main() {
  // Idempotent: wipe and reseed so re-running gives a clean, known dataset.
  await prisma.itemTag.deleteMany();
  await prisma.item.deleteMany();
  await prisma.tag.deleteMany();

  let index = 0;
  for (const item of ITEMS) {
    const tagRecords = await Promise.all(
      item.tags.map((name) =>
        prisma.tag.upsert({ where: { name }, create: { name }, update: {} })
      )
    );

    await prisma.item.create({
      data: {
        title: item.title,
        summary: item.summary,
        content: item.content ?? null,
        type: item.type,
        url: item.url ?? null,
        domain: item.domain,
        author: item.author,
        // Spread createdAt over recent days so ordering looks natural.
        createdAt: new Date(Date.now() - index * 1000 * 60 * 60 * 18),
        tags: { create: tagRecords.map((tag) => ({ tagId: tag.id })) },
      },
    });
    index += 1;
  }

  console.log(`Seeded ${ITEMS.length} knowledge items.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
