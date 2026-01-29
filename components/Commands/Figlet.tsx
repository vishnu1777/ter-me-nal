"use client";

import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface FigletProps {
  data: { text: string };
}

export default function Figlet({ data }: FigletProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  // Simple figlet-style text
  const generateFiglet = (text: string) => {
    const lines = [
      text
        .split("")
        .map((c) => "█████")
        .join(" "),
      text
        .split("")
        .map((c) => "█   █")
        .join(" "),
      text
        .split("")
        .map((c) => "█████")
        .join(" "),
      text
        .split("")
        .map((c) => "█   █")
        .join(" "),
      text
        .split("")
        .map((c) => "█   █")
        .join(" "),
    ];
    return lines.join("\n");
  };

  return (
    <pre
      style={{ color: currentTheme.accent }}
      className="font-mono text-xs leading-tight"
    >
      {generateFiglet(data.text.toUpperCase().substring(0, 10))}
    </pre>
  );
}
