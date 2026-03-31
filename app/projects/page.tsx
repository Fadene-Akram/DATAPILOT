"use client";

import { useRouter } from "next/navigation";
import { useProject } from "@/context/project-context"; // ← use context
import { PageHeader } from "@/features/projects/components/page-header";
import { NewProjectForm } from "@/features/projects/components/new-project-form";
import { ProjectsGrid } from "@/features/projects/components/projects-grid";
import { useProjects } from "@/features/projects/hooks/use-projects";
import { SearchFilterBar } from "@/features/projects/components/search-filter-bar";

export default function ProjectsPage() {
  // ← no more props needed
  const router = useRouter();
  const { setCurrentProject } = useProject(); // ← write to shared context

  const {
    projects,
    totalProjects,
    activeCount,
    archivedCount,
    showNewProject,
    projectName,
    projectDescription,
    projectTags,
    setShowNewProject,
    setProjectName,
    setProjectDescription,
    setProjectTags,
    handleCreateProject,
    handleCancelNewProject,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    sortKey,
    setSortKey,
    handleRenameProject,
    handleDeleteProject,
    handleToggleArchive,
    handleDuplicateProject,
  } = useProjects();

  const handleProjectSelect = (name: string) => {
    setCurrentProject(name); // ← updates ProjectContext → sidebar sees it
    router.push("/upload"); // ← navigate directly, no prop callback needed
  };

  const isFiltered = searchQuery.trim().length > 0 || filterStatus !== "all";

  return (
    <div className="p-6 space-y-5">
      <PageHeader
        onNewProject={() => setShowNewProject(true)}
        totalProjects={totalProjects}
        activeCount={activeCount}
        archivedCount={archivedCount}
      />
      {showNewProject && (
        <NewProjectForm
          projectName={projectName}
          projectDescription={projectDescription}
          projectTags={projectTags}
          onProjectNameChange={setProjectName}
          onProjectDescriptionChange={setProjectDescription}
          onProjectTagsChange={setProjectTags}
          onCreateProject={handleCreateProject}
          onCancel={handleCancelNewProject}
        />
      )}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        sortKey={sortKey}
        onSortChange={setSortKey}
        resultCount={projects.length}
      />
      <ProjectsGrid
        projects={projects}
        onSelectProject={handleProjectSelect}
        onRename={handleRenameProject}
        onDelete={handleDeleteProject}
        onToggleArchive={handleToggleArchive}
        onDuplicate={handleDuplicateProject}
        onNewProject={() => setShowNewProject(true)}
        isFiltered={isFiltered}
      />
    </div>
  );
}
