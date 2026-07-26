'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollRevealHeading } from '@/components/landing/ScrollRevealHeading';
import { CustomIcon } from '@/components/ui/CustomIcons';

export const XLayerSection: React.FC = () => {
  return (
    <section id="xlayer" className="py-24 px-4 max-w-7xl mx-auto z-10 relative">
      <div className="bg-axon-card/80 backdrop-blur-2xl border border-axon-border rounded-3xl p-8 md:p-12 shadow-glow relative overflow-hidden">
        {/* Edge glow effect */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-axon-violet-400 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-axon-magenta to-transparent opacity-50"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 inline-block mb-4 flex items-center gap-2 w-max">
              <CustomIcon name="ShieldCheck" size={14} color="#10b981" />
              On-Chain Attestation
            </span>

            <ScrollRevealHeading
              text="Secured by OKX X Layer Proofs"
              tag="h2"
              className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6"
              highlightWords={['OKX', 'X', 'Layer']}
            />

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
              Every Context Packet transfer between specialist agents is cryptographically attested on <strong className="text-white">OKX X Layer</strong>. This guarantees immutable state preservation, preventing hallucinations and ensuring transparent accountability.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-axon-bg/60 border border-axon-border/40">
                <div className="mt-1">
                  <CustomIcon name="Lock" size={18} color="#10b981" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Immutable Handoffs</h4>
                  <p className="text-xs text-slate-400">Context state cannot be altered mid-transfer.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-axon-bg/60 border border-axon-border/40">
                <div className="mt-1">
                  <CustomIcon name="Zap" size={18} color="#a855f7" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Zero-Knowledge Scaling</h4>
                  <p className="text-xs text-slate-400">Lightning-fast verifications using Layer 2 architecture.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-1 rounded-2xl bg-gradient-to-b from-axon-violet-500/20 to-transparent"
          >
            <div className="p-6 rounded-xl bg-axon-bg/90 border border-axon-border/80 font-mono text-xs shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <CustomIcon name="ShieldCheck" size={120} color="#10b981" />
              </div>
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-axon-border/40 text-slate-400">
                <span className="text-[12px] text-white font-bold flex items-center gap-2">
                  <CustomIcon name="Code2" size={16} color="#a855f7" />
                  Verification Receipt
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  CONFIRMED
                </span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <span className="text-slate-500 block mb-1">Transaction Hash</span>
                  <span className="text-axon-violet-300 break-all bg-axon-violet-900/30 px-2 py-1 rounded inline-block">0x8f2a7b39...9c4b102948a7f293847293</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block mb-1">Block Number</span>
                    <span className="text-white">18,492,031</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Chain ID</span>
                    <span className="text-white">196 <span className="text-slate-500">(X Layer)</span></span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">Attested Payload CID</span>
                  <span className="text-axon-magenta">QmYwAPJzv5CZsnA625s3Xf2sm5Dya7f</span>
                </div>

                <div className="pt-4 border-t border-axon-border/40 flex justify-between items-center">
                  <span className="text-slate-500">Timestamp</span>
                  <span className="text-white">2026-07-25 15:22:46 UTC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
