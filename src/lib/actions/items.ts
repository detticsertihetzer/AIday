"use server";

import { revalidatePath } from "next/cache";
import { createItem, deleteItem, updateItem } from "@/lib/dao/items";
import type { CreateItemInput, KnowledgeItem, UpdateItemInput } from "@/types/item";

export async function createItemAction(input: CreateItemInput): Promise<KnowledgeItem> {
  const item = await createItem(input);
  revalidatePath("/");
  return item;
}

export async function updateItemAction(input: UpdateItemInput): Promise<KnowledgeItem> {
  const item = await updateItem(input);
  revalidatePath("/");
  revalidatePath(`/item/${input.id}`);
  return item;
}

export async function deleteItemAction(id: string): Promise<void> {
  await deleteItem(id);
  revalidatePath("/");
}
