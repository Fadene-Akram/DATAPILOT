import { FolderX, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import type { Project } from "../types";

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (projectName: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDuplicate: (id: string) => void;
  onNewProject: () => void;
  isFiltered: boolean;
}

export function ProjectsGrid({
  projects,
  onSelectProject,
  onRename,
  onDelete,
  onToggleArchive,
  onDuplicate,
  onNewProject,
  isFiltered,
}: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 bg-muted/40 rounded-full mb-4">
          <FolderX className="w-8 h-8 text-muted-foreground" />
        </div>
        {isFiltered ? (
          <>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No matching projects
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No projects yet
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first project to get started.
            </p>
            <Button
              onClick={onNewProject}
              size="sm"
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelectProject={onSelectProject}
          onRename={onRename}
          onDelete={onDelete}
          onToggleArchive={onToggleArchive}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}
