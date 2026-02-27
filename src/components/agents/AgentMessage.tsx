import { cn } from '../../utils/cn';
import { AGENT_COLORS } from '../../utils/constants';
import type { AgentStep } from '../../types';
import { DataRetrievalCard } from './DataRetrievalCard';
import { LoadingDots } from '../shared/LoadingDots';

interface Props {
  step: AgentStep;
}

const TYPE_STYLES: Record<string, string> = {
  thinking: 'italic text-slate-500',
  retrieval: 'text-slate-700',
  exchange: 'border-l-2 border-blue-400 pl-3 text-slate-700',
  synthesis: 'text-slate-700 font-medium',
  decision: 'text-slate-800 font-medium',
  consensus: 'text-emerald-700',
  resolution: 'text-slate-800',
};

const TYPE_LABELS: Record<string, string> = {
  thinking: 'Thinking',
  retrieval: 'Data Retrieval',
  exchange: 'Agent Exchange',
  synthesis: 'Synthesis',
  decision: 'Decision',
  consensus: 'Consensus',
  resolution: 'Resolution',
};

export function AgentMessage({ step }: Props) {
  const isSystem = step.agent === 'system';
  const colors = AGENT_COLORS[step.agent];

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-1.5 mb-1">
        <span className={cn('text-[10px] font-semibold uppercase tracking-wider', colors.text)}>
          {TYPE_LABELS[step.type]}
        </span>
      </div>

      {step.type === 'retrieval' && step.data ? (
        <DataRetrievalCard
          title={step.content}
          data={step.data}
          agentType={step.agent as 'ecommerce' | 'courier'}
        />
      ) : step.type === 'synthesis' && step.data ? (
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-600 mb-2">{step.content}</p>
          <div className="space-y-1">
            {Object.entries(step.data).map(([key, val]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-slate-500">{key}</span>
                <span className="font-medium text-slate-800 text-right ml-2 max-w-[60%]">{String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : step.type === 'decision' && step.data?.path ? (
        <div className={cn(
          'border-2 rounded-lg p-3',
          step.data.path === 'A' ? 'border-emerald-300 bg-emerald-50' :
          step.data.path === 'B' ? 'border-blue-300 bg-blue-50' :
          step.data.path === 'C' ? 'border-amber-300 bg-amber-50' :
          'border-red-300 bg-red-50'
        )}>
          <p className="text-sm font-medium text-slate-800">{step.content}</p>
        </div>
      ) : (
        <div className={cn('text-sm rounded-lg px-3 py-2',
          isSystem ? 'bg-slate-50 border border-slate-200' : `${colors.bg} border ${colors.border}`,
          TYPE_STYLES[step.type]
        )}>
          {step.type === 'thinking' && (
            <span className="mr-2"><LoadingDots size="sm" /></span>
          )}
          <span className="whitespace-pre-wrap">{step.content}</span>
        </div>
      )}
    </div>
  );
}
