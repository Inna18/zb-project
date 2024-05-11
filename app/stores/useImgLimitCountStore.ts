import { create } from 'zustand';

interface State {
  imgLimitCount: number;
}
interface Action {
  setImgLimitCount: (count: number) => void;
  incrementLimitCount: () => void;
  resetLimitCount: () => void;
}

export const useImgLimitCountStore = create<State & Action>()((set) => ({
  imgLimitCount: 0,
  setImgLimitCount: (count) => set(() => ({ imgLimitCount: count })),
  incrementLimitCount: () =>
    set((state) => ({ imgLimitCount: state.imgLimitCount + 1 })),
  resetLimitCount: () => set({ imgLimitCount: 0 }),
}));
