import type { AgentStep, Phase } from '../types';
import { useSessionStore } from '../store/sessionStore';
import { useChatStore } from '../store/chatStore';
import { useAgentStore } from '../store/agentStore';
import { useUIStore } from '../store/uiStore';

/**
 * Worker-based timing for demo playback.
 *
 * The page may be document.hidden (e.g. in Playwright / Preview),
 * which causes Chrome to freeze all main-thread timers. Web Workers
 * have their own event loop and are immune to page-visibility throttling.
 */
const WORKER_SRC = `
  let schedule = [];
  let idx = 0;
  let waitUntil = 0;

  self.onmessage = (e) => {
    if (e.data.type === 'start') {
      schedule = e.data.schedule;
      idx = 0;
      waitUntil = 0;
      tick();
    } else if (e.data.type === 'stop') {
      schedule = [];
      idx = -1;
    }
  };

  function tick() {
    if (idx < 0 || idx >= schedule.length) {
      self.postMessage({ type: 'done' });
      return;
    }

    const now = Date.now();
    if (now < waitUntil) {
      setTimeout(tick, Math.min(50, waitUntil - now));
      return;
    }

    // Emit current step
    self.postMessage({ type: 'step', index: idx });

    idx++;
    if (idx < schedule.length) {
      waitUntil = Date.now() + schedule[idx].delay;
      setTimeout(tick, Math.min(50, schedule[idx].delay));
    } else {
      self.postMessage({ type: 'done' });
    }
  }
`;

let workerBlobUrl: string | null = null;
function getWorkerUrl(): string {
  if (!workerBlobUrl) {
    workerBlobUrl = URL.createObjectURL(
      new Blob([WORKER_SRC], { type: 'application/javascript' }),
    );
  }
  return workerBlobUrl;
}

export function playDemoScript(
  script: AgentStep[],
  signal: AbortSignal,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const speed = useUIStore.getState().animationSpeed;
    let lastPhase: Phase | null = null;

    // Pre-calculate delay schedule for the worker
    const schedule = script.map((step, i) => {
      let delay = step.delay_ms * speed;
      // First step has no delay
      if (i === 0) delay = 0;
      // Add phase transition delay
      if (i > 0 && step.phase !== script[i - 1].phase) {
        delay += 300;
      }
      return { delay };
    });

    const worker = new Worker(getWorkerUrl());

    function cleanup() {
      worker.terminate();
    }

    worker.onmessage = (e) => {
      if (signal.aborted) {
        cleanup();
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }

      if (e.data.type === 'step') {
        const step = script[e.data.index];

        // Phase transition
        if (step.phase !== lastPhase) {
          useSessionStore.getState().setPhase(step.phase);
          lastPhase = step.phase;
        }

        try {
          processStepContent(step);
        } catch (err) {
          console.error(`[demo-player] Error at step ${e.data.index}:`, err);
        }
      } else if (e.data.type === 'done') {
        cleanup();
        resolve();
      }
    };

    worker.onerror = (err) => {
      cleanup();
      console.error('[demo-player] Worker error:', err);
      // Fallback: process all steps synchronously
      for (const step of script) {
        if (step.phase !== lastPhase) {
          useSessionStore.getState().setPhase(step.phase);
          lastPhase = step.phase;
        }
        try { processStepContent(step); } catch {}
      }
      resolve();
    };

    signal.addEventListener('abort', () => {
      worker.postMessage({ type: 'stop' });
      cleanup();
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });

    // Start the worker
    worker.postMessage({ type: 'start', schedule });
  });
}

function processStepContent(step: AgentStep): void {
  const agent = useAgentStore.getState;
  const chat = useChatStore.getState;

  // Update agent status
  if (step.agent === 'ecommerce' || step.agent === 'courier') {
    const statusMap: Record<string, string> = {
      thinking: 'thinking',
      retrieval: 'retrieving',
      exchange: 'exchanging',
      decision: 'deciding',
      consensus: 'complete',
    };
    const status = statusMap[step.type] || 'thinking';
    agent().setAgentStatus(step.agent, status as any);
  }

  // Add the message
  agent().addAgentMessage(step);

  // Handle data payloads
  if (step.type === 'retrieval' && step.data && (step.agent === 'ecommerce' || step.agent === 'courier')) {
    agent().setRetrievalData(step.agent, step.data);
  }

  if (step.type === 'synthesis' && step.data) {
    agent().setSynthesisData({
      claim_validity: step.data['Claim Validity'] || step.data.claim_validity || 'PLAUSIBLE',
      liability: step.data['Liability'] || step.data.liability || 'SHARED',
      evidence_consistency_score: parseFloat(step.data['Evidence Consistency'] || step.data.evidence_consistency_score || '0.5'),
      urgency_weighting: 0.5,
      scenario_classification: step.data['Scenario'] || step.data.scenario_classification || 'STOLEN_PACKAGE',
      reasoning: step.data['Reasoning'] || step.data.reasoning || '',
    });
  }

  if (step.type === 'decision' && step.data?.path) {
    agent().setDecision(
      step.data.path,
      step.data['Claim Legitimacy'] || 'HIGH',
      step.data['Relationship Value'] || 'HIGH',
    );
  }

  if (step.type === 'consensus' && step.content.includes('COMMITMENT TOKEN')) {
    const token = step.content.split(': ')[1] || 'RES-UNKNOWN';
    agent().setResolution('', token);
  }

  // Resolution message goes to customer chat
  if (step.type === 'resolution') {
    chat().addMessage('system', step.content);
    agent().setResolution(step.content, agent().commitmentToken || 'RES-UNKNOWN');
    agent().setAgentStatus('ecommerce', 'complete');
    agent().setAgentStatus('courier', 'complete');
  }
}
