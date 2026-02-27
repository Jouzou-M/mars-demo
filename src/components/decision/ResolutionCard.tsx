import { PATHS } from '../../data';
import type { ResolutionPath } from '../../types';

interface Props {
  resolution: string;
  path: ResolutionPath;
  commitmentToken: string;
}

const PATH_HEADER_BG = {
  A: 'bg-emerald-500',
  B: 'bg-blue-500',
  C: 'bg-amber-500',
  D: 'bg-red-500',
};

export function ResolutionCard({ resolution, path, commitmentToken }: Props) {
  const config = PATHS[path];

  return (
    <div className="animate-scale-in border border-slate-200 rounded-lg overflow-hidden shadow-lg">
      <div className={`${PATH_HEADER_BG[path]} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2 text-white">
          <span>{config.icon}</span>
          <span className="text-sm font-bold">Path {path}: {config.name}</span>
        </div>
        <span className="text-xs font-mono text-white/80 bg-white/20 px-2 py-0.5 rounded">
          {commitmentToken}
        </span>
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{resolution}</p>
      </div>
    </div>
  );
}
