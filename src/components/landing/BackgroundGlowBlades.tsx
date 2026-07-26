'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const BackgroundGlowBlades: React.FC = () => {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bladeRotateLeft = useTransform(scrollY, [0, 2000], [-18, -45]);
  const bladeRotateRight = useTransform(scrollY, [0, 2000], [18, 45]);
  const bladeScale = useTransform(scrollY, [0, 1000], [1, 1.25]);
  const glowOpacity = useTransform(scrollY, [0, 800], [0.6, 0.9]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-axon-bg">
      {/* Background Noise Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-repeat"
        style={{
          backgroundImage: `radial-gradient(rgba(168, 85, 247, 0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Center Ambient Flare */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-axon-violet-600/40 via-axon-violet-800/20 to-transparent blur-[120px] rounded-full pointer-events-none"
      />

      {/* Left Light Blade (Image 2 style angular glowing lens blade) */}
      <motion.div
        style={{
          rotate: bladeRotateLeft,
          scale: bladeScale,
        }}
        className="absolute -top-[100px] -left-[150px] w-[320px] h-[850px] bg-gradient-to-tr from-axon-violet-900/10 via-axon-violet-500/30 to-axon-magenta/40 blur-[80px] rounded-[100px] shadow-blade transform-gpu border-r border-axon-violet-400/20"
      />

      {/* Right Light Blade (Image 2 style angular glowing lens blade) */}
      <motion.div
        style={{
          rotate: bladeRotateRight,
          scale: bladeScale,
        }}
        className="absolute -top-[100px] -right-[150px] w-[320px] h-[850px] bg-gradient-to-tl from-axon-violet-900/10 via-axon-violet-500/30 to-axon-magenta/40 blur-[80px] rounded-[100px] shadow-blade transform-gpu border-l border-axon-violet-400/20"
      />

      {/* Central Floating Violet Aura */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-axon-violet-700/10 blur-[150px] rounded-full animate-pulseSlow" />

      {/* Bottom Glow Horizon */}
      <div className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[1100px] h-[400px] bg-gradient-to-t from-axon-violet-600/30 via-axon-violet-900/10 to-transparent blur-[100px] rounded-[100%]" />
    </div>
  );
};
