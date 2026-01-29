"use client";

import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface WhoamiProps {
  data?: {
    ip: string;
    country?: string;
    city?: string;
    browser?: string;
    visitedAt: Date;
  } | null;
}

export default function Whoami({ data }: WhoamiProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  return (
    <div className="space-y-4">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        🔍 Visitor Information
      </div>

      <div className="space-y-2">
        <div className="flex gap-4">
          <span style={{ color: currentTheme.info }} className="w-32">
            IP Address:
          </span>
          <span style={{ color: currentTheme.text }}>
            {data?.ip || "Unknown"}
          </span>
        </div>
        <div className="flex gap-4">
          <span style={{ color: currentTheme.info }} className="w-32">
            Location:
          </span>
          <span style={{ color: currentTheme.text }}>
            {data?.city && data?.country
              ? `${data.city}, ${data.country}`
              : "Unknown"}
          </span>
        </div>
        <div className="flex gap-4">
          <span style={{ color: currentTheme.info }} className="w-32">
            Browser:
          </span>
          <span style={{ color: currentTheme.text }}>
            {data?.browser || navigator.userAgent}
          </span>
        </div>
        <div className="flex gap-4">
          <span style={{ color: currentTheme.info }} className="w-32">
            First Visit:
          </span>
          <span style={{ color: currentTheme.text }}>
            {data?.visitedAt
              ? new Date(data.visitedAt).toLocaleString()
              : "Now"}
          </span>
        </div>
      </div>

      <div
        className="mt-4 text-xs opacity-60"
        style={{ color: currentTheme.text }}
      >
        💡 Your privacy is important. This information is only used for
        analytics.
      </div>
    </div>
  );
}
