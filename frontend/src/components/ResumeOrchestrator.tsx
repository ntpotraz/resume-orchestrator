import { useState } from "react";
import Navbar from "./Navbar"
import ProjectTab from "./ProjectTab";
import SummaryTab from "./SummaryTab";
import WorkTab from "./WorkTab";
import type { Page } from "../types/project.ts";


const ResumeOrchestrator = () => {
  const [selectedPage, setSelectedPage] = useState<Page>("Summary")

  return (
    <div className="flex flex-1 flex-col gap-4 min-h-0">
      <Navbar 
        clickSummary={() => setSelectedPage("Summary")} 
        clickWork={() => setSelectedPage("WorkExp")}
        clickProjects={() => setSelectedPage("Projects")}
      />
      <div className="flex p-3 flex-1 bg-gray-300 rounded-2xl min-h-0">
        {selectedPage === "Summary" ? <SummaryTab /> : selectedPage === "WorkExp" ? <WorkTab /> : <ProjectTab />}
      </div>
    </div>
  )
}

export default ResumeOrchestrator
