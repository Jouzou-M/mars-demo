import type { AgentStep } from '../../types';

export const MARCUS_SCRIPT: AgentStep[] = [
  // Phase 1 — Breaking
  { phase: 1, agent: 'system', type: 'thinking', content: 'Analysing customer message...', delay_ms: 500 },
  { phase: 1, agent: 'system', type: 'decision', content: 'COMPLAINT detected \u00b7 Topic: PRODUCT \u00b7 Confidence: 0.97 \u00b7 Sentiment: -0.7', delay_ms: 800 },
  { phase: 1, agent: 'system', type: 'thinking', content: 'Checking for transit damage indicators... "box looks like it was crushed" \u2014 transit damage plausible.', delay_ms: 600 },
  { phase: 1, agent: 'system', type: 'decision', content: 'Multi-agent activation required \u2014 product damage with transit damage indicators. Both agents activated.', delay_ms: 1000 },

  // Phase 2 — Blending: Retrieval
  { phase: 2, agent: 'ecommerce', type: 'retrieval', content: 'Pulling order and customer data...', delay_ms: 800,
    data: { 'Order Value': '\u00a379.99', 'Customer Tier': 'Silver', 'Lifetime Value': '\u00a3890', 'Account Age': '8 months', 'Prior Claims': '1 (return, approved)', 'Fraud Risk': '22/100', 'Item Fragility': 'HIGH' }},
  { phase: 2, agent: 'courier', type: 'retrieval', content: 'Pulling tracking and delivery data...', delay_ms: 800,
    data: { 'Delivery Status': 'Confirmed', 'GPS Distance': '3m from address', 'Geofence': 'MATCH', 'POD': 'Signature: M. Chen', 'Method': 'Handed to recipient', 'Condition Flags': 'WEIGHT DISCREPANCY (-0.3kg)', 'Driver Incident Rate': '1.2%' }},

  // Phase 2 — Blending: Exchange
  { phase: 2, agent: 'ecommerce', type: 'exchange', content: 'Sharing with SwiftShip: Order is \u00a379.99 for a 6-piece ceramic mug set, fragility rated HIGH. Customer is Silver tier, 8-month account, \u00a3890 LTV, fraud score 22/100 \u2014 low risk. Only prior interaction was a standard return. Item was intended as a gift (heightened emotional impact).', delay_ms: 1500 },
  { phase: 2, agent: 'courier', type: 'exchange', content: 'Sharing with TechMart: Delivery confirmed via GPS (3m, handed to recipient with signature). However, CRITICAL FLAG: weight discrepancy of -0.3kg detected at London Sort Facility. This suggests contents may have shifted or broken during transit. Driver DRV-189 has slightly elevated incident rate (1.2%). Package routed through Birmingham Sort \u2192 London Sort.', delay_ms: 1500 },

  // Phase 2 — Blending: Synthesis
  { phase: 2, agent: 'system', type: 'synthesis', content: 'Cross-domain synthesis complete', delay_ms: 1200,
    data: {
      'Claim Validity': 'PLAUSIBLE',
      'Liability': 'AMBIGUOUS',
      'Evidence Consistency': '0.55',
      'Scenario': 'DAMAGED',
      'Reasoning': 'Weight discrepancy flag provides some corroboration, but -0.3kg is within margin of error for ceramic items. No photo evidence of damage provided. Claim is plausible but not definitively confirmed. Customer has a clean record and moderate relationship value — Trust Extension is appropriate.',
    }},

  // Phase 3 — Bending: Path Selection
  { phase: 3, agent: 'system', type: 'decision', content: 'Resolution path: LOW legitimacy + HIGH relationship value \u2192 PATH B: TRUST EXTENSION', delay_ms: 1000,
    data: { path: 'B', 'Claim Legitimacy': 'LOW', 'Relationship Value': 'HIGH' }},

  // Phase 3 — Bending: Agent Calibration
  { phase: 3, agent: 'ecommerce', type: 'decision', content: 'Recommending: Immediate replacement mug set dispatched from Birmingham-B1. Customer may keep damaged items (return not required for broken ceramics \u2014 safety). \u00a310 store credit as goodwill. Enhanced packaging flagged for this SKU.', delay_ms: 1200 },
  { phase: 3, agent: 'courier', type: 'decision', content: 'Recommending: Carrier damage claim filed internally (liability: SwiftShip). Enhanced packaging handling for fragility:HIGH items flagged. Driver DRV-189 incident record updated. Delivery scheduled with care-handling tag.', delay_ms: 1200 },

  // Phase 3 — Bending: Consensus
  { phase: 3, agent: 'ecommerce', type: 'consensus', content: '\u2705 Replacement in stock \u00b7 Financial authorised \u00b7 \u00a310 credit applied \u00b7 No return required', delay_ms: 800 },
  { phase: 3, agent: 'courier', type: 'consensus', content: '\u2705 Damage claim filed \u00b7 Care-handling tag added \u00b7 Redelivery scheduled', delay_ms: 800 },
  { phase: 3, agent: 'system', type: 'consensus', content: 'COMMITMENT TOKEN: RES-58330-B', delay_ms: 600 },

  // Phase 4 — Resolution
  { phase: 4, agent: 'system', type: 'resolution', content: "I'm so sorry about your mugs, Marcus \u2014 especially since they were meant as a gift. I've investigated and our courier records show the package sustained damage during transit (our sort facility flagged a weight discrepancy).\n\nHere's what I've arranged:\n\n\u2022 A replacement Artisan Ceramic Mug Set is being dispatched today with enhanced protective packaging\n\u2022 You don't need to return the damaged mugs \u2014 please dispose of any broken pieces safely\n\u2022 I've added a \u00a310 credit to your account as a goodwill gesture\n\u2022 The replacement will be handled with a special care-handling tag throughout transit\n\nYou'll receive tracking details by email shortly. I hope the replacement arrives in perfect condition for your gift!", delay_ms: 0 },
];
