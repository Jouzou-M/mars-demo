import { useRef, useEffect } from 'react';
import { useAgentStore } from '../../store';
import { AgentHeader } from './AgentHeader';
import { AgentMessage } from './AgentMessage';

interface Props {
  agent: 'ecommerce' | 'courier';
}

export function AgentColumn({ agent }: Props) {
  const status = useAgentStore((s) =>
    agent === 'ecommerce' ? s.ecommerceStatus : s.courierStatus
  );
  const messages = useAgentStore((s) =>
    agent === 'ecommerce' ? s.ecommerceMessages : s.courierMessages
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex flex-col h-full border border-slate-200 rounded-lg overflow-hidden bg-white">
      <AgentHeader agent={agent} status={status} />
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-xs text-slate-400 text-center mt-4">Waiting for activation...</p>
        )}
        {messages.map((item) => (
          <AgentMessage key={item.id} step={item.step} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
