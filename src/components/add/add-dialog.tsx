"use client";

import { Link2, Plus, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { createItemAction } from "@/lib/actions/items";
import { DOMAINS } from "@/lib/domains";
import type { ItemType } from "@/types/item";

const EMPTY = { title: "", summary: "", content: "", url: "", domain: "", tags: "" };

export function AddDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ItemType>("note");
  const [form, setForm] = useState(EMPTY);
  const [pending, startTransition] = useTransition();

  function update(field: keyof typeof EMPTY, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function reset() {
    setForm(EMPTY);
    setType("note");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.title.trim() || !form.domain) {
      toast.error("Add a title and pick a domain.");
      return;
    }

    startTransition(async () => {
      await createItemAction({
        title: form.title.trim(),
        summary: form.summary.trim() || form.title.trim(),
        content: form.content.trim() || undefined,
        type,
        url: type === "link" ? form.url.trim() || undefined : undefined,
        domain: form.domain,
        author: "You",
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
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add to the library</DialogTitle>
          <DialogDescription>
            Capture something useful for the design team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Note vs link toggle */}
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
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://…"
                value={form.url}
                onChange={(e) => update("url", e.target.value)}
              />
              {/* CAPTURE BRANCH: add the staged "AI thinking" animation here —
                  on paste/extract, auto-fill title, summary, and suggested tags. */}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="summary">The useful bit</Label>
            <Textarea
              id="summary"
              placeholder="What's worth remembering about this?"
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="domain">Domain</Label>
            <Select
              value={form.domain}
              onValueChange={(value) => update("domain", value)}
            >
              <SelectTrigger id="domain">
                <SelectValue placeholder="Pick a domain" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="comma, separated, tags"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Add to library"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
