"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface Achievement {
  achievement: {
    name: string;
    description: string;
    icon: string;
    rarity: string;
    points: number;
  };
  unlockedAt: Date;
}

interface AchievementsProps {
  data?: Achievement[];
}

const defaultAchievements: Achievement[] = [
  {
    achievement: {
      name: "First Command",
      description: "Executed your first command",
      icon: "🎯",
      rarity: "common",
      points: 10,
    },
    unlockedAt: new Date(),
  },
  {
    achievement: {
      name: "Explorer",
      description: "Viewed all sections",
      icon: "🗺️",
      rarity: "rare",
      points: 25,
    },
    unlockedAt: new Date(),
  },
];

export default function Achievements({
  data = defaultAchievements,
}: AchievementsProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "#FFD700";
      case "epic":
        return "#9B59B6";
      case "rare":
        return "#3498DB";
      default:
        return currentTheme.text;
    }
  };

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        🏆 Achievements
      </div>

      <div className="text-sm" style={{ color: currentTheme.info }}>
        Total Points: {data.reduce((sum, a) => sum + a.achievement.points, 0)}
      </div>

      {data.length === 0 ? (
        <div style={{ color: currentTheme.text }} className="opacity-60">
          No achievements unlocked yet. Keep exploring!
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border rounded p-3 flex items-center gap-4"
              style={{
                borderColor: getRarityColor(achievement.achievement.rarity),
                borderWidth: 2,
              }}
            >
              <div className="text-3xl">{achievement.achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    style={{ color: currentTheme.accent }}
                    className="font-bold"
                  >
                    {achievement.achievement.name}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded uppercase"
                    style={{
                      color: getRarityColor(achievement.achievement.rarity),
                      borderColor: getRarityColor(
                        achievement.achievement.rarity,
                      ),
                      borderWidth: 1,
                    }}
                  >
                    {achievement.achievement.rarity}
                  </span>
                </div>
                <div
                  style={{ color: currentTheme.text }}
                  className="text-sm opacity-80"
                >
                  {achievement.achievement.description}
                </div>
                <div
                  className="text-xs opacity-60 mt-1"
                  style={{ color: currentTheme.info }}
                >
                  +{achievement.achievement.points} points • Unlocked{" "}
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div
        className="mt-4 text-xs opacity-60"
        style={{ color: currentTheme.text }}
      >
        💡 Discover more achievements by exploring different commands!
      </div>
    </div>
  );
}
