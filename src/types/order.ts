export interface Order {
  order_id: string;
  customer_id: string;
  items: OrderItem[];
  total_value: number;
  order_date: string;
  payment_method: string;
  shipping_method: 'standard' | 'express' | 'next_day';
  promised_delivery_date: string;
  status: 'placed' | 'shipped' | 'delivered' | 'returned';
  tracking_id: string;
  warehouse_origin: string;
  carrier_handoff_timestamp: string;
  auto_refund_threshold: number;
}

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unit_price: number;
  category: string;
  fragility: 'none' | 'low' | 'medium' | 'high';
  returnable: boolean;
  weight_kg: number;
}
