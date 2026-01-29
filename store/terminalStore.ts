import { create } from "zustand";

export type Theme =
  | "classic"
  | "matrix"
  | "dracula"
  | "nord"
  | "cyberpunk"
  | "hacker"
  | "retro"
  | "synthwave";

export interface TerminalOutput {
  id: string;
  type: "command" | "output" | "error" | "success" | "info";
  content: string | React.ReactNode;
  timestamp: Date;
}

interface TerminalState {
  outputs: TerminalOutput[];
  history: string[];
  historyIndex: number;
  theme: Theme;
  isBooting: boolean;
  achievements: string[];
  commandCount: number;
  visitorId: string | null;

  addOutput: (output: Omit<TerminalOutput, "id" | "timestamp">) => void;
  addToHistory: (command: string) => void;
  setHistoryIndex: (index: number) => void;
  clearOutputs: () => void;
  setTheme: (theme: Theme) => void;
  setIsBooting: (isBooting: boolean) => void;
  unlockAchievement: (achievementId: string) => void;
  incrementCommandCount: () => void;
  setVisitorId: (id: string) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  outputs: [],
  history: [],
  historyIndex: -1,
  theme: "classic",
  isBooting: false, // Set to false to skip boot screen, true to show it
  achievements: [],
  commandCount: 0,
  visitorId: null,

  addOutput: (output) =>
    set((state) => ({
      outputs: [
        ...state.outputs,
        {
          ...output,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
        },
      ],
    })),

  addToHistory: (command) =>
    set((state) => ({
      history: [...state.history, command],
      historyIndex: -1,
    })),

  setHistoryIndex: (index) => set({ historyIndex: index }),

  clearOutputs: () => set({ outputs: [] }),

  setTheme: (theme) => set({ theme }),

  setIsBooting: (isBooting) => set({ isBooting }),

  unlockAchievement: (achievementId) =>
    set((state) => ({
      achievements: Array.from(new Set(state.achievements.concat(achievementId))),
    })),

  incrementCommandCount: () =>
    set((state) => ({ commandCount: state.commandCount + 1 })),

  setVisitorId: (id) => set({ visitorId: id }),
}));
