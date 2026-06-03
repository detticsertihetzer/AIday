"use server";

import { revalidatePath } from "next/cache";
import { createItem, deleteItem, getItemById, updateItem } from "@/lib/dao/items";
import type { CreateItemInput, KnowledgeItem, UpdateItemInput } from "@/types/item";

export async function createItemAction(input: CreateItemInput): Promise<KnowledgeItem> {
  const item = await createItem(input);
  revalidatePath("/");
  return item;
}

export async function updateItemAction(input: UpdateItemInput): Promise<KnowledgeItem> {
  const existing = await getItemById(input.id);
  if (existing?.locked) throw new Error("This entry is locked and cannot be edited.");
  const item = await updateItem(input);
  revalidatePath("/");
  revalidatePath(`/item/${input.id}`);
  return item;
}

export async function deleteItemAction(id: string): Promise<void> {
  const existing = await getItemById(id);
  if (existing?.locked) throw new Error("This entry is locked and cannot be deleted.");
  await deleteItem(id);
  revalidatePath("/");
}
