export interface TrackingData {
  tracking_id: string;
  timeline: TrackingEvent[];
  delivery_gps: { lat: number; lng: number } | null;
  geofence_match: boolean;
  geofence_distance_metres: number;
  proof_of_delivery: {
    photo_url: string | null;
    signature: string | null;
    safe_place_description: string | null;
  };
  delivery_method: 'door' | 'neighbour' | 'safe_place' | 'locker' | 'handed';
  condition_flags: string[];
  exception_history: DeliveryException[];
  driver: {
    driver_id: string;
    incident_rate: number;
    deliveries_today: number;
  };
  route_risk: {
    area_classification: 'LOW' | 'MEDIUM' | 'HIGH';
    theft_frequency: number;
  };
}

export interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  details: string;
}

export interface DeliveryException {
  type: 'failed_attempt' | 'weather_delay' | 'address_not_found' | 'access_issue';
  timestamp: string;
  notes: string;
}
