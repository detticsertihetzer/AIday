"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { EditDialog } from "@/components/edit/edit-dialog";
import { Button } from "@/components/ui/button";
import { deleteItemAction } from "@/lib/actions/items";
import type { KnowledgeItem } from "@/types/item";

export function ItemActions({ item }: { item: KnowledgeItem }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteItemAction(item.id);
      toast.success("Deleted from library");
      router.push("/");
    });
  }

  if (item.locked) return null;

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
          <Pencil className="size-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>

      <EditDialog item={item} open={editOpen} onOpenChange={setEditOpen} />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemTitle={item.title}
        pending={pending}
        onConfirm={handleDelete}
      />
    </>
  );
}
