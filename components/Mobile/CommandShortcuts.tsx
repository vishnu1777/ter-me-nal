'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { themes } from '@/lib/utils';

export default function MobileCommandShortcuts({ onCommand }: { onCommand: (cmd: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    // Show shortcuts on mobile/tablet
    const isMobile = window.innerWidth < 1024;
    setIsVisible(isMobile);

    const handleResize = () => {
      setIsVisible(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  const shortcuts = [
    { label: 'Help', cmd: 'help' },
    { label: 'About', cmd: 'about' },
    { label: 'Skills', cmd: 'skills' },
    { label: 'Projects', cmd: 'projects' },
    { label: 'Contact', cmd: 'contact' },
    { label: 'Clear', cmd: 'clear' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 backdrop-blur-md"
      style={{
        backgroundColor: `${currentTheme.bg}ee`,
        borderTop: `2px solid ${currentTheme.accent}`,
      }}
    >
      <div className="flex gap-2 overflow-x-auto pb-2">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.cmd}
            onClick={() => onCommand(shortcut.cmd)}
            className="px-4 py-2 rounded whitespace-nowrap text-sm font-mono transition-all active:scale-95"
            style={{
              backgroundColor: currentTheme.accent,
              color: currentTheme.bg,
            }}
          >
            {shortcut.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
