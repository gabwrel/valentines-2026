
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HeartProps {
  delay: number;
  duration: number;
  left: string;
  size: number;
  fast?: boolean;
}

const Heart: React.FC<HeartProps> = ({ delay, duration, left, size, fast }) => {
  // Make the hearts slightly faster than normal but not 'aggressive'
  const currentDuration = fast ? duration * 0.6 : duration;
  
  return (
    <motion.div
      initial={{ y: '110vh', opacity: 0, scale: 0.5 }}
      animate={{ 
        y: '-10vh', 
        opacity: [0, 0.6, 0.6, 0],
        scale: [0.5, 1.1, 1.1, 0.8],
        rotate: [0, 45, -45, 0]
      }}
      transition={{
        duration: currentDuration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      style={{ left, position: 'fixed', zIndex: 0, pointerEvents: 'none' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fast ? "#ff758f" : "#f43f5e"}
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-sm ${fast ? 'opacity-70' : 'opacity-60'}`}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

export const HeartBackground: React.FC<{ fast?: boolean }> = ({ fast }) => {
  // Reduced count from 120 to 65 for a more elegant feel
  const count = fast ? 65 : 40;
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * (fast ? 8 : 15),
      duration: (fast ? 10 : 15) + Math.random() * 10,
      left: `${Math.random() * 100}%`,
      size: (fast ? 12 : 10) + Math.random() * 25
    }));
  }, [fast, count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {hearts.map(h => (
        <Heart key={h.id} {...h} fast={fast} />
      ))}
    </div>
  );
};
