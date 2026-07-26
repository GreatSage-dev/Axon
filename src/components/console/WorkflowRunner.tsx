'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Workflow, PresetPrompt } from '@/types';
import { PRESET_PROMPTS } from '@/engine/agentRegistry';
import { CustomIcon } from '@/components/ui/CustomIcons';

interface WorkflowRunnerProps {
  onStartWorkflow: (objective: string) => void;
  isExecuting: boolean;
  activeWorkflow: Workflow | null;
}

export const WorkflowRunner: React.FC<WorkflowRunnerProps> = ({
  onStartWorkflow,
  isExecuting,
  activeWorkflow,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isExecuting) return;
    onStartWorkflow(prompt.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isExecuting) {
        onStartWorkflow(prompt.trim());
      }
    }
  };

  const handleSelectPreset = (preset: PresetPrompt) => {
    setPrompt(preset.prompt);
    onStartWorkflow(preset.prompt);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden edge-glow"
    >
      {/* Outer double-border glow container */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-axon-violet-500/40 via-transparent to-axon-magenta/30 pointer-events-none" />

      {/* Mouse follow radial highlight */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-0 opacity-20"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
        }}
      />

      <div className="relative bg-axon-card/80 backdrop-blur-2xl rounded-3xl p-8 border border-axon-border/60 z-10">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-axon-violet-600/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-axon-magenta/5 blur-[80px] rounded-full pointer-events-none" />

        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={isExecuting ? { rotate: [0, 360] } : { rotate: 0 }}
              transition={isExecuting ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-axon-violet-500 to-axon-magenta rounded-2xl blur-md opacity-50" />
              <div className="relative p-3 rounded-2xl bg-axon-bg/90 border border-axon-violet-400/40">
                <CustomIcon name="Zap" size={22} color="#a855f7" glow />
              </div>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
                Orchestration Command
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
              </h3>
              <p className="text-[13px] text-slate-400 font-light tracking-wide">
                Describe your objective and watch autonomous specialist agents coordinate in real-time
              </p>
            </div>
          </div>

          {activeWorkflow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <div className="h-8 w-[1px] bg-axon-border/50" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active Workflow</span>
                <span className="text-xs font-mono text-axon-violet-300 font-bold">{activeWorkflow.id}</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                activeWorkflow.currentState === 'COMPLETED'
                  ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                  : 'bg-axon-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] animate-pulse'
              }`} />
            </motion.div>
          )}
        </div>

        {/* Premium Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className={`relative rounded-2xl transition-all duration-500 ${
            isFocused
              ? 'shadow-[0_0_0_1px_rgba(168,85,247,0.5),0_0_40px_-10px_rgba(168,85,247,0.3)]'
              : 'shadow-[0_0_0_1px_rgba(168,85,247,0.1)]'
          }`}>
            {/* Animated border gradient on focus */}
            <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-axon-violet-500 via-axon-magenta to-axon-violet-500 transition-opacity duration-500 ${
              isFocused ? 'opacity-40' : 'opacity-0'
            }`} />

            <div className="relative bg-axon-bg/90 rounded-2xl overflow-hidden">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isExecuting}
                placeholder="What would you like to build? Describe your full objective..."
                rows={4}
                className="w-full bg-transparent p-5 pb-14 text-[15px] text-white placeholder-slate-500/80 focus:outline-none resize-none font-sans disabled:opacity-50 leading-relaxed tracking-wide"
              />

              {/* Bottom toolbar inside textarea */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3.5 flex items-center justify-between border-t border-axon-border/20 bg-axon-bg/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CustomIcon name="Network" size={12} color="#64748b" />
                    5 specialists ready
                  </span>
                  <span className="w-[1px] h-3 bg-axon-border/40" />
                  <span className="flex items-center gap-1.5">
                    <CustomIcon name="ShieldCheck" size={12} color="#64748b" />
                    X Layer attestation
                  </span>
                  <span className="w-[1px] h-3 bg-axon-border/40 hidden sm:inline-block" />
                  <span className="hidden sm:inline-block text-[10px] text-slate-600 font-mono">
                    Ctrl + Enter to run
                  </span>
                </div>

                <motion.button
                  type="submit"
                  disabled={!prompt.trim() || isExecuting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-axon-violet-500 via-axon-violet-600 to-purple-700 hover:from-axon-violet-400 hover:to-purple-600 text-white font-semibold text-xs tracking-wider shadow-[0_4px_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer border border-white/10"
                >
                  {isExecuting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full"
                      />
                      Orchestrating...
                    </>
                  ) : (
                    <>
                      <CustomIcon name="Zap" size={15} color="#ffffff" />
                      Execute Workflow
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </form>

        {/* Preset Flows — Premium Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gradient-to-r from-axon-violet-500 to-transparent" />
              Demonstration Presets
              <div className="w-4 h-[1px] bg-gradient-to-l from-axon-violet-500 to-transparent" />
            </span>
            <span className="text-[10px] font-mono text-slate-600">Click to auto-execute</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRESET_PROMPTS.map((preset, idx) => (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={isExecuting ? {} : { y: -4, transition: { duration: 0.25 } }}
                onClick={() => !isExecuting && handleSelectPreset(preset)}
                className={`group relative rounded-2xl overflow-hidden ${
                  isExecuting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                {/* Hover border glow */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-axon-violet-500/0 via-axon-magenta/0 to-purple-500/0 group-hover:from-axon-violet-500/50 group-hover:via-axon-magenta/30 group-hover:to-purple-500/50 transition-all duration-500" />

                <div className="relative p-5 bg-axon-bg/60 border border-axon-border/40 group-hover:border-transparent rounded-2xl transition-all duration-500 h-full flex flex-col justify-between backdrop-blur-sm">
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-axon-violet-500/40 to-transparent group-hover:via-axon-violet-400/80 transition-all duration-500" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-axon-violet-300/80 font-semibold uppercase bg-axon-violet-500/8 px-2.5 py-1 rounded-lg border border-axon-violet-500/15 group-hover:border-axon-violet-500/40 group-hover:bg-axon-violet-500/15 transition-all duration-300">
                        {preset.category}
                      </span>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <CustomIcon name="ArrowUpRight" size={16} color="#a855f7" />
                      </motion.div>
                    </div>
                    <h4 className="text-sm font-bold text-white/90 group-hover:text-white mb-2 transition-colors leading-tight">{preset.title}</h4>
                    <p className="text-[11px] text-slate-400/80 line-clamp-2 leading-relaxed">{preset.prompt}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-axon-border/20 group-hover:border-axon-violet-500/20 flex items-center justify-between text-[10px] font-mono text-slate-500 transition-colors duration-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-axon-violet-500/50 group-hover:bg-axon-violet-400 transition-colors" />
                      {preset.expectedAgents.length} agents
                    </span>
                    <span className="text-axon-violet-500/60 group-hover:text-axon-violet-400 transition-colors">CHP enabled</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
