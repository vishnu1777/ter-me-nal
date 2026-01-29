"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  category: string;
  featured: boolean;
}

interface ProjectsProps {
  data?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "https://github.com/user/ecommerce",
    live: "https://demo.example.com",
    category: "Web App",
    featured: true,
  },
  {
    id: "2",
    name: "AI Chat Application",
    description: "Real-time chat app with AI-powered responses",
    tech: ["React", "Node.js", "Socket.io", "OpenAI"],
    github: "https://github.com/user/ai-chat",
    live: "https://chat.example.com",
    category: "AI/ML",
    featured: true,
  },
  {
    id: "3",
    name: "Task Management System",
    description: "Collaborative task manager with kanban boards",
    tech: ["Vue.js", "Express", "MongoDB", "Redis"],
    github: "https://github.com/user/taskman",
    category: "Web App",
    featured: false,
  },
];

export default function Projects({ data = defaultProjects }: ProjectsProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        💻 Projects
      </div>

      <div className="space-y-4">
        {data.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded p-4 hover:border-opacity-100 transition-all"
            style={{ borderColor: currentTheme.text, borderOpacity: 0.3 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  style={{ color: currentTheme.accent }}
                  className="font-bold text-lg"
                >
                  {project.name}
                </span>
                {project.featured && (
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: currentTheme.accent,
                      color: currentTheme.bg,
                    }}
                  >
                    ⭐ Featured
                  </span>
                )}
              </div>
              <span
                className="text-xs px-2 py-1 rounded opacity-60"
                style={{
                  backgroundColor: currentTheme.text,
                  color: currentTheme.bg,
                }}
              >
                {project.category}
              </span>
            </div>

            <p style={{ color: currentTheme.text }} className="opacity-80 mb-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: currentTheme.info,
                    color: currentTheme.bg,
                    opacity: 0.8,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: currentTheme.info }}
                  className="hover:underline"
                >
                  🔗 GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: currentTheme.accent }}
                  className="hover:underline"
                >
                  🚀 Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-4 text-sm opacity-60"
        style={{ color: currentTheme.text }}
      >
        💡 Try:{" "}
        <span style={{ color: currentTheme.accent }}>project [name]</span> for
        more details
      </div>
    </div>
  );
}
