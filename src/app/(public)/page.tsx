import { Suspense } from "react";
import { ItemCard } from "@/components/item-card";
import { SearchFilters } from "@/components/search-filters";
import { getItems } from "@/lib/dao/items";
import { logger } from "@/lib/logger";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; domain?: string }>;
}) {
  const { q, domain } = await searchParams;
  const items = await getItems({ search: q, domain });
  const isFiltered = Boolean(q?.trim() || domain);

  logger.info(`Knowledge base home rendered with ${items.length} items`);

  return (
    <main className="container flex-1 py-8">
      <div className="mb-6">
        <h1 className="font-bold text-3xl tracking-tight">Team Knowledge</h1>
        <p className="text-muted-foreground">
          {isFiltered
            ? `${items.length} result${items.length === 1 ? "" : "s"}`
            : `${items.length} useful things the design team has gathered.`}
        </p>
      </div>

      <div className="mb-6">
        <Suspense>
          <SearchFilters />
        </Suspense>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          {isFiltered
            ? "No items match your search."
            : 'Nothing here yet — hit "Add" to capture the first piece of knowledge.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
