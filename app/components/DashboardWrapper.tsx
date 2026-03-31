"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import DashboardLayout from "./dashboard-layout";

type PageType = "projects" | "upload" | "eda" | "model" | "export";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentProject, setCurrentProject] = useState<string>("");

  // Derive current page directly from pathname (no useEffect needed)
  const currentPage = useMemo<PageType>(() => {
    const path = pathname.split("/")[1] || "projects";
    if (["projects", "upload", "eda", "model", "export"].includes(path)) {
      return path as PageType;
    }
    return "projects";
  }, [pathname]);

  const handleNavigate = (page: PageType) => {
    // This is just for the sidebar's onNavigate callback
    // The actual navigation happens via router.push in the sidebar
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      currentProject={currentProject}
    >
      {children}
    </DashboardLayout>
  );
}
