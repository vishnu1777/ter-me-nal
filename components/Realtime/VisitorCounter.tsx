"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    // Fetch initial count
    fetch("/api/visitor")
      .then((res) => res.json())
      .then((data) => setCount(data.count));

    // Subscribe to realtime updates
    const channel = supabase.channel("visitor-count");

    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Visitor" },
        () => {
          setCount((prev) => prev + 1);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 z-40 px-4 py-2 rounded-lg backdrop-blur-sm"
      style={{
        backgroundColor: `${currentTheme.bg}cc`,
        borderColor: currentTheme.accent,
        borderWidth: 1,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: currentTheme.accent }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: currentTheme.accent }}
          />
        </span>
        <span style={{ color: currentTheme.text }} className="text-sm">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="font-mono"
            >
              {count}
            </motion.span>
          </AnimatePresence>{" "}
          visitors
        </span>
      </div>
    </motion.div>
  );
}
