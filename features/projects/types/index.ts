export interface Project {
  id: number;
  name: string;
  datasets: number;
  models: number;
  created: string;
}

export interface ProjectsPageProps {
  onSelectProject: (project: string) => void;
  onNavigate: (page: string) => void;
}
