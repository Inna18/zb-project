import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Product from '@/app/service/useProductApi.ts';

interface State {
  buyList: Product[];
}
interface Action {
  setBuyList: (items: Product) => void;
  addToBuyList: (item: Product) => void;
  resetBuyList: () => void;
}

export const useBuyListStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        buyList: [],
        setBuyList: (items) => set(() => ({ buyList: [items] })),
        addToBuyList: (item) =>
          set((state) => ({ buyList: [...state.buyList, item] })),
        resetBuyList: () => set({ buyList: [] }),
      }),
      { name: 'buyListStore' }
    )
  )
);
