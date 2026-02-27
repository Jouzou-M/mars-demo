import { useSessionStore, useAgentStore } from '../../store';
import { PHASE_COLORS } from '../../utils/constants';
import { AgentColumns } from './AgentColumns';
import { AgentMessage } from './AgentMessage';
import { SynthesisPanel } from '../synthesis/SynthesisPanel';
import { DecisionMatrix } from '../decision/DecisionMatrix';
import { ResolutionCard } from '../decision/ResolutionCard';
import { cn } from '../../utils/cn';

export function AgentCollaborationPanel() {
  const { currentPhase, selectedScenarioId } = useSessionStore();
  const {
    systemMessages,
    synthesisData,
    activePath,
    claimLegitimacy,
    relationshipValue,
    resolutionText,
    commitmentToken,
  } = useAgentStore();

  const phaseColors = PHASE_COLORS[currentPhase];

  if (!selectedScenarioId) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400 text-sm">
        <div className="text-center">
          <p className="text-3xl mb-2">{'\uD83E\uDD16'}</p>
          <p>Select a scenario to activate the agents</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'flex flex-col h-full p-4 gap-4 overflow-y-auto transition-colors duration-500',
      phaseColors.bg,
    )}>
      {/* Phase 1 system messages */}
      {currentPhase >= 1 && systemMessages.filter(m => m.step.phase === 1).length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500">
            Phase 1: Breaking
          </h3>
          {systemMessages
            .filter(m => m.step.phase === 1)
            .map(item => (
              <AgentMessage key={item.id} step={item.step} />
            ))}
        </div>
      )}

      {/* Phase 2: Agent columns + synthesis */}
      {currentPhase >= 2 && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Phase 2: Blending
          </h3>
          <AgentColumns />

          {/* System synthesis messages */}
          {systemMessages
            .filter(m => m.step.phase === 2)
            .map(item => (
              <AgentMessage key={item.id} step={item.step} />
            ))}

          <SynthesisPanel
            data={synthesisData}
            visible={synthesisData !== null}
          />
        </div>
      )}

      {/* Phase 3: Decision matrix + resolution */}
      {currentPhase >= 3 && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            Phase 3: Bending
          </h3>

          {/* System decision messages */}
          {systemMessages
            .filter(m => m.step.phase === 3)
            .map(item => (
              <AgentMessage key={item.id} step={item.step} />
            ))}

          <DecisionMatrix
            activePath={activePath}
            legitimacy={claimLegitimacy}
            relationship={relationshipValue}
          />
        </div>
      )}

      {/* Phase 4: Resolution */}
      {currentPhase >= 4 && resolutionText && commitmentToken && activePath && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-500">
            Phase 4: Resolution
          </h3>
          <ResolutionCard
            resolution={resolutionText}
            path={activePath}
            commitmentToken={commitmentToken}
          />
        </div>
      )}
    </div>
  );
}
