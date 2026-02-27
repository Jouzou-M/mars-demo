export interface CustomerProfile {
  customer_id: string;
  name: string;
  email: string;
  tier: 'Standard' | 'Silver' | 'Gold' | 'Platinum';
  account_age_months: number;
  lifetime_value: number;
  purchase_frequency: number;
  claims_history: ClaimRecord[];
  fraud_risk_score: number;
  preferred_language: string;
  channel_type: 'web' | 'mobile' | 'email';
}

export interface ClaimRecord {
  claim_id: string;
  type: 'stolen' | 'damaged' | 'wrong_item' | 'late' | 'return';
  date: string;
  outcome: 'approved' | 'denied' | 'pending';
  amount: number;
}
