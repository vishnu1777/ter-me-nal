"use client";

import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function Help() {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const commands = [
    { cmd: "help", desc: "Display all available commands" },
    { cmd: "about", desc: "Show bio and introduction" },
    { cmd: "skills", desc: "Display technical skills with proficiency bars" },
    { cmd: "projects", desc: "List all projects with filters" },
    { cmd: "project [name]", desc: "View detailed project information" },
    { cmd: "experience", desc: "Show work experience timeline" },
    { cmd: "education", desc: "Display educational background" },
    { cmd: "contact", desc: "Show contact information and social links" },
    { cmd: "blog", desc: "List blog posts" },
    { cmd: "achievements", desc: "Display unlocked achievements" },
    { cmd: "theme [name]", desc: "Change terminal theme" },
    { cmd: "whoami", desc: "Display current visitor info" },
    { cmd: "neofetch", desc: "Display system info in neofetch style" },
    { cmd: "ascii [text]", desc: "Generate ASCII art of text" },
    { cmd: "matrix", desc: "Trigger Matrix rain animation" },
    { cmd: "snake", desc: "Play snake game in terminal" },
    { cmd: "clear", desc: "Clear terminal screen" },
    { cmd: "history", desc: "Show command history" },
    { cmd: "search [query]", desc: "Search across all content" },
    { cmd: "stats", desc: "Show portfolio statistics" },
    { cmd: "timeline", desc: "Interactive career timeline" },
    { cmd: "social", desc: "Show social media links" },
    { cmd: "download resume", desc: "Download resume as PDF" },
    { cmd: "send [message]", desc: "Quick contact form" },
    { cmd: "guest", desc: "Sign guestbook" },
    { cmd: "joke", desc: "Random dev joke" },
    { cmd: "quote", desc: "Inspirational tech quote" },
    { cmd: "ls [-la]", desc: "List directory contents" },
    { cmd: "cat [file]", desc: "Display file contents" },
    { cmd: "cowsay [text]", desc: "ASCII cow says your message" },
    { cmd: "figlet [text]", desc: "Large ASCII text art" },
    { cmd: "fortune", desc: "Random fortune cookie" },
    { cmd: "hack [target]", desc: "Initiate hacking sequence" },
    { cmd: "screenfetch", desc: "System information in style" },
    { cmd: "surf", desc: "🦕 Interactive dinosaur guide - tour the portfolio!" },
    { cmd: "sudo", desc: "Nice try!" },
    { cmd: "exit", desc: "Display farewell message" },
  ];

  const themes_list = [
    "classic",
    "matrix",
    "dracula",
    "nord",
    "cyberpunk",
    "hacker",
    "retro",
    "synthwave",
  ];

  return (
    <div className="space-y-4">
      <div style={{ color: currentTheme.accent }} className="text-lg font-bold">
        📚 Available Commands
      </div>

      <div className="space-y-1">
        {commands.map((cmd, index) => (
          <div key={index} className="flex">
            <span
              style={{ color: currentTheme.accent }}
              className="w-48 flex-shrink-0"
            >
              {cmd.cmd}
            </span>
            <span style={{ color: currentTheme.text }} className="opacity-80">
              - {cmd.desc}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-4 pt-4 border-t"
        style={{ borderColor: currentTheme.text, opacity: 0.3 }}
      >
        <div style={{ color: currentTheme.info }} className="mb-2">
          Available Themes:
        </div>
        <div className="flex flex-wrap gap-2">
          {themes_list.map((t) => (
            <span
              key={t}
              style={{ color: currentTheme.warning }}
              className="opacity-80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        className="mt-4 text-xs opacity-60"
        style={{ color: currentTheme.text }}
      >
        <div>💡 Tips:</div>
        <div className="ml-4 mt-1 space-y-1">
          <div>• Use Tab for autocomplete, ↑↓ for command history</div>
          <div>
            • Type any command without arguments to see available options
          </div>
          <div>• Example: type "theme" to see all available themes</div>
          <div>• Example: type "hack" to see available targets</div>
        </div>
      </div>
    </div>
  );
}
