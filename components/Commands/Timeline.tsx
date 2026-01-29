"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface TimelineProps {
  data: any[];
}

export default function Timeline({ data }: TimelineProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        ⏱️ Career Timeline
      </div>

      <div className="relative">
        <div
          className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ backgroundColor: currentTheme.accent, opacity: 0.3 }}
        />

        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-12 pb-8"
          >
            <div
              className="absolute left-2 top-2 w-4 h-4 rounded-full"
              style={{
                backgroundColor: item.current
                  ? currentTheme.accent
                  : currentTheme.info,
              }}
            />

            <div
              className="border rounded p-4"
              style={{ borderColor: currentTheme.text, borderOpacity: 0.3 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div
                    style={{ color: currentTheme.accent }}
                    className="font-bold"
                  >
                    {item.position}
                  </div>
                  <div style={{ color: currentTheme.info }} className="text-sm">
                    {item.company}
                  </div>
                </div>
                <div
                  className="text-xs opacity-60"
                  style={{ color: currentTheme.text }}
                >
                  {new Date(item.startDate).getFullYear()} -{" "}
                  {item.current ? "Now" : new Date(item.endDate).getFullYear()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
