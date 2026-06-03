"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { ItemCard } from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOPICS } from "@/lib/domains";
import { cn } from "@/lib/utils";
import type { KnowledgeItem } from "@/types/item";

const categoryColor: Record<string, string> = {
  "Visual Design": "color-1",
  Product: "color-2",
  "UX Research": "color-4",
  Interaction: "color-3",
  Accessibility: "color-5",
  "Design Systems": "color-6",
  Tools: "color-8",
  Inspiration: "color-7",
};

export function LibraryBrowser({
  allItems,
  initialSearch = "",
  initialTopic = "",
}: {
  allItems: KnowledgeItem[];
  initialSearch?: string;
  initialTopic?: string;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [topic, setTopic] = useState(initialTopic);

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  function selectTopic(next: string) {
    setTopic(next);
  }

  function toggleTopic(t: string) {
    setTopic(topic === t ? "" : t);
  }

  let filtered = allItems;
  if (topic) filtered = filtered.filter((i) => i.topic === topic);
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((i) =>
      [i.title, i.summary, i.content ?? "", i.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  const isFiltered = Boolean(search.trim() || topic);
  const topicCounts = Object.fromEntries(
    TOPICS.map((t) => [t, allItems.filter((i) => i.topic === t).length])
  );

  return (
    <>
      <div className="anim-5 mb-6">
        <div className="flex flex-col gap-3">
          <div className="search-bar anim-search">
            <Search className="size-4" />
            <Input
              className="border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search topics…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleSearchChange("")}
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          {isFiltered && (
            <div className="anim-chips flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant="ghost"
                  className={cn("filter-chip", topic === t && "active")}
                  onClick={() => toggleTopic(t)}
                >
                  {t}
                  {topic === t && <X className="size-3" />}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isFiltered ? (
        filtered.length === 0 ? (
          <p className="hero-subtitle mb-16">No items match your search.</p>
        ) : (
          <div className="mb-16 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )
      ) : (
        <div className="cat-grid anim-6">
          {TOPICS.map((t, i) => (
            <Button
              key={t}
              type="button"
              variant="ghost"
              className={cn(
                "cat-card items-start justify-start",
                categoryColor[t] ?? "color-8"
              )}
              onClick={() => selectTopic(t)}
            >
              <div className="cat-idx">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(TOPICS.length).padStart(2, "0")}
              </div>
              <div className="cat-name">{t}</div>
              <div className="cat-body" />
              <div className="cat-foot">
                <span>{topicCounts[t] ?? 0} entries</span>
                <span>→</span>
              </div>
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
