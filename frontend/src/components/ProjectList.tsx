import ProjectItem from "./ProjectItem";
import type { Project } from "../types/project";

type ProjectsListProps = {
  projects: Project[];
  fetchProjects: () => void;
  openModal: () => void;
};

const ProjectList = ({
  projects,
  fetchProjects,
  openModal,
}: ProjectsListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex mb-4 gap-4 justify-between items-center shrink-0">
        <h2 className="text-3xl font-bold">Your Projects</h2>
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 hover:shadow-gray-400 shadow-lg hover:scale-105 hover:transition-all duration-150 ease-out"
          type="button"
          onClick={openModal}
        >
          Add Project
        </button>
      </div>
      <div className="flex flex-col flex-1 gap-2 rounded items-center p-2 overflow-y-scroll scrollbar-floating">
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

export default ProjectList;
