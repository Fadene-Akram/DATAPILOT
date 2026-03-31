"use client";

import {
  Upload,
  BarChart3,
  Cpu,
  Download,
  Settings,
  HelpCircle,
  FolderOpen,
  Home,
  ChevronRight,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useProject } from "../../context/project-context";

type PageType = "projects" | "upload" | "eda" | "model" | "export";

interface SidebarProps {
  currentPage: PageType;
  onClose?: () => void;
}

const PIPELINE: {
  id: PageType;
  label: string;
  icon: React.ElementType;
  path: string;
}[] = [
  { id: "upload", label: "Upload Data", icon: Upload, path: "/upload" },
  { id: "eda", label: "Explore (EDA)", icon: BarChart3, path: "/eda" },
  { id: "model", label: "Build Model", icon: Cpu, path: "/model" },
  { id: "export", label: "Export", icon: Download, path: "/export" },
];

const STEP_ORDER: PageType[] = ["upload", "eda", "model", "export"];

export default function Sidebar({ currentPage, onClose }: SidebarProps) {
  const router = useRouter();
  const { currentProject, clearProject } = useProject();

  const currentStepIndex = STEP_ORDER.indexOf(currentPage);
  const isCompleted = (id: PageType) => {
    const idx = STEP_ORDER.indexOf(id);
    return idx !== -1 && idx < currentStepIndex;
  };

  const navigate = (path: string) => {
    router.push(path);
    onClose?.();
  };

  // On mobile: full width drawer (w-72), labels always shown
  // On md: collapsed icon-only (w-16)
  // On lg: full sidebar (w-60)
  return (
    <aside
      className="
      w-72 md:w-16 lg:w-60
      bg-sidebar border-r border-sidebar-border
      flex flex-col h-full shrink-0
    "
    >
      {/* ── Logo ── */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between gap-2">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 min-w-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shrink-0">
            <Cpu className="w-4 h-4 text-primary-foreground" />
          </div>
          {/* Show on mobile + lg, hide on md icon-only */}
          <div className="text-left md:hidden lg:block">
            <p className="text-sm font-bold text-sidebar-foreground leading-none">
              DataPilot
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Studio</p>
          </div>
        </button>
        {/* Close — mobile drawer only */}
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors shrink-0"
          aria-label="Close menu"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* ── Projects home ── */}
      <div className="px-2 pt-3">
        <button
          onClick={() => navigate("/")}
          title="Projects"
          className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors text-sm font-medium
            lg:px-3
            ${
              currentPage === "projects"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/20"
            }`}
        >
          <Home className="w-4 h-4 shrink-0 md:mx-auto lg:mx-0" />
          {/* Label: show on mobile + lg, hide on md */}
          <span className="md:hidden lg:inline">Projects</span>
        </button>
      </div>

      {/* ── Active project badge — mobile + lg full view ── */}
      {currentProject && (
        <div className="mx-2 mt-3 px-3 py-2.5 bg-primary/10 border border-primary/20 rounded-lg md:hidden lg:block">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FolderOpen className="w-3.5 h-3.5 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Active project
                </p>
                <p className="text-xs font-semibold text-foreground truncate">
                  {currentProject}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                clearProject();
                navigate("/");
              }}
              className="p-0.5 rounded hover:bg-muted transition-colors shrink-0"
              title="Close project"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}

      {/* Active project dot — md icon-only indicator */}
      {currentProject && (
        <div className="hidden md:flex lg:hidden justify-center mt-3">
          <div
            className="w-2 h-2 rounded-full bg-primary"
            title={currentProject}
          />
        </div>
      )}

      {/* ── Pipeline steps ── */}
      <nav className="flex-1 px-2 pt-4 pb-2 overflow-y-auto">
        {/* Label: show on mobile + lg */}
        <p
          className="pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60
          px-3 md:hidden lg:block"
        >
          Pipeline
        </p>

        <div className="space-y-0.5">
          {PIPELINE.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const done = isCompleted(item.id);
            const locked = !currentProject;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (!locked) navigate(item.path);
                }}
                disabled={locked}
                title={item.label}
                className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors text-sm
                  lg:px-3
                  ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : done
                        ? "text-sidebar-foreground hover:bg-sidebar-accent/20"
                        : locked
                          ? "text-muted-foreground/40 cursor-not-allowed"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/20"
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold
                  md:mx-auto lg:mx-0
                  ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : done
                        ? "bg-primary/20 text-primary"
                        : locked
                          ? "bg-muted/30 text-muted-foreground/30"
                          : "bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                {/* Label: mobile + lg */}
                <span className="flex-1 text-left font-medium md:hidden lg:inline">
                  {item.label}
                </span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 md:hidden lg:block" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Footer ── */}
      <div className="p-2 border-t border-sidebar-border space-y-0.5">
        <button
          title="Settings"
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors text-sm lg:px-3"
        >
          <Settings className="w-4 h-4 shrink-0 md:mx-auto lg:mx-0" />
          <span className="md:hidden lg:inline">Settings</span>
        </button>
        <button
          title="Help & Docs"
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors text-sm lg:px-3"
        >
          <HelpCircle className="w-4 h-4 shrink-0 md:mx-auto lg:mx-0" />
          <span className="md:hidden lg:inline">Help & Docs</span>
        </button>
      </div>
    </aside>
  );
}
