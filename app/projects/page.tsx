"use client";

import { PageHeader } from "@/features/projects/components/page-header";
import { NewProjectForm } from "@/features/projects/components/new-project-form";
import { ProjectsGrid } from "@/features/projects/components/projects-grid";
import { useProjects } from "@/features/projects/hooks/use-projects";
import type { ProjectsPageProps } from "@/features/projects/types";
import { SearchFilterBar } from "@/features/projects/components/search-filter-bar";

export default function ProjectsPage({
  onSelectProject,
  onNavigate,
}: ProjectsPageProps) {
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

  const handleProjectSelect = (projectName: string) => {
    onSelectProject(projectName);
    onNavigate("upload");
  };

  const isFiltered = searchQuery.trim().length > 0 || filterStatus !== "all";

  return (
    <div className="p-6 space-y-5">
      {/* Header with stats */}
      <PageHeader
        onNewProject={() => setShowNewProject(true)}
        totalProjects={totalProjects}
        activeCount={activeCount}
        archivedCount={archivedCount}
      />

      {/* New project form (inline, collapsible) */}
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

      {/* Search / filter / sort bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        sortKey={sortKey}
        onSortChange={setSortKey}
        resultCount={projects.length}
      />

      {/* Grid */}
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
