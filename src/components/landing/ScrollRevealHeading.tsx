'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealHeadingProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  delay?: number;
  highlightWords?: string[];
}

export const ScrollRevealHeading: React.FC<ScrollRevealHeadingProps> = ({
  text,
  className = '',
  tag = 'h2',
  delay = 0,
  highlightWords = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px -10% 0px' });

  const words = text.split(' ');

  const Tag = tag;

  return (
    <div ref={containerRef} className="overflow-hidden py-1">
      <Tag className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
        {words.map((word, idx) => {
          const isHighlight = highlightWords.some(
            (h) => h.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9]/g, '')
          );

          return (
            <span key={idx} className="inline-block overflow-hidden py-1">
              <motion.span
                initial={{ y: '110%', opacity: 0, filter: 'blur(10px)' }}
                animate={
                  isInView
                    ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                    : { y: '110%', opacity: 0, filter: 'blur(10px)' }
                }
                transition={{
                  duration: 0.85,
                  delay: delay + idx * 0.05,
                  ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier spring curve
                }}
                className={`inline-block transform-gpu ${
                  isHighlight
                    ? 'bg-gradient-to-r from-axon-violet-400 via-axon-magenta to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : ''
                }`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </Tag>
    </div>
  );
};
