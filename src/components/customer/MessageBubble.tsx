import { cn } from '../../utils/cn';
import { formatTime } from '../../utils/formatTimestamp';
import type { ChatMessage } from '../../types';

interface Props {
  message: ChatMessage;
}

export function MessageBubble({ message }: Props) {
  const isCustomer = message.sender === 'customer';

  return (
    <div className={cn('flex animate-fade-in-up', isCustomer ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        'max-w-[85%] px-4 py-2.5 rounded-2xl',
        isCustomer
          ? 'bg-blue-600 text-white rounded-br-md'
          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm',
      )}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
        <p className={cn(
          'text-[10px] mt-1',
          isCustomer ? 'text-blue-200' : 'text-slate-400',
        )}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
