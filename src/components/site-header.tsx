import { Library } from "lucide-react";
import Link from "next/link";
import { AddDialog } from "@/components/add/add-dialog";

export function SiteHeader() {
  return (
    <header className="anim-nav sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex w-full items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-[#111] text-[15px] tracking-[-0.03em]"
        >
          <Library className="size-5 text-[#111]" />
          Design Library
        </Link>
        <AddDialog />
      </div>
    </header>
  );
}
