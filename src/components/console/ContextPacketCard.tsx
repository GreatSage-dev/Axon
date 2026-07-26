'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContextPacket, Agent } from '@/types';
import { CustomIcon } from '@/components/ui/CustomIcons';

interface ContextPacketCardProps {
  packet: ContextPacket;
  agents: Agent[];
  index: number;
}

export const ContextPacketCard: React.FC<ContextPacketCardProps> = ({
  packet,
  agents,
  index,
}) => {
  const [expanded, setExpanded] = useState(index === 0);

  const fromAgent = agents.find((a) => a.id === packet.fromAgentId);
  const toAgent = agents.find((a) => a.id === packet.toAgentId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-5 edge-glow"
    >
      {/* Outer glow border */}
      <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br transition-all duration-500 ${
        expanded
          ? 'from-axon-violet-500/40 via-axon-magenta/20 to-purple-500/30 opacity-100'
          : 'from-axon-violet-500/0 to-transparent opacity-0 group-hover:from-axon-violet-500/25 group-hover:opacity-100'
      }`} />

      <div className={`relative bg-axon-card/70 backdrop-blur-2xl border rounded-3xl overflow-hidden transition-all duration-500 ${
        expanded ? 'border-transparent shadow-[0_0_40px_rgba(168,85,247,0.15)]' : 'border-axon-border/30 group-hover:border-transparent'
      }`}>
        {/* Top accent gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-axon-violet-500/50 to-transparent" />

        {/* Handoff Header */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between cursor-pointer px-6 py-5"
        >
          <div className="flex items-center gap-4">
            {/* Handoff number badge */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-axon-violet-500 to-axon-magenta rounded-xl blur-sm opacity-30" />
              <div className="relative w-10 h-10 rounded-xl bg-axon-bg/90 border border-axon-violet-400/30 flex items-center justify-center font-mono font-bold text-sm text-axon-violet-300">
                #{index + 1}
              </div>
            </div>

            {/* From -> To agents */}
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-sm font-bold text-white">{fromAgent?.name || packet.fromAgentId}</span>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-[1px] bg-gradient-to-r from-axon-violet-400 to-transparent" />
                  <CustomIcon name="ArrowUpRight" size={14} color="#e879f9" />
                  <div className="w-5 h-[1px] bg-gradient-to-l from-axon-magenta to-transparent" />
                </div>
                <span className="text-sm font-bold text-white">{toAgent?.name || packet.toAgentId}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono tracking-wide">
                {packet.id} • {new Date(packet.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* X Layer verification badge */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-[10px] font-mono text-emerald-400/90">
              <CustomIcon name="ShieldCheck" size={13} color="#10b981" />
              <span className="tracking-wider">X Layer Proof: {packet.attestationHash.substring(0, 10)}…</span>
            </div>

            {/* Expand/Collapse with rotation */}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-xl bg-axon-bg/60 border border-axon-border/30 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-axon-violet-500/30 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expanded Payload */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2">
                {/* Separator with glow */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-axon-violet-500/25 to-transparent mb-5" />

                {/* On-Chain X Layer Testnet Verification Box */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.02 }}
                  className="mb-5 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 font-mono text-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                      <CustomIcon name="ShieldCheck" size={14} color="#10b981" />
                      OKX X Layer Testnet Verified Receipt (Chain ID 195)
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      MINED ON-CHAIN
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Payload Keccak256 Hash</span>
                      <span className="text-emerald-300 font-semibold break-all">{packet.attestationHash}</span>
                    </div>

                    {packet.txHash && (
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase">Transaction Hash</span>
                        <a
                          href={packet.explorerUrl || `https://www.okx.com/web3/explorer/xlayer-test/tx/${packet.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-axon-violet-300 hover:text-white font-semibold underline break-all flex items-center gap-1"
                        >
                          {packet.txHash.substring(0, 18)}...
                          <CustomIcon name="ArrowUpRight" size={12} color="#c084fc" />
                        </a>
                      </div>
                    )}

                    {packet.blockNumber && (
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase">Block Number</span>
                        <span className="text-white font-bold">#{packet.blockNumber}</span>
                      </div>
                    )}

                    {packet.fromAddress && (
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase">Sender Wallet</span>
                        <span className="text-slate-400 font-mono text-[10px]">{packet.fromAddress}</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Top Payload Cards — Objective & Task State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="p-4 rounded-2xl bg-axon-bg/50 border border-axon-border/15"
                  >
                    <span className="text-[9px] font-mono uppercase text-axon-violet-400/80 tracking-[0.15em] block mb-2">
                      Original User Objective
                    </span>
                    <p className="text-[13px] text-white/90 leading-relaxed">{packet.payload.originalUserObjective}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-2xl bg-axon-bg/50 border border-axon-border/15"
                  >
                    <span className="text-[9px] font-mono uppercase text-axon-magenta/80 tracking-[0.15em] block mb-2">
                      Task State & Next Requirement
                    </span>
                    <p className="text-[13px] text-white/90 leading-relaxed mb-2">{packet.payload.currentTaskState}</p>
                    <div className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1.5 p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                      <CustomIcon name="Zap" size={12} color="#22d3ee" />
                      {packet.payload.requiredNextAction}
                    </div>
                  </motion.div>
                </div>

                {/* Work Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-4 rounded-2xl bg-axon-bg/50 border border-axon-border/15"
                  >
                    <span className="text-[9px] font-mono uppercase text-emerald-400/80 tracking-[0.15em] block mb-3 flex items-center gap-1.5">
                      <CustomIcon name="ShieldCheck" size={11} color="#10b981" />
                      Completed Work ({packet.payload.completedWork.length})
                    </span>
                    <ul className="space-y-2">
                      {packet.payload.completedWork.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          className="flex items-start gap-2.5 text-[12px] text-slate-300/90"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-2xl bg-axon-bg/50 border border-axon-border/15"
                  >
                    <span className="text-[9px] font-mono uppercase text-amber-400/80 tracking-[0.15em] block mb-3">
                      Remaining Execution ({packet.payload.remainingWork.length})
                    </span>
                    <ul className="space-y-2">
                      {packet.payload.remainingWork.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + idx * 0.05 }}
                          className="flex items-start gap-2.5 text-[12px] text-slate-300/90"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Context Summary & Artifacts */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="p-4 rounded-2xl bg-axon-bg/50 border border-axon-border/15"
                >
                  <span className="text-[9px] font-mono uppercase text-purple-300/80 tracking-[0.15em] block mb-2">
                    Intermediate Context Summary (Zero CoT Leak)
                  </span>
                  <p className="text-[12px] text-slate-400 leading-relaxed mb-4">{packet.payload.conversationHistorySummary}</p>

                  {packet.payload.createdArtifacts.length > 0 && (
                    <div className="pt-3 border-t border-axon-border/10">
                      <span className="text-[9px] font-mono uppercase text-slate-500 tracking-[0.15em] block mb-2.5">
                        Attached Artifacts ({packet.payload.createdArtifacts.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {packet.payload.createdArtifacts.map((art) => (
                          <span
                            key={art.id}
                            className="px-3 py-1.5 rounded-xl bg-axon-violet-500/8 border border-axon-violet-500/15 text-[11px] font-mono text-white/80 flex items-center gap-2 hover:border-axon-violet-500/40 transition-colors"
                          >
                            <CustomIcon name="FileText" size={12} color="#a855f7" />
                            {art.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
