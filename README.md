# 🧠 Axon — Autonomous AI Agent Coordination & Handoff Protocol

> **The missing coordination layer for autonomous AI agents.**  
> Built for the **OKX.AI Hackathon**.

Axon is an orchestration protocol designed to solve the **context degradation problem** in multi-agent systems. Instead of forcing a single LLM to solve complex end-to-end tasks or relying on unstructured chat handoffs, Axon routes work across specialist AI agents while preserving context seamlessly via cryptographically attested **ContextPackets** anchored to **OKX X Layer Testnet**.

---

## ✨ Key Features

- 🤖 **5 Specialist AI Agents**:
  - `Nexus Strategy Architect` — Product & System Architecture Blueprints.
  - `Aura Visual Systems Designer` — Design Tokens & UI Specs.
  - `CyberCode Engineer` — Production Code & API Scaffolds.
  - `X-Auditor Web3` — Smart Contract Security Audits & On-Chain Proofs.
  - `Lexicon Writer` — Technical Developer Documentation & API Guides.
- ⚡ **Live Groq LLM Execution**: Powered by `llama-3.3-70b-versatile` for real-time model inference.
- 🧠 **Dynamic LLM Capability Routing**: Llama-3.3-70B dynamically evaluates task requirements and capability boundaries at every step, routing to appropriate agents or concluding execution when satisfied.
- 🛡️ **OKX X Layer On-Chain Attestations**: Every agent handoff submits a live `sendTransaction` to OKX X Layer Testnet (Chain ID 195) embedding the payload's `keccak256` hash, producing verifiable on-chain receipts.
- 🎨 **FinTech Aesthetic & Motion**: Dark void space theme (`#06020a`), neon purple accents (`#a855f7`), scroll-reveal headings, border edge-glow lighting, and interactive magnetic vector visualizer canvas.

---

## 🛠️ Architecture Overview

```
User Prompt ──► Axon Router (Llama-3.3-70B)
                    │
                    ├──► Specialist Agent Execution (Groq API)
                    ├──► Payload Keccak256 Computation
                    ├──► Live sendTransaction ──► OKX X Layer (Chain ID 195)
                    └──► ContextPacket Handoff ──► Next Specialist Agent
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/GreatSage-dev/Axon.git
cd Axon
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the project root:
```env
GROQ_API_KEY=gsk_your_groq_key_here
NEXT_PUBLIC_GROQ_API_KEY=gsk_your_groq_key_here
XLAYER_TESTNET_PRIVATE_KEY=0x_your_xlayer_testnet_private_key_here
NEXT_PUBLIC_XLAYER_TESTNET_PRIVATE_KEY=0x_your_xlayer_testnet_private_key_here
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the landing page or [http://localhost:3000/console](http://localhost:3000/console) for the platform console.

### 5. Building for Production
```bash
npm run build
```

---

## 🔗 Network Specs
- **Target Network**: OKX X Layer Testnet
- **Chain ID**: `195` (or `1952`)
- **RPC Endpoint**: `https://testrpc.xlayer.tech`
- **Explorer**: [OKX Web3 Explorer (X Layer Testnet)](https://www.okx.com/web3/explorer/xlayer-test)

---

## 📜 License
MIT License. Built for the OKX.AI Hackathon.
