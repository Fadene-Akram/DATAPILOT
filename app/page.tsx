"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectsPage from "./projects/page";

export default function Home() {
  const router = useRouter();
  const [currentProject, setCurrentProject] = useState<string>("");

  return (
    <ProjectsPage
      onSelectProject={setCurrentProject}
      onNavigate={(page) => {
        router.push(`/${page === "projects" ? "" : page}`);
      }}
    />
  );
}
