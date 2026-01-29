"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function About() {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        👋 About Me
      </div>

      <div style={{ color: currentTheme.text }} className="space-y-3">
        <p>
          Hello! I'm a passionate{" "}
          <span style={{ color: currentTheme.accent }}>
            Full-Stack Developer
          </span>{" "}
          and
          <span style={{ color: currentTheme.accent }}>
            {" "}
            Software Engineer
          </span>{" "}
          with a love for creating beautiful, functional, and performant web
          applications.
        </p>

        <p>
          With expertise in modern web technologies, I specialize in building
          scalable applications using{" "}
          <span style={{ color: currentTheme.info }}>
            React, Next.js, TypeScript, Node.js
          </span>
          , and more. I'm passionate about clean code, user experience, and
          continuous learning.
        </p>

        <p>
          When I'm not coding, you can find me exploring new technologies,
          contributing to open-source projects, or sharing knowledge with the
          developer community.
        </p>

        <div
          className="mt-6 pt-4 border-t"
          style={{ borderColor: currentTheme.text, opacity: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div
                style={{ color: currentTheme.info }}
                className="font-bold mb-1"
              >
                Location
              </div>
              <div>🌍 Global / Remote</div>
            </div>
            <div>
              <div
                style={{ color: currentTheme.info }}
                className="font-bold mb-1"
              >
                Experience
              </div>
              <div>💼 5+ Years</div>
            </div>
            <div>
              <div
                style={{ color: currentTheme.info }}
                className="font-bold mb-1"
              >
                Focus
              </div>
              <div>⚡ Full-Stack Development</div>
            </div>
            <div>
              <div
                style={{ color: currentTheme.info }}
                className="font-bold mb-1"
              >
                Status
              </div>
              <div>✅ Available for opportunities</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm opacity-60">
          💡 Try: <span style={{ color: currentTheme.accent }}>skills</span>,{" "}
          <span style={{ color: currentTheme.accent }}>projects</span>,{" "}
          <span style={{ color: currentTheme.accent }}>experience</span>
        </div>
      </div>
    </motion.div>
  );
}
