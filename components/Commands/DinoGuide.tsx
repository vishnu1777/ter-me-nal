"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DinoGuideProps {
  theme?: any;
}

type Section = 
  | "welcome"
  | "commands" 
  | "projects"
  | "skills"
  | "games"
  | "customization"
  | "tips"
  | "goodbye";

// Animated dinosaur frames for running animation
const dinoFrames = [
  `
        ██████  
      ██      ██
     ██  ████  ██
    ██  ██  ██  ██
    ██          ██
     ██        ██
      ████████
         ██  ██
        ██    ██
       ██      ██
`,
  `
        ██████  
      ██      ██
     ██  ████  ██
    ██  ██  ██  ██
    ██          ██
     ██        ██
      ████████
       ██      ██
      ██        ██
     ██          
`,
  `
        ██████  
      ██      ██
     ██  ████  ██
    ██  ██  ██  ██
    ██          ██
     ██        ██
      ████████
        ██    ██
         ██  ██
          ██
`
];

const sections: Record<Section, { title: string; content: string[]; next: Section | null }> = {
  welcome: {
    title: "🦕 Welcome to Your Terminal Portfolio!",
    content: [
      "Hey there, friend! I'm Dino, your friendly neighborhood guide!",
      "",
      "I've been around since the Jurassic period, so I know a thing or two",
      "about surviving... and about awesome portfolios! 🦖",
      "",
      "Let me show you around this incredible terminal-based portfolio!",
      "It's not just a website - it's an EXPERIENCE!",
      "",
      "Press ENTER to continue, or type 'skip' to explore on your own..."
    ],
    next: "commands"
  },
  commands: {
    title: "💻 Master the Commands",
    content: [
      "First things first - this is a REAL terminal (well, kind of)!",
      "",
      "🎯 Essential Commands:",
      "  • help       - See all available commands",
      "  • about      - Learn about the portfolio owner",
      "  • projects   - View amazing projects",
      "  • skills     - See the tech stack",
      "  • experience - Work history",
      "  • clear      - Clean your screen",
      "",
      "💡 Pro Tip: You can use TAB to autocomplete commands!",
      "Try typing 'pro' and hit TAB. Magic, right? 🪄",
      "",
      "Press ENTER to continue..."
    ],
    next: "projects"
  },
  projects: {
    title: "🚀 Projects - The Cool Stuff",
    content: [
      "This is where the real magic happens!",
      "",
      "🎨 Commands to try:",
      "  • projects          - List ALL the awesome projects",
      "  • projects web      - Filter by category (web, mobile, ai)",
      "  • project <name>    - Deep dive into a specific project",
      "",
      "Each project shows:",
      "  ✨ What it does (the cool factor)",
      "  🛠️  Technologies used (the nerdy stuff)",
      "  🔗 Live demo & GitHub links (see it in action!)",
      "",
      "🦖 Dino Fact: The best projects solve real problems!",
      "Look for ones that make you go 'Whoa, that's clever!' 🤯",
      "",
      "Press ENTER to continue..."
    ],
    next: "skills"
  },
  skills: {
    title: "💪 Skills - The Arsenal",
    content: [
      "Want to know what tools are in the toolbox?",
      "",
      "🎯 Type: skills",
      "",
      "You'll see:",
      "  • Frontend magic (React, TypeScript, etc.)",
      "  • Backend wizardry (Node.js, databases)",
      "  • DevOps superpowers (Docker, CI/CD)",
      "  • And MORE!",
      "",
      "Each skill shows a proficiency level - those bars aren't just",
      "for show! They represent REAL experience and confidence.",
      "",
      "🦕 Dino Wisdom: Skills aren't just learned, they're EARNED",
      "through countless hours of coding, debugging, and coffee! ☕",
      "",
      "Press ENTER to continue..."
    ],
    next: "games"
  },
  games: {
    title: "🎮 Games & Fun Features",
    content: [
      "Work hard, play hard! This portfolio has GAMES!",
      "",
      "🎯 Interactive Features:",
      "  • snake      - Classic snake game (beat my high score!)",
      "  • matrix     - Enter the Matrix 🟢",
      "  • hack       - Simulate hacking (totally legal, I promise)",
      "  • cowsay     - Make a cow say things",
      "  • figlet     - ASCII art text generator",
      "",
      "Easter Eggs 🥚:",
      "  • Try typing 'sudo' (you'll see...)",
      "  • Type 'ls -la' to find hidden files",
      "  • Type 'cat secret.txt' for secrets",
      "",
      "🦖 These aren't just fun - they show coding creativity!",
      "",
      "Press ENTER to continue..."
    ],
    next: "customization"
  },
  customization: {
    title: "🎨 Customization - Make It Yours",
    content: [
      "Don't like the green? I got you! 🎨",
      "",
      "🌈 Try these commands:",
      "  • theme          - See all available themes",
      "  • theme matrix   - Classic green on black",
      "  • theme dracula  - Purple and pink vibes",
      "  • theme cyberpunk - Neon city aesthetic",
      "  • theme synthwave - Retro 80s cool",
      "",
      "There are 8 themes total! Each changes the entire terminal's",
      "color scheme. Find your favorite!",
      "",
      "🦕 My favorite? Matrix theme - reminds me of my coding days",
      "in the Cretaceous period! (Yes, dinosaurs coded. Obviously.)",
      "",
      "Press ENTER to continue..."
    ],
    next: "tips"
  },
  tips: {
    title: "💡 Pro Tips from Dino",
    content: [
      "Alright, time for some ADVANCED techniques! 🚀",
      "",
      "⌨️  Keyboard Shortcuts:",
      "  • ↑↓ arrows    - Navigate command history",
      "  • TAB          - Autocomplete commands",
      "  • Ctrl+L       - Clear screen (same as 'clear')",
      "  • Ctrl+C       - Cancel current operation",
      "",
      "🎯 Smart Navigation:",
      "  • Type incomplete commands to see options",
      "  • Use 'history' to see past commands",
      "  • Try 'stats' for portfolio statistics",
      "",
      "📱 Mobile Users:",
      "  • Swipe shortcuts panel for quick commands",
      "  • Tap suggestions to auto-complete",
      "",
      "🦖 Dino's Ultimate Tip: EXPLORE! Try random commands,",
      "break things (you can't actually break it), and have FUN!",
      "",
      "Press ENTER for final thoughts..."
    ],
    next: "goodbye"
  },
  goodbye: {
    title: "🌟 You're Ready!",
    content: [
      "That's it! You're now a Terminal Portfolio Pro! 🎓",
      "",
      "🦕 Remember:",
      "  • This isn't just a portfolio - it's a playground",
      "  • Every command tells a story",
      "  • The terminal aesthetic is INTENTIONAL (it's cool!)",
      "  • Hidden features reward the curious",
      "",
      "🚀 What to do next:",
      "  1. Type 'help' to see all commands",
      "  2. Check out the projects (seriously, they're cool)",
      "  3. Play some snake (beat my score of 42!)",
      "  4. Find the easter eggs 🥚",
      "",
      "Need me again? Just type 'surf' anytime!",
      "",
      "Now go explore! I'll be here if you need me. 🦖💚",
      "",
      "- Dino, Your Friendly Terminal Guide",
      "",
      "Press ENTER to close..."
    ],
    next: null
  }
};

