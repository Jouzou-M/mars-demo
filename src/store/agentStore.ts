import { create } from 'zustand';
import type {
  AgentStep,
  AgentMessageItem,
  AgentStatus,
  BlendProducts,
  ClassificationResult,
  ResolutionPath,
  ClaimLegitimacy,
  RelationshipValue,
} from '../types';

interface AgentState {
  ecommerceStatus: AgentStatus;
  courierStatus: AgentStatus;

  ecommerceMessages: AgentMessageItem[];
  courierMessages: AgentMessageItem[];
  systemMessages: AgentMessageItem[];

  ecommerceRetrievalData: Record<string, any> | null;
  courierRetrievalData: Record<string, any> | null;
  synthesisData: BlendProducts | null;

  classification: ClassificationResult | null;
  activePath: ResolutionPath | null;
  claimLegitimacy: ClaimLegitimacy | null;
  relationshipValue: RelationshipValue | null;
  commitmentToken: string | null;
  resolutionText: string | null;

  setAgentStatus: (agent: 'ecommerce' | 'courier', status: AgentStatus) => void;
  addAgentMessage: (step: AgentStep) => void;
  setRetrievalData: (agent: 'ecommerce' | 'courier', data: Record<string, any>) => void;
  setSynthesisData: (data: BlendProducts) => void;
  setClassification: (result: ClassificationResult) => void;
  setDecision: (path: ResolutionPath, legitimacy: ClaimLegitimacy, value: RelationshipValue) => void;
  setResolution: (text: string, token: string) => void;
  clearAll: () => void;
}

let agentMsgCounter = 0;

export const useAgentStore = create<AgentState>((set) => ({
  ecommerceStatus: 'idle',
  courierStatus: 'idle',
  ecommerceMessages: [],
  courierMessages: [],
  systemMessages: [],
  ecommerceRetrievalData: null,
  courierRetrievalData: null,
  synthesisData: null,
  classification: null,
  activePath: null,
  claimLegitimacy: null,
  relationshipValue: null,
  commitmentToken: null,
  resolutionText: null,

  setAgentStatus: (agent, status) => set(
    agent === 'ecommerce'
      ? { ecommerceStatus: status }
      : { courierStatus: status }
  ),

  addAgentMessage: (step) => {
    const item: AgentMessageItem = {
      id: `agent-msg-${++agentMsgCounter}`,
      step,
      timestamp: Date.now(),
    };
    set((state) => {
      if (step.agent === 'ecommerce') {
        return { ecommerceMessages: [...state.ecommerceMessages, item] };
      } else if (step.agent === 'courier') {
        return { courierMessages: [...state.courierMessages, item] };
      } else {
        return { systemMessages: [...state.systemMessages, item] };
      }
    });
  },

  setRetrievalData: (agent, data) => set(
    agent === 'ecommerce'
      ? { ecommerceRetrievalData: data }
      : { courierRetrievalData: data }
  ),

  setSynthesisData: (data) => set({ synthesisData: data }),

  setClassification: (result) => set({ classification: result }),

  setDecision: (path, legitimacy, value) => set({
    activePath: path,
    claimLegitimacy: legitimacy,
    relationshipValue: value,
  }),

  setResolution: (text, token) => set({
    resolutionText: text,
    commitmentToken: token,
  }),

  clearAll: () => {
    set({
      ecommerceStatus: 'idle',
      courierStatus: 'idle',
      ecommerceMessages: [],
      courierMessages: [],
      systemMessages: [],
      ecommerceRetrievalData: null,
      courierRetrievalData: null,
      synthesisData: null,
      classification: null,
      activePath: null,
      claimLegitimacy: null,
      relationshipValue: null,
      commitmentToken: null,
      resolutionText: null,
    });
  },
}));
