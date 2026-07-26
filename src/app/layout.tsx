import type { Metadata } from 'next';
import './globals.css';
import { BackgroundGlowBlades } from '@/components/landing/BackgroundGlowBlades';

export const metadata: Metadata = {
  title: 'Axon — Autonomous AI Agent Coordination & Handoff Protocol',
  description: 'Axon is the missing coordination layer for autonomous AI agents. Preserves context seamlessly across specialist handoffs with zero context degradation.',
  keywords: ['AI agents', 'multi-agent', 'orchestration', 'context handoff', 'OKX X Layer', 'Web3', 'hackathon'],
  openGraph: {
    title: 'Axon — Autonomous AI Agent Coordination Protocol',
    description: 'The missing coordination layer for autonomous AI agents. Preserves context across handoffs.',
    url: 'https://axon-protocol.ai',
    siteName: 'Axon AI Protocol',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axon — Autonomous AI Agent Coordination Protocol',
    description: 'Preserves context seamlessly across specialist AI agent handoffs.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-axon-bg text-slate-100 min-h-screen relative font-sans antialiased">
        <BackgroundGlowBlades />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
