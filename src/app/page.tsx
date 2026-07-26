import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { Footer } from '@/components/landing/Footer';
import { ScrollRevealHeading } from '@/components/landing/ScrollRevealHeading';
import { XLayerSection } from '@/components/landing/XLayerSection';
import { ArchitectureSection } from '@/components/landing/ArchitectureSection';
import Link from 'next/link';
import { CustomIcon } from '@/components/ui/CustomIcons';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Core Feature Grid */}
      <FeatureGrid />

      {/* Deep-Dive Section: Context Handoff Protocol */}
      <section id="handoff" className="py-24 px-4 max-w-7xl mx-auto z-10 relative">
        <div className="bg-axon-card/80 backdrop-blur-2xl border border-axon-border rounded-3xl p-8 md:p-12 shadow-glow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-axon-violet-400 tracking-wider px-3 py-1 rounded-full bg-axon-violet-500/10 border border-axon-violet-500/30 inline-block mb-4">
                Hero Protocol Architecture
              </span>

              <ScrollRevealHeading
                text="How Context Packets Eliminate Repeating Yourself"
                tag="h2"
                className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6"
                highlightWords={['Eliminate', 'Repeating']}
              />

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
                When Agent A detects a task boundary, it generates a structured, verified{' '}
                <code className="text-axon-violet-300 bg-axon-violet-900/40 px-2 py-0.5 rounded font-mono">
                  ContextPacket
                </code>
                . The receiving specialist agent instantly resumes execution with full background awareness.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-axon-bg/60 border border-axon-border/40">
                  <div className="mt-1">
                    <CustomIcon name="ShieldCheck" size={18} color="#a855f7" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Original User Objective & Task State</h4>
                    <p className="text-xs text-slate-400">Preserves true intent across long execution chains.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-axon-bg/60 border border-axon-border/40">
                  <div className="mt-1">
                    <CustomIcon name="Layers" size={18} color="#e879f9" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Completed Work vs Remaining Constraints</h4>
                    <p className="text-xs text-slate-400">Prevents duplicate agent work and stays strictly in scope.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-axon-bg/60 border border-axon-border/40">
                  <div className="mt-1">
                    <CustomIcon name="FileText" size={18} color="#38bdf8" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Intermediate Summaries (No CoT Leak)</h4>
                    <p className="text-xs text-slate-400">Transfers crisp state summaries without raw prompt bloat.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol JSON Mock Card */}
            <div className="p-6 rounded-2xl bg-axon-bg/90 border border-axon-border/80 font-mono text-xs shadow-2xl overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-axon-border/40 text-slate-400">
                <span className="text-[11px] text-axon-violet-400 font-bold">ContextPacketPayload.json</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CustomIcon name="ShieldCheck" size={12} color="#10b981" />
                  OKX X Layer Verified
                </span>
              </div>
              <pre className="text-slate-300 text-[11px] leading-relaxed">
{`{
  "protocol": "Axon-CHP/v1.0",
  "handoffId": "packet-9418a209",
  "fromAgent": "Nexus Strategy Architect",
  "toAgent": "Aura Visual Designer",
  "attestationHash": "0x7f9418e8a49c2018b94109a",
  "payload": {
    "userObjective": "Launch fintech app",
    "completedWork": [
      "Product Strategy Blueprint",
      "Domain Scoping"
    ],
    "remainingWork": [
      "Design Neon Glass Tokens",
      "Engine Implementation"
    ],
    "userPreferences": {
      "theme": "Dark Void / Neon Violet"
    },
    "requiredNextAction": "Generate visual specifications"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* X Layer Attestation Section */}
      <XLayerSection />

      {/* Protocol Architecture Section */}
      <ArchitectureSection />

      {/* CTA Section */}
      <section className="py-20 px-4 text-center z-10 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-axon-violet-900/40 to-axon-card/90 border border-axon-violet-500/40 rounded-3xl p-12 shadow-glow">
          <ScrollRevealHeading
            text="Experience Autonomous Multi-Agent Orchestration Now"
            tag="h2"
            className="text-3xl md:text-5xl font-extrabold text-white justify-center text-center tracking-tight mb-4"
            highlightWords={['Autonomous', 'Orchestration']}
          />
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 font-sans">
            Run real prompt execution, inspect handoff packets, and experience zero context loss.
          </p>

          <Link
            href="/console"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-axon-violet-600 via-axon-magenta to-purple-600 hover:from-axon-violet-500 hover:to-purple-500 text-white font-bold text-base shadow-glow transition-all hover:scale-105 border border-axon-violet-300/40"
          >
            <CustomIcon name="Zap" size={20} color="#ffffff" />
            Launch Axon Console
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
