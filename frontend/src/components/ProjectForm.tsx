import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

type ProjectsFormProps = {
  onProjectCreated: () => Promise<void>;
  onClose: () => void;
};

const ProjectsForm = ({ onProjectCreated, onClose }: ProjectsFormProps) => {
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setIsSubmitting(true);

    const formData = new FormData(formElement);

    const payload = {
      title: formData.get("title"),
      url: formData.get("url"),
      date_range: formData.get("date_range"),
      description: (formData.get("description") as string)
        .split("\n")
        .filter((line) => line.trim() !== ""),
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim()),
    };

    try {
      console.log(`Sending payload: ${JSON.stringify(payload)}`);
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        formElement.reset();
        onProjectCreated();
      }
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-out ${
        isOpen ? "Opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-lg border-2 p-6 rounded-lg bg-white shadow"
        >
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Add New Project</h3>
            <button
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 hover:shadow-gray-400 shadow-lg hover:scale-105 hover:transition-all duration-150 ease-out"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Project Title
            </label>
            <input
              id="title"
              name="title"
              required
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="e.g. Resume Builder"
            />
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              URL (Optional)
            </label>
            <input
              id="url"
              name="url"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="https://example.com/"
            />
          </div>

          <div>
            <label
              htmlFor="date_range"
              className="block text-sm font-medium text-gray-700"
            >
              Date Range
            </label>
            <input
              id="date_range"
              name="date_range"
              required
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Jan 2025 - October 2025"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (One bullet per line)
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder={`Thing one\nThing two\nThing three`}
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (Comma separated)
            </label>
            <input
              id="tags"
              name="tags"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="React, TypeScript, Go..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isSubmitting ? "Saving..." : "Save Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectsForm;
