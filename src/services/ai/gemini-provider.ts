import { GoogleGenAI } from '@google/genai';
import type {
  ClassificationResult,
  BlendProducts,
  ResolutionPath,
  AgentResponse,
} from '../../types';
import type { AIProvider, SessionContext, EcomAgentPayload, CourierAgentPayload, ResolutionContext } from './provider';
import {
  CLASSIFIER_SYSTEM_PROMPT,
  buildEcomPrompt,
  buildCourierPrompt,
  buildSynthesisPrompt,
  buildResolutionPrompt,
} from './prompts';
import { PATHS } from '../../data';
import { formatCurrency } from '../../utils/formatCurrency';

export class GeminiProvider implements AIProvider {
  private client: GoogleGenAI;
  private model = 'gemini-2.0-flash';

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({ apiKey });
  }

  async classify(message: string, _context: SessionContext): Promise<ClassificationResult> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: `Customer message: "${message}"`,
      config: {
        systemInstruction: CLASSIFIER_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      },
    });
    return JSON.parse(response.text ?? '{}') as ClassificationResult;
  }

  async runEcommerceAgent(payload: EcomAgentPayload): Promise<AgentResponse> {
    const customerData = JSON.stringify(payload.customer, null, 2);
    const orderData = JSON.stringify(payload.order, null, 2);
    const systemPrompt = buildEcomPrompt(customerData, orderData);

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: `Customer complaint: "${payload.customerMessage}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });
    return JSON.parse(response.text ?? '{}') as AgentResponse;
  }

  async runCourierAgent(payload: CourierAgentPayload): Promise<AgentResponse> {
    const trackingData = JSON.stringify(payload.tracking, null, 2);
    const systemPrompt = buildCourierPrompt(trackingData);

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: `Customer complaint: "${payload.customerMessage}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });
    return JSON.parse(response.text ?? '{}') as AgentResponse;
  }

  async synthesize(
    ecomFindings: string,
    courierFindings: string,
    context: SessionContext,
  ): Promise<BlendProducts> {
    const systemPrompt = buildSynthesisPrompt(ecomFindings, courierFindings, context.customerMessage);

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: 'Synthesize the findings from both agents.',
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });
    return JSON.parse(response.text ?? '{}') as BlendProducts;
  }

  async generateResolution(path: ResolutionPath, context: ResolutionContext): Promise<string> {
    const pathConfig = PATHS[path];
    const orderDetails = `${context.order.items[0]?.name} (${formatCurrency(context.order.total_value)})`;
    const blendSummary = `Validity: ${context.blendProducts.claim_validity}, Liability: ${context.blendProducts.liability}, Evidence: ${context.blendProducts.evidence_consistency_score}`;

    const systemPrompt = buildResolutionPrompt(
      path,
      pathConfig.name,
      context.customer.name.split(' ')[0],
      orderDetails,
      blendSummary,
    );

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: 'Generate the customer-facing resolution message.',
      config: {
        systemInstruction: systemPrompt,
      },
    });
    return response.text ?? 'Unable to generate resolution. Please try again.';
  }
}
