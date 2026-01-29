"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

export default function Cursor() {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  return (
    <motion.span
      className="inline-block w-2 h-5 ml-1"
      style={{ backgroundColor: currentTheme.text }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
    ></motion.span>
  );
}
