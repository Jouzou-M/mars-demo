import { useState } from 'react';
import { cn } from '../../utils/cn';
import { DataFieldRow } from './DataFieldRow';
import { TIMING } from '../../utils/constants';

interface Props {
  title: string;
  data: Record<string, any>;
  agentType: 'ecommerce' | 'courier';
}

const HIGHLIGHT_KEYS = ['Fraud Risk', 'Condition Flags', 'Area Risk', 'Prior Claims'];

export function DataRetrievalCard({ title, data, agentType }: Props) {
  const [expanded, setExpanded] = useState(true);
  const entries = Object.entries(data);
  const borderColor = agentType === 'ecommerce' ? 'border-amber-200' : 'border-cyan-200';

  return (
    <div className={cn('border rounded-lg bg-white animate-slide-up', borderColor)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        <span>{title}</span>
        <span className="text-slate-400">{expanded ? '\u25B2' : '\u25BC'}</span>
      </button>
      {expanded && (
        <div className="px-3 pb-2 divide-y divide-slate-100">
          {entries.map(([key, val], i) => (
            <DataFieldRow
              key={key}
              label={key}
              value={String(val)}
              highlight={HIGHLIGHT_KEYS.some(k => key.includes(k)) && String(val).includes('7')}
              delay={i * TIMING.DATA_FIELD_STAGGER_MS}
            />
          ))}
        </div>
      )}
    </div>
  );
}
