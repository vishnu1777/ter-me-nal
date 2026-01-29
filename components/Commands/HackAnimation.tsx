"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface HackAnimationProps {
  data?: { target?: string };
}

export default function HackAnimation({ data }: HackAnimationProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];
  const [lines, setLines] = useState<string[]>([]);

  const target = data?.target || "unknown target";

  useEffect(() => {
    const hackMessages = [
      `[*] Initializing connection to ${target}...`,
      "[*] Bypassing firewall...",
      "[*] Injecting payload...",
      "[*] Decrypting passwords...",
      "[✓] Password found: hunter2",
      "[*] Accessing mainframe...",
      "[*] Downloading classified files...",
      "[!] Access denied!",
      "[!] Security detected!",
      "[!] Connection terminated.",
      "",
      "😏 Just kidding! No actual hacking here.",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < hackMessages.length) {
        setLines((prev) => [...prev, hackMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        // Safety check: ensure line is a string
        const lineText = String(line || "");

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: lineText.includes("[✓]")
                ? currentTheme.accent
                : lineText.includes("[!]")
                  ? currentTheme.error
                  : currentTheme.text,
            }}
          >
            {lineText}
          </motion.div>
        );
      })}
    </div>
  );
}
