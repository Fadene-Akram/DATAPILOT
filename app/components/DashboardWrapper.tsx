"use client";

import { useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import DashboardLayout from "./dashboard-layout";

type PageType = "projects" | "upload" | "eda" | "model" | "export";

const VALID_PAGES = new Set<PageType>([
  "projects",
  "upload",
  "eda",
  "model",
  "export",
]);

export default function DashboardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Derive current page from URL — no state, no effect, no drift
  const currentPage = useMemo<PageType>(() => {
    const segment = pathname.split("/")[1] || "projects";
    return VALID_PAGES.has(segment as PageType)
      ? (segment as PageType)
      : "projects";
  }, [pathname]);

  return (
    <DashboardLayout currentPage={currentPage}>{children}</DashboardLayout>
  );
}
