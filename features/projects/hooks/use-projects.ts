// "use client";

// import { useState } from "react";
// import { MOCK_PROJECTS } from "../constants";

// export function useProjects() {
//   const [projects] = useState(MOCK_PROJECTS);
//   const [showNewProject, setShowNewProject] = useState(false);
//   const [projectName, setProjectName] = useState("");

//   const handleCreateProject = () => {
//     if (projectName.trim()) {
//       // Handle project creation logic here
//       console.log("Creating project:", projectName);
//       setProjectName("");
//       setShowNewProject(false);
//     }
//   };

//   const handleCancelNewProject = () => {
//     setProjectName("");
//     setShowNewProject(false);
//   };

//   return {
//     projects,
//     showNewProject,
//     projectName,
//     setShowNewProject,
//     setProjectName,
//     handleCreateProject,
//     handleCancelNewProject,
//   };
// }
"use client";

import { useState, useMemo } from "react";
import type { Project, ProjectStatus } from "../types";

// ─── helpers ────────────────────────────────────────────────────────────────

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── seed data ──────────────────────────────────────────────────────────────

const SEED: Project[] = [
  {
    id: makeId(),
    name: "Customer Churn Analysis",
    description:
      "Predict which customers are likely to leave in the next quarter.",
    created: "3 days ago",
    createdAt: Date.now() - 3 * 86_400_000,
    datasets: 3,
    models: 2,
    status: "active",
    lastModified: "2h ago",
    tags: ["classification", "customer"],
  },
  {
    id: makeId(),
    name: "Sales Forecasting",
    description: "Time-series model to forecast monthly revenue.",
    created: "1 week ago",
    createdAt: Date.now() - 7 * 86_400_000,
    datasets: 5,
    models: 4,
    status: "active",
    lastModified: "1d ago",
    tags: ["regression", "time-series"],
  },
  {
    id: makeId(),
    name: "Fraud Detection",
    description: "Detect anomalous transactions in real-time payment data.",
    created: "2 weeks ago",
    createdAt: Date.now() - 14 * 86_400_000,
    datasets: 2,
    models: 1,
    status: "archived",
    lastModified: "5d ago",
    tags: ["anomaly", "finance"],
  },
];

// ─── types ───────────────────────────────────────────────────────────────────

export type SortKey = "lastModified" | "name" | "created" | "datasets";
export type FilterStatus = "all" | ProjectStatus;

export interface UseProjectsReturn {
  // data
  projects: Project[];
  totalProjects: number;
  activeCount: number;
  archivedCount: number;

  // create form
  showNewProject: boolean;
  projectName: string;
  projectDescription: string;
  projectTags: string;
  setShowNewProject: (v: boolean) => void;
  setProjectName: (v: string) => void;
  setProjectDescription: (v: string) => void;
  setProjectTags: (v: string) => void;
  handleCreateProject: () => void;
  handleCancelNewProject: () => void;

  // search / filter / sort
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (v: FilterStatus) => void;
  sortKey: SortKey;
  setSortKey: (v: SortKey) => void;

  // actions
  handleRenameProject: (id: string, newName: string) => void;
  handleDeleteProject: (id: string) => void;
  handleToggleArchive: (id: string) => void;
  handleDuplicateProject: (id: string) => void;
}

// ─── hook ────────────────────────────────────────────────────────────────────

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>(SEED);

  // create form
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTags, setProjectTags] = useState("");

  // search / filter / sort
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("lastModified");

  // ── derived counts ──────────────────────────────────────────────────────
  const activeCount = projects.filter((p) => p.status === "active").length;
  const archivedCount = projects.filter((p) => p.status === "archived").length;

  // ── filtered + sorted view ───────────────────────────────────────────────
  const filteredProjects = useMemo(() => {
    let list = [...projects];

    if (filterStatus !== "all") {
      list = list.filter((p) => p.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    list.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name);
        case "created":
          return b.createdAt - a.createdAt;
        case "datasets":
          return b.datasets - a.datasets;
        case "lastModified":
        default:
          return b.createdAt - a.createdAt; // using createdAt as proxy
      }
    });

    return list;
  }, [projects, filterStatus, searchQuery, sortKey]);

  // ── actions ──────────────────────────────────────────────────────────────

  const handleCreateProject = () => {
    const name = projectName.trim();
    if (!name) return;
    const now = Date.now();
    const tags = projectTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setProjects((prev) => [
      {
        id: makeId(),
        name,
        description: projectDescription.trim() || undefined,
        created: "just now",
        createdAt: now,
        datasets: 0,
        models: 0,
        status: "active",
        lastModified: "just now",
        tags: tags.length ? tags : undefined,
      },
      ...prev,
    ]);
    setProjectName("");
    setProjectDescription("");
    setProjectTags("");
    setShowNewProject(false);
  };

  const handleCancelNewProject = () => {
    setProjectName("");
    setProjectDescription("");
    setProjectTags("");
    setShowNewProject(false);
  };

  const handleRenameProject = (id: string, newName: string) => {
    const name = newName.trim();
    if (!name) return;
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleArchive = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "active" ? "archived" : "active",
              lastModified: timeAgo(Date.now()),
            }
          : p,
      ),
    );
  };

  const handleDuplicateProject = (id: string) => {
    const source = projects.find((p) => p.id === id);
    if (!source) return;
    const now = Date.now();
    setProjects((prev) => [
      {
        ...source,
        id: makeId(),
        name: `${source.name} (copy)`,
        created: "just now",
        createdAt: now,
        lastModified: "just now",
        datasets: 0,
        models: 0,
        status: "active",
      },
      ...prev,
    ]);
  };

  return {
    projects: filteredProjects,
    totalProjects: projects.length,
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
  };
}
