import type { CustomerProfile, Order, TrackingData, ScenarioMeta } from '../../types';

export const SARAH_PROFILE: CustomerProfile = {
  customer_id: 'C-8821',
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@email.com',
  tier: 'Gold',
  account_age_months: 18,
  lifetime_value: 2400,
  purchase_frequency: 2.3,
  claims_history: [],
  fraud_risk_score: 8,
  preferred_language: 'en',
  channel_type: 'web',
};

export const SARAH_ORDER: Order = {
  order_id: 'ORD-55412',
  customer_id: 'C-8821',
  items: [{
    sku: 'SPK-PRO-400',
    name: 'ProSound Wireless Speaker',
    quantity: 1,
    unit_price: 149.99,
    category: 'Electronics',
    fragility: 'medium',
    returnable: true,
    weight_kg: 1.2,
  }],
  total_value: 149.99,
  order_date: '2025-02-08',
  payment_method: 'Visa ending 4821',
  shipping_method: 'express',
  promised_delivery_date: '2025-02-10',
  status: 'delivered',
  tracking_id: 'SWF-998871',
  warehouse_origin: 'London-E14',
  carrier_handoff_timestamp: '2025-02-08T16:30:00Z',
  auto_refund_threshold: 200,
};

export const SARAH_TRACKING: TrackingData = {
  tracking_id: 'SWF-998871',
  timeline: [
    { timestamp: '2025-02-08T16:30:00Z', status: 'Picked up', location: 'London-E14 Warehouse', details: 'Package collected by courier' },
    { timestamp: '2025-02-08T22:15:00Z', status: 'In transit', location: 'London Sort Facility', details: 'Processed through sort' },
    { timestamp: '2025-02-09T06:00:00Z', status: 'In transit', location: 'Regional Hub - South', details: 'En route to local depot' },
    { timestamp: '2025-02-09T08:30:00Z', status: 'Out for delivery', location: 'Local Depot', details: 'With driver for delivery' },
    { timestamp: '2025-02-09T14:32:00Z', status: 'Delivered', location: 'Customer Address', details: 'Left at front door' },
  ],
  delivery_gps: { lat: 51.5074, lng: -0.1278 },
  geofence_match: true,
  geofence_distance_metres: 12,
  proof_of_delivery: {
    photo_url: '/mock/pod_sarah_doorstep.jpg',
    signature: null,
    safe_place_description: 'Left at front door',
  },
  delivery_method: 'door',
  condition_flags: [],
  exception_history: [],
  driver: { driver_id: 'DRV-441', incident_rate: 0.3, deliveries_today: 47 },
  route_risk: { area_classification: 'MEDIUM', theft_frequency: 4.2 },
};

export const SARAH_META: ScenarioMeta = {
  id: 'sarah',
  name: 'Sarah Mitchell',
  label: 'Sarah Mitchell \u2014 Stolen Package',
  description: 'Gold tier, zero claims, low fraud \u2192 Path A: Full Flex',
  defaultMessage: "My package was marked as delivered yesterday but I never received it. I've checked with my neighbours and it's nowhere to be found.",
  expectedPath: 'A',
};
