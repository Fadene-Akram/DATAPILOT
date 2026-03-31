"use client";

import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: "projects" | "upload" | "eda" | "model" | "export";
  onNavigate: (
    page: "projects" | "upload" | "eda" | "model" | "export"
  ) => void;
  currentProject?: string;
}

export default function DashboardLayout({
  children,
  currentPage,
  onNavigate,
  currentProject,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        currentProject={currentProject}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background/50">
          {children}
        </main>
      </div>
    </div>
  );
}
