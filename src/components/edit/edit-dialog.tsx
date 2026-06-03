"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { ItemForm, type ItemFormFields } from "@/components/item-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateItemAction } from "@/lib/actions/items";
import type { TOPICS } from "@/lib/domains";
import type { ItemType, KnowledgeItem } from "@/types/item";

interface EditDialogProps {
  item: KnowledgeItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditDialog({ item, open, onOpenChange }: EditDialogProps) {
  const router = useRouter();
  const [type, setType] = useState<ItemType>(item.type);
  const [form, setForm] = useState<ItemFormFields>({
    title: item.title,
    summary: item.summary,
    content: item.content ?? "",
    url: item.url ?? "",
    topic: item.topic,
    industry: item.industry,
    tags: item.tags.join(", "),
  });
  const [locked, setLocked] = useState(item.locked);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      setType(item.type);
      setLocked(item.locked);
      setForm({
        title: item.title,
        summary: item.summary,
        content: item.content ?? "",
        url: item.url ?? "",
        topic: item.topic,
        industry: item.industry,
        tags: item.tags.join(", "),
      });
    }
  }, [open, item]);

  function update(field: keyof ItemFormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.title.trim() || !form.topic) {
      toast.error("Add a title and pick a topic.");
      return;
    }

    startTransition(async () => {
      await updateItemAction({
        id: item.id,
        title: form.title.trim(),
        summary: form.summary.trim() || form.title.trim(),
        content: form.content.trim() || undefined,
        type,
        url: type === "link" ? form.url.trim() || undefined : undefined,
        topic: form.topic as (typeof TOPICS)[number],
        industry: form.industry,
        author: item.author,
        locked,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      toast.success("Updated");
      onOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-[22px] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
          <DialogDescription>Update this library entry.</DialogDescription>
        </DialogHeader>
        <ItemForm
          type={type}
          form={form}
          locked={locked}
          pending={pending}
          submitLabel="Save changes"
          idPrefix="edit-"
          onTypeChange={setType}
          onFieldChange={update}
          onLockedChange={setLocked}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
