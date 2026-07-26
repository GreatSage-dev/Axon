import { NextResponse } from 'next/server';
import { INITIAL_AGENTS } from '@/engine/agentRegistry';

export async function GET() {
  return NextResponse.json({
    success: true,
    agents: INITIAL_AGENTS,
    total: INITIAL_AGENTS.length,
  });
}
