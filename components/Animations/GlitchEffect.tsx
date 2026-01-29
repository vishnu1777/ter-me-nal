"use client";

import { motion } from "framer-motion";

interface GlitchEffectProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlitchEffect({
  children,
  className = "",
}: GlitchEffectProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}
