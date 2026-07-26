'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  // Link animation progress to scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'start 0.6'], // animate as section enters viewport
  });

  const words = text.split(' ');
  const Tag = tag;

  return (
    <div ref={containerRef} className="overflow-hidden py-1">
      <Tag className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
        {words.map((word, idx) => {
          const isHighlight = highlightWords.some(
            (h) => h.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9]/g, '')
          );

          // Each word gets a staggered slice of the scroll progress
          const wordStart = (idx / words.length) * 0.6;
          const wordEnd = wordStart + 0.4;
          const wordOpacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0, 1]);
          const wordY = useTransform(scrollYProgress, [wordStart, wordEnd], [40, 0]);
          const wordBlur = useTransform(scrollYProgress, [wordStart, wordEnd], [6, 0]);

          return (
            <span key={idx} className="inline-block overflow-hidden py-1">
              <motion.span
                style={{
                  opacity: wordOpacity,
                  y: wordY,
                  filter: useTransform(wordBlur, (v) => `blur(${v}px)`),
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
