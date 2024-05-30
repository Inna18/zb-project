import { create } from 'zustand';

interface State {
  productId: string;
}
interface Action {
  setProductId: (updatedId: string) => void;
  resetId: () => void;
}

export const useProductIdStore = create<State & Action>()((set) => ({
  productId: '',
  setProductId: (updatedId) => set(() => ({ productId: updatedId })),
  resetId: () => set({ productId: '' }),
}));
