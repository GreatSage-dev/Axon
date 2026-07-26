'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, Agent } from '@/types';
import { INITIAL_AGENTS } from '@/engine/agentRegistry';
import { AxonOrchestrator } from '@/engine/orchestrator';
import { WorkflowRunner } from '@/components/console/WorkflowRunner';
import { ArrowFollowCanvas } from '@/components/console/ArrowFollowCanvas';
import { ContextPacketCard } from '@/components/console/ContextPacketCard';
import { AgentCard } from '@/components/console/AgentCard';
import { ExecutionTimeline } from '@/components/console/ExecutionTimeline';
import { CustomIcon } from '@/components/ui/CustomIcons';

type TabKey = 'studio' | 'packets' | 'agents' | 'timeline' | 'api';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'studio', label: 'Workflow Studio', icon: 'Zap' },
  { key: 'packets', label: 'Context Packets', icon: 'Layers' },
  { key: 'agents', label: 'Agent Registry', icon: 'Network' },
  { key: 'timeline', label: 'Audit Log', icon: 'FileText' },
  { key: 'api', label: 'API Specs', icon: 'Code2' },
];

const tabContentVariants = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
};

export default function ConsolePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('studio');
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedArtifactIndex, setSelectedArtifactIndex] = useState<number>(0);

  const handleStartWorkflow = async (objective: string) => {
    setIsExecuting(true);
    setSelectedArtifactIndex(0);
    const newWorkflow = AxonOrchestrator.createWorkflow(objective);
    setActiveWorkflow(newWorkflow);

    try {
      await AxonOrchestrator.executeNextStep(newWorkflow, (updatedWf) => {
        setActiveWorkflow({ ...updatedWf });
        if (updatedWf.activeAgentId) {
          setAgents((prev) =>
            prev.map((a) => ({
              ...a,
              status: a.id === updatedWf.activeAgentId ? 'BUSY' : 'IDLE',
            }))
          );
        }
      });
    } catch (err) {
      console.error('Workflow error:', err);
    } finally {
      setIsExecuting(false);
      setAgents(INITIAL_AGENTS);
    }
  };

  const getTabCount = (key: TabKey): string | undefined => {
    switch (key) {
      case 'packets': return `${activeWorkflow?.contextPackets.length || 0}`;
      case 'agents': return `${agents.length}`;
      case 'timeline': return `${activeWorkflow?.timeline.length || 0}`;
      default: return undefined;
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans">
      {/* ═════════════ Console Header ═════════════ */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/[0.03] border-b border-white/[0.06] px-6 py-0 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[60px]">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-axon-violet-500 to-axon-magenta rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl bg-axon-bg/95 border border-axon-violet-400/30 flex items-center justify-center">
                <CustomIcon name="BrainCircuit" size={18} color="#a855f7" glow />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-wider">AXON</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-axon-violet-500/10 text-axon-violet-400 border border-axon-violet-500/20 tracking-widest">
                CONSOLE
              </span>
            </div>
          </Link>

          {/* Navigation Tabs — Underline Style */}
          <nav className="hidden md:flex items-center gap-1 h-full overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const count = getTabCount(tab.key);
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative h-full px-4 flex items-center gap-2 text-xs font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <CustomIcon name={tab.icon} size={14} color={isActive ? '#a855f7' : 'currentColor'} glow={isActive} />
                  <span className="tracking-wide">{tab.label}</span>
                  {count && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md transition-colors duration-300 ${
                      isActive
                        ? 'bg-axon-violet-500/20 text-axon-violet-300 border border-axon-violet-500/30'
                        : 'bg-axon-bg/40 text-slate-600 border border-axon-border/20'
                    }`}>
                      {count}
                    </span>
                  )}

                  {/* Active underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-axon-violet-500 via-axon-magenta to-axon-violet-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/6 border border-emerald-500/15 text-[10px] font-mono text-emerald-400/90 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              X Layer Connected
            </div>
            <Link href="/" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors tracking-wide">
              ← Landing
            </Link>
          </div>
        </div>
      </header>

      {/* ═════════════ Console Body ═════════════ */}
      <main className="flex-1 py-8 px-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* ─── Tab 1: Workflow Studio ─── */}
          {activeTab === 'studio' && (
            <motion.div
              key="studio"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <WorkflowRunner
                onStartWorkflow={handleStartWorkflow}
                isExecuting={isExecuting}
                activeWorkflow={activeWorkflow}
              />

              <ArrowFollowCanvas
                agents={agents}
                activeAgentId={activeWorkflow?.activeAgentId}
                currentState={activeWorkflow?.currentState || 'IDLE'}
                handoffCount={activeWorkflow?.contextPackets.length || 0}
              />

              {/* Two Column Grid: Packets + Artifacts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Context Handoff Stream */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-6 h-[1px] bg-gradient-to-r from-axon-violet-500 to-transparent" />
                    <h3 className="text-xs font-mono uppercase text-slate-400 tracking-[0.2em]">
                      Context Handoff Stream
                    </h3>
                    <span className="text-[10px] font-mono text-axon-violet-400/60 px-2 py-0.5 rounded bg-axon-violet-500/8 border border-axon-violet-500/10">
                      {activeWorkflow?.contextPackets.length || 0}
                    </span>
                  </div>

                  {activeWorkflow && activeWorkflow.contextPackets.length > 0 ? (
                    activeWorkflow.contextPackets.map((pkt, i) => (
                      <ContextPacketCard key={pkt.id} packet={pkt} agents={agents} index={i} />
                    ))
                  ) : (
                    <div className="edge-glow-static bg-axon-card/40 border border-axon-border/15 rounded-2xl p-10 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-axon-violet-500/8 border border-axon-violet-500/15 flex items-center justify-center">
                        <CustomIcon name="Layers" size={24} color="#a855f720" />
                      </div>
                      <p className="text-slate-500 font-mono text-xs">
                        Execute a workflow to observe live agent handoffs with zero context loss.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Generated Artifacts */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-6 h-[1px] bg-gradient-to-r from-axon-magenta to-transparent" />
                    <h3 className="text-xs font-mono uppercase text-slate-400 tracking-[0.2em]">
                      Multi-Agent Artifacts
                    </h3>
                    <span className="text-[10px] font-mono text-axon-magenta/60 px-2 py-0.5 rounded bg-axon-magenta/8 border border-axon-magenta/10">
                      {activeWorkflow?.artifacts.length || 0}
                    </span>
                  </div>

                  {activeWorkflow && activeWorkflow.artifacts.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-axon-violet-500/20 via-transparent to-axon-magenta/15 pointer-events-none" />
                      <div className="relative bg-axon-card/70 backdrop-blur-2xl border border-axon-border/30 rounded-3xl p-6 edge-glow">
                        {/* Artifact Tab Pills */}
                        <div className="flex flex-wrap gap-2 mb-5 pb-4 border-b border-axon-border/15">
                          {activeWorkflow.artifacts.map((art, idx) => (
                            <button
                              key={art.id}
                              onClick={() => setSelectedArtifactIndex(idx)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 ${
                                selectedArtifactIndex === idx
                                  ? 'bg-gradient-to-r from-axon-violet-600 to-axon-violet-700 text-white font-bold shadow-[0_2px_12px_rgba(168,85,247,0.3)] border border-axon-violet-400/30'
                                  : 'bg-axon-bg/40 text-slate-500 hover:text-white border border-axon-border/15 hover:border-axon-violet-500/30'
                              }`}
                            >
                              {art.name.length > 22 ? art.name.substring(0, 20) + '…' : art.name}
                            </button>
                          ))}
                        </div>

                        {/* Artifact Viewer */}
                        <AnimatePresence mode="wait">
                          {activeWorkflow.artifacts[selectedArtifactIndex] && (
                            <motion.div
                              key={selectedArtifactIndex}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.3 }}
                              className="bg-axon-bg/70 p-5 rounded-2xl border border-axon-border/15 overflow-x-auto font-mono text-xs max-h-[420px] overflow-y-auto"
                            >
                              <div className="flex items-center justify-between text-slate-500 mb-3 pb-2.5 border-b border-axon-border/10 text-[10px]">
                                <div className="flex items-center gap-2">
                                  <CustomIcon name="FileText" size={12} color="#a855f7" />
                                  <span className="uppercase tracking-wider">{activeWorkflow.artifacts[selectedArtifactIndex].type}</span>
                                </div>
                                <span>{new Date(activeWorkflow.artifacts[selectedArtifactIndex].createdAt).toLocaleTimeString()}</span>
                              </div>
                              <pre className="text-slate-300/90 leading-relaxed whitespace-pre-wrap text-[11px]">
                                {activeWorkflow.artifacts[selectedArtifactIndex].content}
                              </pre>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="edge-glow-static bg-axon-card/40 border border-axon-border/15 rounded-2xl p-10 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-axon-magenta/8 border border-axon-magenta/15 flex items-center justify-center">
                        <CustomIcon name="FileText" size={24} color="#e879f920" />
                      </div>
                      <p className="text-slate-500 font-mono text-xs">
                        Agent-generated blueprints, code, design tokens, and X Layer attestations will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Tab 2: Context Packets ─── */}
          {activeTab === 'packets' && (
            <motion.div
              key="packets"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-axon-violet-500 to-transparent" />
                  <h2 className="text-lg font-bold text-white tracking-tight">Context Packet Deep Inspector</h2>
                </div>
                <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
                  Structured state handoff verification
                </span>
              </div>

              {activeWorkflow && activeWorkflow.contextPackets.length > 0 ? (
                activeWorkflow.contextPackets.map((pkt, i) => (
                  <ContextPacketCard key={pkt.id} packet={pkt} agents={agents} index={i} />
                ))
              ) : (
                <div className="edge-glow bg-axon-card/50 border border-axon-border/15 rounded-3xl p-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-axon-violet-500/8 border border-axon-violet-500/15 flex items-center justify-center">
                    <CustomIcon name="Layers" size={32} color="#a855f730" />
                  </div>
                  <p className="text-slate-400 font-mono text-sm mb-1">No active Context Packets</p>
                  <p className="text-slate-600 text-xs">Run a workflow in the Studio tab to generate handoff packets.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── Tab 3: Agent Registry ─── */}
          {activeTab === 'agents' && (
            <motion.div
              key="agents"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-axon-violet-500 to-transparent" />
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Specialist Agent Registry</h2>
                    <p className="text-[11px] text-slate-500 tracking-wide">Modular autonomous agents with defined capability boundaries</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent, idx) => (
                  <AgentCard key={agent.id} agent={agent} isActive={agent.id === activeWorkflow?.activeAgentId} index={idx} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Tab 4: Audit Log ─── */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-gradient-to-r from-axon-violet-500 to-transparent" />
                <h2 className="text-lg font-bold text-white tracking-tight">Execution Timeline & Audit Log</h2>
              </div>
              <ExecutionTimeline timeline={activeWorkflow?.timeline || []} />
            </motion.div>
          )}

          {/* ─── Tab 5: API Specs ─── */}
          {activeTab === 'api' && (
            <motion.div
              key="api"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-axon-violet-500 to-transparent" />
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Axon Protocol REST & SSE API</h2>
                    <p className="text-[11px] text-slate-500 tracking-wide">Production infrastructure endpoints for external agent integration</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {[
                  { method: 'POST', methodColor: 'bg-emerald-500/12 text-emerald-400 border-emerald-500/20', path: '/api/v1/workflows', desc: 'Initiate a new multi-agent workflow with automatic routing & CHP state machine execution.', example: '{ "objective": "Launch Web3 fintech platform" }\n→ { "workflowId": "wf-941a28", "status": "REQUEST_RECEIVED" }' },
                  { method: 'GET', methodColor: 'bg-cyan-500/12 text-cyan-400 border-cyan-500/20', path: '/api/v1/workflows/:id', desc: 'Retrieve complete workflow state, timeline events, and active context packets.', example: '→ { "id": "wf-941a28", "state": "EXECUTING", "contextPackets": [...] }' },
                  { method: 'POST', methodColor: 'bg-purple-500/12 text-purple-400 border-purple-500/20', path: '/api/v1/handoffs', desc: 'Manually trigger a ContextPacket handoff between registered specialist agents.', example: '{ "fromAgentId": "agent-strategy", "toAgentId": "agent-designer" }' },
                  { method: 'GET', methodColor: 'bg-amber-500/12 text-amber-400 border-amber-500/20', path: '/api/v1/attestations/:packetId', desc: 'Retrieve on-chain cryptographic proof hash and OKX X Layer verification receipt.', example: '→ { "txHash": "0x7f941...", "blockNumber": 18492041, "verdict": "Verified" }' },
                  { method: 'GET', methodColor: 'bg-cyan-500/12 text-cyan-400 border-cyan-500/20', path: '/api/v1/agents', desc: 'List all registered specialist agents with capability matrices and performance metrics.', example: '→ { "agents": [...], "total": 5 }' },
                ].map((endpoint, idx) => (
                  <motion.div
                    key={endpoint.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative edge-glow-static"
                  >
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-axon-violet-500/0 to-transparent group-hover:from-axon-violet-500/20 group-hover:to-axon-magenta/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <div className="relative p-6 rounded-2xl bg-axon-card/60 border border-axon-border/20 group-hover:border-transparent backdrop-blur-xl transition-all duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold border ${endpoint.methodColor} tracking-wider`}>
                          {endpoint.method}
                        </span>
                        <span className="text-white font-bold text-sm font-mono">{endpoint.path}</span>
                      </div>
                      <p className="text-[12px] text-slate-400 font-sans mb-4 leading-relaxed">{endpoint.desc}</p>
                      <div className="bg-axon-bg/60 p-4 rounded-xl border border-axon-border/10 text-[11px] font-mono text-slate-400 leading-relaxed whitespace-pre-wrap">
                        {endpoint.example}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
