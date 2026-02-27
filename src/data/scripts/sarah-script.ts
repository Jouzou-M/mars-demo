import type { AgentStep } from '../../types';

export const SARAH_SCRIPT: AgentStep[] = [
  // Phase 1 — Breaking
  { phase: 1, agent: 'system', type: 'thinking', content: 'Analysing customer message...', delay_ms: 500 },
  { phase: 1, agent: 'system', type: 'decision', content: 'COMPLAINT detected \u00b7 Topic: DELIVERY \u00b7 Confidence: 0.95 \u00b7 Sentiment: -0.6', delay_ms: 800 },
  { phase: 1, agent: 'system', type: 'decision', content: 'Multi-agent activation required \u2014 both TechMart and SwiftShip agents activated in parallel.', delay_ms: 1000 },

  // Phase 2 — Blending: Retrieval
  { phase: 2, agent: 'ecommerce', type: 'retrieval', content: 'Pulling order and customer data...', delay_ms: 800,
    data: { 'Order Value': '\u00a3149.99', 'Customer Tier': 'Gold', 'Lifetime Value': '\u00a32,400', 'Account Age': '18 months', 'Prior Claims': '0', 'Fraud Risk': '8/100' }},
  { phase: 2, agent: 'courier', type: 'retrieval', content: 'Pulling tracking and delivery data...', delay_ms: 800,
    data: { 'Delivery Status': 'Confirmed', 'GPS Distance': '12m from address', 'Geofence': 'MATCH', 'POD': 'Photo available', 'Method': 'Left at door', 'Area Risk': 'MEDIUM (4.2/1000)' }},

  // Phase 2 — Blending: Exchange
  { phase: 2, agent: 'ecommerce', type: 'exchange', content: 'Sharing with SwiftShip: Order is \u00a3149.99, customer is Gold tier with \u00a32,400 LTV, zero prior claims. Fraud risk score 8/100 \u2014 very low. This is a trusted, valuable customer.', delay_ms: 1500 },
  { phase: 2, agent: 'courier', type: 'exchange', content: 'Sharing with TechMart: Delivery confirmed via GPS (12m from address, within geofence). POD photo shows package on doorstep. No transit damage flags. Driver DRV-441 has clean record (0.3% incident rate). Area theft rate: MEDIUM at 4.2 per 1,000 deliveries.', delay_ms: 1500 },

  // Phase 2 — Blending: Synthesis
  { phase: 2, agent: 'system', type: 'synthesis', content: 'Cross-domain synthesis complete', delay_ms: 1200,
    data: {
      'Claim Validity': 'PLAUSIBLE',
      'Liability': 'AMBIGUOUS (theft is external)',
      'Evidence Consistency': '0.82',
      'Scenario': 'STOLEN_PACKAGE',
      'Reasoning': 'Delivery confirmed at correct address with GPS match, but highly trusted customer with zero claim history reporting in a medium-risk area. Pattern consistent with genuine theft.',
    }},

  // Phase 3 — Bending: Path Selection
  { phase: 3, agent: 'system', type: 'decision', content: 'Resolution path: HIGH legitimacy + HIGH relationship value \u2192 PATH A: FULL FLEX', delay_ms: 1000,
    data: { path: 'A', 'Claim Legitimacy': 'HIGH', 'Relationship Value': 'HIGH' }},

  // Phase 3 — Bending: Agent Calibration
  { phase: 3, agent: 'ecommerce', type: 'decision', content: 'Recommending: Instant replacement (SPK-PRO-400 in stock at London-E14), \u00a315 store credit for inconvenience, signature-required delivery. Total cost: \u00a3172.99 (within \u00a3200 auto-refund threshold).', delay_ms: 1200 },
  { phase: 3, agent: 'courier', type: 'decision', content: 'Recommending: Signature-required redelivery. Slot available tomorrow 09:00\u201313:00. Updating delivery preferences for this address to require signature on all future deliveries.', delay_ms: 1200 },

  // Phase 3 — Bending: Consensus
  { phase: 3, agent: 'ecommerce', type: 'consensus', content: '\u2705 Inventory confirmed \u00b7 Financial authorised \u00b7 \u00a315 credit applied', delay_ms: 800 },
  { phase: 3, agent: 'courier', type: 'consensus', content: '\u2705 Logistics confirmed \u00b7 Redelivery slot reserved \u00b7 Address preferences updated', delay_ms: 800 },
  { phase: 3, agent: 'system', type: 'consensus', content: 'COMMITMENT TOKEN: RES-55412-A', delay_ms: 600 },

  // Phase 4 — Resolution
  { phase: 4, agent: 'system', type: 'resolution', content: "I'm really sorry about this, Sarah. I've looked into your case thoroughly and can confirm the package was delivered to your address but appears to have been taken. Here's what I've arranged:\n\n\u2022 An immediate replacement ProSound Wireless Speaker is being dispatched now\n\u2022 It will arrive tomorrow between 09:00\u201313:00 with signature required\n\u2022 I've added a \u00a315 credit to your account for the inconvenience\n\u2022 All future deliveries to your address will require a signature\n\nYou'll receive a confirmation email shortly with the new tracking number. Is there anything else I can help with?", delay_ms: 0 },
];
