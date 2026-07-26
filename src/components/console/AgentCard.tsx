'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types';
import { CustomIcon } from '@/components/ui/CustomIcons';

interface AgentCardProps {
  agent: Agent;
  isActive?: boolean;
  index?: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive = false, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 0.08 * index, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25, type: 'spring', stiffness: 300 } }}
      className="group relative edge-glow"
    >
      {/* Hover glow border */}
      <div className={`absolute -inset-[1px] rounded-3xl transition-all duration-500 ${
        isActive
          ? 'bg-gradient-to-br from-axon-violet-400/60 via-axon-magenta/40 to-purple-500/60 opacity-100'
          : 'bg-gradient-to-br from-axon-violet-500/0 to-axon-magenta/0 group-hover:from-axon-violet-500/40 group-hover:to-axon-magenta/30 opacity-0 group-hover:opacity-100'
      }`} />

      <div className={`relative p-6 rounded-3xl border backdrop-blur-2xl transition-all duration-500 h-full flex flex-col ${
        isActive
          ? 'bg-axon-violet-900/30 border-transparent shadow-[0_0_50px_rgba(168,85,247,0.3)]'
          : 'bg-axon-card/70 border-axon-border/30 group-hover:border-transparent group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]'
      }`}>
        {/* Top accent line */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-axon-violet-500/30 to-transparent group-hover:via-axon-violet-400/70 transition-all duration-500" />

        {/* Background aura */}
        <div className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{ background: `radial-gradient(circle, ${agent.color}10 0%, transparent 70%)` }} />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 rounded-2xl border"
                  style={{ borderColor: `${agent.color}40` }}
                />
              )}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg"
                style={{ backgroundColor: `${agent.color}12`, borderColor: `${agent.color}35`, boxShadow: `0 4px 20px ${agent.color}15` }}
              >
                <CustomIcon name={agent.iconName} size={24} color={agent.color} glow={isActive} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {agent.name}
                {isActive && (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                  />
                )}
              </h4>
              <p className="text-[11px] text-slate-500 font-mono">{agent.role}</p>
            </div>
          </div>

          <span
            className="px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase border tracking-wider"
            style={{ backgroundColor: `${agent.color}10`, borderColor: `${agent.color}30`, color: agent.color }}
          >
            {agent.category}
          </span>
        </div>

        <p className="text-[12px] text-slate-400/90 mb-5 line-clamp-2 leading-relaxed">{agent.description}</p>

        {/* Model Row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-axon-bg/50 border border-axon-border/20 text-[11px] font-mono mb-4">
          <span className="text-slate-500">Model</span>
          <span className="text-white/80 font-semibold">{agent.modelProvider} • {agent.modelName}</span>
        </div>

        {/* Capability Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {agent.capabilities.slice(0, 3).map((cap) => (
            <span key={cap} className="px-2 py-0.5 rounded-lg text-[9px] font-mono bg-axon-violet-500/8 border border-axon-violet-500/15 text-axon-violet-300/80">
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="px-2 py-0.5 rounded-lg text-[9px] font-mono bg-axon-bg/40 border border-axon-border/20 text-slate-500">
              +{agent.capabilities.length - 3}
            </span>
          )}
        </div>

        {/* Metrics — elevated design */}
        <div className="mt-auto pt-4 border-t border-axon-border/15">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-axon-bg/40 border border-axon-border/10">
              <span className="text-[8px] text-slate-600 uppercase tracking-widest block mb-0.5">Tasks</span>
              <span className="text-sm font-bold text-white">{agent.metrics.totalTasksCompleted}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-axon-bg/40 border border-axon-border/10">
              <span className="text-[8px] text-slate-600 uppercase tracking-widest block mb-0.5">Handoffs</span>
              <span className="text-sm font-bold" style={{ color: agent.color }}>{agent.metrics.handoffCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-axon-bg/40 border border-axon-border/10">
              <span className="text-[8px] text-slate-600 uppercase tracking-widest block mb-0.5">Success</span>
              <span className="text-sm font-bold text-emerald-400">{agent.metrics.successRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
