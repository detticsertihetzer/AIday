"use server";

import { revalidatePath } from "next/cache";
import { createItem } from "@/lib/dao/items";
import type { CreateItemInput, KnowledgeItem } from "@/types/item";

export async function createItemAction(input: CreateItemInput): Promise<KnowledgeItem> {
  const item = await createItem(input);
  // Refresh the home grid so the new item shows immediately.
  revalidatePath("/");
  return item;
}
