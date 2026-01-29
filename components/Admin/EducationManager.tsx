"use client";

import { useState, useEffect } from "react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  grade: string | null;
  description: string | null;
}

export default function EducationManager() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: null,
    grade: "",
    description: "",
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch("/api/admin/education");
      const data = await response.json();
      setEducation(
        data.sort(
          (a: Education, b: Education) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        ),
      );
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editing
        ? `/api/admin/education?id=${editing}`
        : "/api/admin/education";
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEducation();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save education");
      }
    } catch (error) {
      console.error("Error saving education:", error);
      alert("Failed to save education");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education record?"))
      return;

    try {
      const response = await fetch(`/api/admin/education?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchEducation();
      } else {
        alert("Failed to delete education");
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      alert("Failed to delete education");
    }
  };

  const handleEdit = (edu: Education) => {
    setEditing(edu.id);
    setFormData({
      ...edu,
      startDate: edu.startDate
        ? new Date(edu.startDate).toISOString().split("T")[0]
        : "",
      endDate: edu.endDate
        ? new Date(edu.endDate).toISOString().split("T")[0]
        : null,
    });
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: null,
      grade: "",
      description: "",
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
        Loading education...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {editing ? "Edit Education" : "Add New Education"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Institution *
            </label>
            <input
              type="text"
              required
              value={formData.institution}
              onChange={(e) =>
                setFormData({ ...formData, institution: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="University Name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Degree *
              </label>
              <input
                type="text"
                required
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Bachelor of Science, Master's, PhD..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Field of Study *
              </label>
              <input
                type="text"
                required
                value={formData.field}
                onChange={(e) =>
                  setFormData({ ...formData, field: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Computer Science, Engineering..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Grade/GPA
              </label>
              <input
                type="text"
                value={formData.grade || ""}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="3.8 GPA, First Class..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Relevant coursework, achievements, honors..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-lg transition"
            >
              {editing ? "Update Education" : "Add Education"}
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
          Education History ({education.length})
        </h3>

        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {edu.degree} in {edu.field}
                  </h4>
                  <p className="text-purple-300">{edu.institution}</p>
                  <p className="text-sm text-purple-300/70 mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.grade && ` • ${edu.grade}`}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {edu.description && (
                <p className="text-purple-200/80 text-sm whitespace-pre-line">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
