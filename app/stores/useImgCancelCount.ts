import { create } from 'zustand';

type State = {
  imgCancleCount: number;
};
type Action = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useImgCancelCount = create<State & Action>()((set) => ({
  imgCancleCount: 0,
  increment: () =>
    set((state) => ({ imgCancleCount: state.imgCancleCount + 1 })),
  decrement: () =>
    set((state) => ({ imgCancleCount: state.imgCancleCount - 1 })),
  reset: () => set({ imgCancleCount: 0 }),
}));
