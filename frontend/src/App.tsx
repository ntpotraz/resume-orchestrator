import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import ProjectsTab from "./components/ProjectsTab";

export default function App() {
	return (
		<div className="p-8">
			<header className="flex justify-between items-center mb-8">
				<h1 className="text-2xl font-bold">Hello World</h1>
				<SignedOut>
					<SignInButton mode="modal" />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</header>

			<main>
				<SignedIn>
					<ProjectsTab />
				</SignedIn>
				<SignedOut>
					<p className="text-gray-500 text-center">
						Please sign in to manage your resume projects.
					</p>
				</SignedOut>
			</main>
		</div>
	);
}
