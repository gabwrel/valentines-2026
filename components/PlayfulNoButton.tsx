import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PlayfulNoButton: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [missCount, setMissCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Placeholder sound for error
  const errorSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    errorSound.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    );
    errorSound.current.volume = 0.3;
  }, []);

  const moveButton = () => {
    const randomX = (Math.random() - 0.5) * 350;
    const randomY = (Math.random() - 0.5) * 350;
    setPosition({ x: randomX, y: randomY });

    // Play sound
    if (errorSound.current) {
      errorSound.current.currentTime = 0;
      errorSound.current.play().catch(() => {}); // Catch browser blocking
    }

    setMissCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (missCount >= 3) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [missCount]);

  return (
    <div className="relative">
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-rose-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold border border-rose-400 shadow-2xl z-[60] flex items-center gap-3"
          >
            <span>I think you meant to press "Yes" 🫣</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💗
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={{ x: position.x, y: position.y }}
        onHoverStart={moveButton}
        onClick={moveButton}
        className="px-8 py-3 bg-white text-rose-400 border border-rose-200 rounded-full font-medium shadow-sm transition-all hover:shadow-md cursor-default relative z-10"
      >
        🤍 No
      </motion.button>
    </div>
  );
};
