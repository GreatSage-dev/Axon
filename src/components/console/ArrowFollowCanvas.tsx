'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Agent, WorkflowState } from '@/types';
import { CustomIcon } from '@/components/ui/CustomIcons';

interface NodePosition {
  id: string;
  name: string;
  role: string;
  color: string;
  iconName: string;
  x: number;
  y: number;
}

interface ArrowFollowCanvasProps {
  agents: Agent[];
  activeAgentId?: string;
  currentState?: WorkflowState | 'IDLE';
  handoffCount?: number;
  onSelectAgent?: (agent: Agent) => void;
}

const nodePositions: NodePosition[] = [
  { id: 'agent-strategy', name: 'Nexus Strategy', role: 'Product Architect', color: '#a855f7', iconName: 'BrainCircuit', x: 10, y: 32 },
  { id: 'agent-designer', name: 'Aura Designer', role: 'UI/UX Visual Specs', color: '#e879f9', iconName: 'Palette', x: 30, y: 72 },
  { id: 'agent-engineer', name: 'CyberCode', role: 'Systems Engineer', color: '#38bdf8', iconName: 'Code2', x: 50, y: 28 },
  { id: 'agent-web3', name: 'X-Auditor Web3', role: 'X Layer Proofs', color: '#10b981', iconName: 'ShieldCheck', x: 70, y: 72 },
  { id: 'agent-writer', name: 'Lexicon Writer', role: 'Doc Specialist', color: '#f59e0b', iconName: 'FileText', x: 90, y: 32 },
];

