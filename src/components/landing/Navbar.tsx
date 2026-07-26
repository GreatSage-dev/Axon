'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CustomIcon } from '@/components/ui/CustomIcons';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      {/* Full-width glass container with noticeable frosted effect */}
      <div className="max-w-7xl mx-auto bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(168,85,247,0.06)]">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-axon-violet-600 to-axon-magenta p-[1px] shadow-glowSm transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-axon-bg/90 rounded-[11px] flex items-center justify-center backdrop-blur-sm">
                <CustomIcon name="BrainCircuit" size={20} color="#a855f7" glow />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-white tracking-wider font-sans flex items-center gap-1.5">
                AXON
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-axon-violet-500/15 text-axon-violet-400 border border-axon-violet-500/20">
                  AI PROTOCOL
                </span>
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 font-sans text-[13px] font-medium text-slate-400">
            <Link href="#features" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all duration-300">
              Protocol Features
            </Link>
            <Link href="#handoff" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all duration-300">
              Context Handoff
            </Link>
            <Link href="#xlayer" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all duration-300">
              X Layer Proofs
            </Link>
            <Link href="#architecture" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all duration-300">
              System Specs
            </Link>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/console"
              className="hidden md:flex px-5 py-2.5 rounded-full bg-gradient-to-r from-axon-violet-600 via-axon-violet-700 to-axon-violet-900 hover:from-axon-violet-500 hover:to-axon-violet-800 text-white font-semibold text-xs tracking-wider shadow-glow items-center gap-2 border border-axon-violet-400/40 transition-all hover:scale-105"
            >
              <CustomIcon name="Zap" size={14} color="#ffffff" />
              Launch Live Console
            </Link>
            
            <button 
              className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <CustomIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-axon-card/95 backdrop-blur-2xl border border-axon-border rounded-2xl p-4 shadow-glow md:hidden"
          >
            <nav className="flex flex-col gap-2 font-sans text-sm font-medium text-slate-300">
              <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all">
                Protocol Features
              </Link>
              <Link href="#handoff" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all">
                Context Handoff
              </Link>
              <Link href="#xlayer" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all">
                X Layer Proofs
              </Link>
              <Link href="#architecture" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all">
                System Specs
              </Link>
              <Link
                href="/console"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-axon-violet-600 via-axon-violet-700 to-axon-violet-900 text-white font-semibold text-center flex items-center justify-center gap-2 border border-axon-violet-400/40"
              >
                <CustomIcon name="Zap" size={14} color="#ffffff" />
                Launch Live Console
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
