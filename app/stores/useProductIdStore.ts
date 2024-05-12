import { create } from 'zustand';

type State = {
  productId: string;
};
type Action = {
  updateId: (updatedId: string) => void;
  resetId: () => void;
};

export const useProductIdStore = create<State & Action>()((set) => ({
  productId: '',
  updateId: (updatedId) => set(() => ({ productId: updatedId })),
  resetId: () => set({ productId: '' }),
}));
