/**
 * Worker-based delay that is immune to page-visibility timer throttling.
 *
 * When document.hidden is true (e.g. Playwright, background tabs), Chrome
 * freezes main-thread setTimeout/setInterval. A Web Worker's timers are
 * unaffected, so we delegate the wait there.
 */

const DELAY_WORKER_SRC = `self.onmessage = (e) => { setTimeout(() => self.postMessage('done'), e.data); };`;

let delayWorkerUrl: string | null = null;
function getDelayWorkerUrl(): string {
  if (!delayWorkerUrl) {
    delayWorkerUrl = URL.createObjectURL(
      new Blob([DELAY_WORKER_SRC], { type: 'application/javascript' }),
    );
  }
  return delayWorkerUrl;
}

export function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(new DOMException('Aborted', 'AbortError'));
  }

  // For zero or near-zero delays, resolve immediately
  if (ms <= 0) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const worker = new Worker(getDelayWorkerUrl());

    function cleanup() {
      worker.terminate();
    }

    worker.onmessage = () => {
      cleanup();
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'));
      } else {
        resolve();
      }
    };

    worker.onerror = () => {
      // Fallback to setTimeout if Worker fails
      cleanup();
      const timer = setTimeout(() => {
        if (signal?.aborted) {
          reject(new DOMException('Aborted', 'AbortError'));
        } else {
          resolve();
        }
      }, ms);

      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new DOMException('Aborted', 'AbortError'));
        }, { once: true });
      }
    };

    if (signal) {
      signal.addEventListener('abort', () => {
        cleanup();
        reject(new DOMException('Aborted', 'AbortError'));
      }, { once: true });
    }

    worker.postMessage(ms);
  });
}
