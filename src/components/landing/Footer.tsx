'use client';

import React from 'react';
import Link from 'next/link';
import { CustomIcon } from '@/components/ui/CustomIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-axon-border/40 py-12 px-4 bg-axon-bg/90 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-axon-violet-500/20 border border-axon-violet-500/40 flex items-center justify-center">
            <CustomIcon name="BrainCircuit" size={18} color="#a855f7" glow />
          </div>
          <div>
            <span className="text-base font-extrabold text-white tracking-wider">AXON</span>
            <p className="text-xs text-slate-500 font-mono">
              The missing coordination layer for autonomous AI agents.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
          <span>OKX.AI Hackathon Submission</span>
          <span>•</span>
          <Link href="/console" className="hover:text-axon-violet-400 transition-colors">
            Live Platform Console
          </Link>
          <span>•</span>
          <span className="text-emerald-400">X Layer Mainnet Ready</span>
        </div>
      </div>
    </footer>
  );
};
