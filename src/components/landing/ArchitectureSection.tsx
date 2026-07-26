'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollRevealHeading } from '@/components/landing/ScrollRevealHeading';
import { CustomIcon } from '@/components/ui/CustomIcons';

const STATES = [
  { name: 'REQUEST_RECEIVED', icon: 'Inbox' },
  { name: 'ROUTING', icon: 'GitMerge' },
  { name: 'AGENT_ASSIGNED', icon: 'UserCheck' },
  { name: 'EXECUTING', icon: 'PlayCircle' },
  { name: 'HANDOFF_PENDING', icon: 'Loader' },
  { name: 'HANDOFF_COMPLETED', icon: 'CheckCircle' },
  { name: 'COMPLETED', icon: 'Flag' },
];

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-24 px-4 max-w-7xl mx-auto z-10 relative">
      <div className="bg-axon-card/80 backdrop-blur-2xl border border-axon-border rounded-3xl p-8 md:p-12 shadow-glow relative overflow-hidden">
        {/* Edge glow effect */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-axon-cyan to-transparent opacity-50"></div>
        
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase text-axon-cyan tracking-wider px-3 py-1 rounded-full bg-axon-cyan/10 border border-axon-cyan/30 inline-block mb-4">
            Protocol Architecture
          </span>
          <ScrollRevealHeading
            text="Context Handoff State Machine"
            tag="h2"
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 justify-center text-center"
            highlightWords={['State', 'Machine']}
          />
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
            Axon uses a strict deterministic state machine to manage context transfer between agents, ensuring complete traceability and preventing runaway loops.
          </p>
        </div>

        {/* State Machine Visualizer */}
        <div className="mb-16 overflow-x-auto pb-6 custom-scrollbar">
          <div className="flex items-center min-w-max px-4">
            {STATES.map((state, idx) => (
              <React.Fragment key={state.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-3 w-32"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-glowSm
                    ${idx === STATES.length - 1 ? 'bg-axon-magenta/20 border-axon-magenta' : 'bg-axon-violet-900/40 border-axon-violet-500/50'}`}>
                    <CustomIcon name={state.icon as any} size={20} color={idx === STATES.length - 1 ? '#e879f9' : '#a855f7'} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 text-center uppercase tracking-wider">{state.name.replace('_', ' ')}</span>
                </motion.div>
                
                {idx < STATES.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 48 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    className="w-12 h-[2px] bg-axon-border relative flex-shrink-0 mx-2"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-axon-violet-400"></div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* System Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-axon-bg/60 border border-axon-border/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <CustomIcon name="Server" size={20} color="#38bdf8" />
              <h3 className="text-white font-bold">API Specifications</h3>
            </div>
            <ul className="space-y-3 font-mono text-xs text-slate-300">
              <li className="flex justify-between items-center border-b border-axon-border/20 pb-2">
                <span className="text-slate-500">Core RPC</span>
                <span className="text-axon-cyan">wss://rpc.axon.network</span>
              </li>
              <li className="flex justify-between items-center border-b border-axon-border/20 pb-2">
                <span className="text-slate-500">Rate Limits</span>
                <span className="text-axon-cyan">1000 req/sec</span>
              </li>
              <li className="flex justify-between items-center border-b border-axon-border/20 pb-2">
                <span className="text-slate-500">Latency</span>
                <span className="text-axon-cyan">&lt; 50ms</span>
              </li>
              <li className="flex justify-between items-center pt-1">
                <span className="text-slate-500">GraphQL</span>
                <span className="text-axon-cyan">/api/v1/graphql</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl bg-axon-bg/60 border border-axon-border/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <CustomIcon name="Cpu" size={20} color="#e879f9" />
              <h3 className="text-white font-bold">Protocol Features</h3>
            </div>
            <ul className="space-y-3 font-mono text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CustomIcon name="Check" size={14} color="#10b981" />
                Deterministic Agent Routing
              </li>
              <li className="flex items-center gap-2">
                <CustomIcon name="Check" size={14} color="#10b981" />
                Cryptographic Context Verification
              </li>
              <li className="flex items-center gap-2">
                <CustomIcon name="Check" size={14} color="#10b981" />
                Zero-Knowledge Proofs on X Layer
              </li>
              <li className="flex items-center gap-2">
                <CustomIcon name="Check" size={14} color="#10b981" />
                Decentralized Orchestration Log
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
