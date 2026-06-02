import type React from "react";
import CatalystBadge from "@/components/footer/catalyst-badge";
import { SiteHeader } from "@/components/site-header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <SiteHeader />
      {children}
      <footer className="container flex w-full justify-start py-6">
        <CatalystBadge />
      </footer>
    </div>
  );
}
