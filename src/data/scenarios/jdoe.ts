import type { CustomerProfile, Order, TrackingData, ScenarioMeta } from '../../types';

export const JDOE_PROFILE: CustomerProfile = {
  customer_id: 'C-44201',
  name: 'JDoe_99',
  email: 'jdoe99@tempmail.com',
  tier: 'Standard',
  account_age_months: 0.75,
  lifetime_value: 389.99,
  purchase_frequency: 4.0,
  claims_history: [{
    claim_id: 'CLM-8810',
    type: 'stolen',
    date: '2025-02-01',
    outcome: 'approved',
    amount: 89.99,
  }],
  fraud_risk_score: 72,
  preferred_language: 'en',
  channel_type: 'web',
};

export const JDOE_ORDER: Order = {
  order_id: 'ORD-62201',
  customer_id: 'C-44201',
  items: [{
    sku: 'HP-ELITE-500',
    name: 'EliteSound Noise-Cancelling Headphones',
    quantity: 1,
    unit_price: 389.99,
    category: 'Electronics',
    fragility: 'medium',
    returnable: true,
    weight_kg: 0.4,
  }],
  total_value: 389.99,
  order_date: '2025-02-09',
  payment_method: 'Prepaid Visa ending 1002',
  shipping_method: 'next_day',
  promised_delivery_date: '2025-02-10',
  status: 'delivered',
  tracking_id: 'SWF-001129',
  warehouse_origin: 'London-E14',
  carrier_handoff_timestamp: '2025-02-09T14:00:00Z',
  auto_refund_threshold: 200,
};

export const JDOE_TRACKING: TrackingData = {
  tracking_id: 'SWF-001129',
  timeline: [
    { timestamp: '2025-02-09T14:00:00Z', status: 'Picked up', location: 'London-E14 Warehouse', details: 'Package collected' },
    { timestamp: '2025-02-09T20:30:00Z', status: 'In transit', location: 'London Sort Facility', details: 'Processed' },
    { timestamp: '2025-02-10T07:15:00Z', status: 'Out for delivery', location: 'Local Depot', details: 'With driver' },
    { timestamp: '2025-02-10T11:47:00Z', status: 'Delivered', location: 'Customer Address', details: 'Left at door' },
  ],
  delivery_gps: { lat: 51.4816, lng: -0.0094 },
  geofence_match: true,
  geofence_distance_metres: 6,
  proof_of_delivery: {
    photo_url: '/mock/pod_jdoe_doorstep.jpg',
    signature: null,
    safe_place_description: 'Left at front door',
  },
  delivery_method: 'door',
  condition_flags: [],
  exception_history: [],
  driver: { driver_id: 'DRV-223', incident_rate: 0.5, deliveries_today: 52 },
  route_risk: { area_classification: 'LOW', theft_frequency: 1.1 },
};

export const JDOE_META: ScenarioMeta = {
  id: 'jdoe',
  name: 'JDoe_99',
  label: 'JDoe_99 \u2014 Stolen Package (Suspicious)',
  description: 'Standard tier, prior claim, high fraud score \u2192 Path D: Protective Caution',
  defaultMessage: "Package says delivered but I don't have it.",
  expectedPath: 'D',
};
