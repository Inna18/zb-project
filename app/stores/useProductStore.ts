import { create } from 'zustand';
import Product from '@/app/service/useProductApi';

interface State {
  product: Product;
}
interface Action {
  setProduct: (updatedProduct: Product) => void;
  resetProduct: () => void;
}
const initialState: Product = {
  _id: '',
  category: '',
  brand: '',
  name: '',
  price: 0,
  quantity: 0,
  content: [],
  productImages: [],
  _createdAt: '',
  rating: 0,
};
export const useProductStore = create<State & Action>()((set) => ({
  product: initialState,
  setProduct: (updatedProduct) => set({ product: updatedProduct }),
  resetProduct: () => set({ product: initialState }),
}));
