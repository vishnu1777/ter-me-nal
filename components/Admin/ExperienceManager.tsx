"use client";

import { useState, useEffect } from "react";

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  order: number;
}

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: null,
    current: false,
    order: 0,
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/admin/experience");
      const data = await response.json();
      setExperiences(
        data.sort((a: Experience, b: Experience) => b.order - a.order),
      );
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editing
        ? `/api/admin/experience?id=${editing}`
        : "/api/admin/experience";
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          endDate: formData.current ? null : formData.endDate,
        }),
      });

      if (response.ok) {
        fetchExperiences();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save experience");
      }
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("Failed to save experience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const response = await fetch(`/api/admin/experience?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchExperiences();
      } else {
        alert("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Failed to delete experience");
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditing(experience.id);
    setFormData({
      ...experience,
      startDate: experience.startDate
        ? new Date(experience.startDate).toISOString().split("T")[0]
        : "",
      endDate: experience.endDate
        ? new Date(experience.endDate).toISOString().split("T")[0]
        : null,
    });
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: null,
      current: false,
      order: 0,
    });
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-purple-200">
        Loading experiences...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {editing ? "Edit Experience" : "Add New Experience"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Company *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Position *
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Senior Developer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                End Date {formData.current && "(Current Position)"}
              </label>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                disabled={formData.current}
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={formData.current || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    current: e.target.checked,
                    endDate: e.target.checked ? null : formData.endDate,
                  })
                }
                className="w-4 h-4 text-purple-600 bg-white/5 border-purple-300/30 rounded focus:ring-purple-400"
              />
              <label htmlFor="current" className="ml-2 text-sm text-purple-200">
                Currently working here
              </label>
            </div>

            <div className="flex items-center">
              <label className="text-sm text-purple-200 mr-2">
                Display Order:
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="w-20 px-2 py-1 bg-white/5 border border-purple-300/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-lg transition"
            >
              {editing ? "Update Experience" : "Add Experience"}
            </button>

            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-200 font-semibold rounded-lg transition border border-gray-500/30"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h3 className="text-xl font-bold text-white mb-4">
          Work Experience ({experiences.length})
        </h3>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    {exp.position}
                    {exp.current && (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                        Current
                      </span>
                    )}
                  </h4>
                  <p className="text-purple-300">{exp.company}</p>
                  <p className="text-sm text-purple-300/70 mt-1">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-purple-200/80 text-sm whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
