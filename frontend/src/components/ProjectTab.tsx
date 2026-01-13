import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import ProjectList from "./ProjectList";
import ProjectsForm from "./ProjectForm";
import type { Project } from "../types/project";
import { createPortal } from "react-dom";

const ProjectTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { getToken } = useAuth();

  const fetchProjects = useCallback(async () => {
    try {
      const token = await getToken();

      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }, [getToken]);

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ProjectList
        projects={projects}
        openModal={() => setShowModal(true)}
        fetchProjects={fetchProjects}
      />

      {showModal &&
        createPortal(
          <ProjectsForm
            onProjectCreated={fetchProjects}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
};

export default ProjectTab;
