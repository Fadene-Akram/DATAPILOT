import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  onNewProject: () => void;
}

export function PageHeader({ onNewProject }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Projects
        </h1>
        <p className="text-muted-foreground">
          Manage your data science projects in one place
        </p>
      </div>
      <Button
        onClick={onNewProject}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </Button>
    </div>
  );
}
