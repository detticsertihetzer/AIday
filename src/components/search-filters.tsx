"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOPICS } from "@/lib/domains";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get("topic") ?? "";

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pushParams(newSearch: string, newTopic: string) {
    const params = new URLSearchParams();
    if (newSearch.trim()) params.set("q", newSearch.trim());
    if (newTopic) params.set("topic", newTopic);
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/", { scroll: false });
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushParams(value, currentTopic), 300);
  }

  function toggleTopic(topic: string) {
    pushParams(search, currentTopic === topic ? "" : topic);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search topics…"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 size-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => handleSearchChange("")}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <Badge
            key={topic}
            variant={currentTopic === topic ? "default" : "outline"}
            className="cursor-pointer select-none gap-1"
            onClick={() => toggleTopic(topic)}
          >
            {topic}
            {currentTopic === topic && <X className="size-3" />}
          </Badge>
        ))}
      </div>
    </div>
  );
}
