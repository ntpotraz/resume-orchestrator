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
          className="p-1 bg-blue-600 rounded-full text-white hover:bg-blue-500 hover:shadow-gray-400 shadow-lg hover:scale-105 hover:transition-all duration-150 ease-out"
          type="button"
          onClick={openModal}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Plus</title>
            <path
              fill="currentColor"
              d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col flex-1 gap-2 rounded items-center p-2 overflow-y-scroll scrollbar-floating">
        {summaries
          ? summaries.map((summary) => (
              <SummaryItem
                key={summary.id}
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
