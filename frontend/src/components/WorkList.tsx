import WorkItem from "./WorkItem";

type WorkListProps = {
  works: string[]
  fetchWorks: () => void;
  openModal: () => void;
};

const WorkList = ({fetchWorks, openModal, works}: WorkListProps) => {
  return (
    <div>
      <div className="flex mb-4 gap-4 justify-between items-center">
        <h2 className="text-xl">Your Work Experience</h2>
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 hover:shadow-gray-400 shadow-lg hover:scale-105 hover:transition-all duration-150 ease-out"
          type="button"
          onClick={openModal}
        >
          Add Project
        </button>
      </div>
      <div className="flex flex-col gap-2 bg-gray-300 rounded items-center p-2 h-1/2 overflow-scroll">
        {works
          ? works.map((work) => (
              <WorkItem
                key={crypto.randomUUID.toString()}
                work={work}
                onWorkDeleted={fetchWorks}
              />
            ))
          : "No Summaries"}
      </div>
    </div>
  );
};

export default WorkList;
