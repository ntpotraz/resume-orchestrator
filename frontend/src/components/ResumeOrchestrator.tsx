import { useState } from "react";
import Navbar from "./Navbar";
import ProjectTab from "./ProjectTab";
import SummaryTab from "./SummaryTab";
import WorkTab from "./WorkTab";
import type { Page, Project, Summary, Work } from "../types/project.ts";
import PreviewTab from "./PreviewTab.tsx";

type ResumeData = {
  summaries: Summary[];
  works: Work[];
  projects: Project[];
}

const ResumeOrchestrator = () => {
  const [selectedPage, setSelectedPage] = useState<Page>("Preview");
  const [resumeData, setResumeData] = useState<ResumeData>();

  return (
    <div className="flex flex-1 flex-col gap-4 min-h-0">
      <Navbar
        clickPreview={() => setSelectedPage("Preview")}
        clickSummary={() => setSelectedPage("Summary")}
        clickWork={() => setSelectedPage("WorkExp")}
        clickProjects={() => setSelectedPage("Projects")}
      />
      <div className="flex p-3 flex-1 bg-gray-300 rounded-2xl min-h-0">
        {selectedPage === "Preview" ? (
          <PreviewTab />
        ) : selectedPage === "Summary" ? (
          <SummaryTab />
        ) : selectedPage === "WorkExp" ? (
          <WorkTab />
        ) : (
          <ProjectTab />
        )}
      </div>
    </div>
  );
};

export default ResumeOrchestrator;
