import { ItemCard } from "@/components/item-card";
import { getItems } from "@/lib/dao/items";
import { logger } from "@/lib/logger";

// BROWSE BRANCH owns this file: add a search box, domain filter pills, and
// multi-tag (AND) filtering on top of getItems(). The grid below is the base.
export default async function Home() {
  const items = await getItems();
  logger.info(`Knowledge base home rendered with ${items.length} items`);

  return (
    <main className="container flex-1 py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl tracking-tight">Team Knowledge</h1>
        <p className="text-muted-foreground">
          {items.length} useful things the design team has gathered.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          Nothing here yet — hit “Add” to capture the first piece of knowledge.
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
