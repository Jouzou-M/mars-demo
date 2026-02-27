import { cn } from '../../utils/cn';

interface Props {
  label: string;
  value: string;
  highlight?: boolean;
  delay?: number;
}

export function DataFieldRow({ label, value, highlight, delay = 0 }: Props) {
  return (
    <div
      className="flex items-start justify-between py-1 animate-data-reveal opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <span className="text-xs text-slate-500 shrink-0">{label}</span>
      <span className={cn(
        'text-xs font-medium text-right ml-2',
        highlight ? 'text-red-600 font-semibold' : 'text-slate-800',
      )}>
        {value}
      </span>
    </div>
  );
}
