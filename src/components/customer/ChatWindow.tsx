import { useRef, useEffect } from 'react';
import { useChatStore } from '../../store';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

export function ChatWindow() {
  const { messages, isTyping } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-slate-400 text-sm">
          Select a scenario and send a message to begin
        </div>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <TypingIndicator visible={isTyping} />
      <div ref={bottomRef} />
    </div>
  );
}
