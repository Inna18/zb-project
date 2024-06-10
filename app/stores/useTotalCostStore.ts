import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface State {
  totalCost: number;
}
interface Action {
  setTotalCost: (sum: number) => void;
  addToTotalCost: (sum: number) => void;
  substructFromTotalCost: (sum: number) => void;
  resetTotalCost: () => void;
}

export const useTotalCostStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        totalCost: 0,
        setTotalCost: (sum) => set(() => ({ totalCost: sum })),
        addToTotalCost: (sum) =>
          set((state) => ({ totalCost: state.totalCost + sum })),
        substructFromTotalCost: (sum) =>
          set((state) => ({ totalCost: state.totalCost - sum })),
        resetTotalCost: () => set({ totalCost: 0 }),
      }),
      { name: 'totalCostStore' }
    )
  )
);
