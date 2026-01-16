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
    <div className="bg-white pb-2 px-4 rounded-2xl w-full md:w-4/5">
      <div className="flex pt-2 justify-between items-start">
        <h1 className="text-xl font-bold">{project.title}</h1>
        <button
          className="rounded-2xl p-0.5 hover:bg-blue-200 text-red-500 hover:text-red-400 scale-100 hover:scale-110 transform transition-all ease-in-out duration-200"
          type="button"
          onClick={deleteProject}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <title>Delete</title>{" "}
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
              {" "}
              <path d="M5.25 6.91A.75.75 0 0 1 6 6.16h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75" />{" "}
              <path d="M11.333 4.75c-.69 0-1.25.56-1.25 1.25v.91h-1.5V6a2.75 2.75 0 0 1 2.75-2.75h1.334A2.75 2.75 0 0 1 15.417 6v.91h-1.5V6c0-.69-.56-1.25-1.25-1.25zM6 6.91L8 20h8l2-13.09zm6.5 3.636a.5.5 0 1 0-1 0v5.818a.5.5 0 1 0 1 0zm-3.224-.5a.476.476 0 0 1 .55.423l.666 5.818a.525.525 0 0 1-.435.576a.477.477 0 0 1-.549-.423l-.667-5.818a.525.525 0 0 1 .435-.575m5.883.576a.525.525 0 0 0-.435-.575a.476.476 0 0 0-.55.422l-.666 5.818a.525.525 0 0 0 .435.576a.476.476 0 0 0 .549-.423z" />
            </g>
          </svg>
        </button>
      </div>
      {project.tags ? <span>{project.tags.join(", ")}</span> : null}
    </div>
  );
};

export default ProjectItem;
