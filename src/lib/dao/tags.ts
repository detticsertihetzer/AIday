import "server-only";

import prisma from "@/lib/prisma/prisma";

/** @public — shared API for the browse branch's tag filter. */
export async function getAllTags(): Promise<string[]> {
  const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });
  return tags.map((t) => t.name);
}

export async function upsertTags(names: string[]) {
  const clean = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
  return Promise.all(
    clean.map((name) =>
      prisma.tag.upsert({ where: { name }, create: { name }, update: {} })
    )
  );
}