export const ArrowFollowCanvas: React.FC<ArrowFollowCanvasProps> = ({
  agents,
  activeAgentId,
  currentState = 'IDLE',
  handoffCount = 0,
  onSelectAgent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 420 });

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const cursorX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.5 });
  const cursorY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth || 1000,
          height: containerRef.current.offsetHeight || 420,
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    rawX.set(x);
    rawY.set(y);
  };

  const stateLabel = currentState === 'IDLE' ? 'AWAITING INPUT' : currentState;
  const isLive = currentState !== 'IDLE' && currentState !== 'COMPLETED';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative edge-glow"
    >
      {/* Outer gradient border frame */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-axon-violet-500/30 via-transparent to-axon-magenta/20 pointer-events-none" />

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setMousePos({ x: -1000, y: -1000 }); rawX.set(-1000); rawY.set(-1000); }}
        className="relative w-full h-[420px] bg-axon-card/70 backdrop-blur-2xl border border-axon-border/40 rounded-3xl p-7 overflow-hidden"
      >
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-axon-violet-600/8 blur-[120px] pointer-events-none rounded-full" />

        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a855f7 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        {/* Header — more refined */}
        <div className="flex items-center justify-between mb-5 z-10 relative">
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-axon-violet-500 to-axon-magenta rounded-xl blur-sm opacity-40" />
              <div className="relative p-2.5 rounded-xl bg-axon-bg/90 border border-axon-violet-400/30">
                <CustomIcon name="Network" size={18} color="#a855f7" glow />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2.5">
                Context Handoff Pipeline
                {isLive && (
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                  />
                )}
              </h3>
              <p className="text-[11px] text-slate-500 tracking-wide">
                Magnetic Bezier vectors • Zero context degradation protocol
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-axon-bg/70 border border-axon-border/40 text-xs font-mono text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="text-axon-violet-400 font-bold">{handoffCount}</span>
                <span className="text-slate-500">handoffs</span>
              </span>
              <span className="w-[1px] h-3 bg-axon-border/40" />
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  currentState === 'COMPLETED' ? 'bg-emerald-400' : isLive ? 'bg-axon-violet-400 animate-pulse' : 'bg-slate-600'
                }`} />
                <span className="text-white/80 font-semibold uppercase text-[10px] tracking-wider">{stateLabel}</span>
              </span>
            </div>
          </div>
        </div>

        {/* SVG Canvas — Custos Arrow-Follow Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="arrowGlowGradV2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#e879f9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glowFilterV2" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <marker id="arrowheadV2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#c084fc" fillOpacity="0.9" />
            </marker>
          </defs>

          {/* Dynamic Connections */}
          {nodePositions.map((node, i) => {
            if (i === nodePositions.length - 1) return null;
            const next = nodePositions[i + 1];
            const w = dimensions.width;
            const h = dimensions.height;
            const x1 = (node.x / 100) * w;
            const y1 = (node.y / 100) * h;
            const x2 = (next.x / 100) * w;
            const y2 = (next.y / 100) * h;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const dist = Math.hypot(mousePos.x - midX, mousePos.y - midY);
            const radius = 250;
            let cx = midX, cy = midY;
            if (isHovered && dist < radius) {
              const pull = (1 - dist / radius) * 100;
              const angle = Math.atan2(mousePos.y - midY, mousePos.x - midX);
              cx += Math.cos(angle) * pull;
              cy += Math.sin(angle) * pull;
            }
            const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
            const isActive = activeAgentId === node.id || activeAgentId === next.id;

            return (
              <g key={`path-${i}`}>
                {/* Ghost dashed path */}
                <path d={pathD} fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="1.5" strokeDasharray="4 8" />
                {/* Active illuminated path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#arrowGlowGradV2)"
                  strokeWidth={isActive ? '3' : '1.8'}
                  filter="url(#glowFilterV2)"
                  markerEnd="url(#arrowheadV2)"
                  className="transition-all duration-500"
                  strokeOpacity={isActive ? 1 : 0.5}
                />
                {/* Energy particle */}
                <circle r={isActive ? '5' : '3'} fill="#ffffff" fillOpacity={isActive ? 0.9 : 0.5} filter="url(#glowFilterV2)">
                  <animateMotion path={pathD} dur={`${3.5 - i * 0.5}s`} repeatCount="indefinite" />
                </circle>
                {isActive && (
                  <circle r="2.5" fill="#e879f9" filter="url(#glowFilterV2)">
                    <animateMotion path={pathD} dur={`${2.5 - i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Cursor ripple */}
          {isHovered && mousePos.x > 0 && (
            <g>
              <circle cx={mousePos.x} cy={mousePos.y} r="6" fill="none" stroke="rgba(232,121,249,0.5)" strokeWidth="1.5" filter="url(#glowFilterV2)">
                <animate attributeName="r" values="6;30;6" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={mousePos.x} cy={mousePos.y} r="2" fill="#ffffff" fillOpacity="0.6" />
            </g>
          )}
        </svg>

        {/* Agent Nodes */}
        <div className="relative w-full h-[300px] z-10 pointer-events-auto">
          {nodePositions.map((node, idx) => {
            const matchingAgent = agents.find((a) => a.id === node.id);
            const isActive = activeAgentId === node.id;

            return (
              <motion.div
                key={node.id}
                onClick={() => matchingAgent && onSelectAgent?.(matchingAgent)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.3 + idx * 0.08 }}
                whileHover={{ scale: 1.12, y: -6, transition: { duration: 0.2, type: 'spring', stiffness: 400 } }}
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                className={`absolute cursor-pointer rounded-2xl backdrop-blur-lg flex flex-col items-center transition-shadow duration-500 ${
                  isActive
                    ? 'p-4 bg-axon-violet-900/70 border-2 border-axon-violet-400 shadow-[0_0_40px_rgba(168,85,247,0.6),0_0_80px_rgba(168,85,247,0.2)]'
                    : 'p-3.5 bg-axon-card/80 border border-axon-border/50 hover:border-axon-violet-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]'
                }`}
              >
                {/* Ambient ring for active */}
                {isActive && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.08, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-3 rounded-3xl border border-axon-violet-400/40 pointer-events-none"
                  />
                )}

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-2 border shadow-inner"
                  style={{ backgroundColor: `${node.color}15`, borderColor: `${node.color}40` }}
                >
                  <CustomIcon name={node.iconName} size={22} color={node.color} glow={isActive} />
                </div>
                <h4 className="text-[11px] font-bold text-white tracking-tight whitespace-nowrap">{node.name}</h4>
                <p className="text-[9px] text-slate-500 font-mono whitespace-nowrap">{node.role}</p>

                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 px-2.5 py-0.5 text-[8px] font-mono uppercase bg-gradient-to-r from-axon-violet-500 to-axon-magenta text-white rounded-full font-bold tracking-wider shadow-[0_2px_10px_rgba(168,85,247,0.4)]"
                  >
                    EXECUTING
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
