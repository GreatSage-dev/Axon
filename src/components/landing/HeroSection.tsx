'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollRevealHeading } from './ScrollRevealHeading';
import { ArrowFollowCanvas } from '@/components/console/ArrowFollowCanvas';
import { INITIAL_AGENTS } from '@/engine/agentRegistry';
import { CustomIcon } from '@/components/ui/CustomIcons';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-36 pb-20 px-4 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Top Floating Badge */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-axon-violet-900/60 border border-axon-violet-400/30 text-xs font-mono text-axon-violet-300 shadow-glowSm"
        >
          <span className="w-2 h-2 rounded-full bg-axon-magenta animate-pulse" />
          <span>OKX.AI Hackathon Build • Autonomous Multi-Agent Infrastructure</span>
        </motion.div>
      </div>

      {/* Main Masked Scroll Reveal Heading */}
      <div className="text-center max-w-4xl mx-auto mb-6">
        <ScrollRevealHeading
          text="The Missing Coordination Layer for Autonomous AI Agents."
          tag="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight justify-center text-center leading-tight"
          highlightWords={['Coordination', 'Autonomous', 'Agents.']}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Axon orchestrates specialist AI agents with structured Context Packets. When work is transferred,
          context is cryptographically preserved—eliminating user repeat &amp; task degradation.
        </motion.p>
      </div>

      {/* Hero Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <Link
          href="/console"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-axon-violet-600 via-axon-violet-700 to-axon-violet-900 hover:from-axon-violet-500 hover:to-axon-violet-800 text-white font-bold text-sm tracking-wider shadow-glow border border-axon-violet-400/40 flex items-center justify-center gap-3 transition-all hover:scale-105"
        >
          <CustomIcon name="Zap" size={18} color="#ffffff" />
          Enter Live Platform Console
        </Link>

        <a
          href="#handoff"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-axon-card/80 border border-axon-border hover:border-axon-violet-500/50 text-slate-200 font-semibold text-sm tracking-wider flex items-center justify-center gap-3 transition-all hover:bg-axon-violet-900/20"
        >
          <CustomIcon name="FileText" size={18} color="#a855f7" />
          Inspect Context Protocol Specs
        </a>
      </motion.div>

      {/* Hero Canvas Showcase (Custos Magnetic Arrow Follow Visualizer) */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-axon-violet-600 via-axon-magenta to-axon-violet-900 rounded-3xl blur-xl opacity-40 animate-pulseSlow" />
        <ArrowFollowCanvas agents={INITIAL_AGENTS} currentState="EXECUTING" handoffCount={4} />
      </motion.div>
    </section>
  );
};
