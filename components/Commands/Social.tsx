"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function Social() {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const socials = [
    {
      name: "GitHub",
      icon: "🐙",
      url: "https://github.com/username",
      color: "#333",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/username",
      color: "#0077B5",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "https://twitter.com/username",
      color: "#1DA1F2",
    },
    {
      name: "Dev.to",
      icon: "📝",
      url: "https://dev.to/username",
      color: "#0A0A0A",
    },
    {
      name: "YouTube",
      icon: "📺",
      url: "https://youtube.com/@username",
      color: "#FF0000",
    },
    {
      name: "Discord",
      icon: "💬",
      url: "https://discord.gg/username",
      color: "#5865F2",
    },
  ];

  const handleOpen = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        🌐 Social Links
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {socials.map((social, index) => (
          <motion.button
            key={social.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleOpen(social.url)}
            className="border rounded p-4 text-center cursor-pointer hover:border-opacity-100 transition-all border-opacity-30"
            style={{ borderColor: currentTheme.text }}
          >
            <div className="text-3xl mb-2">{social.icon}</div>
            <div style={{ color: currentTheme.accent }} className="font-bold">
              {social.name}
            </div>
          </motion.button>
        ))}
      </div>

      <div
        className="mt-4 text-sm opacity-60"
        style={{ color: currentTheme.text }}
      >
        💡 Click any card to open the link
      </div>
    </div>
  );
}
