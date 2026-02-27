import { cn } from '../../utils/cn';
import type { PathConfig, ResolutionPath } from '../../types';

interface Props {
  path: ResolutionPath;
  config: PathConfig;
  isActive: boolean;
}

const PATH_BG = {
  A: 'bg-emerald-50 border-emerald-200',
  B: 'bg-blue-50 border-blue-200',
  C: 'bg-amber-50 border-amber-200',
  D: 'bg-red-50 border-red-200',
};

const ACTIVE_BG = {
  A: 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300',
  B: 'bg-blue-100 border-blue-400 ring-2 ring-blue-300',
  C: 'bg-amber-100 border-amber-400 ring-2 ring-amber-300',
  D: 'bg-red-100 border-red-400 ring-2 ring-red-300',
};

export function MatrixCell({ path, config, isActive }: Props) {
  return (
    <div className={cn(
      'border rounded-lg p-3 transition-all duration-500',
      isActive ? ACTIVE_BG[path] : PATH_BG[path],
      isActive && 'animate-pulse-glow shadow-lg scale-105',
    )}
    style={isActive ? { '--glow-color': config.hex + '55' } as React.CSSProperties : undefined}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-base">{config.icon}</span>
        <span className="text-xs font-bold text-slate-800">Path {path}</span>
      </div>
      <p className="text-xs font-semibold text-slate-700">{config.name}</p>
      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{config.description}</p>
    </div>
  );
}
