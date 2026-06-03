import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemActions } from "@/components/item-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getItemById } from "@/lib/dao/items";

export const dynamic = "force-dynamic";

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItemById(id);
  if (!item) notFound();

  return (
    <main className="container max-w-2xl flex-1 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to library
      </Link>

      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{item.topic}</Badge>
          <Badge variant="outline">{item.industry}</Badge>
          <span className="text-muted-foreground text-sm">Added by {item.author}</span>
        </div>
        <ItemActions item={item} />
      </div>

      <h1 className="font-bold text-3xl tracking-tight">{item.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{item.summary}</p>

      {item.content && (
        <p className="mt-4 whitespace-pre-wrap leading-relaxed">{item.content}</p>
      )}

      {item.url && (
        <Button asChild variant="outline" className="mt-6">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-4" />
            Open source
          </a>
        </Button>
      )}

      {item.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </main>
  );
}
