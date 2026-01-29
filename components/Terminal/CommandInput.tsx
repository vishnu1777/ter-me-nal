"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";
import Cursor from "./Cursor";

interface CommandInputProps {
  onCommand: (command: string) => void;
}

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
  "blog",
  "achievements",
  "theme",
  "whoami",
  "neofetch",
  "ascii",
  "matrix",
  "snake",
  "clear",
  "history",
  "sudo",
  "exit",
  "search",
  "stats",
  "timeline",
  "social",
  "download resume",
  "send",
  "guest",
  "joke",
  "quote",
  "ls",
  "cat",
  "cowsay",
  "figlet",
  "sl",
  "cmatrix",
  "fortune",
  "hack",
  "screenfetch",
  "surf",
];

export default function CommandInput({ onCommand }: CommandInputProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { history, historyIndex, setHistoryIndex, theme } = useTerminalStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) {
        onCommand(input);
        setInput("");
        setSuggestions([]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        if (newIndex === history.length - 1) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      onCommand("clear");
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setInput("");
      setSuggestions([]);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    if (value.trim()) {
      const matches = COMMANDS.filter((cmd) =>
        cmd.startsWith(value.toLowerCase()),
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span
          style={{ color: currentTheme.prompt }}
          className="mr-2 select-none"
        >
          visitor@portfolio:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none font-mono"
          style={{ color: currentTheme.text, caretColor: "transparent" }}
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
        <Cursor />
      </div>

      {suggestions.length > 0 && (
        <div
          className="mt-1 ml-8 text-sm opacity-60"
          style={{ color: currentTheme.info }}
        >
          {suggestions.map((suggestion, index) => (
            <div key={index}>{suggestion}</div>
          ))}
        </div>
      )}
    </div>
  );
}
