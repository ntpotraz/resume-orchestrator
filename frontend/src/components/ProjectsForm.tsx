import { useAuth } from "@clerk/clerk-react";

type ProjectsFormProps = {
  closeProject: () => void;
}

const ProjectsForm = ({closeProject}: ProjectsFormProps) => {
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

    const payload = {
      title: formData.get("title"),
      url: formData.get("url"),
      date_range: formData.get("date_range"),
      description: (formData.get("description") as string).split("\n").filter(line => line.trim() !== ""),
      tags: (formData.get("tags") as string).split(",").map(tag => tag.trim()),
    }
  }

  return (
    <div>
      <div className="flex mb-4 items-center justify-between">
        <h2 className="text-xl">Your Projects</h2>
        <button className="bg-blue-600 px-4 py-2 rounded text-white" type="button" onClick={closeProject}>
          Cancel
        </button>
      </div>
      <div className="bg-red-600">
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  )
}

export default ProjectsForm
