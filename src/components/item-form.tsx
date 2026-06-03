"use client";

import { Link2, Lock, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { INDUSTRIES, TOPICS } from "@/lib/domains";
import type { ItemType } from "@/types/item";

export interface ItemFormFields {
  title: string;
  summary: string;
  content: string;
  url: string;
  topic: string;
  industry: string;
  tags: string;
}

interface ItemFormProps {
  type: ItemType;
  form: ItemFormFields;
  locked: boolean;
  pending: boolean;
  submitLabel: string;
  idPrefix?: string;
  onTypeChange: (type: ItemType) => void;
  onFieldChange: (field: keyof ItemFormFields, value: string) => void;
  onLockedChange: (locked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ItemForm({
  type,
  form,
  locked,
  pending,
  submitLabel,
  idPrefix = "",
  onTypeChange,
  onFieldChange,
  onLockedChange,
  onSubmit,
}: ItemFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant={type === "link" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => onTypeChange("link")}
        >
          <Link2 className="size-4" />
          Link
        </Button>
        <Button
          type="button"
          variant={type === "note" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => onTypeChange("note")}
        >
          <StickyNote className="size-4" />
          Note
        </Button>
      </div>

      {type === "link" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${idPrefix}url`}>URL</Label>
          <Input
            id={`${idPrefix}url`}
            className="rounded-full border-[1.5px]"
            placeholder="https://…"
            value={form.url}
            onChange={(e) => onFieldChange("url", e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}title`}>Title</Label>
        <Input
          id={`${idPrefix}title`}
          className="rounded-full border-[1.5px]"
          value={form.title}
          onChange={(e) => onFieldChange("title", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}summary`}>The useful bit</Label>
        <Textarea
          id={`${idPrefix}summary`}
          placeholder="What's worth remembering about this?"
          value={form.summary}
          onChange={(e) => onFieldChange("summary", e.target.value)}
          rows={3}
          className="break-all rounded-2xl border-[1.5px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}topic`}>Topic</Label>
        <Select value={form.topic} onValueChange={(v) => onFieldChange("topic", v)}>
          <SelectTrigger
            id={`${idPrefix}topic`}
            className="w-full rounded-full border-[1.5px]"
          >
            <SelectValue placeholder="Pick a topic" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {TOPICS.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}industry`}>Industry</Label>
        <Select value={form.industry} onValueChange={(v) => onFieldChange("industry", v)}>
          <SelectTrigger
            id={`${idPrefix}industry`}
            className="w-full rounded-full border-[1.5px]"
          >
            <SelectValue placeholder="Pick an industry" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {INDUSTRIES.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}tags`}>Tags</Label>
        <Input
          id={`${idPrefix}tags`}
          className="rounded-full border-[1.5px]"
          placeholder="comma, separated, tags"
          value={form.tags}
          onChange={(e) => onFieldChange("tags", e.target.value)}
        />
      </div>

      {/* Lock toggle */}
      <div className="flex items-center justify-between rounded-2xl border-[1.5px] px-4 py-3">
        <div className="flex items-center gap-2">
          <Lock className="size-4 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Lock this entry</p>
            <p className="text-muted-foreground text-xs">
              Prevent others from editing or deleting it
            </p>
          </div>
        </div>
        <Switch
          id={`${idPrefix}locked`}
          checked={locked}
          onCheckedChange={onLockedChange}
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="rounded-full" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}
