// export interface Project {
//   id: number;
//   name: string;
//   datasets: number;
//   models: number;
//   created: string;
// }

// export interface ProjectsPageProps {
//   onSelectProject: (project: string) => void;
//   onNavigate: (page: string) => void;
// }

export type ProjectStatus = "active" | "archived";

export interface Project {
  id: string;
  name: string;
  description?: string;
  created: string; // human-readable, e.g. "2 days ago"
  createdAt: number; // timestamp for sorting
  datasets: number;
  models: number;
  status: ProjectStatus;
  lastModified: string; // human-readable
  tags?: string[];
}

export interface ProjectsPageProps {
  onSelectProject: (name: string) => void;
  onNavigate: (
    page: "projects" | "upload" | "eda" | "model" | "export",
  ) => void;
}
