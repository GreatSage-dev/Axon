'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollRevealHeading } from './ScrollRevealHeading';
import { CustomIcon } from '@/components/ui/CustomIcons';

interface FeatureCard {
  title: string;
  description: string;
  iconName: string;
  tag: string;
  color: string;
}

const FEATURES: FeatureCard[] = [
  {
    title: 'Context Handoff Protocol (CHP)',
    description: 'Structured ContextPackets transfer original objective, task state, completed work, remaining work, constraints, and user preferences with zero chain-of-thought exposure.',
    iconName: 'Layers',
    tag: 'Hero Core Protocol',
    color: '#a855f7',
  },
  {
    title: 'Deterministic State Engine',
    description: 'Enforces robust state transitions: REQUEST_RECEIVED → ROUTING → AGENT_ASSIGNED → EXECUTING → HANDOFF_PENDING → HANDOFF_COMPLETED → COMPLETED.',
    iconName: 'BrainCircuit',
    tag: 'State Machine',
    color: '#e879f9',
  },
  {
    title: 'OKX X Layer Attestations',
    description: 'Every ContextPacket keccak256 state hash is cryptographically anchored onto OKX X Layer L2 for verifiable on-chain audit trails.',
    iconName: 'ShieldCheck',
    tag: 'Web3 & OKX',
    color: '#10b981',
  },
  {
    title: 'Modular Agent Registry',
    description: 'Easily plug in new specialist models (OpenAI, Anthropic, Groq, custom LLMs) with defined capability boundaries.',
    iconName: 'Network',
    tag: 'Extensibility',
    color: '#38bdf8',
  },
  {
    title: 'Custos Arrow Follow Physics',
    description: 'Interactive SVG vector canvas dynamic connection paths bend gracefully to cursor magnetic force for intuitive multi-agent inspection.',
    iconName: 'Zap',
    tag: 'UX Innovation',
    color: '#f59e0b',
  },
  {
    title: 'Zero Repeat Handoffs',
    description: 'Receiving specialist agents immediately pick up execution without asking the user to repeat past instructions or context.',
    iconName: 'FileText',
    tag: 'User Experience',
    color: '#c084fc',
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 max-w-7xl mx-auto z-10 relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <ScrollRevealHeading
          text="Powerful Infrastructure for Autonomous Agent Coordination"
          tag="h2"
          className="text-3xl md:text-5xl font-extrabold text-white text-center justify-center tracking-tight"
          highlightWords={['Infrastructure', 'Agent', 'Coordination']}
        />
        <p className="mt-4 text-slate-400 text-sm md:text-base font-sans">
          Engineered as foundational infrastructure rather than a generic chatbot wrapper.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="edge-glow p-6 rounded-2xl bg-axon-card/90 border border-axon-border hover:border-axon-violet-500/50 hover:shadow-glow backdrop-blur-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner"
                  style={{ backgroundColor: `${feat.color}20`, borderColor: `${feat.color}50` }}
                >
                  <CustomIcon name={feat.iconName} size={24} color={feat.color} glow />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-axon-violet-900/40 border border-axon-violet-500/30 text-axon-violet-300">
                  {feat.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">{feat.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-axon-border/40 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Status: Active</span>
              <span className="text-axon-violet-400 flex items-center gap-1">
                Learn Spec <CustomIcon name="ArrowUpRight" size={12} color="#a855f7" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
