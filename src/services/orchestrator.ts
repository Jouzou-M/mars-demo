import { SCENARIOS } from '../data';
import { useSessionStore } from '../store/sessionStore';
import { useChatStore } from '../store/chatStore';
import { useAgentStore } from '../store/agentStore';
import { playDemoScript } from './demo-player';
import { classifyMessage } from './classifier';
import { calculateLegitimacy, calculateRelationshipValue, selectPath } from './resolution-engine';
import { PATHS } from '../data';
import { delay } from '../utils/delay';
import type { AIProvider } from './ai/provider';

let currentAbortController: AbortController | null = null;

export function abortOrchestrator() {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
}

export async function runOrchestrator(
  scenarioId: string,
  message: string,
  aiProvider?: AIProvider | null,
) {
  // Abort any running session
  abortOrchestrator();
  const ac = new AbortController();
  currentAbortController = ac;
  const signal = ac.signal;

  const session = useSessionStore.getState();
  const scenario = SCENARIOS[scenarioId];
  if (!scenario) return;

  // Reset stores
  useChatStore.getState().clearMessages();
  useAgentStore.getState().clearAll();
  session.reset();
  session.selectScenario(scenarioId);
  session.startProcessing(message);

  try {
    // Phase 0: Entry
    session.setPhase(0);
    useChatStore.getState().addMessage('customer', message);
    await delay(500, signal);

    if (session.mode === 'demo') {
      // Demo mode: play scripted sequence
      await playDemoScript(scenario.script, signal);
    } else if (session.mode === 'live' && aiProvider) {
      // Live AI mode
      await runLiveMode(scenarioId, message, aiProvider, signal);
    } else {
      // Live mode without API key — fall back to demo
      await playDemoScript(scenario.script, signal);
    }

    if (!signal.aborted) {
      useSessionStore.getState().finishProcessing();
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') return;
    console.error('Orchestrator error:', err);
    useSessionStore.getState().finishProcessing();
    useChatStore.getState().addMessage('system', 'An error occurred while processing your request. Please try again.');
  }
}

async function runLiveMode(
  scenarioId: string,
  message: string,
  ai: AIProvider,
  signal: AbortSignal,
) {
  const scenario = SCENARIOS[scenarioId];
  const session = useSessionStore.getState;
  const chat = useChatStore.getState;
  const agent = useAgentStore.getState;

  const context = {
    customer: scenario.profile,
    order: scenario.order,
    tracking: scenario.tracking,
    customerMessage: message,
  };

  // Phase 1: Breaking — Classify
  session().setPhase(1);
  agent().addAgentMessage({ phase: 1, agent: 'system', type: 'thinking', content: 'Analysing customer message with AI...', delay_ms: 0 });

  let classification;
  try {
    classification = await ai.classify(message, context);
  } catch {
    // Fallback to keyword classifier
    classification = classifyMessage(message);
  }
  if (signal.aborted) return;

  agent().setClassification(classification);
  agent().addAgentMessage({
    phase: 1, agent: 'system', type: 'decision',
    content: `${classification.intent_type} detected \u00b7 Topic: ${classification.problem_topic} \u00b7 Multi-agent: ${classification.requires_multi_agent ? 'Yes' : 'No'}`,
    delay_ms: 0,
  });
  await delay(800, signal);

  if (!classification.requires_multi_agent) {
    // Single-agent simplified path
    chat().addMessage('system', 'This type of issue is being handled by a single agent. For the full multi-agent demo, try reporting a delivery or product damage issue.');
    return;
  }

  // Phase 2: Blending
  session().setPhase(2);
  agent().setAgentStatus('ecommerce', 'retrieving');
  agent().setAgentStatus('courier', 'retrieving');

  // Run both agents in parallel
  let ecomResponse, courierResponse;
  try {
    [ecomResponse, courierResponse] = await Promise.all([
      ai.runEcommerceAgent({ customer: context.customer, order: context.order, customerMessage: message }),
      ai.runCourierAgent({ tracking: context.tracking, customerMessage: message }),
    ]);
  } catch {
    // Fallback: use scripted data
    chat().addMessage('system', 'AI agent call failed. Falling back to demo mode...');
    await playDemoScript(scenario.script, signal);
    return;
  }
  if (signal.aborted) return;

  // Display retrieval
  agent().setRetrievalData('ecommerce', ecomResponse.retrieval);
  agent().addAgentMessage({ phase: 2, agent: 'ecommerce', type: 'retrieval', content: 'Order and customer data retrieved.', data: ecomResponse.retrieval, delay_ms: 0 });
  agent().setRetrievalData('courier', courierResponse.retrieval);
  agent().addAgentMessage({ phase: 2, agent: 'courier', type: 'retrieval', content: 'Tracking and delivery data retrieved.', data: courierResponse.retrieval, delay_ms: 0 });
  await delay(800, signal);

  // Exchange
  agent().setAgentStatus('ecommerce', 'exchanging');
  agent().setAgentStatus('courier', 'exchanging');
  agent().addAgentMessage({ phase: 2, agent: 'ecommerce', type: 'exchange', content: ecomResponse.findings, delay_ms: 0 });
  await delay(500, signal);
  agent().addAgentMessage({ phase: 2, agent: 'courier', type: 'exchange', content: courierResponse.findings, delay_ms: 0 });
  await delay(1000, signal);

  // Synthesis
  let blendProducts;
  try {
    blendProducts = await ai.synthesize(ecomResponse.findings, courierResponse.findings, context);
  } catch {
    blendProducts = {
      claim_validity: 'PLAUSIBLE' as const,
      liability: 'SHARED' as const,
      evidence_consistency_score: 0.7,
      urgency_weighting: 0.5,
      scenario_classification: 'STOLEN_PACKAGE' as const,
      reasoning: 'AI synthesis failed, using default assessment.',
    };
  }
  if (signal.aborted) return;

  agent().setSynthesisData(blendProducts);
  agent().addAgentMessage({ phase: 2, agent: 'system', type: 'synthesis', content: 'Cross-domain synthesis complete', data: blendProducts as any, delay_ms: 0 });
  await delay(800, signal);

  // Phase 3: Bending
  session().setPhase(3);
  const legitimacy = calculateLegitimacy(blendProducts);
  const relationship = calculateRelationshipValue(context.customer);
  const path = selectPath(legitimacy, relationship);

  agent().setDecision(path, legitimacy, relationship);
  agent().addAgentMessage({
    phase: 3, agent: 'system', type: 'decision',
    content: `Resolution path: ${legitimacy} legitimacy + ${relationship} value \u2192 PATH ${path}: ${PATHS[path].name}`,
    data: { path, 'Claim Legitimacy': legitimacy, 'Relationship Value': relationship },
    delay_ms: 0,
  });
  await delay(1000, signal);

  // Generate resolution
  let resolutionText;
  try {
    resolutionText = await ai.generateResolution(path, {
      ...context,
      blendProducts,
      legitimacy,
      relationship,
    });
  } catch {
    resolutionText = `We've reviewed your case and determined the resolution path: ${PATHS[path].name}. Our team will follow up with specific actions shortly.`;
  }
  if (signal.aborted) return;

  const token = `RES-${context.order.order_id.split('-')[1]}-${path}`;
  agent().setResolution(resolutionText, token);
  agent().addAgentMessage({ phase: 3, agent: 'system', type: 'consensus', content: `COMMITMENT TOKEN: ${token}`, delay_ms: 0 });
  await delay(500, signal);

  // Phase 4: Deliver to customer
  session().setPhase(4);
  chat().setTyping(true);
  await delay(1500, signal);
  chat().setTyping(false);
  chat().addMessage('system', resolutionText);

  agent().setAgentStatus('ecommerce', 'complete');
  agent().setAgentStatus('courier', 'complete');
}
