import type { AgentStep } from '../../types';

export const JDOE_SCRIPT: AgentStep[] = [
  // Phase 1 — Breaking
  { phase: 1, agent: 'system', type: 'thinking', content: 'Analysing customer message...', delay_ms: 500 },
  { phase: 1, agent: 'system', type: 'decision', content: 'COMPLAINT detected \u00b7 Topic: DELIVERY \u00b7 Confidence: 0.88 \u00b7 Sentiment: -0.3', delay_ms: 800 },
  { phase: 1, agent: 'system', type: 'decision', content: 'Multi-agent activation required \u2014 both TechMart and SwiftShip agents activated in parallel.', delay_ms: 1000 },

  // Phase 2 — Blending: Retrieval
  { phase: 2, agent: 'ecommerce', type: 'retrieval', content: 'Pulling order and customer data...', delay_ms: 800,
    data: { 'Order Value': '\u00a3389.99', 'Customer Tier': 'Standard', 'Lifetime Value': '\u00a3390', 'Account Age': '3 weeks', 'Prior Claims': '1 (stolen, approved)', 'Fraud Risk': '72/100' }},
  { phase: 2, agent: 'courier', type: 'retrieval', content: 'Pulling tracking and delivery data...', delay_ms: 800,
    data: { 'Delivery Status': 'Confirmed', 'GPS Distance': '6m from address', 'Geofence': 'MATCH', 'POD': 'Photo available', 'Method': 'Left at door', 'Area Risk': 'LOW (1.1/1000)' }},

  // Phase 2 — Blending: Exchange
  { phase: 2, agent: 'ecommerce', type: 'exchange', content: 'Sharing with SwiftShip: Order is \u00a3389.99 (above auto-refund threshold), customer is Standard tier, account only 3 weeks old with \u00a3390 LTV. Already has 1 prior stolen-package claim (approved). Fraud risk score 72/100 \u2014 HIGH. Purchase frequency of 4.0/month is elevated for a new account.', delay_ms: 1500 },
  { phase: 2, agent: 'courier', type: 'exchange', content: 'Sharing with TechMart: Delivery confirmed via GPS (6m from address, tight geofence match). POD photo shows package at doorstep. No transit damage. Driver DRV-223 has clean record (0.5% incident rate). Area theft rate: LOW at 1.1 per 1,000 deliveries. No delivery exceptions.', delay_ms: 1500 },

  // Phase 2 — Blending: Synthesis
  { phase: 2, agent: 'system', type: 'synthesis', content: 'Cross-domain synthesis complete', delay_ms: 1200,
    data: {
      'Claim Validity': 'SUSPICIOUS',
      'Liability': 'CUSTOMER_RISK',
      'Evidence Consistency': '0.41',
      'Scenario': 'STOLEN_PACKAGE',
      'Reasoning': 'Delivery strongly confirmed (6m GPS, low-risk area), but customer profile raises multiple red flags: brand new account, high purchase frequency, prior claim, very high fraud score. Pattern inconsistent with genuine theft in a low-risk area.',
    }},

  // Phase 3 — Bending: Path Selection
  { phase: 3, agent: 'system', type: 'decision', content: 'Resolution path: LOW legitimacy + LOW relationship value \u2192 PATH D: PROTECTIVE CAUTION', delay_ms: 1000,
    data: { path: 'D', 'Claim Legitimacy': 'LOW', 'Relationship Value': 'LOW' }},

  // Phase 3 — Bending: Agent Calibration
  { phase: 3, agent: 'ecommerce', type: 'decision', content: 'Recommending: Refund held pending police report submission within 48 hours. Account flagged for monitoring. No immediate replacement \u2014 order value (\u00a3389.99) exceeds auto-refund threshold (\u00a3200). Case escalated for manual review if police report provided.', delay_ms: 1200 },
  { phase: 3, agent: 'courier', type: 'decision', content: 'Recommending: All future deliveries to this address require OTP (one-time password) verification. GPS data and POD photo retained as evidence. No logistics action required at this time.', delay_ms: 1200 },

  // Phase 3 — Bending: Consensus
  { phase: 3, agent: 'ecommerce', type: 'consensus', content: '\u2705 Refund hold applied \u00b7 Account flagged \u00b7 Manual review queued', delay_ms: 800 },
  { phase: 3, agent: 'courier', type: 'consensus', content: '\u2705 OTP delivery requirement set \u00b7 Evidence preserved \u00b7 No redelivery', delay_ms: 800 },
  { phase: 3, agent: 'system', type: 'consensus', content: 'COMMITMENT TOKEN: RES-62201-D', delay_ms: 600 },

  // Phase 4 — Resolution
  { phase: 4, agent: 'system', type: 'resolution', content: "Thank you for contacting us. I've looked into your delivery and our records show the package was delivered to your address with GPS confirmation.\n\nTo proceed with your claim, we'll need:\n\n\u2022 A police report filed for the missing package (within 48 hours)\n\u2022 Once received, your refund will be reviewed by our team within 2\u20133 business days\n\nFor your security, we've updated your delivery preferences to require a one-time password for all future deliveries.\n\nPlease reply with your police report reference number once available, and we'll prioritise your case.", delay_ms: 0 },
];
