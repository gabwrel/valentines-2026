
import React from 'react';
import { motion } from 'framer-motion';
import { TimelineItem } from '../types';

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex w-full mb-24 ${isEven ? 'justify-start' : 'justify-end'}`}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full md:w-5/12 p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-rose-100"
      >
        <div className="text-4xl mb-4">{item.icon}</div>
        <h3 className="text-2xl font-bold text-rose-800 mb-2 italic serif">{item.title}</h3>
        <p className="text-rose-700 leading-relaxed font-light">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
};
