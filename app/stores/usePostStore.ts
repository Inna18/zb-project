import { create } from 'zustand';
import Post from '@/app/service/usePostApi';

interface State {
  post: Post;
}
interface Action {
  setPost: (updatedPost: Post) => void;
  resetPost: () => void;
}
const initialState: Post = {
  _id: '',
  title: '',
  content: '',
  postImage: '',
  createdBy: '',
  _createdAt: '',
};
export const usePostStore = create<State & Action>()((set) => ({
  post: initialState,
  setPost: (updatedPost) => set({ post: updatedPost }),
  resetPost: () => set({ post: initialState }),
}));
