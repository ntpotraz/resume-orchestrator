import { useState } from "react";
import Navbar from "./Navbar"
import ProjectTab from "./ProjectTab";
import SummaryTab from "./SummaryTab";
import WorkTab from "./WorkTab";

type Page = "Summary" | "WorkExp" | "Projects";

const ResumeOrchestrator = () => {
  const [selectedPage, setSelectedPage] = useState<Page>("Summary")

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Navbar 
        clickSummary={() => setSelectedPage("Summary")} 
        clickWork={() => setSelectedPage("WorkExp")}
        clickProjects={() => setSelectedPage("Projects")}
      />
      <div className="flex flex-1 bg-blue-500">
        {selectedPage === "Summary" ? <SummaryTab /> : selectedPage === "WorkExp" ? <WorkTab /> : <ProjectTab />}
      </div>
    </div>
  )
}

export default ResumeOrchestrator
