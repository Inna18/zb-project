import { create } from 'zustand';

type State = {
  imgCancleCount: number;
};
type Action = {
  incrementCancelCount: () => void;
  decrementCancelCount: () => void;
  resetCancelCount: () => void;
};

export const useImgCancelCount = create<State & Action>()((set) => ({
  imgCancleCount: 0,
  incrementCancelCount: () =>
    set((state) => ({ imgCancleCount: state.imgCancleCount + 1 })),
  decrementCancelCount: () =>
    set((state) => ({ imgCancleCount: state.imgCancleCount - 1 })),
  resetCancelCount: () => set({ imgCancleCount: 0 }),
}));
