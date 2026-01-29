"use client";

import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function Screenfetch() {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const logo = `
       ___       
      (.. |      
      (<> |      
     / __  \\     
    ( /  \\ /|    
   _/\\ __)/_)    
   \\/-____\\/     
  `;

  const info = [
    `User: visitor`,
    `OS: ${navigator.platform}`,
    `Browser: ${navigator.userAgent.split(" ").slice(-2).join(" ")}`,
    `Resolution: ${window.screen.width}x${window.screen.height}`,
    `Theme: ${theme}`,
    `Language: ${navigator.language}`,
    `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    `Connection: ${(navigator as any).connection?.effectiveType || "Unknown"}`,
  ];

  return (
    <div className="flex gap-8">
      <pre style={{ color: currentTheme.accent }} className="text-xs">
        {logo}
      </pre>
      <div className="space-y-1 text-sm">
        {info.map((line, index) => (
          <div key={index} style={{ color: currentTheme.text }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
