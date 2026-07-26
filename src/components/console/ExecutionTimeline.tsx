'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExecutionTimelineEvent } from '@/types';
import { CustomIcon } from '@/components/ui/CustomIcons';

interface ExecutionTimelineProps {
  timeline: ExecutionTimelineEvent[];
}

const getStateStyle = (state: string) => {
  switch (state) {
    case 'HANDOFF_COMPLETED':
      return { dot: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', line: 'from-emerald-500/40' };
    case 'HANDOFF_PENDING':
      return { dot: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30', line: 'from-amber-500/40' };
    case 'EXECUTING':
      return { dot: 'bg-axon-violet-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]', badge: 'bg-axon-violet-500/15 text-axon-violet-300 border-axon-violet-500/30', line: 'from-axon-violet-500/40' };
    case 'COMPLETED':
      return { dot: 'bg-axon-magenta shadow-[0_0_10px_rgba(232,121,249,0.7)]', badge: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30', line: 'from-fuchsia-500/40' };
    case 'ROUTING':
    case 'AGENT_ASSIGNED':
      return { dot: 'bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]', badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30', line: 'from-cyan-500/40' };
    default:
      return { dot: 'bg-axon-violet-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]', badge: 'bg-axon-violet-500/15 text-axon-violet-300 border-axon-violet-500/30', line: 'from-axon-violet-500/40' };
  }
};

export const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({ timeline }) => {
  const hasEvents = timeline && timeline.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative edge-glow"
    >
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-axon-violet-500/20 via-transparent to-axon-magenta/10 pointer-events-none" />

      <div className="bg-axon-card/80 backdrop-blur-2xl border border-axon-border/40 rounded-3xl p-7 max-h-[600px] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-axon-border/30">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-axon-violet-500 to-axon-magenta rounded-xl blur-sm opacity-40" />
              <div className="relative p-2.5 rounded-xl bg-axon-bg/90 border border-axon-violet-400/30">
                <CustomIcon name="Zap" size={18} color="#a855f7" glow />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Deterministic Execution Audit Log
              </h3>
              <p className="text-[11px] text-slate-500">
                Cryptographic state transition record • Tamper-proof timeline
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-axon-bg/70 border border-axon-border/40 text-xs font-mono text-slate-400">
            <span className="text-white font-bold">{timeline ? timeline.length : 0}</span> events recorded
          </div>
        </div>

        {/* Timeline Events */}
        {hasEvents ? (
          <div className="relative pl-6 space-y-1">
            <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-axon-violet-500/30 via-axon-violet-500/10 to-transparent" />
            {timeline.map((evt, idx) => {
              const style = getStateStyle(evt.state);
              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group py-3"
                >
                  <div className={`absolute -left-[14px] top-4 w-3 h-3 rounded-full ${style.dot} ring-4 ring-axon-bg/90 z-10 transition-transform group-hover:scale-125`} />
                  <div className="ml-4 p-4 rounded-2xl bg-axon-bg/40 border border-axon-border/20 group-hover:border-axon-violet-500/30 group-hover:bg-axon-bg/60 transition-all duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase border ${style.badge} tracking-wider`}>
                            {evt.state}
                          </span>
                          <span className="text-xs font-semibold text-white/90">{evt.actorName}</span>
                          {evt.state === 'HANDOFF_PENDING' && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-axon-violet-500/20 text-axon-violet-300 border border-axon-violet-500/30 flex items-center gap-1">
                              <CustomIcon name="BrainCircuit" size={10} color="#c084fc" />
                              Llama-3.3-70B Dynamic Router
                            </span>
                          )}
                        </div>
                        <p className={`text-[12px] leading-relaxed ${
                          evt.state === 'HANDOFF_PENDING' ? 'text-axon-violet-200 font-medium' : 'text-slate-400'
                        }`}>{evt.message}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-600 whitespace-nowrap pt-0.5">
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 font-mono text-xs">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-axon-violet-500/8 border border-axon-violet-500/15 flex items-center justify-center">
              <CustomIcon name="FileText" size={20} color="#a855f7" />
            </div>
            No execution events recorded yet. Submit a prompt or choose a preset flow to observe real-time audit logs.
          </div>
        )}
      </div>
    </motion.div>
  );
};
