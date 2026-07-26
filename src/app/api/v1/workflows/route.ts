import { NextResponse } from 'next/server';
import { AxonOrchestrator } from '@/engine/orchestrator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { objective } = body;

    if (!objective) {
      return NextResponse.json({ error: 'Missing required field: objective' }, { status: 400 });
    }

    const workflow = AxonOrchestrator.createWorkflow(objective);
    return NextResponse.json({
      success: true,
      workflow,
      message: 'Workflow successfully initialized.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
