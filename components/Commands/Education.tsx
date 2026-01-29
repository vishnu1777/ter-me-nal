"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: string;
}

interface EducationProps {
  data?: Education[];
}

const defaultEducation: Education[] = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: new Date("2014-09-01"),
    endDate: new Date("2018-05-31"),
    current: false,
    gpa: "3.8/4.0",
  },
];

export default function Education({ data = defaultEducation }: EducationProps) {
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
        🎓 Education
      </div>

      <div className="space-y-4">
        {data.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded p-4 border-opacity-30"
            style={{ borderColor: currentTheme.text }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div
                  style={{ color: currentTheme.accent }}
                  className="text-lg font-bold"
                >
                  {edu.degree} in {edu.field}
                </div>
                <div style={{ color: currentTheme.info }}>
                  {edu.institution}
                </div>
              </div>
              {edu.gpa && (
                <div
                  className="text-sm"
                  style={{ color: currentTheme.warning }}
                >
                  GPA: {edu.gpa}
                </div>
              )}
            </div>

            <div
              className="text-sm opacity-60"
              style={{ color: currentTheme.text }}
            >
              {formatDate(edu.startDate)} -{" "}
              {edu.current ? "Present" : formatDate(edu.endDate!)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
