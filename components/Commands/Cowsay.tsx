"use client";

import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface CowsayProps {
  data: { message: string };
}

export default function Cowsay({ data }: CowsayProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const message = data.message || "Hello from the terminal!";
  const borderLength = message.length + 4;
  const topBorder = " " + "_".repeat(borderLength);
  const bottomBorder = " " + "-".repeat(borderLength);

  return (
    <pre style={{ color: currentTheme.accent }} className="font-mono text-sm">
      {`${topBorder}
< ${message} >
${bottomBorder}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
    </pre>
  );
}
