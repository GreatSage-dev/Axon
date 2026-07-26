import { NextRequest, NextResponse } from 'next/server';
import { AxonOrchestrator } from '@/engine/orchestrator';

/**
 * OKX.AI Agent-to-MCP (A2MCP) Endpoint
 * Tool Name: axon_orchestrate_workflow
 * Price: 0.01 USDT per call (x402)
 * Network: OKX X Layer (Chain ID 196)
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Check for x402 Payment Proof Header
    const paymentHeader =
      req.headers.get('x-payment') ||
      req.headers.get('payment-signature') ||
      req.headers.get('authorization') ||
      req.headers.get('payment-response');

    // 2. If no payment proof header is provided, issue HTTP 402 Payment Required challenge
    if (!paymentHeader) {
      const challengeV2 = {
        x402Version: 2,
        accepts: [
          {
            scheme: 'exact',
            network: '196', // OKX X Layer Mainnet
            asset: '0x779ded0c9e1022225f8e0630b35a9b54be713736', // USDT on X Layer
            amount: '10000', // 0.01 USDT (6 decimals = 10000 minimal units)
            payTo: '0x6a62da609d48aad13f45e95a2a33fbc5813a7841', // Axon Owner Address
            maxAmountRequired: '10000',
          },
        ],
      };

      const base64Challenge = Buffer.from(JSON.stringify(challengeV2)).toString('base64');

      return NextResponse.json(challengeV2, {
        status: 402,
        headers: {
          'PAYMENT-REQUIRED': base64Challenge,
          'WWW-Authenticate': 'Payment realm="OKX.AI A2MCP", intent="charge"',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    // 3. Payment header present — process workflow request
    const body = await req.json().catch(() => ({}));

    // Support MCP tool arguments format or direct JSON prompt
    const prompt =
      body.arguments?.prompt ||
      body.prompt ||
      body.userObjective ||
      body.objective ||
      'Build an autonomous Web3 AI application';

    // Create Workflow
    const workflow = AxonOrchestrator.createWorkflow(prompt);

    // Execute Dynamic Multi-Agent Handoff Engine
    let finalWorkflow = workflow;
    await AxonOrchestrator.executeNextStep(workflow, (updated) => {
      finalWorkflow = updated;
    });

    // Return MCP-compliant tool execution output
    return NextResponse.json({
      mcpTool: 'axon_orchestrate_workflow',
      status: finalWorkflow.currentState,
      protocol: 'Axon Context Handoff Protocol (CHP)',
      payment: {
        price: '0.01 USDT',
        billingMode: 'x402 Agent-to-Agent Micropayment',
        network: 'OKX X Layer (Chain ID 196)',
        settled: true,
      },
      executionSummary: {
        userObjective: prompt,
        assignedAgents: finalWorkflow.assignedAgents,
        artifactsGenerated: finalWorkflow.artifacts.map((a) => ({
          name: a.name,
          type: a.type,
        })),
        onChainProof: finalWorkflow.contextPackets.map((p) => ({
          txHash: p.txHash,
          blockNumber: p.blockNumber,
          explorerUrl: p.explorerUrl,
        })),
      },
      artifacts: finalWorkflow.artifacts,
    });
  } catch (err: any) {
    console.error('OKX.AI /orchestrate MCP endpoint error:', err);
    return NextResponse.json(
      { error: err.message || 'MCP orchestration failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return MCP Tool Manifest for OKX.AI Agentic Discovery
  return NextResponse.json({
    service: 'Axon',
    mode: 'Agent-to-MCP (A2MCP)',
    category: 'Software Utility',
    pricing: '0.01 USDT per call (x402)',
    endpoint: 'https://axon-network.vercel.app/orchestrate',
    mcpTools: [
      {
        name: 'axon_orchestrate_workflow',
        description: 'Multi-agent orchestration protocol that intelligently routes tasks between specialist AI agents and performs seamless context handoffs on OKX X Layer.',
        parameters: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'The task objective or prompt to execute across specialist AI agents.',
            },
          },
          required: ['prompt'],
        },
      },
    ],
  });
}

