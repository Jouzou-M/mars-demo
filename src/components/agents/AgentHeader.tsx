import { cn } from '../../utils/cn';
import { AGENT_COLORS } from '../../utils/constants';
import type { AgentStatus } from '../../types';

interface Props {
  agent: 'ecommerce' | 'courier';
  status: AgentStatus;
}

const STATUS_LABELS: Record<AgentStatus, string> = {
  idle: 'Idle',
  thinking: 'Thinking...',
  retrieving: 'Retrieving data...',
  exchanging: 'Exchanging findings...',
  deciding: 'Making decision...',
  complete: 'Complete',
};

export function AgentHeader({ agent, status }: Props) {
  const colors = AGENT_COLORS[agent];

  return (
    <div className={cn('flex items-center justify-between px-3 py-2 rounded-t-lg', colors.light)}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{colors.icon}</span>
        <span className={cn('text-sm font-semibold', colors.text)}>{colors.name}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={cn(
          'w-2 h-2 rounded-full',
          status === 'idle' ? 'bg-slate-300' :
          status === 'complete' ? 'bg-emerald-500' :
          `${colors.accent} animate-status-dot`,
        )} />
        <span className="text-xs text-slate-500">{STATUS_LABELS[status]}</span>
      </div>
    </div>
  );
}
