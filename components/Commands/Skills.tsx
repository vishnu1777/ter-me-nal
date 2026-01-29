"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  yearsExp: number;
}

interface SkillsProps {
  data?: Skill[];
}

const defaultSkills: Skill[] = [
  {
    id: "1",
    name: "JavaScript/TypeScript",
    category: "Languages",
    proficiency: 95,
    yearsExp: 5,
  },
  {
    id: "2",
    name: "React/Next.js",
    category: "Frontend",
    proficiency: 90,
    yearsExp: 4,
  },
  {
    id: "3",
    name: "Node.js/Express",
    category: "Backend",
    proficiency: 85,
    yearsExp: 4,
  },
  {
    id: "4",
    name: "PostgreSQL/MongoDB",
    category: "Database",
    proficiency: 80,
    yearsExp: 3.5,
  },
  {
    id: "5",
    name: "Python",
    category: "Languages",
    proficiency: 75,
    yearsExp: 3,
  },
  {
    id: "6",
    name: "Docker/K8s",
    category: "DevOps",
    proficiency: 70,
    yearsExp: 2,
  },
  { id: "7", name: "AWS/GCP", category: "Cloud", proficiency: 75, yearsExp: 3 },
  { id: "8", name: "GraphQL", category: "API", proficiency: 80, yearsExp: 2.5 },
];

export default function Skills({ data = defaultSkills }: SkillsProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const categories = Array.from(new Set(data.map((s) => s.category)));

  const getBarColor = (proficiency: number) => {
    if (proficiency >= 80) return currentTheme.accent;
    if (proficiency >= 60) return currentTheme.info;
    return currentTheme.warning;
  };

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        🚀 Technical Skills
      </div>

      {categories.map((category, catIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: catIndex * 0.1 }}
          className="space-y-3"
        >
          <div
            style={{ color: currentTheme.info }}
            className="font-bold text-lg"
          >
            {category}
          </div>

          {data
            .filter((skill) => skill.category === category)
            .map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                className="space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span style={{ color: currentTheme.text }}>{skill.name}</span>
                  <span
                    className="text-xs opacity-60"
                    style={{ color: currentTheme.text }}
                  >
                    {skill.yearsExp} years
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-800 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{
                        delay: catIndex * 0.1 + index * 0.05 + 0.2,
                        duration: 0.8,
                      }}
                      className="h-full rounded"
                      style={{
                        backgroundColor: getBarColor(skill.proficiency),
                      }}
                    />
                  </div>
                  <span
                    className="text-xs w-12 text-right"
                    style={{ color: getBarColor(skill.proficiency) }}
                  >
                    {skill.proficiency}%
                  </span>
                </div>
              </motion.div>
            ))}
        </motion.div>
      ))}

      <div
        className="mt-6 pt-4 border-t"
        style={{ borderColor: currentTheme.text, opacity: 0.3 }}
      >
        <div
          className="text-sm opacity-60"
          style={{ color: currentTheme.text }}
        >
          💡 Legend: <span style={{ color: currentTheme.accent }}>Expert</span>{" "}
          | <span style={{ color: currentTheme.info }}>Advanced</span> |{" "}
          <span style={{ color: currentTheme.warning }}>Intermediate</span>
        </div>
      </div>
    </div>
  );
}
