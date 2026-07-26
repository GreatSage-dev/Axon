import { NextRequest, NextResponse } from 'next/server';
import { AxonOrchestrator } from '@/engine/orchestrator';

/**
 * OKX.AI Agent-to-MCP (A2MCP) Endpoint
 * Tool Name: axon_orchestrate_workflow
 * Price: 0.01 USDT per call (x402)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    
    // Support MCP tool arguments format or direct JSON prompt
    const prompt =
      body.arguments?.prompt ||
      body.prompt ||
      body.userObjective ||
      body.objective ||
      'Build an autonomous Web3 AI application';

    // 1. Create Workflow
    const workflow = AxonOrchestrator.createWorkflow(prompt);

    // 2. Execute Dynamic Multi-Agent Handoff Engine
    let finalWorkflow = workflow;
    await AxonOrchestrator.executeNextStep(workflow, (updated) => {
      finalWorkflow = updated;
    });

    // 3. Return MCP-compliant tool execution output
    return NextResponse.json({
      mcpTool: 'axon_orchestrate_workflow',
      status: finalWorkflow.currentState,
      protocol: 'Axon Context Handoff Protocol (CHP)',
      payment: {
        price: '0.01 USDT',
        billingMode: 'x402 Agent-to-Agent Micropayment',
        network: 'OKX X Layer (Chain ID 195)',
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
