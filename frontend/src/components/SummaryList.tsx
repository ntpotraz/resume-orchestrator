import SummaryItem from "./SummaryItem";
import type { Summary } from "../types/project";

type SummaryListProps = {
  summaries: Summary[]
  fetchSummaries: () => void;
  openModal: () => void;
};

const SummaryList = ({fetchSummaries, openModal, summaries}: SummaryListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex mb-4 gap-4 justify-between items-center">
        <h2 className="text-3xl font-bold">Your Summaries</h2>
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 hover:shadow-gray-400 shadow-lg hover:scale-105 hover:transition-all duration-150 ease-out"
          type="button"
          onClick={openModal}
        >
          Add Project
        </button>
      </div>
      <div className="flex flex-col flex-1 gap-2 rounded items-center p-2 overflow-y-scroll scrollbar-floating">
        {summaries
          ? summaries.map((summary) => (
              <SummaryItem
                key={crypto.randomUUID.toString()}
                summary={summary}
                onSummaryDeleted={fetchSummaries}
              />
            ))
          : "No Summaries"}
      </div>
    </div>
  );
};

export default SummaryList;
