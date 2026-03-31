import { ProjectCard } from "./project-card";
import type { Project } from "../types";

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (projectName: string) => void;
}

export function ProjectsGrid({ projects, onSelectProject }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
}
