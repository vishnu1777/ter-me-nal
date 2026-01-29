"use client";

import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function Neofetch() {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const logo = `
    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
  `;

  const info = [
    { label: "OS", value: navigator.platform },
    {
      label: "Browser",
      value: navigator.userAgent.split(" ").slice(-2).join(" "),
    },
    {
      label: "Screen",
      value: `${window.screen.width}x${window.screen.height}`,
    },
    { label: "Theme", value: theme },
    { label: "Language", value: navigator.language },
    { label: "Online", value: navigator.onLine ? "Yes" : "No" },
  ];

  return (
    <div className="space-y-4">
      <pre
        className="text-xs leading-tight opacity-80"
        style={{ color: currentTheme.accent }}
      >
        {logo}
      </pre>

      <div className="space-y-1">
        {info.map((item, index) => (
          <div key={index} className="flex gap-4">
            <span
              style={{ color: currentTheme.info }}
              className="font-bold w-24"
            >
              {item.label}:
            </span>
            <span style={{ color: currentTheme.text }}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        {Object.keys(themes).map((t) => (
          <div
            key={t}
            className="w-8 h-4 rounded"
            style={{ backgroundColor: themes[t as keyof typeof themes].accent }}
          />
        ))}
      </div>
    </div>
  );
}
