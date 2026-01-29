"use client";

import { useState, useEffect } from "react";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  yearsExp: number | null;
  order: number;
}

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Other",
];

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: "",
    category: "Frontend",
    proficiency: 80,
    yearsExp: 1,
    order: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/admin/skills");
      const data = await response.json();
      setSkills(data.sort((a: Skill, b: Skill) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editing
        ? `/api/admin/skills?id=${editing}`
        : "/api/admin/skills";
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchSkills();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save skill");
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`/api/admin/skills?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSkills();
      } else {
        alert("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditing(skill.id);
    setFormData(skill);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: "",
      category: "Frontend",
      proficiency: 80,
      yearsExp: 1,
      order: 0,
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-purple-200">Loading skills...</div>
    );
  }

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {editing ? "Edit Skill" : "Add New Skill"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="React, Python, Docker..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Proficiency: {formData.proficiency}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.proficiency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    proficiency: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-purple-300/70 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={formData.yearsExp || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearsExp: parseFloat(e.target.value) || null,
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="0"
            />
            <p className="text-xs text-purple-300/70 mt-1">
              Lower numbers appear first
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-lg transition"
            >
              {editing ? "Update Skill" : "Add Skill"}
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
          Existing Skills ({skills.length})
        </h3>

        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-purple-300 mb-3">
                {category} ({categorySkills.length})
              </h4>

              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="text-white font-medium">
                            {skill.name}
                          </h5>
                          {skill.yearsExp && (
                            <span className="text-xs text-purple-300/70">
                              {skill.yearsExp}{" "}
                              {skill.yearsExp === 1 ? "year" : "years"}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-violet-600 h-full transition-all duration-300"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className="text-sm text-purple-300 w-12 text-right">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
