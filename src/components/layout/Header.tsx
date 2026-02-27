import { useSessionStore, useUIStore } from '../../store';
import { ModeToggle } from '../shared/ModeToggle';
import { ScenarioSelector } from '../shared/ScenarioSelector';

export function Header() {
  const { mode, setMode, selectedScenarioId, selectScenario, isProcessing } = useSessionStore();
  const { toggleSettings } = useUIStore();

  return (
    <header className="bg-slate-900 text-white px-4 md:px-6 py-3 flex items-center justify-between shrink-0 flex-wrap gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-sm font-bold">
            M
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide">MARS</h1>
            <p className="text-[10px] text-slate-400 -mt-0.5">Multi-Agent Resolution System</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ScenarioSelector
          selected={selectedScenarioId}
          onChange={(id) => selectScenario(id)}
          disabled={isProcessing}
        />
        <ModeToggle mode={mode} onChange={setMode} />
        <button
          onClick={toggleSettings}
          className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
          title="Settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
