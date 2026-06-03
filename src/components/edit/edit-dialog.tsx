"use client";

import { Link2, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateItemAction } from "@/lib/actions/items";
import { INDUSTRIES, TOPICS } from "@/lib/domains";
import type { ItemType, KnowledgeItem } from "@/types/item";

interface EditDialogProps {
  item: KnowledgeItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditDialog({ item, open, onOpenChange }: EditDialogProps) {
  const router = useRouter();
  const [type, setType] = useState<ItemType>(item.type);
  const [form, setForm] = useState({
    title: item.title,
    summary: item.summary,
    content: item.content ?? "",
    url: item.url ?? "",
    topic: item.topic,
    industry: item.industry,
    tags: item.tags.join(", "),
  });
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      setType(item.type);
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

  function update(field: keyof typeof form, value: string) {
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
        topic: form.topic,
        industry: form.industry,
        author: item.author,
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
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
          <DialogDescription>Update this library entry.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={type === "note" ? "default" : "outline"}
              onClick={() => setType("note")}
            >
              <StickyNote className="size-4" />
              Note
            </Button>
            <Button
              type="button"
              variant={type === "link" ? "default" : "outline"}
              onClick={() => setType("link")}
            >
              <Link2 className="size-4" />
              Link
            </Button>
          </div>

          {type === "link" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-url">URL</Label>
              <Input
                id="edit-url"
                placeholder="https://…"
                value={form.url}
                onChange={(e) => update("url", e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-summary">The useful bit</Label>
            <Textarea
              id="edit-summary"
              className="break-all"
              placeholder="What's worth remembering about this?"
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-topic">Topic</Label>
            <Select value={form.topic} onValueChange={(value) => update("topic", value)}>
              <SelectTrigger id="edit-topic">
                <SelectValue placeholder="Pick a topic" />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-industry">Industry</Label>
            <Select
              value={form.industry}
              onValueChange={(value) => update("industry", value)}
            >
              <SelectTrigger id="edit-industry">
                <SelectValue placeholder="Pick an industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-tags">Tags</Label>
            <Input
              id="edit-tags"
              placeholder="comma, separated, tags"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
