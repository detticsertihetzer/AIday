# Design Library — how the two of us work on this together

A shared knowledge base for the design team. Built for AI day: capture useful things
(notes or links), browse what teammates gathered. Local & offline — no accounts, no cloud.

## Stack (what's under the hood)

- **Next.js 16 + React** — the app
- **Tailwind + shadcn/ui** — styling and ready-made components
- **Prisma + SQLite** — the database is a single local file (`prisma/dev.db`)
- **Bun** — runs everything (`bun …`)

You don't need to be a developer — Cursor writes the code. This doc is about **not stepping
on each other** while you both work at the same time.

---

## 1. First-time setup (do this once, each on your own machine)

```bash
bun install        # installs packages AND generates the database client
bun run db:setup   # creates the local database and fills it with example entries
bun run dev        # starts the app at http://localhost:3000
```

If the app ever looks empty or broken, re-running `bun run db:setup` gives you a clean,
known set of example data again.

> The database file (`prisma/dev.db`) is **personal to your machine** and is not shared
> through git. The example entries are identical for both of you because they come from
> the seed script, not the file.

---

## 2. Who builds what (this is the important part)

We split the app so we almost never touch the same files. **Stay inside your folders.**

| You build… | Branch | Files you own |
|---|---|---|
| **Browse** (the hero): search, filters, the grid, the detail page | `feature/browse` | `src/app/(public)/page.tsx`, `src/components/browse/*`, `src/app/(public)/item/[id]/page.tsx` |
| **Capture**: the "Add" dialog + the staged "AI thinking" animation | `feature/capture` | `src/components/add/*`, `src/lib/actions/items.ts` |

**Shared foundation — do NOT edit these without telling the other person** (they're already
done): the database schema (`prisma/`), data access (`src/lib/dao/*`), shared types
(`src/types/*`), the domain list (`src/lib/domains.ts`), and the card (`src/components/item-card.tsx`).

If you genuinely need a change in a shared file, send a message first so you don't both edit it.

---

## 3. Everyday git workflow

**Start your feature branch (once), off the shared base:**

```bash
git checkout ai_day/ui_demo
git pull
git checkout -b feature/browse     # or feature/capture
```

**While working — commit often, in small steps:**

```bash
git add -A
git commit -m "feat: add search box to the grid"
git push                            # first push: git push -u origin feature/browse
```

> Commit messages must start with `feat:`, `fix:`, `chore:`, or `style:` — otherwise the
> commit is rejected. Just describe what you did after the prefix.

**When a feature is ready, merge it back into the shared branch** by opening a Pull Request
on GitHub (`feature/...` → `ai_day/ui_demo`), then click "Merge". The other person then runs
`git checkout ai_day/ui_demo && git pull` to get it.

---

## 4. If you hit a merge conflict (don't panic)

A conflict just means git needs you to choose between two versions of the same lines.

1. Run `git status` — the files listed under "both modified" are the conflicts.
2. Open each one. You'll see markers like:
   ```
   <<<<<<< HEAD
   your version
   =======
   their version
   >>>>>>> feature/...
   ```
3. Delete the markers and keep the correct combination of both. **Ask Cursor**: paste the
   conflicted section and say "resolve this merge conflict, keep both behaviours."
4. `git add <file>` then `git commit`.

**Best way to avoid them:** pull the shared branch into yours regularly so you never drift far:
```bash
git checkout ai_day/ui_demo && git pull
git checkout feature/browse && git merge ai_day/ui_demo
```

---

## 5. Before every commit (automatic)

When you commit, the project automatically runs formatting, type-checking, and a few quality
checks. If a commit is rejected, read the message — usually it's a quick fix, and asking
Cursor "fix the pre-commit errors" handles it.
