import type { Phase } from '../types';

export const PHASE_COLORS: Record<Phase, { bg: string; border: string; text: string; hex: string; label: string }> = {
  0: { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-600', hex: '#94a3b8', label: 'Entry' },
  1: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', hex: '#C0392B', label: 'Breaking' },
  2: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', hex: '#2980B9', label: 'Blending' },
  3: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700', hex: '#27AE60', label: 'Bending' },
  4: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', hex: '#E67E22', label: 'Execution' },
};

export const TIMING = {
  PHASE_TRANSITION_MS: 500,
  MESSAGE_FADE_IN_MS: 300,
  DATA_FIELD_STAGGER_MS: 100,
  TYPING_INDICATOR_MS: 1500,
  AUTO_SCROLL_DELAY_MS: 100,
  SYNTHESIS_MERGE_MS: 700,
};

export const AGENT_COLORS = {
  ecommerce: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    accent: 'bg-amber-500',
    light: 'bg-amber-100',
    name: 'TechMart',
    icon: '\uD83D\uDED2',
  },
  courier: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-800',
    accent: 'bg-cyan-500',
    light: 'bg-cyan-100',
    name: 'SwiftShip',
    icon: '\uD83D\uDE9A',
  },
  system: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-700',
    accent: 'bg-slate-500',
    light: 'bg-slate-100',
    name: 'System',
    icon: '\u2699\uFE0F',
  },
};
