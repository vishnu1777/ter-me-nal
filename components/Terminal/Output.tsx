"use client";

import { motion } from "framer-motion";
import {
  useTerminalStore,
  TerminalOutput as TerminalOutputType,
} from "@/store/terminalStore";
import { themes } from "@/lib/utils";
import Help from "../Commands/Help";
import About from "../Commands/About";
import Skills from "../Commands/Skills";
import Projects from "../Commands/Projects";
import ProjectDetail from "../Commands/ProjectDetail";
import Experience from "../Commands/Experience";
import Education from "../Commands/Education";
import Contact from "../Commands/Contact";
import Blog from "../Commands/Blog";
import Achievements from "../Commands/Achievements";
import Whoami from "../Commands/Whoami";
import Neofetch from "../Commands/Neofetch";
import Ascii from "../Commands/Ascii";
import Stats from "../Commands/Stats";
import Timeline from "../Commands/Timeline";
import Social from "../Commands/Social";
import Cowsay from "../Commands/Cowsay";
import Figlet from "../Commands/Figlet";
import HackAnimation from "../Commands/HackAnimation";
import Screenfetch from "../Commands/Screenfetch";
import DinoGuide from "../Commands/DinoGuide";

interface OutputProps {
  output: TerminalOutputType;
}

export default function Output({ output }: OutputProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const getColor = () => {
    switch (output.type) {
      case "error":
        return currentTheme.error;
      case "success":
        return currentTheme.accent;
      case "info":
        return currentTheme.info;
      default:
        return currentTheme.text;
    }
  };

  const renderContent = () => {
    if (typeof output.content === "string") {
      return (
        <div
          style={{ color: getColor() }}
          className="whitespace-pre-wrap font-mono"
        >
          {output.content}
        </div>
      );
    }

    // Handle component rendering
    if (typeof output.content === "object" && output.content !== null) {
      const content = output.content as any;

      switch (content.component) {
        case "Help":
          return <Help />;
        case "About":
          return <About />;
        case "Skills":
          return <Skills data={content.data} />;
        case "Projects":
          return <Projects data={content.data} />;
        case "ProjectDetail":
          return <ProjectDetail data={content.data} />;
        case "Experience":
          return <Experience data={content.data} />;
        case "Education":
          return <Education data={content.data} />;
        case "Contact":
          return <Contact />;
        case "Blog":
          return <Blog data={content.data} />;
        case "Achievements":
          return <Achievements data={content.data} />;
        case "Whoami":
          return <Whoami data={content.data} />;
        case "Neofetch":
          return <Neofetch />;
        case "Ascii":
          return <Ascii data={content.data} />;
        case "Stats":
          return <Stats data={content.data} />;
        case "Timeline":
          return <Timeline data={content.data} />;
        case "Social":
          return <Social />;
        case "Cowsay":
          return <Cowsay data={content.data} />;
        case "Figlet":
          return <Figlet data={content.data} />;
        case "HackAnimation":
          return <HackAnimation data={content.data} />;
        case "Screenfetch":
          return <Screenfetch />;
        case "DinoGuide":
          return <DinoGuide theme={currentTheme} />;
        default:
          return (
            <div style={{ color: getColor() }}>{JSON.stringify(content)}</div>
          );
      }
    }

    return output.content;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-4"
    >
      {output.type === "command" && (
        <div className="mb-1">
          <span style={{ color: currentTheme.prompt }} className="select-none">
            visitor@portfolio:~$
          </span>
          <span style={{ color: currentTheme.text }} className="ml-2">
            {output.content}
          </span>
        </div>
      )}
      {output.type !== "command" && renderContent()}
    </motion.div>
  );
}
