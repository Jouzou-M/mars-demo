import type { AIProvider } from './provider';
import { GeminiProvider } from './gemini-provider';

export type { AIProvider } from './provider';

export function createAIProvider(apiKey: string): AIProvider {
  return new GeminiProvider(apiKey);
}
