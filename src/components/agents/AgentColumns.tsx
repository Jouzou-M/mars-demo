import { AgentColumn } from './AgentColumn';

export function AgentColumns() {
  return (
    <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
      <AgentColumn agent="ecommerce" />
      <AgentColumn agent="courier" />
    </div>
  );
}
