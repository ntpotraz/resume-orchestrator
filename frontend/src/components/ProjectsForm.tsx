import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

type ProjectsFormProps = {
  onProjectCreated: () => Promise<void>;
  onClose: () => void;
};

const ProjectsForm = ({ onProjectCreated, onClose }: ProjectsFormProps) => {
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    }
  };

  return (
    <div className="bg-blue-600">
      <div className="flex mb-4 items-center justify-between">
        <h2 className="text-xl">Your Projects</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg border p-6 rounded-lg bg-white shadow"
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Add New Project</h3>
          <button
            className="bg-blue-600 px-4 py-2 rounded text-white"
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
            placeholder="e.g. Devlog"
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
            placeholder="devlog.ntpotraz.dev/"
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
            placeholder="Oct 2025 - Present"
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
  );
};

export default ProjectsForm;
