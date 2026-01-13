import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import ResumeOrchestrator from "./components/ResumeOrchestrator";

export default function App() {
	return (
		<div className="flex flex-col w-full h-dvh p-8 overflow-hidden">
			<header className="flex justify-between items-center mb-8 shrink-0">
				<h1 className="text-2xl font-bold">Hello World</h1>
				<SignedOut>
					<SignInButton mode="modal" />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</header>

			<main className="flex flex-col flex-1 min-h-0">
				<SignedIn>
					<ResumeOrchestrator />
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
