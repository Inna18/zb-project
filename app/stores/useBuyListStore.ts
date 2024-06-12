import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Product from '@/app/service/useProductApi';

interface State {
  buyList: { item: Product, count: number }[];
}
interface Action {
  setBuyList: (itemSet: {item: Product, count: number}) => void;
  addToBuyList: (itemSet: {item: Product, count: number}) => void;
  removeFromBuyList: (item: Product) => void;
  resetBuyList: () => void;
}

export const useBuyListStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        buyList: [],
        setBuyList: (itemSet: {item: Product, count: number}) => set(() => ({ buyList: [itemSet] })),
        addToBuyList: (itemSet: {item: Product, count: number}) =>
          set((state) => ({ buyList: [...state.buyList, itemSet] })),
        removeFromBuyList: (item) => 
          set((state) => ({ buyList: state.buyList.filter(itemSet => itemSet.item._id !== item._id)})),
        resetBuyList: () => set({ buyList: [] }),
      }),
      { name: 'buyListStore' }
    )
  )
);
