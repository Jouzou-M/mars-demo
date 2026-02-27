import { cn } from '../../utils/cn';
import { PHASE_COLORS } from '../../utils/constants';
import type { Phase } from '../../types';

interface Props {
  currentPhase: Phase;
  compact?: boolean;
}

export function PhaseIndicator({ currentPhase, compact }: Props) {
  const phases: Phase[] = [0, 1, 2, 3, 4];
  return (
    <div className={cn('flex items-center', compact ? 'gap-1' : 'gap-2')}>
      {phases.map((phase, i) => {
        const isActive = phase === currentPhase;
        const isComplete = phase < currentPhase;
        const colors = PHASE_COLORS[phase];
        return (
          <div key={phase} className="flex items-center">
            <div className={cn(
              'flex items-center justify-center rounded-full font-semibold transition-all duration-500',
              compact ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm',
              isActive && `${colors.bg} ${colors.border} border-2 ${colors.text} animate-pulse-glow`,
              isComplete && 'bg-emerald-500 text-white border-2 border-emerald-500',
              !isActive && !isComplete && 'bg-slate-100 text-slate-400 border-2 border-slate-200',
            )}
            style={isActive ? { '--glow-color': colors.hex + '66' } as React.CSSProperties : undefined}
            >
              {isComplete ? '\u2713' : phase}
            </div>
            {!compact && (
              <span className={cn(
                'ml-1.5 text-xs font-medium hidden lg:inline',
                isActive ? colors.text : isComplete ? 'text-emerald-600' : 'text-slate-400',
              )}>
                {PHASE_COLORS[phase].label}
              </span>
            )}
            {i < phases.length - 1 && (
              <div className={cn(
                'mx-1.5 h-0.5 transition-all duration-500',
                compact ? 'w-4' : 'w-8',
                phase < currentPhase ? 'bg-emerald-400' : 'bg-slate-200',
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
