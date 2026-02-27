import type { Scenario } from '../types';
import { SARAH_PROFILE, SARAH_ORDER, SARAH_TRACKING, SARAH_META } from './scenarios';
import { JDOE_PROFILE, JDOE_ORDER, JDOE_TRACKING, JDOE_META } from './scenarios';
import { MARCUS_PROFILE, MARCUS_ORDER, MARCUS_TRACKING, MARCUS_META } from './scenarios';
import { SARAH_SCRIPT } from './scripts/sarah-script';
import { JDOE_SCRIPT } from './scripts/jdoe-script';
import { MARCUS_SCRIPT } from './scripts/marcus-script';

export const SCENARIOS: Record<string, Scenario> = {
  sarah: { profile: SARAH_PROFILE, order: SARAH_ORDER, tracking: SARAH_TRACKING, meta: SARAH_META, script: SARAH_SCRIPT },
  jdoe: { profile: JDOE_PROFILE, order: JDOE_ORDER, tracking: JDOE_TRACKING, meta: JDOE_META, script: JDOE_SCRIPT },
  marcus: { profile: MARCUS_PROFILE, order: MARCUS_ORDER, tracking: MARCUS_TRACKING, meta: MARCUS_META, script: MARCUS_SCRIPT },
};

export type ScenarioId = keyof typeof SCENARIOS;

export { PATHS } from './paths';
export * from './keywords';
