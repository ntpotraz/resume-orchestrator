import ProjectItem from "./ProjectItem";
import type { Project } from "../types/project";

type ProjectsListProps = {
  projects: Project[];
  fetchProjects: () => void;
  newProject: () => void;
};

const ProjectsList = ({
  projects,
  fetchProjects,
  newProject,
}: ProjectsListProps) => {
  return (
    <div>
      <div className="flex mb-4 gap-4 justify-between items-center">
        <h2 className="text-xl">Your Projects</h2>
        <button
          type="button"
          onClick={fetchProjects}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh Projects
        </button>
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white"
          type="button"
          onClick={newProject}
        >
          Add Project
        </button>
      </div>
      <div className="flex flex-col bg-gray-300 rounded min-h-40">
        {projects ? (
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onProjectDeleted={fetchProjects}
            />
          ))
        ) : "No Project"}
      </div>
    </div>
  );
};

export default ProjectsList;
