import { create } from 'zustand';
import ShippingPolicy from '@/app/service/useShippingPolicyApi';

interface State {
  shippingPolicy: ShippingPolicy;
}

interface Action {
  updatePolicy: (updatedPolicy: ShippingPolicy) => void;
}

const initialState: ShippingPolicy = {
  _id: '',
  content: null,
  _createdAt: '',
};

export const useShippingPolicyStore = create<State & Action>()((set) => ({
  shippingPolicy: initialState,
  updatePolicy: (updatedPolicy) => set({ shippingPolicy: updatedPolicy }),
}));
