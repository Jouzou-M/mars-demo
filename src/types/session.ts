import type { CustomerProfile } from './customer';
import type { Order } from './order';
import type { TrackingData } from './tracking';
import type { AgentStep } from './agent';

export type AppMode = 'demo' | 'live';

export interface ScenarioMeta {
  id: string;
  name: string;
  label: string;
  description: string;
  defaultMessage: string;
  expectedPath: 'A' | 'B' | 'C' | 'D';
}

export interface Scenario {
  profile: CustomerProfile;
  order: Order;
  tracking: TrackingData;
  meta: ScenarioMeta;
  script: AgentStep[];
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'system';
  text: string;
  timestamp: number;
}
