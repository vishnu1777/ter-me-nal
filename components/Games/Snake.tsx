"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface SnakeProps {
  onClose: () => void;
}

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

export default function Snake({ onClose }: SnakeProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>("UP");
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const checkCollision = useCallback(
    (head: Position) => {
      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return true;
      }

      // Check self collision
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          return true;
        }
      }

      return false;
    },
    [snake],
  );

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    const head = { ...snake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 10);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [
    snake,
    direction,
    food,
    gameOver,
    isPaused,
    checkCollision,
    generateFood,
    score,
  ]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === " ") {
        setIsPaused(!isPaused);
        return;
      }

      if (e.key === "r" && gameOver) {
        setSnake(INITIAL_SNAKE);
        setDirection("UP");
        setGameOver(false);
        setScore(0);
        generateFood();
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver, isPaused, onClose, generateFood]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <div
            style={{ color: currentTheme.accent }}
            className="text-2xl font-bold"
          >
            🐍 Snake Game
          </div>
          <div style={{ color: currentTheme.info }} className="text-xl">
            Score: {score}
          </div>
        </div>

        <div
          className="relative border-2"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            borderColor: currentTheme.accent,
            backgroundColor: currentTheme.bg,
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className="absolute transition-all duration-100"
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                backgroundColor:
                  index === 0 ? currentTheme.accent : currentTheme.info,
                border: `1px solid ${currentTheme.bg}`,
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute animate-pulse"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              backgroundColor: currentTheme.error,
              borderRadius: "50%",
            }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            >
              <div className="text-center">
                <div
                  style={{ color: currentTheme.error }}
                  className="text-3xl font-bold mb-4"
                >
                  Game Over!
                </div>
                <div
                  style={{ color: currentTheme.text }}
                  className="text-xl mb-4"
                >
                  Final Score: {score}
                </div>
                <div style={{ color: currentTheme.info }} className="text-sm">
                  Press R to restart or ESC to exit
                </div>
              </div>
            </div>
          )}

          {/* Paused Overlay */}
          {isPaused && !gameOver && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            >
              <div
                style={{ color: currentTheme.warning }}
                className="text-2xl font-bold"
              >
                PAUSED
              </div>
            </div>
          )}
        </div>

        <div
          style={{ color: currentTheme.text }}
          className="text-sm space-y-1 opacity-60"
        >
          <div>🎮 Use Arrow Keys or WASD to move</div>
          <div>⏸️ Press SPACE to pause</div>
          <div>🔄 Press R to restart (when game over)</div>
          <div>❌ Press ESC to exit</div>
        </div>
      </motion.div>
    </div>
  );
}
