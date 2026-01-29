"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "@/lib/supabase-auth";
import ProjectsManager from "@/components/Admin/ProjectsManager";
import SkillsManager from "@/components/Admin/SkillsManager";
import ExperienceManager from "@/components/Admin/ExperienceManager";
import EducationManager from "@/components/Admin/EducationManager";
import BlogManager from "@/components/Admin/BlogManager";

type Tab = "projects" | "skills" | "experience" | "education" | "blog";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { session, error } = await getSession();

    if (!session || error) {
      router.push("/admin/login");
    } else {
      setUser(session.user);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400 mb-4"></div>
          <p className="text-purple-200">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "projects" as Tab, label: "Projects", icon: "🚀" },
    { id: "skills" as Tab, label: "Skills", icon: "💪" },
    { id: "experience" as Tab, label: "Experience", icon: "💼" },
    { id: "education" as Tab, label: "Education", icon: "🎓" },
    { id: "blog" as Tab, label: "Blog", icon: "📝" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  Admin Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-purple-200">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition border border-red-500/30"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-purple-200 border-b-2 border-purple-400 bg-white/5"
                    : "text-purple-300/70 hover:text-purple-200 hover:bg-white/5"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "skills" && <SkillsManager />}
          {activeTab === "experience" && <ExperienceManager />}
          {activeTab === "education" && <EducationManager />}
          {activeTab === "blog" && <BlogManager />}
        </div>
      </main>
    </div>
  );
}
