import { cn } from '../../utils/cn';
import type { AppMode } from '../../types';

interface Props {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
}

export function ModeToggle({ mode, onChange }: Props) {
  return (
    <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
      <button
        onClick={() => onChange('demo')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
          mode === 'demo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700',
        )}
      >
        Demo
      </button>
      <button
        onClick={() => onChange('live')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
          mode === 'live' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700',
        )}
      >
        Live AI
      </button>
    </div>
  );
}
