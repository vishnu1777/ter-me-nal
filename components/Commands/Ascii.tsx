"use client";

import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface AsciiProps {
  data: { text: string };
}

export default function Ascii({ data }: AsciiProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  // Simple ASCII art generator
  const generateAscii = (text: string) => {
    const chars: { [key: string]: string[] } = {
      A: ["  █  ", " █ █ ", "█████", "█   █", "█   █"],
      B: ["████ ", "█   █", "████ ", "█   █", "████ "],
      C: [" ████", "█    ", "█    ", "█    ", " ████"],
      D: ["████ ", "█   █", "█   █", "█   █", "████ "],
      E: ["█████", "█    ", "███  ", "█    ", "█████"],
      F: ["█████", "█    ", "███  ", "█    ", "█    "],
      G: [" ████", "█    ", "█  ██", "█   █", " ████"],
      H: ["█   █", "█   █", "█████", "█   █", "█   █"],
      I: ["█████", "  █  ", "  █  ", "  █  ", "█████"],
      J: ["█████", "    █", "    █", "█   █", " ███ "],
      K: ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
      L: ["█    ", "█    ", "█    ", "█    ", "█████"],
      M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
      N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
      O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
      P: ["████ ", "█   █", "████ ", "█    ", "█    "],
      Q: [" ███ ", "█   █", "█   █", "█  ██", " ████"],
      R: ["████ ", "█   █", "████ ", "█  █ ", "█   █"],
      S: [" ████", "█    ", " ███ ", "    █", "████ "],
      T: ["█████", "  █  ", "  █  ", "  █  ", "  █  "],
      U: ["█   █", "█   █", "█   █", "█   █", " ███ "],
      V: ["█   █", "█   █", "█   █", " █ █ ", "  █  "],
      W: ["█   █", "█   █", "█ █ █", "██ ██", "█   █"],
      X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █"],
      Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  "],
      Z: ["█████", "   █ ", "  █  ", " █   ", "█████"],
      " ": ["     ", "     ", "     ", "     ", "     "],
    };

    const lines = ["", "", "", "", ""];
    const upperText = text.toUpperCase();

    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      const asciiChar = chars[char] || chars[" "];

      for (let j = 0; j < 5; j++) {
        lines[j] += asciiChar[j] + " ";
      }
    }

    return lines.join("\n");
  };

  return (
    <pre
      style={{ color: currentTheme.accent }}
      className="font-mono text-sm leading-tight"
    >
      {generateAscii(data.text)}
    </pre>
  );
}
