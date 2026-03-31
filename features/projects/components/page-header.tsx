import { Plus, FolderOpen, Archive, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  onNewProject: () => void;
  totalProjects: number;
  activeCount: number;
  archivedCount: number;
}

export function PageHeader({
  onNewProject,
  totalProjects,
  activeCount,
  archivedCount,
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Your Projects
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your data science projects in one place
          </p>
        </div>
        <Button
          onClick={onNewProject}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Stats row */}
      <div className="flex gap-3">
        <StatPill
          icon={<LayoutGrid className="w-3.5 h-3.5" />}
          label="Total"
          value={totalProjects}
          color="text-foreground"
        />
        <StatPill
          icon={<FolderOpen className="w-3.5 h-3.5" />}
          label="Active"
          value={activeCount}
          color="text-emerald-500"
        />
        <StatPill
          icon={<Archive className="w-3.5 h-3.5" />}
          label="Archived"
          value={archivedCount}
          color="text-muted-foreground"
        />
      </div>
    </div>
  );
}

function StatPill({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-full text-xs">
      <span className={color}>{icon}</span>
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}
