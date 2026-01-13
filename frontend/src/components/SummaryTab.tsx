import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
// import { useAuth } from "@clerk/clerk-react";

import SummaryList from "./SummaryList";
import SummaryForm from "./SummaryForm";


const SummaryTab = () => {
  const [summaries, setSummaries] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false);
  // const { getToken } = useAuth();

  const fetchSummaries = useCallback(async () => {
    try {
      // const token = await getToken();
      setSummaries([])
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/summaries`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      //
      // const data = await response.json();
      // setSummaries(data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }, []);

  useEffect(() => {
    fetchSummaries()
  }, [fetchSummaries])

  return (
    <div className="flex">
      <SummaryList
        summaries={summaries}
        openModal={() => setShowModal(true)}
        fetchSummaries={fetchSummaries}
      />

      {showModal &&
        createPortal(
          <SummaryForm
            onSummaryCreated={fetchSummaries}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
};

export default SummaryTab;
