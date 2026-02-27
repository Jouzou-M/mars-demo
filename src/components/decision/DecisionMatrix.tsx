import type { ResolutionPath, ClaimLegitimacy, RelationshipValue } from '../../types';
import { PATHS } from '../../data';
import { MatrixCell } from './MatrixCell';

interface Props {
  activePath: ResolutionPath | null;
  legitimacy: ClaimLegitimacy | null;
  relationship: RelationshipValue | null;
}

export function DecisionMatrix({ activePath, legitimacy, relationship }: Props) {
  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        2x2 Decision Matrix
      </h3>
      <div className="relative">
        {/* Axis labels */}
        <div className="flex items-center justify-center mb-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            Relationship Value
          </span>
        </div>
        <div className="flex items-center justify-around mb-1 px-8">
          <span className="text-[10px] text-slate-400">HIGH</span>
          <span className="text-[10px] text-slate-400">LOW</span>
        </div>

        <div className="flex">
          {/* Y-axis label */}
          <div className="flex flex-col items-center justify-center mr-2 -ml-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
              Claim Legitimacy
            </span>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-0.5 mb-1">
              <span className="text-[10px] text-slate-400 text-right pr-1">HIGH</span>
            </div>
            {/* Matrix grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Row 1: HIGH legitimacy */}
              <MatrixCell path="A" config={PATHS.A} isActive={activePath === 'A'} />
              <MatrixCell path="C" config={PATHS.C} isActive={activePath === 'C'} />
              {/* Row 2: LOW legitimacy */}
              <MatrixCell path="B" config={PATHS.B} isActive={activePath === 'B'} />
              <MatrixCell path="D" config={PATHS.D} isActive={activePath === 'D'} />
            </div>
            <div className="flex flex-col gap-0.5 mt-1">
              <span className="text-[10px] text-slate-400 text-right pr-1">LOW</span>
            </div>
          </div>
        </div>

        {/* Active path summary */}
        {activePath && legitimacy && relationship && (
          <div className="mt-3 text-center">
            <span className="text-xs text-slate-500">
              {legitimacy} Legitimacy + {relationship} Value = <strong className="text-slate-800">Path {activePath}: {PATHS[activePath].name}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
