import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import ProjectsList from "./ProjectsList";
import ProjectsForm from "./ProjectsForm";
import type { Project } from "../types/project";

const ProjectsTab = () => {
	const [creatingProject, setCreatingNewProject] = useState(false);
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
	const newProject = () => {
		setCreatingNewProject(true);
		console.log("Creating new project!");
	};
	const closeProject = () => {
		setCreatingNewProject(false);
		console.log("Closing form!");
	};

	return (
		<div>
			{creatingProject ? (
				<ProjectsForm
					closeProject={closeProject}
					onProjectCreated={fetchProjects}
				/>
			) : (
				<ProjectsList
					projects={projects}
					fetchProjects={fetchProjects}
					newProject={newProject}
				/>
			)}
		</div>
	);
};

export default ProjectsTab;
