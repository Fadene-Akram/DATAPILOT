"use client";

import { useState } from "react";
import { MOCK_PROJECTS } from "../constants";

export function useProjects() {
  const [projects] = useState(MOCK_PROJECTS);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = () => {
    if (projectName.trim()) {
      // Handle project creation logic here
      console.log("Creating project:", projectName);
      setProjectName("");
      setShowNewProject(false);
    }
  };

  const handleCancelNewProject = () => {
    setProjectName("");
    setShowNewProject(false);
  };

  return {
    projects,
    showNewProject,
    projectName,
    setShowNewProject,
    setProjectName,
    handleCreateProject,
    handleCancelNewProject,
  };
}
