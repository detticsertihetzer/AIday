"use server";

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT =
  "You summarize web articles for a design team knowledge base. " +
  "Given the text content of an article, write exactly 1-2 sentences capturing the core idea " +
  "and why it matters to designers. Be direct and specific — no filler phrases like " +
  "'This article discusses' or 'The author explores'.";

export async function summarizeUrlAction(
  url: string
): Promise<{ summary: string } | { error: string }> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { error: "ANTHROPIC_API_KEY is not set." };
  }

  // Fetch the page
  let html: string;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DesignLibraryBot/1.0)" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { error: `Could not fetch URL (${res.status}).` };
    html = await res.text();
  } catch {
    return { error: "Could not reach that URL. Check it's publicly accessible." };
  }

  // Strip tags and collapse whitespace, take first ~4000 chars
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 4000);

  if (text.length < 100) {
    return { error: "Page had too little readable text to summarize." };
  }

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 256,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // Cache the system prompt — it never changes across calls
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: `Article text:\n\n${text}` }],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") return { error: "No summary returned." };
    return { summary: block.text.trim() };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { error: `AI error: ${msg}` };
  }
}
