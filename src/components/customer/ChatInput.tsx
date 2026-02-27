import { useState, useEffect } from 'react';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
  defaultMessage?: string;
}

export function ChatInput({ onSend, disabled, defaultMessage }: Props) {
  const [text, setText] = useState(defaultMessage ?? '');

  useEffect(() => {
    setText(defaultMessage ?? '');
  }, [defaultMessage]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-3">
      <div className="flex items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={disabled ? 'Processing...' : 'Type your message...'}
          disabled={disabled}
          rows={2}
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  );
}