export default function DinoGuide({ theme }: DinoGuideProps) {
  const [currentSection, setCurrentSection] = useState<Section>("welcome");
  const [inputValue, setInputValue] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [dinoFrame, setDinoFrame] = useState(0);
  const [dinoPosition, setDinoPosition] = useState(0);

  // Animate dino running
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setDinoFrame((prev) => (prev + 1) % dinoFrames.length);
    }, 150); // Change frame every 150ms

    const positionInterval = setInterval(() => {
      setDinoPosition((prev) => (prev + 2) % 100); // Move dino across screen
    }, 50);

    return () => {
      clearInterval(frameInterval);
      clearInterval(positionInterval);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleContinue();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [currentSection]);

  const handleContinue = () => {
    const section = sections[currentSection];
    if (section.next) {
      setCurrentSection(section.next);
      setInputValue("");
    } else {
      // Tour completed
      setShowPrompt(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    
    if (value === "skip") {
      setShowPrompt(false);
    }
  };

  const section = sections[currentSection];
  const textColor = theme?.text || "#00ff00";
  const promptColor = theme?.prompt || "#00ff00";
  const infoColor = theme?.info || "#00ffff";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 relative"
    >
      {/* Running Dinosaur Animation */}
      <div className="relative h-32 overflow-hidden border-b border-current/30 mb-6">
        <motion.div
          animate={{ x: `${dinoPosition}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
          className="absolute bottom-4"
          style={{ left: 0 }}
        >
          <motion.pre
            key={dinoFrame}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            style={{ color: promptColor }}
            className="text-sm md:text-base leading-tight whitespace-pre"
          >
            {dinoFrames[dinoFrame]}
          </motion.pre>
        </motion.div>
        
        {/* Ground line */}
        <div 
          className="absolute bottom-2 left-0 right-0 h-0.5"
          style={{ backgroundColor: promptColor, opacity: 0.3 }}
        />
        
        {/* Dino Guide Label */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2"
          style={{ color: infoColor }}
        >
          <div className="text-xl md:text-2xl font-bold text-center">
            🦕 DINO GUIDE 🦕
          </div>
          <div className="text-xs text-center opacity-70">
            Your Interactive Portfolio Tour
          </div>
        </motion.div>
      </div>

      {/* Section Title */}
      <motion.div
        key={currentSection}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ color: infoColor }}
        className="text-xl font-bold mb-4 border-b border-current pb-2"
      >
        {section.title}
      </motion.div>

      {/* Content - Speech Bubble Style */}
      <motion.div
        key={`${currentSection}-content`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        {/* Speech bubble container */}
        <div 
          className="relative p-6 rounded-lg border-2"
          style={{ 
            borderColor: infoColor,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(${parseInt(infoColor.slice(1, 3), 16)}, ${parseInt(infoColor.slice(3, 5), 16)}, ${parseInt(infoColor.slice(5, 7), 16)}, 0.1)`
          }}
        >
          {/* Speech bubble pointer */}
          <div 
            className="absolute -top-3 left-8 w-6 h-6 rotate-45 border-l-2 border-t-2"
            style={{ 
              borderColor: infoColor,
              backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}
          />
          
          <div className="space-y-1 relative z-10">
            {section.content.map((line, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                style={{ 
                  color: line.startsWith("  •") || line.startsWith("🦕") || line.startsWith("🦖") 
                    ? infoColor 
                    : textColor,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                }}
                className="font-mono text-sm leading-relaxed"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 pt-4 border-t border-current/30"
        >
          <div style={{ color: textColor }} className="text-sm mb-2">
            Progress: {Object.keys(sections).indexOf(currentSection) + 1} / {Object.keys(sections).length}
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: promptColor }} className="text-sm">
              {currentSection === "welcome" ? "Type 'skip' or press ENTER →" : "Press ENTER to continue →"}
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: promptColor }}
            >
              _
            </motion.span>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="opacity-0 absolute"
            autoFocus
          />
        </motion.div>
      )}

      {/* Completion Message */}
      {!showPrompt && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ color: infoColor }}
          className="mt-6 text-center text-lg font-bold"
        >
          🦖 Happy exploring! Type 'help' to get started! 🚀
        </motion.div>
      )}
    </motion.div>
  );
}
