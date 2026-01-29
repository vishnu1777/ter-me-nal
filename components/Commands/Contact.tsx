"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function Contact() {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const contacts = [
    {
      icon: "📧",
      label: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: "github.com/username",
      link: "https://github.com/username",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/username",
      link: "https://linkedin.com/in/username",
    },
    {
      icon: "🐦",
      label: "Twitter",
      value: "twitter.com/username",
      link: "https://twitter.com/username",
    },
    {
      icon: "🌐",
      label: "Website",
      value: "example.com",
      link: "https://example.com",
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
  ];

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        📞 Contact Information
      </div>

      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 hover:translate-x-2 transition-transform"
          >
            <span className="text-2xl">{contact.icon}</span>
            <div className="flex-1">
              <div
                style={{ color: currentTheme.info }}
                className="text-sm opacity-60"
              >
                {contact.label}
              </div>
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: currentTheme.accent }}
                className="hover:underline"
              >
                {contact.value}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-6 pt-4 border-t"
        style={{ borderColor: currentTheme.text, opacity: 0.3 }}
      >
        <div style={{ color: currentTheme.info }} className="mb-3">
          💬 Quick Message
        </div>
        <div
          className="text-sm opacity-60"
          style={{ color: currentTheme.text }}
        >
          Use:{" "}
          <span style={{ color: currentTheme.accent }}>
            send [your message]
          </span>{" "}
          to send a quick message
        </div>
      </div>
    </div>
  );
}
