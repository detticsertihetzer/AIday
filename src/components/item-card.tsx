"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { EditDialog } from "@/components/edit/edit-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteItemAction } from "@/lib/actions/items";
import { cn } from "@/lib/utils";
import type { KnowledgeItem } from "@/types/item";

const categoryColor: Record<string, string> = {
  "Visual Design": "color-1",
  Product: "color-2",
  "UX Research": "color-4",
  AI: "color-3",
  Accessibility: "color-5",
  "Design Systems": "color-6",
  Tools: "color-8",
  Inspiration: "color-7",
};

export function ItemCard({ item }: { item: KnowledgeItem }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const colorClass = categoryColor[item.topic] ?? "color-8";
  const animClass = `anim-card-${colorClass.replace("color-", "")}`;

  function handleDelete() {
    startTransition(async () => {
      await deleteItemAction(item.id);
      toast.success("Deleted from library");
      router.refresh();
    });
  }

  return (
    <>
      <Card
        className={cn("topic-card h-full border-0 shadow-none", colorClass, animClass)}
        onClick={() => router.push(`/item/${item.id}`)}
      >
        <CardHeader className="mb-3 p-0">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary" className="card-pill">
                {item.topic}
              </Badge>
              <Badge variant="secondary" className="card-pill">
                {item.industry}
              </Badge>
            </div>
            {!item.locked && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex size-6 items-center justify-center rounded opacity-20 hover:opacity-60"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <CardTitle className="card-title">{item.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-0">
          <p className="card-body line-clamp-3">{item.summary}</p>
          {item.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="card-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <p className="card-footer-line">Added by {item.author}</p>
        </CardContent>
      </Card>

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
