import { useSessionStore } from '../../store';
import { CustomerInfoBar } from './CustomerInfoBar';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import { SCENARIOS } from '../../data';

interface Props {
  onSendMessage: (text: string) => void;
}

export function CustomerPanel({ onSendMessage }: Props) {
  const { customer, order, isProcessing, selectedScenarioId } = useSessionStore();
  const defaultMsg = selectedScenarioId ? SCENARIOS[selectedScenarioId]?.meta.defaultMessage : undefined;

  return (
    <div className="flex flex-col h-full">
      {customer && order ? (
        <CustomerInfoBar customer={customer} order={order} />
      ) : (
        <div className="bg-white border-b border-slate-200 px-4 py-3">
          <p className="text-sm text-slate-500">No scenario selected</p>
        </div>
      )}
      <ChatWindow />
      <ChatInput
        onSend={onSendMessage}
        disabled={isProcessing || !selectedScenarioId}
        defaultMessage={defaultMsg}
      />
    </div>
  );
}
