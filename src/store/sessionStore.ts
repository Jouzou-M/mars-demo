import { create } from 'zustand';
import type { AppMode, Phase, CustomerProfile, Order, TrackingData } from '../types';
import { SCENARIOS } from '../data';

interface SessionState {
  mode: AppMode;
  currentPhase: Phase;
  selectedScenarioId: string | null;
  isProcessing: boolean;
  startTime: number | null;
  endTime: number | null;
  customerMessage: string | null;
  customer: CustomerProfile | null;
  order: Order | null;
  tracking: TrackingData | null;

  setMode: (mode: AppMode) => void;
  setPhase: (phase: Phase) => void;
  selectScenario: (id: string) => void;
  startProcessing: (message: string) => void;
  finishProcessing: () => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  mode: 'demo',
  currentPhase: 0,
  selectedScenarioId: null,
  isProcessing: false,
  startTime: null,
  endTime: null,
  customerMessage: null,
  customer: null,
  order: null,
  tracking: null,

  setMode: (mode) => set({ mode }),

  setPhase: (phase) => set({ currentPhase: phase }),

  selectScenario: (id) => {
    const scenario = SCENARIOS[id];
    if (!scenario) return;
    set({
      selectedScenarioId: id,
      customer: scenario.profile,
      order: scenario.order,
      tracking: scenario.tracking,
      currentPhase: 0,
      isProcessing: false,
      startTime: null,
      endTime: null,
      customerMessage: null,
    });
  },

  startProcessing: (message) => set({
    isProcessing: true,
    startTime: Date.now(),
    endTime: null,
    customerMessage: message,
  }),

  finishProcessing: () => set({
    isProcessing: false,
    endTime: Date.now(),
  }),

  reset: () => set({
    currentPhase: 0,
    isProcessing: false,
    startTime: null,
    endTime: null,
    customerMessage: null,
  }),
}));
