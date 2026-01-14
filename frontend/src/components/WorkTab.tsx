import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
// import { useAuth } from "@clerk/clerk-react";

import WorkList from "./WorkList";
import WorkForm from "./WorkForm";


const WorkTab = () => {
  const [works, setWorks] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false);
  // const { getToken } = useAuth();

  const fetchWorks = useCallback(async () => {
    try {
      // const token = await getToken();
      setWorks([])
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/works`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      //
      // const data = await response.json();
      // setWorks(data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }, []);

  useEffect(() => {
    fetchWorks()
  }, [fetchWorks])

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <WorkList
        works={works}
        openModal={() => setShowModal(true)}
        fetchWorks={fetchWorks}
      />

      {showModal &&
        createPortal(
          <WorkForm
            onWorkCreated={fetchWorks}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
};

export default WorkTab;
