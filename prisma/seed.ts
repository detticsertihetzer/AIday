import prisma from "@/lib/prisma/prisma";

type SeedItem = {
  title: string;
  summary: string;
  content?: string;
  type: "note" | "link";
  url?: string;
  topic: string;
  industry: string;
  author: string;
  tags: string[];
};

const ITEMS: SeedItem[] = [
  // ── UX Research ─────────────────────────────────────────────────────────────
  {
    title: "Which Nielsen heuristics to cite in a design crit",
    summary:
      "Most violations in our crits fall under #1 (Visibility), #3 (Control), or #5 (Error Prevention). Knowing which heuristic you're arguing wins the discussion faster than appealing to taste.",
    content:
      "Heuristic 1 (Visibility of system status): any time the user can't tell what's happening — spinners, empty states, progress bars. #3 (User control & freedom): undo, cancel, back, escape hatches. #5 (Error prevention): invoke this when the design lets users make a hard-to-recover mistake, not just any bug. Heuristics 2, 4, 6–10 exist but rarely survive a 30-min crit — save them for formal audits.",
    type: "note",
    topic: "UX Research",
    industry: "General",
    author: "Zandra",
    tags: ["heuristics", "critique", "fundamentals"],
  },
  {
    title: "3 psychology laws we actually use in critiques",
    summary:
      "Fitts's Law, Miller's Law, and Von Restorff are the ones that come up in our sessions. Hick's Law gets over-cited — it applies to decision time, not just option count.",
    content:
      "Fitts's Law: touch targets ≥ 44×44 px, especially at screen edges where the thumb lands. Miller's Law: chunk menus into groups of 5–9 — the magic number is a myth, but grouping beats a flat list every time. Von Restorff: one visually distinct element gets remembered; two 'distinct' elements cancel each other out. When Hick's Law actually applies: a well-categorized 50-item list can be faster than an unlabeled 7-item one — the law is about cognitive load per item, not total count.",
    type: "note",
    topic: "UX Research",
    industry: "General",
    author: "Priya",
    tags: ["psychology", "principles", "critique"],
  },
  {
    title: "Usability test recruiting checklist (internal)",
    summary:
      "Our team's checklist for screening and scheduling participants — screener questions, incentive amounts, and the consent template link.",
    content:
      "Steps: 1) Define 3–5 screener questions tied to the research goal. 2) Aim for 5 participants per round — the 5th session rarely surfaces new themes. 3) Use the shared consent form in Drive. 4) Schedule 45-min slots with a 15-min buffer. 5) Log no-shows so we can over-recruit next time. Incentive rule of thumb: 1 hr of a professional's time = €60–80.",
    type: "note",
    topic: "UX Research",
    industry: "Private Equity",
    author: "Priya",
    tags: ["research-ops", "testing", "checklist"],
  },

  // ── Product / Content ────────────────────────────────────────────────────────
  {
    title: "Error messages that actually help: the 3-part formula",
    summary:
      "Error messages should say what happened, why, and what to do next — in that order. Most of ours fail at step 3 (the only part the user actually needs).",
    content:
      "Formula: 'We couldn't [do the thing] because [reason]. [Action to take].' Bad: 'An error occurred.' Better: 'We couldn't save your changes because the file is too large. Remove images over 5 MB and try again.' Key rule: never blame the user. 'You entered an invalid email' → 'This doesn't look like a valid email address.' Use sentence case, not SHOUTING CAPS. If there's no clear recovery action, at least give a support path.",
    type: "note",
    topic: "Product",
    industry: "Banking",
    author: "Sofia",
    tags: ["ux-writing", "errors", "microcopy"],
  },
  {
    title: "UX Writing Study Guide (NN/g)",
    summary:
      "NN/g's curated path through content design research. Best used as a reference when a stakeholder pushes back on a copy decision — it has the citations.",
    type: "link",
    url: "https://www.nngroup.com/articles/ux-writing-study-guide/",
    topic: "Product",
    industry: "Retail",
    author: "Sofia",
    tags: ["ux-writing", "content", "microcopy"],
  },

  // ── Visual Design ─────────────────────────────────────────────────────────────
  {
    title: "Spacing system that actually holds in production",
    summary:
      "We use a 4 px base unit. Component-level: 4, 8, 12, 16, 24. Layout-level: 32, 48, 64, 96. Any value outside this grid should feel wrong and prompt a conversation.",
    content:
      "Rule of thumb: if you're reaching for 6 px or 10 px, you're compensating for a wrong component size, not refining spacing. In Figma, set your nudge to 8 px (Preferences → Nudge). For text: body (14–16 px) → 16–24 px line height. Label text (11–12 px) → 16 px line height is fine because it's always short. Biggest trap: using tight spacing to make a component look 'more compact' instead of reducing the visual weight of the component itself.",
    type: "note",
    topic: "Visual Design",
    industry: "Finance",
    author: "Mara",
    tags: ["spacing", "grid", "typography"],
  },
  {
    title: "Color contrast cheat sheet for fast checks",
    summary:
      "AA requires 4.5:1 for body text, 3:1 for large text (≥18 px or 14 px bold), 3:1 for UI components. AAA is 7:1 for body — aim for it in healthcare and public sector.",
    content:
      "Quick mental model: white on our brand blue (#2563EB) barely passes AA for large text. For body text, use white on a shade two stops darker. Tool: Figma's built-in contrast checker (select text layer → Inspect panel) or the Colour Contrast Analyser desktop app for checking screenshots. Never rely solely on hue to convey meaning — any meaning that colour carries must also be present in shape, label, or texture.",
    type: "note",
    topic: "Visual Design",
    industry: "Healthcare",
    author: "Tom",
    tags: ["color", "a11y", "contrast"],
  },

  // ── Interaction ───────────────────────────────────────────────────────────────
  {
    title: "Micro-interaction anatomy: trigger → rules → feedback → loops",
    summary:
      "Dan Saffer's four-part model from Microinteractions (2013) is still the clearest framework for writing interaction specs that engineers can actually implement.",
    content:
      "Trigger: what kicks it off (user action or system event). Rules: what happens, what can't happen simultaneously. Feedback: what the user sees/hears/feels. Loop/Mode: does behaviour change over time or in specific contexts? Use this when writing specs. Instead of 'button changes colour on hover', write: Trigger: pointer enters button. Feedback: bg transitions from slate-700 → slate-500 over 150 ms ease-out. No loop. This gives eng exactly what to build.",
    type: "note",
    topic: "Interaction",
    industry: "General",
    author: "Tom",
    tags: ["microinteractions", "animation", "spec"],
  },
  {
    title: "Designing better error messages (Smashing Magazine)",
    summary:
      "Comprehensive patterns for error placement, recovery actions, and validation timing. Pairs well with our internal 3-part formula note.",
    type: "link",
    url: "https://www.smashingmagazine.com/2022/08/error-messages-ux-design/",
    topic: "Interaction",
    industry: "Banking",
    author: "Zandra",
    tags: ["forms", "errors", "validation"],
  },

  // ── Design Systems ────────────────────────────────────────────────────────────
  {
    title: "Figma layer naming convention (internal)",
    summary:
      "How we name layers and components so handoff stays clean. PascalCase for components, kebab-case for instances, zero tolerance for 'Frame 427'.",
    content:
      "Components: PascalCase (e.g. ButtonPrimary). Instance overrides can suffix state with a slash (ButtonPrimary/hover). Never ship 'Frame 427' or 'Group 12' — rename before handoff. Use slashes to build the component navigator tree (Navigation/Top, Navigation/Side). Naming rule for auto-layout frames: describe what they contain, not their structure ('CardFooter', not 'HStack 3').",
    type: "note",
    topic: "Design Systems",
    industry: "Automotive",
    author: "Mara",
    tags: ["figma", "naming", "handoff"],
  },
  {
    title: "Atomic Design — the mental model, not the rulebook",
    summary:
      "Brad Frost's atoms→molecules→organisms hierarchy is most useful as a shared vocabulary for critique, not a rigid build order. In our system: molecule ≈ 'field + label + error', organism ≈ 'form section'.",
    content:
      "Practical mapping: Atoms = design tokens + unstyled HTML elements (input, button, icon). Molecules = atoms combined into something self-contained (FormField = label + input + hint + error). Organisms = molecules that deliver a slice of UX (login form, nav bar). Templates/Pages are for documentation only — don't try to map Figma pages to these. The metaphor breaks down at scale; use it to start conversations about naming and ownership, not to end them.",
    type: "note",
    topic: "Design Systems",
    industry: "General",
    author: "Liam",
    tags: ["components", "methodology", "vocabulary"],
  },
  {
    title: "Material Design 3",
    summary:
      "Google's current design system spec — tokens, components, adaptive layout. Useful reference for Android-facing work or when clients expect Google-native conventions.",
    type: "link",
    url: "https://m3.material.io/",
    topic: "Design Systems",
    industry: "Telecom",
    author: "Liam",
    tags: ["design-system", "google", "components"],
  },

  // ── Accessibility ─────────────────────────────────────────────────────────────
  {
    title: "A11y handoff checklist — what to annotate on every screen",
    summary:
      "Before every dev handoff: focus order, alt text, form labels, contrast ratios, and custom ARIA roles. Takes ~15 min per screen and prevents a full sprint of back-and-forth.",
    content:
      "Per-screen checklist: 1) Number all interactive elements in focus order. 2) Write alt text for every image (decorative = empty string ''). 3) Confirm all form inputs have a visible label — not just placeholder text. 4) Spot-check contrast: 4.5:1 for body, 3:1 for large text (≥18 px or 14 px bold). 5) Mark custom interactive elements with their ARIA role (role='dialog', role='tablist', etc.). Tool: use the A11y Annotation Kit from the Figma community — it lives in our team library.",
    type: "note",
    topic: "Accessibility",
    industry: "Healthcare",
    author: "Sofia",
    tags: ["a11y", "handoff", "checklist"],
  },
  {
    title: "WCAG 2.1 Quick Reference",
    summary:
      "Filterable list of all accessibility success criteria with implementation techniques. Use it to look up a specific requirement, not as a reading list.",
    type: "link",
    url: "https://www.w3.org/WAI/WCAG21/quickref/",
    topic: "Accessibility",
    industry: "Public Sector",
    author: "Sofia",
    tags: ["a11y", "wcag", "standards"],
  },

  // ── Tools ─────────────────────────────────────────────────────────────────────
  {
    title: "Figma best practices — the three we actually enforce",
    summary:
      "We don't enforce all of Figma's guidance, but these three cause real pain when ignored: auto-layout on everything, component descriptions filled in, no detached instances in production files.",
    content:
      "1) Auto-layout on every frame, even static ones — makes responsive exploration faster and kills manual resize debt. 2) Fill the description field for every published component: what it's for, what variants exist, what it replaces. 3) Detached instances in production files mean design system updates won't propagate. Rule: if you need to override more than 2 properties on an instance, ask whether you need a new variant instead.",
    type: "note",
    topic: "Tools",
    industry: "General",
    author: "Zandra",
    tags: ["figma", "workflow", "design-system"],
  },
  {
    title: "Awwwards — Web Design Inspiration",
    summary:
      "Daily showcase of award-winning sites. Useful for a quick hit of interaction and visual inspiration before a kickoff — filter by industry to avoid generic portfolio aesthetics.",
    type: "link",
    url: "https://www.awwwards.com/",
    topic: "Tools",
    industry: "Private Equity",
    author: "Liam",
    tags: ["inspiration", "web", "motion"],
  },

  // ── AI Design ────────────────────────────────────────────────────────────────
  {
    title: "AI loading states: streaming vs. skeleton vs. spinner",
    summary:
      "AI responses arrive incrementally, not all-at-once. A standard spinner implies 'waiting for a complete result' — it sets the wrong expectation and makes 3-second waits feel like crashes.",
    content:
      "Three patterns in order of effort:\n\n1) Streaming text — render tokens as they arrive. Works for chat-like UI; sets an accurate 'thinking' expectation immediately.\n\n2) Staged skeleton — show a 3-phase skeleton (query received → processing → rendering) with a brief label at each stage. Good for dashboard cards or document previews.\n\n3) Confidence shimmer — tint the skeleton amber while the model is uncertain, transition to neutral on completion. Signals quality as well as progress.\n\nAnti-pattern: full-screen spinner with no progress update. Users assume it crashed after ~3 s. Always show that something is happening, even if you can't show how far along.",
    type: "note",
    topic: "AI Design",
    industry: "General",
    author: "Zandra",
    tags: ["ai-ux", "loading", "streaming"],
  },
  {
    title: "AI failure modes — and the UX each one needs",
    summary:
      "AI failures aren't binary like form validation. They live on a spectrum from 'confident but wrong' to 'refused entirely'. Each failure type needs a different recovery UX.",
    content:
      "Four failure types:\n\n1) Hallucination (confident + wrong) — surface citation links; let users flag issues; never hide that it's AI-generated.\n\n2) Over-refusal (refused a reasonable request) — show a 'try rephrasing' affordance with example prompts.\n\n3) Timeout or rate limit — treat like a network error: retry button + estimated wait time.\n\n4) Degraded quality (vague or incomplete) — offer 'Get more detail' or 'Try again' as explicit actions.\n\nRule: never use a generic error toast for AI failures. Each type has a different cause and a different path forward. Generic toasts train users to think AI is broken, not that there's a specific recoverable condition.",
    type: "note",
    topic: "AI Design",
    industry: "General",
    author: "Priya",
    tags: ["ai-ux", "errors", "patterns"],
  },
  {
    title: "Prompt templates for design research synthesis",
    summary:
      "These prompts reliably produce usable output when you paste raw research notes into Claude. Saves ~2 hours per usability round translating observations into themes.",
    content:
      "Affinity grouping:\n\"Here are [N] raw observations from usability sessions. Group them by theme, name each theme in 5 words or fewer, and list the 2–3 most representative quotes per theme.\"\n\nPriority matrix:\n\"Here are [N] design problems. Score each 1–5 on: user impact (how many users affected), severity (how much it blocks the task), and effort to fix (1 = quick, 5 = major). Output a table.\"\n\nPersona draft:\n\"Based on these interview notes, draft a lightweight persona: name, role, main goal, top 3 frustrations, and one direct quote that captures their mindset.\"\n\nTip: always paste in 5–10 raw quotes alongside the summary — the model grounds its themes in real language rather than abstraction.",
    type: "note",
    topic: "AI Design",
    industry: "General",
    author: "Mara",
    tags: ["ai-tools", "prompts", "research"],
  },
  {
    title: "Figma AI: what's actually useful vs. what's hype",
    summary:
      "After 3 months of daily use: Rename Layers and First Draft are genuinely time-saving. AI prototype generation and text generation are novelties — heavy editing required and they mislead stakeholders about fidelity.",
    content:
      "Worth using now:\n— Rename Layers: select messy frames → right-click → Rename layers → describe the pattern. Cuts naming cleanup from 20 min to 2 min.\n— First Draft: good for scaffolding a layout when you're stuck on a blank canvas. Treat the output as a wireframe, not a design.\n— FigJam AI 'Rewrite' and 'Make shorter': the best ROI for workshop prep and sticky note cleanup.\n\nSkip for now:\n— AI-generated copy in designs: clients read it as final and react to the wrong thing.\n— AI prototype generation: produces clickable frames but misses all the edge states that matter in handoff.\n— Auto-complete suggestions mid-design: adds noise faster than it adds value at our file complexity.",
    type: "note",
    topic: "AI Design",
    industry: "General",
    author: "Tom",
    tags: ["figma", "ai-tools", "workflow"],
  },
  {
    title: "When to show AI confidence vs. just the answer",
    summary:
      "Showing confidence scores confuses most users and shifts accountability onto them. Reserve explicit uncertainty UI for domains where being wrong has real stakes.",
    content:
      "Decision tree:\n\nIs wrong output harmful? → Yes: show uncertainty + source + 'verify before acting'.\nIs the user making a high-stakes decision? → Yes: same treatment.\nIs the user an expert who can judge quality themselves? → Surface confidence.\nConsumer context, low-stakes? → Show the answer with a subtle 'AI-generated' label only.\n\nPractical note: if you can't quantify the model's confidence reliably, don't show a fake confidence bar. Better to say 'Based on 3 sources' than '87% confident' — the former is verifiable, the latter is noise.",
    type: "note",
    topic: "AI Design",
    industry: "Healthcare",
    author: "Liam",
    tags: ["ai-ux", "trust", "transparency"],
  },
  {
    title: "Our 2025 AI design workflow stack",
    summary:
      "The tools that have stuck in weekly practice: Claude for synthesis and spec writing, Midjourney for mood boards, Perplexity for competitive research, Figma AI for layer cleanup.",
    content:
      "Role-by-role usage:\n\nResearch: Paste raw notes into Claude with the affinity grouping prompt (see separate note). Export themes directly into Dovetail.\n\nVisual exploration: Midjourney for initial mood board directions (3–4 style directions). Prompt template: '[style adjective], [industry], [vibe], [reference artist], editorial photo, no text'.\n\nSpec writing: Claude to draft component descriptions and interaction state docs from a screenshot + Figma specs. Saves ~30 min per component.\n\nCompetitive research: Perplexity for recent case studies. Always check the result date — AI search results go stale fast.\n\nHard limits — never use AI to:\n— Write final UI copy in production\n— Make accessibility decisions\n— Substitute for a real usability test",
    type: "note",
    topic: "AI Design",
    industry: "General",
    author: "Zandra",
    tags: ["ai-tools", "workflow", "stack"],
  },
  {
    title: "Human-AI handoff: designing the override moment",
    summary:
      "Every AI feature needs an explicit 'I'll take it from here' moment — a visible point where the user can correct, discard, or accept. Without it, AI output feels imposed, not offered.",
    content:
      "Three override patterns:\n\n1) Inline edit: AI pre-fills a field; user edits before submitting. Low friction, suits most cases. Risk: users accept without reading.\n\n2) Accept / Regenerate / Edit: explicit three-way choice. Higher friction, builds trust. Best for content with high downstream impact (emails, reports).\n\n3) Diff view: show what the AI changed vs. the previous state, like a code diff. Best for editing existing content, not generating new.\n\nThe override moment also defines accountability. If the user can't visibly confirm AI output before it acts, they can't meaningfully own the outcome — and they'll blame the product when it goes wrong.",
    type: "note",
    topic: "AI Design",
    industry: "General",
    author: "Priya",
    tags: ["ai-ux", "patterns", "trust"],
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
        topic: item.topic,
        industry: item.industry,
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
