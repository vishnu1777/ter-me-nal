"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: false,
    tags: [],
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog");
      const data = await response.json();
      setPosts(
        data.sort(
          (a: BlogPost, b: BlogPost) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editing ? `/api/admin/blog?id=${editing}` : "/api/admin/blog";
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || generateSlug(formData.title || ""),
        }),
      });

      if (response.ok) {
        fetchPosts();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPosts();
      } else {
        alert("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Failed to delete blog post");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post.id);
    setFormData(post);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      published: false,
      tags: [],
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-purple-200">
        Loading blog posts...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {editing ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData({
                  ...formData,
                  title,
                  slug: editing ? formData.slug : generateSlug(title),
                });
              }}
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="My Awesome Blog Post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="my-awesome-blog-post"
            />
            <p className="text-xs text-purple-300/70 mt-1">
              URL-friendly identifier (auto-generated from title)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Excerpt *
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="A brief summary of your blog post..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Content *
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={10}
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono text-sm"
              placeholder="Write your blog post content here (Markdown supported)..."
            />
            <p className="text-xs text-purple-300/70 mt-1">
              Supports Markdown formatting
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags?.join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="javascript, react, tutorial"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published || false}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 bg-white/5 border-purple-300/30 rounded focus:ring-purple-400"
            />
            <label htmlFor="published" className="ml-2 text-sm text-purple-200">
              Publish immediately (uncheck to save as draft)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-lg transition"
            >
              {editing ? "Update Post" : "Create Post"}
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
          Blog Posts ({posts.length})
        </h3>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                    {post.title}
                    {!post.published && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                        Draft
                      </span>
                    )}
                    {post.published && (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                        Published
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-purple-300/70 mb-2">
                    /{post.slug} • {formatDate(post.createdAt)} • {post.views}{" "}
                    views
                  </p>
                  <p className="text-purple-200/80 text-sm mb-3">
                    {post.excerpt}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
    </div>
  );
}
