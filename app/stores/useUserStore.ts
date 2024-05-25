import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import User from '@/app/service/useUserApi';

interface State {
  user: User;
}
interface Action {
  updateUser: (updatedUser: User) => void;
  resetUser: () => void;
}
const initialState: User = {
  _id: '',
  email: '',
  password: '',
  role: '',
  name: '',
  address: '',
  phoneNumber: '',
};

export const useUserStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        user: initialState,
        updateUser: (updatedUser: User) => set({ user: updatedUser }),
        resetUser: () => set({ user: initialState }),
      }),
      { name: 'userStore' }
    )
  )
);
