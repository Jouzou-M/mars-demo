import { create } from 'zustand';

interface UIState {
  settingsOpen: boolean;
  apiKey: string | null;
  expandedCards: Set<string>;
  animationSpeed: number;

  toggleSettings: () => void;
  setApiKey: (key: string | null) => void;
  toggleCardExpanded: (id: string) => void;
  setAnimationSpeed: (speed: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  settingsOpen: false,
  apiKey: null,
  expandedCards: new Set(),
  animationSpeed: 1.0,

  toggleSettings: () => set((state) => ({ settingsOpen: !state.settingsOpen })),

  setApiKey: (key) => set({ apiKey: key }),

  toggleCardExpanded: (id) => set((state) => {
    const next = new Set(state.expandedCards);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return { expandedCards: next };
  }),

  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
}));
