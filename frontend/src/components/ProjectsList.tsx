import { useAuth, } from "@clerk/clerk-react";
import { useState } from "react";

type ProjectsListProps = {
  newProject: () => void;
}

const ProjectsList = ({newProject}: ProjectsListProps) => {
  const [projects, setProjects] = useState([]);
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
      <div className="flex mb-4 gap-4 justify-between items-center">
        <h2 className="text-xl">Your Projects</h2>
        <button type="button" onClick={fetchProjects} className="bg-blue-600 text-white px-4 py-2 rounded" >
          Refresh Projects
        </button>
        <button className="bg-blue-600 px-4 py-2 rounded text-white" type="button" onClick={newProject}>
          Add Project
        </button>
      </div>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(projects, null, 2)}
      </pre>
    </div>
  );
};

export default ProjectsList;
