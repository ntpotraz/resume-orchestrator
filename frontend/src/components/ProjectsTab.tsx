import { useState } from "react";
import ProjectsList from "./ProjectsList";
import ProjectsForm from "./ProjectsForm";

const ProjectsTab = () => {
  const [creatingProject, setCreatingNewProject] = useState(true)
  const newProject = () => {
    setCreatingNewProject(true);
    console.log("Creating new project!")
  }
  const closeProject = () => {
    setCreatingNewProject(false);
    console.log("Closing form!")
  }


  return (
    <div>
      {creatingProject ? <ProjectsForm closeProject={closeProject} /> : <ProjectsList newProject={newProject} />}
    </div>
  )
}

export default ProjectsTab
