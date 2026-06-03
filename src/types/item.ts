// Shared shapes used across the app. The DAO flattens Prisma's nested tag
// relation into a plain `tags: string[]` so UI code stays simple.

import type { Industry, Topic } from "@/lib/domains";

export type ItemType = "note" | "link";

export type KnowledgeItem = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  type: ItemType;
  url: string | null;
  topic: string;
  industry: string;
  author: string;
  tags: string[];
  createdAt: Date;
};

export type CreateItemInput = {
  title: string;
  summary: string;
  content?: string;
  type: ItemType;
  url?: string;
  topic: Topic;
  industry: Industry;
  author: string;
  tags: string[];
};

export type ItemFilters = {
  search?: string;
  topic?: string;
  industry?: string;
  tags?: string[]; // matched with AND — an item must have every listed tag
};
