import SummaryItem from "./SummaryItem";

type SummaryListProps = {
  summaries: string[]
  fetchSummaries: () => void;
  openModal: () => void;
};

const SummaryList = ({fetchSummaries, openModal, summaries}: SummaryListProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex mb-4 gap-4 justify-between items-center">
        <h2 className="text-xl">Your Summaries</h2>
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 hover:shadow-gray-400 shadow-lg hover:scale-105 hover:transition-all duration-150 ease-out"
          type="button"
          onClick={openModal}
        >
          Add Project
        </button>
      </div>
      <div className="flex flex-col grow gap-2 bg-gray-300 rounded items-center p-2">
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
