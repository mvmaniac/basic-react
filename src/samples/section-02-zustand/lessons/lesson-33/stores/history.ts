import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

interface HistoryState {
  count: number;
  past: number[];
  future: number[];
}

interface HistoryActions {
  increment: () => void;
  undo: () => void;
  redo: () => void;
}

interface HistoryStore extends HistoryState {
  actions: HistoryActions;
}

const useHistoryStore = create<HistoryStore>((set) => ({
  count: 0,
  past: [],
  future: [],
  actions: {
    increment: () =>
      set((state) => ({
        past: [...state.past, state.count].slice(-50),
        count: state.count + 1,
        future: [],
      })),
    undo: () =>
      set((state) => {
        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        return {
          past: state.past.slice(0, state.past.length - 1),
          count: previous,
          future: [state.count, ...state.future],
        };
      }),
    redo: () =>
      set((state) => {
        if (state.future.length === 0) return state;
        const next = state.future[0];
        return {
          past: [...state.past, state.count],
          count: next,
          future: state.future.slice(1),
        };
      }),
  },
}));

export const useHistoryState = () =>
  useHistoryStore(
    useShallow((state) => ({
      count: state.count,
      past: state.past,
      future: state.future,
    })),
  );

export const useHistoryActions = () => useHistoryStore((state) => state.actions);
