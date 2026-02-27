import { create } from 'zustand';
import type { ChatMessage } from '../types';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;

  addMessage: (sender: 'customer' | 'system', text: string) => void;
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
}

let messageCounter = 0;

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,

  addMessage: (sender, text) => set((state) => ({
    messages: [...state.messages, {
      id: `msg-${++messageCounter}`,
      sender,
      text,
      timestamp: Date.now(),
    }],
  })),

  setTyping: (isTyping) => set({ isTyping }),

  clearMessages: () => {
    messageCounter = 0;
    set({ messages: [], isTyping: false });
  },
}));
