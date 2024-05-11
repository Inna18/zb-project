import { create } from 'zustand';

interface Modal {
  type: string;
  content: string;
  onOk?: () => void;
  onClose?: () => void;
}

interface State {
  modal: Modal;
}
interface Action {
  setModal: (updatedModal: Modal) => void;
}
const initialState: Modal = {
  type: '',
  content: '',
};
export const useModalStore = create<State & Action>()((set) => ({
  modal: initialState,
  setModal: (updatedModal) => set({ modal: updatedModal }),
}));
