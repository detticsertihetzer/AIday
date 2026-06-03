"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AddButton } from "@/components/add-button";
import { ItemForm, type ItemFormFields } from "@/components/item-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createItemAction } from "@/lib/actions/items";
import type { Industry, Topic } from "@/lib/domains";
import type { ItemType } from "@/types/item";

const EMPTY: ItemFormFields = {
  title: "",
  summary: "",
  content: "",
  url: "",
  topic: "",
  industry: "",
  tags: "",
};

export function AddDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ItemType>("link");
  const [form, setForm] = useState(EMPTY);
  const [locked, setLocked] = useState(false);
  const [pending, startTransition] = useTransition();

  function update(field: keyof ItemFormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function reset() {
    setForm(EMPTY);
    setType("note");
    setLocked(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.title.trim() || !form.topic || !form.industry) {
      toast.error("Add a title, pick a topic and an industry.");
      return;
    }

    startTransition(async () => {
      await createItemAction({
        title: form.title.trim(),
        summary: form.summary.trim() || form.title.trim(),
        content: form.content.trim() || undefined,
        type,
        url: type === "link" ? form.url.trim() || undefined : undefined,
        topic: form.topic as Topic,
        industry: form.industry as Industry,
        author: "You",
        locked,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      toast.success("Added to the library");
      setOpen(false);
      reset();
      router.refresh();
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <AddButton onClick={() => setOpen(true)} />
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-[22px] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add to the library</DialogTitle>
          <DialogDescription>
            Capture something useful for the design team.
          </DialogDescription>
        </DialogHeader>
        <ItemForm
          type={type}
          form={form}
          locked={locked}
          pending={pending}
          submitLabel="Add to library"
          onTypeChange={setType}
          onFieldChange={update}
          onLockedChange={setLocked}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
