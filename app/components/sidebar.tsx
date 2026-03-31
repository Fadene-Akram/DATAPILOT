"use client";
import {
  Upload,
  BarChart3,
  Cpu,
  Download,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  currentPage: "projects" | "upload" | "eda" | "model" | "export";
  onNavigate: (
    page: "projects" | "upload" | "eda" | "model" | "export"
  ) => void;
  currentProject?: string;
}

export default function Sidebar({
  currentPage,
  onNavigate,
  currentProject,
}: SidebarProps) {
  const [showProjects, setShowProjects] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: "upload", label: "Upload Data", icon: Upload, path: "/upload" },
    { id: "eda", label: "EDA", icon: BarChart3, path: "/eda" },
    { id: "model", label: "Model Build", icon: Cpu, path: "/model" },
    { id: "export", label: "Export Model", icon: Download, path: "/export" },
  ];

  const handleNavigation = (item: (typeof menuItems)[0]) => {
    // Update URL
    router.push(item.path);
    // Update parent state
    onNavigate(item.id as SidebarProps["currentPage"]);
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
            <Cpu className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">
              DataPilot
            </h1>
            <p className="text-xs text-muted-foreground">Studio</p>
          </div>
        </div>
      </div>

      {/* Project Selector */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <button
          onClick={() => setShowProjects(!showProjects)}
          className="w-full flex items-center justify-between px-3 py-2 bg-sidebar-accent/20 hover:bg-sidebar-accent/30 rounded-lg text-sidebar-foreground transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Project</span>
            <span className="text-sm font-semibold">
              {currentProject || "Select Project"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>
        {showProjects && (
          <div className="absolute left-0 right-0 mt-1 mx-4 bg-card border border-border rounded-lg shadow-lg z-10 w-fit">
            {["Project A", "Project B", "Project C"].map((proj) => (
              <button
                key={proj}
                className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted/50 first:rounded-t-lg last:rounded-b-lg"
              >
                {proj}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/20"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Help</span>
        </button>
      </div>
    </aside>
  );
}
