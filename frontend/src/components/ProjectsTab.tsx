import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import ProjectsList from "./ProjectsList";
import ProjectsForm from "./ProjectsForm";
import type { Project } from "../types/project";
import { createPortal } from "react-dom";

const ProjectsTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { getToken } = useAuth();

  const fetchProjects = async () => {
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
  };

  return (
    <div>
      <ProjectsList
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

export default ProjectsTab;
