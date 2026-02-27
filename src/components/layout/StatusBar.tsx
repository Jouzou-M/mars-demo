import { useSessionStore } from '../../store';
import { PhaseIndicator } from '../shared/PhaseIndicator';
import { useTimer } from '../../hooks/useTimer';

export function StatusBar() {
  const { currentPhase, startTime, isProcessing, endTime } = useSessionStore();
  const elapsed = useTimer(startTime, isProcessing, endTime);

  return (
    <div className="bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-between shrink-0">
      <PhaseIndicator currentPhase={currentPhase} />
      <div className="flex items-center gap-3">
        {startTime && (
          <span className="text-sm font-mono text-slate-500">
            {elapsed}
          </span>
        )}
        {isProcessing && (
          <span className="inline-flex items-center gap-1.5 text-xs text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-status-dot" />
            Processing
          </span>
        )}
      </div>
    </div>
  );
}
