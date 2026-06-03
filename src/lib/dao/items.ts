import "server-only";

import prisma from "@/lib/prisma/prisma";
import type { CreateItemInput, ItemFilters, ItemType, KnowledgeItem } from "@/types/item";
import { upsertTags } from "./tags";

const withTags = { tags: { include: { tag: true } } } as const;

type ItemRow = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  type: string;
  url: string | null;
  topic: string;
  industry: string;
  author: string;
  createdAt: Date;
  tags: { tag: { name: string } }[];
};

function toKnowledgeItem(row: ItemRow): KnowledgeItem {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content,
    type: row.type as ItemType,
    url: row.url,
    topic: row.topic,
    industry: row.industry,
    author: row.author,
    createdAt: row.createdAt,
    tags: row.tags.map((t) => t.tag.name),
  };
}

export async function getItems(filters: ItemFilters = {}): Promise<KnowledgeItem[]> {
  const { search, topic, industry, tags } = filters;

  const rows = await prisma.item.findMany({
    where: {
      ...(topic ? { topic } : {}),
      ...(industry ? { industry } : {}),
      // AND semantics: the item must be linked to every selected tag.
      ...(tags && tags.length > 0
        ? { AND: tags.map((name) => ({ tags: { some: { tag: { name } } } })) }
        : {}),
    },
    include: withTags,
    orderBy: { createdAt: "desc" },
  });

  const items = rows.map(toKnowledgeItem);

  // Case-insensitive text search in JS — SQLite's `contains` is case-sensitive
  // and the dataset is tiny, so this stays simple and predictable.
  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    return items.filter((item) =>
      [item.title, item.summary, item.content ?? "", item.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  return items;
}

export async function getItemById(id: string): Promise<KnowledgeItem | null> {
  const row = await prisma.item.findUnique({ where: { id }, include: withTags });
  return row ? toKnowledgeItem(row) : null;
}

export async function createItem(input: CreateItemInput): Promise<KnowledgeItem> {
  const tagRecords = await upsertTags(input.tags);

  const row = await prisma.item.create({
    data: {
      title: input.title,
      summary: input.summary,
      content: input.content ?? null,
      type: input.type,
      url: input.url ?? null,
      topic: input.topic,
      industry: input.industry,
      author: input.author,
      tags: { create: tagRecords.map((tag) => ({ tagId: tag.id })) },
    },
    include: withTags,
  });

  return toKnowledgeItem(row);
}
