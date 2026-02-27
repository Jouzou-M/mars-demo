import type { BlendProducts } from '../../types';

interface Props {
  data: BlendProducts | null;
  visible: boolean;
}

const VALIDITY_COLORS = {
  PLAUSIBLE: 'text-blue-700 bg-blue-50',
  SUSPICIOUS: 'text-red-700 bg-red-50',
  CONFIRMED: 'text-emerald-700 bg-emerald-50',
};

export function SynthesisPanel({ data, visible }: Props) {
  if (!visible || !data) return null;

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Cross-Domain Synthesis
      </h3>
      <div className="bg-gradient-to-r from-amber-50 via-white to-cyan-50 border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs text-slate-500">Claim Validity</span>
            <p className={`text-sm font-semibold px-2 py-0.5 rounded inline-block mt-0.5 ${VALIDITY_COLORS[data.claim_validity]}`}>
              {data.claim_validity}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500">Liability</span>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{data.liability}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500">Evidence Consistency</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${data.evidence_consistency_score * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-slate-600">
                {data.evidence_consistency_score.toFixed(2)}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Scenario</span>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{data.scenario_classification}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200">
          <span className="text-xs text-slate-500">Reasoning</span>
          <p className="text-sm text-slate-700 mt-0.5 leading-relaxed">{data.reasoning}</p>
        </div>
      </div>
    </div>
  );
}
