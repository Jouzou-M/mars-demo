export type Phase = 0 | 1 | 2 | 3 | 4;
export type AgentRole = 'ecommerce' | 'courier' | 'system';
export type MessageType = 'thinking' | 'retrieval' | 'exchange' | 'synthesis' | 'decision' | 'consensus' | 'resolution';
export type AgentStatus = 'idle' | 'thinking' | 'retrieving' | 'exchanging' | 'deciding' | 'complete';

export interface AgentStep {
  phase: Phase;
  agent: AgentRole;
  type: MessageType;
  content: string;
  data?: Record<string, any>;
  delay_ms: number;
}

export interface AgentMessageItem {
  id: string;
  step: AgentStep;
  timestamp: number;
}

export interface BlendProducts {
  claim_validity: 'PLAUSIBLE' | 'SUSPICIOUS' | 'CONFIRMED';
  liability: 'CARRIER' | 'RETAILER' | 'CUSTOMER_RISK' | 'SHARED';
  evidence_consistency_score: number;
  urgency_weighting: number;
  scenario_classification: 'STOLEN_PACKAGE' | 'DAMAGED' | 'WRONG_ITEM' | 'LATE' | 'RETURN' | 'MISDELIVERED' | 'SUSPECTED_FRAUD';
  reasoning: string;
}

export interface AgentResponse {
  retrieval: Record<string, any>;
  findings: string;
  recommendation: string;
}
