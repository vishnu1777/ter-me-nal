"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface ProjectDetailProps {
  data: {
    name: string;
    longDesc: string;
    tech: string[];
    github?: string;
    live?: string;
    startDate: Date;
    endDate?: Date;
  };
}

export default function ProjectDetail({ data }: ProjectDetailProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div
        style={{ color: currentTheme.accent }}
        className="text-2xl font-bold"
      >
        📦 {data.name}
      </div>

      <div style={{ color: currentTheme.text }} className="space-y-3">
        <p className="text-lg">{data.longDesc}</p>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div>
            <div
              style={{ color: currentTheme.info }}
              className="font-bold mb-1"
            >
              Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: currentTheme.info,
                    color: currentTheme.bg,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{ color: currentTheme.info }}
              className="font-bold mb-1"
            >
              Timeline
            </div>
            <div>
              {new Date(data.startDate).toLocaleDateString()} -{" "}
              {data.endDate
                ? new Date(data.endDate).toLocaleDateString()
                : "Present"}
            </div>
          </div>
        </div>

        {(data.github || data.live) && (
          <div className="pt-4 flex gap-4">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: currentTheme.info,
                  color: currentTheme.bg,
                }}
              >
                🔗 View on GitHub
              </a>
            )}
            {data.live && (
              <a
                href={data.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: currentTheme.accent,
                  color: currentTheme.bg,
                }}
              >
                🚀 Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
