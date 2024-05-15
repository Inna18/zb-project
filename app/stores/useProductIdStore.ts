import { create } from 'zustand';

interface State {
  productId: string;
}
interface Action {
  updateId: (updatedId: string) => void;
  resetId: () => void;
}

export const useProductIdStore = create<State & Action>()((set) => ({
  productId: '',
  updateId: (updatedId) => set(() => ({ productId: updatedId })),
  resetId: () => set({ productId: '' }),
}));
