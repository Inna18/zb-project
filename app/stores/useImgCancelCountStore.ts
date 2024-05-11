import { create } from 'zustand';

interface State {
  imgCancleCount: number;
}
interface Action {
  incrementCancelCount: () => void;
  decrementCancelCount: () => void;
  resetCancelCount: () => void;
}

export const useImgCancelCountStore = create<State & Action>()((set) => ({
  imgCancleCount: 0,
  incrementCancelCount: () =>
    set((state) => ({ imgCancleCount: state.imgCancleCount + 1 })),
  decrementCancelCount: () =>
    set((state) => ({ imgCancleCount: state.imgCancleCount - 1 })),
  resetCancelCount: () => set({ imgCancleCount: 0 }),
}));
