"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  longDesc: string | null;
  tech: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  category: string | null;
  startDate: string | null;
  endDate: string | null;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    description: "",
    longDesc: "",
    tech: [],
    github: "",
    live: "",
    featured: false,
    category: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editing
        ? `/api/admin/projects?id=${editing}`
        : "/api/admin/projects";
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProjects();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project.id);
    setFormData(project);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: "",
      description: "",
      longDesc: "",
      tech: [],
      github: "",
      live: "",
      featured: false,
      category: "",
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-purple-200">Loading projects...</div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {editing ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="My Awesome Project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category || ""}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Web, Mobile, AI, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Short Description *
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="A brief description of your project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Long Description
            </label>
            <textarea
              value={formData.longDesc || ""}
              onChange={(e) =>
                setFormData({ ...formData, longDesc: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Detailed description of your project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tech?.join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tech: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="React, Node.js, TypeScript"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github || ""}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Live URL
              </label>
              <input
                type="url"
                value={formData.live || ""}
                onChange={(e) =>
                  setFormData({ ...formData, live: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured || false}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 bg-white/5 border-purple-300/30 rounded focus:ring-purple-400"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-purple-200">
              Featured Project
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-lg transition"
            >
              {editing ? "Update Project" : "Add Project"}
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
          Existing Projects ({projects.length})
        </h3>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    {project.name}
                    {project.featured && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                        ⭐ Featured
                      </span>
                    )}
                  </h4>
                  {project.category && (
                    <span className="text-sm text-purple-300">
                      {project.category}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-purple-200/80 text-sm mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 text-sm">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200"
                  >
                    GitHub →
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
