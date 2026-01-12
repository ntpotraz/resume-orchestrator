import type { Project } from "../types/project";
import { useAuth } from "@clerk/clerk-react";

type ProjectItemProps = {
  project: Project;
  onProjectDeleted: () => void;
};

const ProjectItem = ({ project, onProjectDeleted }: ProjectItemProps) => {
  const { getToken } = useAuth();

  const deleteProject = async () => {
    if (
      confirm(`Are you sure you want to delete "${project.title}"?`) === false
    ) {
      return;
    }

    try {
      const token = await getToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/${project.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        onProjectDeleted();
      } else {
        const errorText = await res.text();
        console.error("Deletion failed:", errorText);
        alert("Could not delete project");
      }
    } catch (err) {
      console.log("Deletion failed...", err);
    }
  };

  return (
    <div className="outline outline-red-500">
      <h1>{project.title}</h1>
      <button type="button" onClick={deleteProject}>
        Delete
      </button>
    </div>
  );
};

export default ProjectItem;
