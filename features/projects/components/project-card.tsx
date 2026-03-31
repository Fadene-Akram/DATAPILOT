import { FolderOpen, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onSelectProject: (projectName: string) => void;
}

export function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  return (
    <Card
      className="hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => onSelectProject(project.name)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FolderOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="text-xs">
                {project.created}
              </CardDescription>
            </div>
          </div>
          <button
            className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Handle menu actions
            }}
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {project.datasets}
            </p>
            <p className="text-xs text-muted-foreground">Datasets</p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-accent">{project.models}</p>
            <p className="text-xs text-muted-foreground">Models</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
