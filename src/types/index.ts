export type WorkflowState =
  | 'REQUEST_RECEIVED'
  | 'ROUTING'
  | 'AGENT_ASSIGNED'
  | 'EXECUTING'
  | 'HANDOFF_PENDING'
  | 'HANDOFF_COMPLETED'
  | 'WAITING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface AgentMetric {
  totalTasksCompleted: number;
  handoffCount: number;
  avgExecutionTimeMs: number;
  successRate: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  category: 'Strategy' | 'Engineering' | 'Design' | 'Writing' | 'Web3';
  description: string;
  capabilities: string[];
  modelProvider: 'OpenAI' | 'Anthropic' | 'Groq' | 'OKX AI';
  modelName: string;
  systemPrompt: string;
  status: 'IDLE' | 'BUSY' | 'HANDOFF' | 'OFFLINE';
  metrics: AgentMetric;
  color: string;
  iconName: string;
  okxAgentId?: string;
}

export interface Artifact {
  id: string;
  name: string;
  type: 'code' | 'design' | 'doc' | 'json' | 'attestation';
  language?: string;
  content: string;
  createdAt: string;
}

export interface ContextPacketPayload {
  originalUserObjective: string;
  currentTaskState: string;
  completedWork: string[];
  remainingWork: string[];
  importantConstraints: string[];
  userPreferences: Record<string, any>;
  conversationHistorySummary: string;
  createdArtifacts: Artifact[];
  requiredNextAction: string;
}

export interface ContextPacket {
  id: string;
  workflowId: string;
  fromAgentId: string;
  toAgentId: string;
  timestamp: string;
  payload: ContextPacketPayload;
  attestationHash: string; // X Layer on-chain keccak256 payload hash
  txHash?: string;
  blockNumber?: number;
  fromAddress?: string;
  explorerUrl?: string;
}

export interface ExecutionTimelineEvent {
  id: string;
  workflowId: string;
  timestamp: string;
  state: WorkflowState;
  actorId: string;
  actorType: 'USER' | 'ORCHESTRATOR' | 'AGENT';
  actorName: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface Workflow {
  id: string;
  title: string;
  userObjective: string;
  currentState: WorkflowState;
  activeAgentId?: string;
  assignedAgents: string[];
  contextPackets: ContextPacket[];
  timeline: ExecutionTimelineEvent[];
  artifacts: Artifact[];
  createdAt: string;
  updatedAt: string;
  onChainTxHash?: string;
}

export interface PresetPrompt {
  id: string;
  title: string;
  category: string;
  prompt: string;
  expectedAgents: string[];
}
