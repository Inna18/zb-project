import { useMutation } from '@tanstack/react-query';
import Post, { createPost } from '@/app/service/usePostApi';

export const usePostCreate = () => {
  return useMutation({
    mutationFn: async (newPost: Post) => await createPost(newPost),
  });
};
