import type {
  ClassificationResult,
  BlendProducts,
  ResolutionPath,
  ClaimLegitimacy,
  RelationshipValue,
  CustomerProfile,
  Order,
  TrackingData,
  AgentResponse,
} from '../../types';

export interface SessionContext {
  customer: CustomerProfile;
  order: Order;
  tracking: TrackingData;
  customerMessage: string;
}

export interface EcomAgentPayload {
  customer: CustomerProfile;
  order: Order;
  customerMessage: string;
}

export interface CourierAgentPayload {
  tracking: TrackingData;
  customerMessage: string;
}

export interface ResolutionContext extends SessionContext {
  blendProducts: BlendProducts;
  legitimacy: ClaimLegitimacy;
  relationship: RelationshipValue;
}

export interface AIProvider {
  classify(message: string, context: SessionContext): Promise<ClassificationResult>;
  runEcommerceAgent(payload: EcomAgentPayload): Promise<AgentResponse>;
  runCourierAgent(payload: CourierAgentPayload): Promise<AgentResponse>;
  synthesize(ecomFindings: string, courierFindings: string, context: SessionContext): Promise<BlendProducts>;
  generateResolution(path: ResolutionPath, context: ResolutionContext): Promise<string>;
}
