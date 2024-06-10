import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface State {
  deliveryFee: number;
}
interface Action {
  setDeliveryFee: (fee: number) => void;
}

export const useDeliveryFeeStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        deliveryFee: 0,
        setDeliveryFee: (fee) => set(() => ({ deliveryFee: fee })),
      }),
      { name: 'deliveryFeeStore' }
    )
  )
);
