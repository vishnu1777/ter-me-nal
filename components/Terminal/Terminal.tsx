"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes, generateVisitorId } from "@/lib/utils";
import BootScreen from "./BootScreen";
import CommandInput from "./CommandInput";
import Output from "./Output";
import MatrixRain from "../Animations/MatrixRain";
import Snake from "../Games/Snake";
import MobileCommandShortcuts from "../Mobile/CommandShortcuts";

export default function Terminal() {
  const {
    outputs,
    addOutput,
    addToHistory,
    clearOutputs,
    theme,
    setTheme,
    isBooting,
    incrementCommandCount,
    visitorId,
    setVisitorId,
  } = useTerminalStore();

  const [showMatrix, setShowMatrix] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Safeguard: fallback to classic theme if current theme is invalid
  const currentTheme = themes[theme] || themes.classic;

  useEffect(() => {
    if (!visitorId) {
      const id = generateVisitorId();
      setVisitorId(id);

      // Track visitor
      fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          userAgent: navigator.userAgent,
        }),
      });
    }
  }, [visitorId, setVisitorId]);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const handleCommand = async (input: string) => {
    const trimmed = input.trim();

    // Add command to output
    addOutput({
      type: "command",
      content: trimmed,
    });

    addToHistory(trimmed);
    incrementCommandCount();

    // Special commands that don't need parsing
    if (trimmed.toLowerCase() === "clear") {
      clearOutputs();
      return;
    }

    if (
      trimmed.toLowerCase() === "matrix" ||
      trimmed.toLowerCase() === "cmatrix"
    ) {
      setShowMatrix(true);
      setTimeout(() => setShowMatrix(false), 5000);
      return;
    }

    if (trimmed.toLowerCase() === "snake") {
      setShowSnake(true);
      return;
    }

    // Parse and execute command via API
    try {
      const response = await fetch("/api/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: trimmed,
          visitorId: visitorId || "",
        }),
      });

      const result = await response.json();

      if (result.type === "theme") {
        // Validate theme exists before setting
        if (themes[result.theme as keyof typeof themes]) {
          setTheme(result.theme as any);
          addOutput({
            type: "success",
            content: `Theme changed to ${result.theme}`,
          });
        } else {
          addOutput({
            type: "error",
            content: `Invalid theme: ${result.theme}`,
          });
        }
      } else if (result.type === "component") {
        addOutput({
          type: "output",
          content: result as any,
        });
      } else if (result.type === "download") {
        window.open(result.url, "_blank");
        addOutput({
          type: "success",
          content: "Download started...",
        });
      } else if (result.message) {
        addOutput({
          type: result.type as any,
          content: result.message,
        });
      }
    } catch (error) {
      console.error("Command execution error:", error);
      addOutput({
        type: "error",
        content: "An error occurred while executing the command.",
      });
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8 font-mono text-sm overflow-auto relative pb-24 md:pb-8"
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
      }}
      onClick={() => document.querySelector("input")?.focus()}
    >
      {showMatrix && <MatrixRain />}
      <MobileCommandShortcuts onCommand={handleCommand} />

      <AnimatePresence>
        {showSnake && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
          >
            <Snake onClose={() => setShowSnake(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto" ref={terminalRef}>
        {/* Header */}
        <div
          className="mb-6 pb-2 border-b"
          style={{ borderColor: currentTheme.text }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 opacity-60">visitor@portfolio: ~</span>
            </div>
            <div className="text-xs opacity-60">Theme: {currentTheme.name}</div>
          </div>
        </div>

        {/* Boot Screen or Terminal Content */}
        <AnimatePresence mode="wait">
          {isBooting ? (
            <BootScreen key="boot" />
          ) : (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Outputs */}
              <div className="space-y-2 mb-4">
                {outputs.map((output) => (
                  <Output key={output.id} output={output} />
                ))}
                <div ref={outputEndRef} />
              </div>

              {/* Input */}
              <CommandInput onCommand={handleCommand} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer hint */}
        <div
          className="mt-8 pt-4 border-t text-xs opacity-40"
          style={{ borderColor: currentTheme.text }}
        >
          <div className="flex gap-4 flex-wrap">
            <span>↑↓: History</span>
            <span>Tab: Autocomplete</span>
            <span>Ctrl+L: Clear</span>
            <span>Ctrl+C: Cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
