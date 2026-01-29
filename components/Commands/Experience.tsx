"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  location: string;
  tech: string[];
}

interface ExperienceProps {
  data?: Experience[];
}

const defaultExperiences: Experience[] = [
  {
    id: "1",
    company: "Tech Corp",
    position: "Senior Full-Stack Developer",
    description:
      "Led development of microservices architecture serving 1M+ users. Mentored junior developers and established best practices.",
    startDate: new Date("2022-01-01"),
    current: true,
    location: "Remote",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "2",
    company: "StartupXYZ",
    position: "Full-Stack Developer",
    description:
      "Built and deployed multiple web applications. Implemented CI/CD pipelines and improved deployment efficiency by 60%.",
    startDate: new Date("2020-03-01"),
    endDate: new Date("2021-12-31"),
    current: false,
    location: "San Francisco, CA",
    tech: ["Vue.js", "Express", "MongoDB", "Docker"],
  },
  {
    id: "3",
    company: "Digital Agency",
    position: "Frontend Developer",
    description:
      "Developed responsive websites for various clients. Collaborated with designers to create pixel-perfect implementations.",
    startDate: new Date("2018-06-01"),
    endDate: new Date("2020-02-28"),
    current: false,
    location: "New York, NY",
    tech: ["React", "TypeScript", "SCSS", "Webpack"],
  },
];

export default function Experience({
  data = defaultExperiences,
}: ExperienceProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        💼 Work Experience
      </div>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-6 border-l-2"
            style={{ borderColor: currentTheme.accent }}
          >
            {/* Timeline dot */}
            <div
              className="absolute left-0 top-0 w-3 h-3 rounded-full -ml-[7px]"
              style={{
                backgroundColor: exp.current
                  ? currentTheme.accent
                  : currentTheme.info,
              }}
            />

            <div className="space-y-2">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div
                    style={{ color: currentTheme.accent }}
                    className="text-lg font-bold"
                  >
                    {exp.position}
                  </div>
                  <div style={{ color: currentTheme.info }} className="text-md">
                    {exp.company} • {exp.location}
                  </div>
                </div>
                <div
                  className="text-sm opacity-60"
                  style={{ color: currentTheme.text }}
                >
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate!)}
                  {exp.current && (
                    <span
                      className="ml-2 px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: currentTheme.accent,
                        color: currentTheme.bg,
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>
              </div>

              <p style={{ color: currentTheme.text }} className="opacity-80">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: currentTheme.text,
                      color: currentTheme.bg,
                      opacity: 0.7,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
