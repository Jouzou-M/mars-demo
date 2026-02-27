import type {
  BlendProducts,
  CustomerProfile,
  ClaimLegitimacy,
  RelationshipValue,
  ResolutionPath,
} from '../types';

export function calculateLegitimacy(blend: BlendProducts): ClaimLegitimacy {
  if (blend.evidence_consistency_score > 0.6 && blend.claim_validity !== 'SUSPICIOUS') {
    return 'HIGH';
  }
  return 'LOW';
}

export function calculateRelationshipValue(customer: CustomerProfile): RelationshipValue {
  if (customer.tier === 'Gold' || customer.tier === 'Platinum') return 'HIGH';
  if (customer.lifetime_value > 500 && customer.fraud_risk_score < 30) return 'HIGH';
  return 'LOW';
}

export function selectPath(legitimacy: ClaimLegitimacy, value: RelationshipValue): ResolutionPath {
  if (legitimacy === 'HIGH' && value === 'HIGH') return 'A';
  if (legitimacy === 'LOW' && value === 'HIGH') return 'B';
  if (legitimacy === 'HIGH' && value === 'LOW') return 'C';
  return 'D';
}
