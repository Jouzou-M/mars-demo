import type { ClassificationResult } from '../types';
import {
  COMPLAINT_KEYWORDS,
  INQUIRY_KEYWORDS,
  DELIVERY_KEYWORDS,
  PRODUCT_KEYWORDS,
  NEGATIVE_SENTIMENT,
  TRANSIT_DAMAGE_INDICATORS,
} from '../data/keywords';

export function classifyMessage(message: string): ClassificationResult {
  const lower = message.toLowerCase();

  // Intent detection
  const complaintScore = COMPLAINT_KEYWORDS.filter(k => lower.includes(k)).length;
  const inquiryScore = INQUIRY_KEYWORDS.filter(k => lower.includes(k)).length;

  let intent_type: ClassificationResult['intent_type'];
  if (complaintScore > inquiryScore) {
    intent_type = 'COMPLAINT';
  } else if (inquiryScore > 0) {
    intent_type = 'INQUIRY';
  } else {
    intent_type = 'UNCLEAR';
  }

  // Topic detection
  const deliveryScore = DELIVERY_KEYWORDS.filter(k => lower.includes(k)).length;
  const productScore = PRODUCT_KEYWORDS.filter(k => lower.includes(k)).length;

  let problem_topic: ClassificationResult['problem_topic'] = null;
  if (intent_type === 'COMPLAINT') {
    if (deliveryScore >= productScore && deliveryScore > 0) {
      problem_topic = 'DELIVERY';
    } else if (productScore > 0) {
      problem_topic = 'PRODUCT';
    }
  }

  // Sentiment
  const negativeHits = NEGATIVE_SENTIMENT.filter(k => lower.includes(k)).length;
  const sentiment_score = negativeHits > 0 ? -0.3 * Math.min(negativeHits, 3) : 0;

  // Confidence
  const totalHits = complaintScore + inquiryScore;
  const confidence_score = Math.min(0.5 + totalHits * 0.15, 0.99);

  // Multi-agent check
  const hasTransitDamage = TRANSIT_DAMAGE_INDICATORS.some(k => lower.includes(k));
  let requires_multi_agent = false;
  if (intent_type === 'COMPLAINT') {
    if (problem_topic === 'DELIVERY') {
      requires_multi_agent = true;
    } else if (problem_topic === 'PRODUCT' && hasTransitDamage) {
      requires_multi_agent = true;
    }
  }

  return {
    intent_type,
    problem_topic,
    confidence_score: Math.round(confidence_score * 100) / 100,
    sentiment_score: Math.round(sentiment_score * 100) / 100,
    extracted_entities: [],
    requires_multi_agent,
  };
}
