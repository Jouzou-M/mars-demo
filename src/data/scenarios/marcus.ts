import type { CustomerProfile, Order, TrackingData, ScenarioMeta } from '../../types';

export const MARCUS_PROFILE: CustomerProfile = {
  customer_id: 'C-15540',
  name: 'Marcus Chen',
  email: 'marcus.chen@work.com',
  tier: 'Silver',
  account_age_months: 8,
  lifetime_value: 890,
  purchase_frequency: 1.5,
  claims_history: [{
    claim_id: 'CLM-6620',
    type: 'return',
    date: '2024-11-15',
    outcome: 'approved',
    amount: 45.00,
  }],
  fraud_risk_score: 22,
  preferred_language: 'en',
  channel_type: 'mobile',
};

export const MARCUS_ORDER: Order = {
  order_id: 'ORD-58330',
  customer_id: 'C-15540',
  items: [{
    sku: 'CRM-MUG-SET',
    name: 'Artisan Ceramic Mug Set (6-piece)',
    quantity: 1,
    unit_price: 79.99,
    category: 'Home & Kitchen',
    fragility: 'high',
    returnable: true,
    weight_kg: 3.8,
  }],
  total_value: 79.99,
  order_date: '2025-02-07',
  payment_method: 'Mastercard ending 7712',
  shipping_method: 'standard',
  promised_delivery_date: '2025-02-11',
  status: 'delivered',
  tracking_id: 'SWF-771204',
  warehouse_origin: 'Birmingham-B1',
  carrier_handoff_timestamp: '2025-02-07T11:00:00Z',
  auto_refund_threshold: 200,
};

export const MARCUS_TRACKING: TrackingData = {
  tracking_id: 'SWF-771204',
  timeline: [
    { timestamp: '2025-02-07T11:00:00Z', status: 'Picked up', location: 'Birmingham-B1', details: 'Package collected' },
    { timestamp: '2025-02-07T23:00:00Z', status: 'In transit', location: 'Birmingham Sort', details: 'Processed' },
    { timestamp: '2025-02-08T14:30:00Z', status: 'In transit', location: 'London Sort Facility', details: 'Processed \u2014 FLAG: weight discrepancy (-0.3kg)' },
    { timestamp: '2025-02-09T09:00:00Z', status: 'Out for delivery', location: 'Local Depot', details: 'With driver' },
    { timestamp: '2025-02-09T13:15:00Z', status: 'Delivered', location: 'Customer Address', details: 'Handed to recipient' },
  ],
  delivery_gps: { lat: 51.5225, lng: -0.0712 },
  geofence_match: true,
  geofence_distance_metres: 3,
  proof_of_delivery: {
    photo_url: null,
    signature: 'M. Chen',
    safe_place_description: null,
  },
  delivery_method: 'handed',
  condition_flags: ['weight_discrepancy'],
  exception_history: [],
  driver: { driver_id: 'DRV-189', incident_rate: 1.2, deliveries_today: 38 },
  route_risk: { area_classification: 'LOW', theft_frequency: 0.8 },
};

export const MARCUS_META: ScenarioMeta = {
  id: 'marcus',
  name: 'Marcus Chen',
  label: 'Marcus Chen \u2014 Damaged Item',
  description: 'Silver tier, one return, low fraud \u2192 Path B: Trust Extension',
  defaultMessage: "I just opened my delivery and 3 of the 6 mugs are smashed. The box looks like it was crushed. This was supposed to be a gift.",
  expectedPath: 'B',
};
