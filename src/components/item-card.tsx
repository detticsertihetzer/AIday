import { Link2, StickyNote } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KnowledgeItem } from "@/types/item";

export function ItemCard({ item }: { item: KnowledgeItem }) {
  const TypeIcon = item.type === "link" ? Link2 : StickyNote;

  return (
    <Link href={`/item/${item.id}`} className="group block h-full">
      <Card className="h-full gap-3 transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary">{item.domain}</Badge>
            <TypeIcon className="size-4 shrink-0 text-muted-foreground" />
          </div>
          <CardTitle className="text-base leading-snug group-hover:text-primary">
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="line-clamp-3 text-muted-foreground text-sm">{item.summary}</p>
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-normal text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
          <p className="text-muted-foreground text-xs">Added by {item.author}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
