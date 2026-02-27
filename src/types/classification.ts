export interface ClassificationResult {
  intent_type: 'INQUIRY' | 'COMPLAINT' | 'UNCLEAR';
  problem_topic: 'DELIVERY' | 'PRODUCT' | 'BILLING' | 'POLICY' | null;
  confidence_score: number;
  sentiment_score: number;
  extracted_entities: string[];
  requires_multi_agent: boolean;
  reasoning?: string;
}
