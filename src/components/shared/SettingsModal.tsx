import { useState } from 'react';
import { useUIStore } from '../../store';

export function SettingsModal() {
  const { settingsOpen, toggleSettings, apiKey, setApiKey } = useUIStore();
  const [keyInput, setKeyInput] = useState(apiKey ?? '');

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={toggleSettings} />
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Settings</h2>

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Gemini API Key
        </label>
        <p className="text-xs text-slate-500 mb-2">
          Required for Live AI mode. Get a free key from{' '}
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Google AI Studio
          </a>
        </p>
        <input
          type="password"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="AIza..."
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={toggleSettings}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={() => { setApiKey(keyInput || null); toggleSettings(); }}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
