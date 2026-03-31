"use client";

import { PageHeader } from "@/features/projects/components/page-header";
import { NewProjectForm } from "@/features/projects/components/new-project-form";
import { ProjectsGrid } from "@/features/projects/components/projects-grid";
import { useProjects } from "@/features/projects/hooks/use-projects";
import type { ProjectsPageProps } from "@/features/projects/types";

export default function ProjectsPage({
  onSelectProject,
  onNavigate,
}: ProjectsPageProps) {
  const {
    projects,
    showNewProject,
    projectName,
    setShowNewProject,
    setProjectName,
    handleCreateProject,
    handleCancelNewProject,
  } = useProjects();

  const handleProjectSelect = (projectName: string) => {
    onSelectProject(projectName);
    onNavigate("upload");
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader onNewProject={() => setShowNewProject(true)} />

      {showNewProject && (
        <NewProjectForm
          projectName={projectName}
          onProjectNameChange={setProjectName}
          onCreateProject={handleCreateProject}
          onCancel={handleCancelNewProject}
        />
      )}

      <ProjectsGrid projects={projects} onSelectProject={handleProjectSelect} />
    </div>
  );
}
