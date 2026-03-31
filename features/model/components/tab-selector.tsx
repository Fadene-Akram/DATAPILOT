import { GitCompare } from "lucide-react";

interface TabSelectorProps {
  activeTab: "build" | "compare";
  onTabChange: (tab: "build" | "compare") => void;
  selectedModelsCount: number;
}

export function TabSelector({
  activeTab,
  onTabChange,
  selectedModelsCount,
}: TabSelectorProps) {
  return (
    <div className="flex gap-2 border-b border-border">
      <button
        onClick={() => onTabChange("build")}
        className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
          activeTab === "build"
            ? "border-primary text-primary"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        Build Models
      </button>
      <button
        onClick={() => onTabChange("compare")}
        className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
          activeTab === "compare"
            ? "border-primary text-primary"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        <GitCompare className="w-4 h-4" />
        Compare Models
        {selectedModelsCount > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-primary text-white rounded-full text-xs">
            {selectedModelsCount}
          </span>
        )}
      </button>
    </div>
  );
}
