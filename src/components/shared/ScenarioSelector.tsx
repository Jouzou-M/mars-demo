import { SCENARIOS } from '../../data';

interface Props {
  selected: string | null;
  onChange: (id: string) => void;
  disabled: boolean;
}

export function ScenarioSelector({ selected, onChange, disabled }: Props) {
  return (
    <select
      value={selected ?? ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="" disabled>Select scenario...</option>
      {Object.entries(SCENARIOS).map(([id, s]) => (
        <option key={id} value={id}>{s.meta.label}</option>
      ))}
    </select>
  );
}
