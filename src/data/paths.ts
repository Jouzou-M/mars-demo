import type { ResolutionPath, PathConfig } from '../types';

export const PATHS: Record<ResolutionPath, PathConfig> = {
  A: { name: 'Full Flex', hex: '#27AE60', tailwind: 'emerald', icon: '\u2728', description: 'Instant, generous resolution. No proof burden. Proactive compensation.' },
  B: { name: 'Trust Extension', hex: '#2980B9', tailwind: 'blue', icon: '\uD83E\uDD1D', description: 'Benefit of the doubt with soft safeguards. Resolution provided with gentle conditions.' },
  C: { name: 'Standard', hex: '#F39C12', tailwind: 'amber', icon: '\uD83D\uDCCB', description: 'Fair and by the book. Evidence supports claim, honoured per policy.' },
  D: { name: 'Protective Caution', hex: '#C0392B', tailwind: 'red', icon: '\uD83D\uDEE1\uFE0F', description: 'Conditional resolution. Proof required. Account flagged for monitoring.' },
};
