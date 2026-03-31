"use client";

import { Bell, Moon, Sun, ChevronRight, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useProject } from "../../context/project-context";

type PageType = "projects" | "upload" | "eda" | "model" | "export";

const PAGE_LABELS: Record<PageType, string> = {
  projects: "Projects",
  upload: "Upload Data",
  eda: "Explore (EDA)",
  model: "Build Model",
  export: "Export",
};

const PAGE_DESCRIPTIONS: Record<PageType, string> = {
  projects: "All your data science projects",
  upload: "Import and configure your dataset",
  eda: "Explore and visualize your data",
  model: "Train and evaluate ML models",
  export: "Package and export your model",
};

interface HeaderProps {
  currentPage: PageType;
  onMenuClick: () => void;
}

export default function Header({ currentPage, onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { currentProject } = useProject();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const inPipeline = currentPage !== "projects";

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0">
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Hamburger — only on mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 min-w-0">
          {inPipeline && currentProject && (
            <>
              <span className="text-sm text-muted-foreground truncate max-w-[100px] sm:max-w-[140px]">
                {currentProject}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
            </>
          )}
          <span className="text-sm font-semibold text-foreground truncate">
            {PAGE_LABELS[currentPage]}
          </span>
          <span className="hidden sm:inline text-muted-foreground text-xs ml-1 truncate">
            — {PAGE_DESCRIPTIONS[currentPage]}
          </span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
        </button>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        )}
        <div className="ml-1 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold select-none">
          U
        </div>
      </div>
    </header>
  );
}
