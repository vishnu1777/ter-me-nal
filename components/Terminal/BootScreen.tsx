"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

const bootMessages = [
  "[    0.000000] Initializing portfolio kernel...",
  "[    0.123456] Loading personal data modules...",
  "[    0.234567] Mounting skills filesystem...",
  "[    0.345678] Starting project services...",
  "[    0.456789] Enabling contact protocols...",
  "[    0.567890] System ready.",
  "",
  "Welcome to the Terminal Portfolio v1.0",
  "",
];

const asciiArt = `
╔════════════════════════════════════════════════╗
║                                                ║
║   ████████╗███████╗██████╗ ███╗   ███╗██╗     ║
║   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║     ║
║      ██║   █████╗  ██████╔╝██╔████╔██║██║     ║
║      ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║     ║
║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║███████╗║
║      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝║
║                                                ║
║         PORTFOLIO - INTERACTIVE MODE           ║
║                                                ║
╚════════════════════════════════════════════════╝
`;

export default function BootScreen() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showAscii, setShowAscii] = useState(false);
  const { setIsBooting, theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const skipBoot = () => {
    setIsBooting(false);
  };

  useEffect(() => {
    // Allow skipping boot with any key press
    const handleKeyPress = (e: KeyboardEvent) => {
      skipBoot();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!showAscii) {
      setShowAscii(true);
      const timer = setTimeout(() => {
        setIsBooting(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentLine, showAscii, setIsBooting]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-mono text-sm cursor-pointer"
      style={{ color: currentTheme.text }}
      onClick={skipBoot}
    >
      <div className="space-y-1">
        {bootMessages.slice(0, currentLine).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {message}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAscii && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
            style={{ color: currentTheme.accent }}
          >
            <pre className="text-xs leading-tight">{asciiArt}</pre>
            <div
              className="mt-4 text-center"
              style={{ color: currentTheme.info }}
            >
              Type 'help' to see available commands
            </div>
            <div className="mt-2 text-center text-xs opacity-50">
              Press any key or click to continue...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
