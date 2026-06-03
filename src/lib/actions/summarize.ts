"use server";

const OG_PROP = /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i;
const OG_CONT = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i;
const META_NAME = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i;
const META_CONT = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i;

export async function summarizeUrlAction(
  url: string
): Promise<{ summary: string } | { error: string }> {
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

  // Try og:description first, then meta description
  const og = OG_PROP.exec(html) ?? OG_CONT.exec(html);
  const meta = META_NAME.exec(html) ?? META_CONT.exec(html);

  const summary = (og?.[1] ?? meta?.[1] ?? "").trim();

  if (!summary) {
    return { error: "This page has no description. Add a summary manually." };
  }

  return { summary };
}
