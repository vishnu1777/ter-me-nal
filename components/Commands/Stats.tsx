"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface StatsProps {
  data: {
    projectCount: number;
    skillCount: number;
    visitorCount: number;
  };
}

export default function Stats({ data }: StatsProps) {
  const { theme, commandCount } = useTerminalStore();
  const currentTheme = themes[theme];

  const stats = [
    { label: "Total Projects", value: data.projectCount, icon: "💻" },
    { label: "Skills Listed", value: data.skillCount, icon: "🚀" },
    { label: "Total Visitors", value: data.visitorCount, icon: "👥" },
    { label: "Commands Executed", value: commandCount, icon: "⌨️" },
  ];

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        📊 Portfolio Statistics
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded p-4 text-center"
            style={{ borderColor: currentTheme.accent }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div
              style={{ color: currentTheme.accent }}
              className="text-3xl font-bold mb-1"
            >
              {stat.value}
            </div>
            <div
              style={{ color: currentTheme.text }}
              className="text-sm opacity-60"
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
