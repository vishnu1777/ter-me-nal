export const themes = {
  classic: {
    name: "Classic",
    bg: "#0a0a0a",
    text: "#00ff00",
    prompt: "#00ff00",
    error: "#ff0000",
    warning: "#ffff00",
    info: "#00ffff",
    accent: "#00ff00",
  },
  matrix: {
    name: "Matrix",
    bg: "#000000",
    text: "#00ff41",
    prompt: "#00ff41",
    error: "#ff0000",
    warning: "#ffff00",
    info: "#00ffff",
    accent: "#00ff41",
  },
  dracula: {
    name: "Dracula",
    bg: "#282a36",
    text: "#f8f8f2",
    prompt: "#ff79c6",
    error: "#ff5555",
    warning: "#f1fa8c",
    info: "#8be9fd",
    accent: "#bd93f9",
  },
  nord: {
    name: "Nord",
    bg: "#2e3440",
    text: "#d8dee9",
    prompt: "#88c0d0",
    error: "#bf616a",
    warning: "#ebcb8b",
    info: "#81a1c1",
    accent: "#5e81ac",
  },
  cyberpunk: {
    name: "Cyberpunk",
    bg: "#0a0e27",
    text: "#f0e68c",
    prompt: "#ff00ff",
    error: "#ff0066",
    warning: "#ffff00",
    info: "#00ffff",
    accent: "#ff00ff",
  },
  hacker: {
    name: "Hacker",
    bg: "#000000",
    text: "#0f0",
    prompt: "#0f0",
    error: "#f00",
    warning: "#ff0",
    info: "#0ff",
    accent: "#0f0",
  },
  retro: {
    name: "Retro",
    bg: "#1a1a1a",
    text: "#ffb000",
    prompt: "#ffb000",
    error: "#ff0000",
    warning: "#ffff00",
    info: "#00ffff",
    accent: "#ffb000",
  },
  synthwave: {
    name: "Synthwave",
    bg: "#1a0033",
    text: "#ff6ad5",
    prompt: "#00d9ff",
    error: "#ff2a6d",
    warning: "#ffd400",
    info: "#05ffa1",
    accent: "#ff6ad5",
  },
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const calculateProgress = (proficiency: number) => {
  return Math.min(100, Math.max(0, proficiency));
};

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateVisitorId = () => {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const devJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "Why do Java developers wear glasses? Because they don't C#!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "I would tell you a UDP joke, but you might not get it.",
  "There are 10 types of people in this world: those who understand binary and those who don't.",
  "A programmer's spouse tells them: 'Run to the store and pick up a loaf of bread. If they have eggs, get a dozen.' The programmer comes home with 12 loaves of bread.",
  "Why did the programmer quit his job? Because he didn't get arrays.",
];

export const techQuotes = [
  "Code is like humor. When you have to explain it, it's bad. - Cory House",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "The best error message is the one that never shows up. - Thomas Fuchs",
  "Simplicity is the soul of efficiency. - Austin Freeman",
  "Make it work, make it right, make it fast. - Kent Beck",
  "Code never lies, comments sometimes do. - Ron Jeffries",
  "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
];
